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
      // Resolve element: home link uses href="/" so look up #home directly
      let el;
      if (link.id === "home") {
        el = document.getElementById("home");
      } else if (link.href.startsWith("/#")) {
        el = document.querySelector(link.href.substring(1));
      }
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

    // Fallback: if scrolled to very top, always mark Home as active
    const handleScroll = () => {
      if (window.scrollY < 80) {
        setActiveSection("home");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Set initial state
    handleScroll();

    return () => {
      observers.forEach((obs) => obs?.disconnect());
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname, navLinks]);

  return activeSection;
};
