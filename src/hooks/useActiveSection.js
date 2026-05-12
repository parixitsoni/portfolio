"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export const useActiveSection = (navLinks) => {
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") {
      if (pathname === "/learning") setActiveSection("learning");
      return;
    }

    const observers = navLinks.map((link) => {
      if (!link.href.startsWith("/#")) return null;
      const el = document.querySelector(link.href.substring(1));
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(link.id);
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      return observer;
    });

    return () => {
      observers.forEach((obs) => obs?.disconnect());
    };
  }, [pathname, navLinks]);

  return activeSection;
};
