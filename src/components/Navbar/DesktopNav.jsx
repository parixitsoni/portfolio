import React from "react";
import { NAV_LINKS } from "./constants";

const handleNavClick = (e, href) => {
  // Only intercept hash links (same-page anchors)
  if (href.includes("#")) {
    e.preventDefault();
    const id = href.split("#")[1];
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
};

export const DesktopNav = ({ activeSection, scrolled }) => (
  <div className={`fixed top-0 left-0 right-0 z-[100] px-4 transition-all duration-500 hidden md:block ${scrolled ? "py-4 translate-y-2" : "py-8"}`}>
    <nav className="max-w-fit mx-auto glass-effect-premium rounded-full p-2 flex items-center gap-1 shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10">
      {/* Logo */}
      <a href="#home" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center mr-1">
        <img src={getAssetPath("/ps-logo.png")} alt="PS" className="w-8 h-8 rounded-full object-cover" />
      </a>
      {NAV_LINKS.map((link) => (
        <a
          key={link.label}
          href={link.href}
          onClick={(e) => handleNavClick(e, link.href)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 group relative cursor-pointer ${activeSection === link.id ? "text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-white/10" : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"}`}
        >
          <link.icon size={18} className={activeSection === link.id ? "scale-110" : "group-hover:scale-110"} />
          <span className="text-xs font-bold tracking-wide">{link.label}</span>
        </a>
      ))}
    </nav>
  </div>
);
