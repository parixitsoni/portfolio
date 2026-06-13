"use client";
import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Experience } from "../components/Experience";
import { Skills } from "../components/Skills";
import { Education } from "../components/Education";
import { Projects } from "../components/Projects";
import { Footer } from "../components/Footer";
import { DeveloperWorkspace } from "../components/DeveloperWorkspace";
import { THEME_CONFIG } from "../constants/theme-config";

export default function Home() {
  const [view, setView] = useState(null);

  useEffect(() => {
    const initView = async () => {
      // 1. Check query param first (highest override)
      const params = new URLSearchParams(window.location.search);
      const viewParam = params.get("view");
      if (viewParam === "workspace") {
        setView("workspace");
        sessionStorage.setItem("portfolio-view-session", "workspace");
        hideLoader();
        return;
      } else if (viewParam === "classic") {
        setView("classic");
        sessionStorage.setItem("portfolio-view-session", "classic");
        hideLoader();
        return;
      }

      // 2. Check sessionStorage (active preference within the current tab session)
      const sessionView = sessionStorage.getItem("portfolio-view-session");
      if (sessionView === "workspace" || sessionView === "classic") {
        setView(sessionView);
        hideLoader();
        return;
      }

      // 3. Query the remote API database for default layout (for all visitors initially)
      try {
        const res = await fetch("https://keyvalue.immanuel.co/api/KeyVal/GetValue/hft1qyrf/portfolio_config");
        const data = await res.json();
        if (data && typeof data === "string") {
          const parts = data.replace(/"/g, "").split("_");
          const defaultView = parts[0];
          if (defaultView === "classic" || defaultView === "workspace") {
            setView(defaultView);
            hideLoader();
            return;
          }
        }
      } catch (err) {
        console.error("Failed to fetch global default theme from database:", err);
      }

      // 4. Fallback to localStorage or config default
      const savedView = localStorage.getItem("portfolio-view") || THEME_CONFIG.defaultView || "classic";
      if (savedView === "workspace") {
        setView("workspace");
      } else {
        setView("classic");
      }
      hideLoader();
    };

    const hideLoader = () => {
      const loader = document.getElementById("global-page-loader");
      if (loader) {
        setTimeout(() => {
          loader.style.opacity = "0";
          loader.style.visibility = "hidden";
        }, 100);
      }
    };

    initView();
  }, []);

  // Show nothing (or a loader) during hydration/initial load to avoid FOUC
  if (view === null) {
    return null;
  }

  if (view === "workspace") {
    return (
      <main className="w-screen h-dvh overflow-hidden bg-slate-950">
        <DeveloperWorkspace />
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden relative z-10">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Footer />
      </main>
    </>
  );
}
