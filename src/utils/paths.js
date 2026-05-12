const isGitHubPages = process.env.GITHUB_ACTIONS === "true" || (typeof window !== 'undefined' && window.location.hostname.includes('github.io'));
const basePath = isGitHubPages ? "/portfolio" : "";

export const getAssetPath = (path) => {
  if (path.startsWith("http") || path.startsWith("mailto:") || path.startsWith("tel:")) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
};
