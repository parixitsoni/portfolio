"use client";
import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

const getTimeBasedTheme = () => {
  const hour = new Date().getHours();
  return hour >= 19 || hour < 7 ? "dark" : "light";
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [userOverride, setUserOverride] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    const initTheme = async () => {
      // 1. Check session theme override (active choice within the current tab session)
      const sessionTheme = sessionStorage.getItem("theme-session");
      if (sessionTheme === "dark" || sessionTheme === "light") {
        setTheme(sessionTheme);
        setUserOverride(true);
        return;
      }

      // 2. Fetch global default theme mode from database
      try {
        const res = await fetch("https://keyvalue.immanuel.co/api/KeyVal/GetValue/hft1qyrf/portfolio_config");
        const data = await res.json();
        if (data && typeof data === "string") {
          const parts = data.replace(/"/g, "").split("_");
          const defaultMode = parts[1];
          if (defaultMode === "dark" || defaultMode === "light") {
            setTheme(defaultMode);
            return;
          }
        }
      } catch (err) {
        console.error("Failed to fetch global default theme mode from database:", err);
      }

      // 3. Fallback to localStorage or time-based theme
      const saved = localStorage.getItem("theme");
      const overrideFlag = localStorage.getItem("theme_override") === "true";
      if (saved && overrideFlag) {
        setTheme(saved);
        setUserOverride(true);
      } else {
        const timeBased = getTimeBasedTheme();
        setTheme(timeBased);
      }
    };

    initTheme();
  }, []);

  // Sync to HTML document class & localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Time boundary check every minute if user hasn't overridden
  useEffect(() => {
    const interval = setInterval(() => {
      const overrideFlag = localStorage.getItem("theme_override") === "true";
      if (!overrideFlag) {
        setTheme(getTimeBasedTheme());
      }
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getTransitionCoordinates = (e) => {
    if (typeof window === "undefined") return { x: 0, y: 0 };

    if (e && e.clientX !== undefined && e.clientY !== undefined) {
      return { x: e.clientX, y: e.clientY };
    }

    // 1. Look for active terminal input (if command was run in CLI)
    const activeEl = document.activeElement;
    if (activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA")) {
      const rect = activeEl.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
    }

    // 2. Look for theme toggle button in DOM
    const toggleBtn = document.querySelector('[aria-label="Toggle theme"]') || 
                      document.querySelector('[title="Toggle Light/Dark Theme"]') ||
                      document.querySelector('[aria-label="Toggle Theme"]');
    if (toggleBtn) {
      const rect = toggleBtn.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
    }

    // Fallback: Center of the viewport
    return {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };
  };

  const animateThemeTransition = (targetTheme, coordinates) => {
    const isViewTransition = typeof document !== "undefined" && document.startViewTransition;
    if (!isViewTransition) {
      setTheme(targetTheme);
      return;
    }

    const { x, y } = coordinates;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      setTheme(targetTheme);
    });

    transition.ready.then(() => {
      const isDarkTransition = targetTheme === "dark";
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`
      ];

      document.documentElement.animate(
        {
          clipPath: isDarkTransition ? clipPath : [...clipPath].reverse(),
        },
        {
          duration: 500,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          pseudoElement: isDarkTransition
            ? "::view-transition-new(root)"
            : "::view-transition-old(root)",
        }
      );
    });
  };

  const toggleTheme = (e) => {
    localStorage.setItem("theme_override", "true");
    setUserOverride(true);

    const targetMode = theme === "light" ? "dark" : "light";
    sessionStorage.setItem("theme-session", targetMode);
    const coords = getTransitionCoordinates(e);
    animateThemeTransition(targetMode, coords);
  };

  const setThemeMode = (mode, e) => {
    if (mode !== "dark" && mode !== "light") return;
    if (mode === theme) return;

    localStorage.setItem("theme_override", "true");
    setUserOverride(true);
    sessionStorage.setItem("theme-session", mode);

    const coords = getTransitionCoordinates(e);
    animateThemeTransition(mode, coords);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
