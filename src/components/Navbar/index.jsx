"use client";
import React, { useState, useEffect } from "react";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { useTheme } from "../../hooks/useTheme";
import { useActiveSection } from "../../hooks/useActiveSection";
import { NAV_LINKS } from "./constants";

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const activeSection = useActiveSection(NAV_LINKS);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <DesktopNav activeSection={activeSection} scrolled={scrolled} theme={theme} toggleTheme={toggleTheme} />
      <MobileNav activeSection={activeSection} theme={theme} toggleTheme={toggleTheme} />
    </>
  );
};
