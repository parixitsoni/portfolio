/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig = {
  output: "export",
  basePath: isGitHubPages ? "/portfolio" : "",
  assetPrefix: isGitHubPages ? "/portfolio/" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
