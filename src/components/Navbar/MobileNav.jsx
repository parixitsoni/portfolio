import React from "react";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { NAV_LINKS } from "./constants";

export const MobileNav = ({ activeSection, theme, toggleTheme }) => (
  <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] md:hidden w-[95%] max-w-[500px]">
    <nav className="glass-effect-premium rounded-[2rem] p-2 flex items-center justify-between shadow-[0_20px_60px_rgba(0,0,0,0.3)] bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200 dark:border-white/10 overflow-x-auto custom-scrollbar">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all flex-shrink-0 min-w-[60px] ${activeSection === link.id ? "text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-white/10 scale-105" : "text-slate-500 dark:text-slate-400"}`}
        >
          <link.icon size={20} />
          <span className="text-[7px] font-bold uppercase tracking-[0.15em] mt-1">{link.label.substring(0, 4)}</span>
        </Link>
      ))}
      <div className="w-[1px] h-8 bg-slate-200 dark:bg-white/10 mx-1 flex-shrink-0"></div>
      <button onClick={toggleTheme} className="p-4 text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors flex-shrink-0">
        {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
      </button>
    </nav>
  </div>
);
