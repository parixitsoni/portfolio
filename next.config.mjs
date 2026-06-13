import http from "http";
import { exec } from "child_process";
import fs from "fs";

/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

if (process.env.NODE_ENV !== "production") {
  if (!global.gitCheckoutSidecar) {
    const server = http.createServer((req, res) => {
      // Set CORS headers
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
      
      if (req.method === "OPTIONS") {
        res.writeHead(200);
        res.end();
        return;
      }
      
      if (req.url.startsWith("/api/git-checkout")) {
        const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
        const branch = url.searchParams.get("branch");
        
        if (!branch || !["main", "theme-interactive-network"].includes(branch)) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Invalid branch name" }));
          return;
        }
        
        exec(`git checkout ${branch}`, (error, stdout, stderr) => {
          if (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: error.message, stderr }));
            return;
          }
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true, stdout, stderr }));
        });
      } else if (req.url.startsWith("/api/set-theme-default")) {
        const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
        const view = url.searchParams.get("view");
        const key = url.searchParams.get("key");
        
        const configPath = "./src/constants/theme-config.js";
        
        try {
          if (!fs.existsSync(configPath)) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "theme-config.js file not found" }));
            return;
          }
          
          let content = fs.readFileSync(configPath, "utf8");
          const keyMatch = content.match(/ownerKey:\s*["']([^"']+)["']/);
          const expectedKey = keyMatch ? keyMatch[1] : null;
          
          if (!expectedKey || key !== expectedKey) {
            res.writeHead(403, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Forbidden: Invalid owner key" }));
            return;
          }
          
          if (view !== "classic" && view !== "workspace") {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Invalid view type. Must be 'classic' or 'workspace'" }));
            return;
          }
          
          const updatedContent = content.replace(
            /(defaultView:\s*["'])([^"']*)(["'])/,
            `$1${view}$3`
          );
          
          fs.writeFileSync(configPath, updatedContent, "utf8");
          
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true, updatedView: view }));
        } catch (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: err.message }));
        }
      } else {
        res.writeHead(404);
        res.end();
      }
    });
    
    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        // Gracefully ignore since it's already running
      } else {
        console.error("Sidecar server error:", err);
      }
    });
    
    server.listen(3001, () => {
      console.log("--> Local git-checkout sidecar listening on port 3001");
    });
    
    server.unref();
    global.gitCheckoutSidecar = server;
  }
}

const nextConfig = {
  output: "export",
  basePath: isGitHubPages ? "/portfolio" : "",
  assetPrefix: isGitHubPages ? "/portfolio/" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

