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
    const saved = localStorage.getItem("theme");
    const overrideFlag = localStorage.getItem("theme_override") === "true";
    
    if (saved && overrideFlag) {
      setTheme(saved);
      setUserOverride(true);
    } else {
      const timeBased = getTimeBasedTheme();
      setTheme(timeBased);
    }

    // Fade out and hide the global page loader after mount
    const loader = document.getElementById("global-page-loader");
    if (loader) {
      setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
      }, 100);
    }
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

  const toggleTheme = (e) => {
    localStorage.setItem("theme_override", "true");
    setUserOverride(true);

    const isViewTransition = typeof document !== "undefined" && document.startViewTransition;
    if (isViewTransition && e && e.clientX !== undefined && e.clientY !== undefined) {
      const x = e.clientX;
      const y = e.clientY;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = document.startViewTransition(() => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
      });

      transition.ready.then(() => {
        const isDark = theme === "light";
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`
        ];
        
        document.documentElement.animate(
          {
            clipPath: isDark ? clipPath : [...clipPath].reverse(),
          },
          {
            duration: 500,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
            pseudoElement: isDark
              ? "::view-transition-new(root)"
              : "::view-transition-old(root)",
          }
        );
      });
    } else {
      setTheme((prev) => (prev === "light" ? "dark" : "light"));
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
