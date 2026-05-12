import React from "react";
import Link from "next/link";
import { Moon, Sun, Download } from "lucide-react";
import { NAV_LINKS } from "./constants";
import { getAssetPath } from "../../utils/paths";

export const MobileNav = ({ activeSection, theme, toggleTheme }) => (
  <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] md:hidden w-[95%] max-w-[500px]">
    <nav className="glass-effect-premium rounded-[2rem] p-2 flex items-center justify-between shadow-[0_20px_60px_rgba(0,0,0,0.3)] bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200 dark:border-white/10 overflow-x-auto custom-scrollbar gap-1">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all flex-shrink-0 min-w-[55px] ${activeSection === link.id ? "text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-white/10 scale-105" : "text-slate-500 dark:text-slate-400"}`}
        >
          <link.icon size={18} />
          <span className="text-[7px] font-black uppercase tracking-[0.12em] mt-1">{link.label.substring(0, 4)}</span>
        </Link>
      ))}
      <div className="w-[1px] h-8 bg-slate-200 dark:bg-white/10 mx-0.5 flex-shrink-0"></div>
      <a 
        href={getAssetPath("/Parixit_Soni_Resume.pdf")} 
        download="Parixit_Soni_Resume.pdf"
        className="flex flex-col items-center justify-center p-3 rounded-2xl transition-all flex-shrink-0 min-w-[55px] text-slate-950 dark:text-white bg-slate-100 dark:bg-white/10"
      >
        <Download size={18} />
        <span className="text-[7px] font-black uppercase tracking-[0.12em] mt-1">CV</span>
      </a>
    </nav>
  </div>
);
