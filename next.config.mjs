/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Uncomment the following if you are deploying to a project page (e.g. username.github.io/repo-name)
  // basePath: '/portfolio',
};

export default nextConfig;
