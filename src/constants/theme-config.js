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

  // Show loader immediately
  const loader = document.getElementById("global-page-loader");
  const text = document.getElementById("global-page-loader-text");
  if (loader) {
    loader.style.opacity = "1";
    loader.style.visibility = "visible";
    if (text) {
      text.textContent = targetTheme === "classic" ? "Switching to Classic Theme..." : "Switching to Workspace...";
    }
  }

  // Small delay to allow fade-in transition
  setTimeout(async () => {
    const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    if (isLocal) {
      try {
        const branch = targetTheme === "classic" ? "main" : "theme-interactive-network";
        const res = await fetch(`http://localhost:3001/api/git-checkout?branch=${branch}`);
        if (res.ok) {
          // Wait 1.2s to let Next.js dev server notice file changes and begin reload
          setTimeout(() => {
            window.location.reload();
          }, 1200);
          return;
        }
      } catch (e) {
        console.error("Failed to checkout branch:", e);
      }
      window.location.reload();
    } else {
      const currentThemeMode = localStorage.getItem("theme") || "dark";
      const baseUrl = targetTheme === "classic" ? THEME_CONFIG.mainThemeUrl : THEME_CONFIG.theme1Url;
      setTimeout(() => {
        window.location.href = `${baseUrl}?theme=${currentThemeMode}`;
      }, 500);
    }
  }, 100);
};
