const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/portfolio" : "";

export const getAssetPath = (path) => {
  if (path.startsWith("http") || path.startsWith("mailto:") || path.startsWith("tel:")) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
};
