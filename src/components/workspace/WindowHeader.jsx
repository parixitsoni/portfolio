import React, { useContext } from "react";
import { Monitor, Clock, Sun, Moon, Menu } from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";
import { VERSION_INFO } from "../../constants/version-config";

export const WindowHeader = ({ time, sidebarOpen, setSidebarOpen }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="h-11 bg-slate-100 dark:bg-[#050811] border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between px-4 z-20 shadow-sm transition-colors duration-300">
      <div className="flex items-center gap-3">
        {/* Mobile Sidebar Hamburger Toggle */}
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800/60 transition-colors"
        >
          <Menu size={18} />
        </button>
        
        {/* OS Window Dot buttons */}
        <div className="hidden md:flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/80 hover:brightness-110 transition-all cursor-pointer"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500/80 hover:brightness-110 transition-all cursor-pointer"></span>
          <span className="w-3 h-3 rounded-full bg-green-500/80 hover:brightness-110 transition-all cursor-pointer"></span>
        </div>
        <div className="hidden md:block w-[1px] h-4 bg-slate-300 dark:bg-slate-800/80 mx-2"></div>
        <span className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-200 flex items-center gap-1.5 font-heading">
          <Monitor size={12} className="text-sky-500 animate-pulse" />
          <span>Parixit OS <span className="hidden sm:inline">Workspace</span></span>
        </span>
        <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800/70 text-slate-500 dark:text-slate-400 font-mono text-[9px] font-bold tracking-normal select-none">
          v{VERSION_INFO.version}
        </span>
      </div>

      {/* Theme Toggle & Diagnostics & Digital Clock */}
      <div className="flex items-center gap-2 sm:gap-4 text-xs font-mono text-slate-700 dark:text-slate-200">
        <button
          onClick={(e) => toggleTheme(e)}
          className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all flex items-center justify-center cursor-pointer border border-slate-200 dark:border-slate-800/65 bg-slate-50 dark:bg-white/5 shadow-sm"
          title="Toggle Light/Dark Theme"
        >
          {theme === "dark" ? <Sun size={14} className="text-amber-400" /> : <Moon size={14} className="text-slate-600" />}
        </button>

        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          SYSTEM ONLINE
        </div>
        <div className="flex items-center gap-1.5 bg-slate-200/60 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-800 px-2.5 py-1 rounded-lg text-[10px] sm:text-xs">
          <Clock size={12} className="text-sky-500 dark:text-sky-400 shrink-0" />
          <span>{time}</span>
        </div>
      </div>
    </header>
  );
};
