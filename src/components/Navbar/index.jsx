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
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
 
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
 
  return (
    <div className={`transition-transform duration-500 fixed inset-x-0 top-0 z-[100] ${visible ? 'translate-y-0' : '-translate-y-full md:translate-y-0'}`}>
      <DesktopNav activeSection={activeSection} scrolled={scrolled} theme={theme} toggleTheme={toggleTheme} />
      <MobileNav activeSection={activeSection} theme={theme} toggleTheme={toggleTheme} />
    </div>
  );
};
