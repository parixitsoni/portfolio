import React from "react";
import Link from "next/link";
import { Moon, Sun, Download } from "lucide-react";
import { NAV_LINKS } from "./constants";
import { getAssetPath } from "../../utils/paths";

export const MobileNav = ({ activeSection, theme, toggleTheme }) => (
  <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] md:hidden w-[95%] max-w-[500px]">
    <nav className="glass-effect-premium rounded-[2rem] p-1.5 flex items-center justify-around shadow-[0_20px_60px_rgba(0,0,0,0.3)] bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-slate-200 dark:border-white/10 gap-0.5">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all flex-shrink-0 min-w-[50px] ${activeSection === link.id ? "text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-white/10" : "text-slate-500 dark:text-slate-400"}`}
        >
          <link.icon size={16} />
          <span className="text-[7px] font-black uppercase tracking-[0.12em] mt-1">{link.label.substring(0, 4)}</span>
        </Link>
      ))}
      <div className="w-[1px] h-6 bg-slate-200 dark:bg-white/10 mx-0.5 flex-shrink-0"></div>
      <a 
        href={getAssetPath("/Parixit_Soni_Resume.pdf")} 
        download="Parixit_Soni_Resume.pdf"
        className="flex flex-col items-center justify-center p-2 rounded-2xl transition-all flex-shrink-0 min-w-[50px] text-white bg-sky-600 shadow-lg shadow-sky-500/20"
      >
        <Download size={16} />
        <span className="text-[7px] font-black uppercase tracking-[0.12em] mt-1">CV</span>
      </a>
    </nav>
  </div>
);
