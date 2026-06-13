export const THEME_CONFIG = {
  // Global Default Theme choice for new visitors.
  // Set to "classic" for standard scrolling layout, or "workspace" for interactive IDE theme.
  defaultView: "classic", // owner-set: classic
  currentTheme: "main",
  mainThemeUrl: "https://parixit.vercel.app",
  theme1Url: "https://portfolio-git-theme-interactive-network-parixitsoni.vercel.app",
  // Secret key required to change the theme via CLI (prevent public access)
  ownerKey: "parixit-secret"
};

export const getThemeRedirectUrl = (targetTheme) => {
  if (typeof window === "undefined") return "";
  return window.location.origin;
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
      text.dataset.overridden = "true";
    }
  }

  // Set the view key in localStorage and sessionStorage so the page renders the correct component
  const viewValue = targetTheme === "classic" ? "classic" : "workspace";
  localStorage.setItem("portfolio-view", viewValue);
  sessionStorage.setItem("portfolio-view-session", viewValue);

  // Trigger reload so the app re-renders with the chosen theme view on the same URL
  setTimeout(() => {
    // If there is any view parameter in URL, strip it so the localStorage value takes precedence
    const url = new URL(window.location.href);
    url.searchParams.delete("view");
    window.location.href = url.pathname + url.search;
  }, 300);
};
