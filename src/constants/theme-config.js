export const THEME_CONFIG = {
  currentTheme: "main",
  mainThemeUrl: "https://parixit.vercel.app",
  theme1Url: "https://portfolio-git-theme-interactive-network-parixitsoni.vercel.app"
};

export const getThemeRedirectUrl = (targetTheme) => {
  if (typeof window === "undefined") return "";
  
  const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  
  if (isLocal) {
    return window.location.origin;
  }
  
  return targetTheme === "classic" 
    ? THEME_CONFIG.mainThemeUrl 
    : THEME_CONFIG.theme1Url;
};

export const handleThemeRedirect = async (targetTheme) => {
  if (typeof window === "undefined") return;

  const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  if (isLocal) {
    try {
      const branch = targetTheme === "classic" ? "main" : "theme-interactive-network";
      const res = await fetch(`http://localhost:3001/api/git-checkout?branch=${branch}`);
      if (res.ok) {
        setTimeout(() => {
          window.location.reload();
        }, 150);
        return;
      }
    } catch (e) {
      console.error("Failed to checkout branch:", e);
    }
    window.location.reload();
  } else {
    window.location.href = targetTheme === "classic" 
      ? THEME_CONFIG.mainThemeUrl 
      : THEME_CONFIG.theme1Url;
  }
};
