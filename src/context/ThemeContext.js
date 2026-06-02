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

  const toggleTheme = () => {
    localStorage.setItem("theme_override", "true");
    setUserOverride(true);
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
