"use client";
import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Experience } from "../components/Experience";
import { Skills } from "../components/Skills";
import { Education } from "../components/Education";
import { Projects } from "../components/Projects";
import { Blog } from "../components/Blog";
import { Footer } from "../components/Footer";
import { DeveloperWorkspace } from "../components/DeveloperWorkspace";
import { THEME_CONFIG } from "../constants/theme-config";

export default function Home() {
  const [view, setView] = useState(null);

  useEffect(() => {
    // Check query param first
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get("view");
    if (viewParam === "workspace") {
      setView("workspace");
      localStorage.setItem("portfolio-view", "workspace");
      return;
    } else if (viewParam === "classic") {
      setView("classic");
      localStorage.setItem("portfolio-view", "classic");
      return;
    }

    // Check localStorage, fallback to global default view from config
    const savedView = localStorage.getItem("portfolio-view") || THEME_CONFIG.defaultView;
    if (savedView === "workspace") {
      setView("workspace");
    } else {
      setView("classic");
    }
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
        <Blog />
        <Education />
        <Footer />
      </main>
    </>
  );
}
