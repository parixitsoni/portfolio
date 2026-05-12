"use client";
import { useState, useEffect } from "react";

// Returns "dark" if hour is between 19:00 and 06:59 in local time, else "light"
const getTimeBasedTheme = () => {
  const hour = new Date().getHours();
  return hour >= 19 || hour < 7 ? "dark" : "light";
};

export const useTheme = () => {
  const [theme, setTheme] = useState("light");
  const [userOverride, setUserOverride] = useState(false);

  // On mount: if user previously overrode manually, use that; otherwise use time-based default
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const overrideFlag = localStorage.getItem("theme_override") === "true";
    
    if (saved && overrideFlag) {
      // User manually chose — respect that
      setTheme(saved);
      setUserOverride(true);
    } else {
      // No manual override — use time-based theme
      const timeBased = getTimeBasedTheme();
      setTheme(timeBased);
    }
  }, []);

  // Apply theme class to <html>
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Check every minute if time has crossed the 7am/7pm boundary
  // Only update if user hasn't manually overridden
  useEffect(() => {
    const interval = setInterval(() => {
      const overrideFlag = localStorage.getItem("theme_override") === "true";
      if (!overrideFlag) {
        setTheme(getTimeBasedTheme());
      }
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Manual toggle: sets override flag so auto-time won't fight with user choice
  const toggleTheme = () => {
    localStorage.setItem("theme_override", "true");
    setUserOverride(true);
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme };
};
