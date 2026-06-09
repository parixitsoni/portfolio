import http from "http";
import { exec } from "child_process";

/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

if (process.env.NODE_ENV !== "production") {
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

