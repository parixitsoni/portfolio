import React from "react";
import { Activity, Cpu, HardDrive } from "lucide-react";

export const Diagnostics = ({ footerTab }) => {
  return (
    <div className={`
      w-full p-4 sm:p-6 flex flex-col justify-center items-center overflow-y-auto custom-scrollbar
      ${footerTab === "diagnostics" ? "flex" : "hidden"}
    `}>
      <div className="w-full max-w-2xl flex flex-col gap-4">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2 font-heading">
          <Activity size={14} className="text-sky-500 dark:text-sky-500 animate-pulse" />
          <span>System Diagnostics Center</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          {/* Card 1 - Experience */}
          <div className="bg-white dark:bg-[#0c111d]/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex sm:flex-col items-center gap-4 text-left sm:text-center shadow-md hover:border-sky-500/30 transition-all group">
            <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="17" className="stroke-slate-200 dark:stroke-slate-800/80" strokeWidth="2.5" />
                <circle 
                  cx="20" 
                  cy="20" 
                  r="17" 
                  className="stroke-sky-500 dark:stroke-sky-400 transition-all duration-1000 ease-out" 
                  strokeWidth="2.5" 
                  strokeDasharray={106.8} 
                  strokeDashoffset={106.8 * (1 - 0.84)} 
                  strokeLinecap="round" 
                />
              </svg>
              <Cpu size={18} className="absolute text-sky-500 dark:text-sky-400 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest font-heading">Experience</div>
              <div className="text-sm font-black text-slate-800 dark:text-white font-mono mt-0.5">4.2 Years</div>
              <div className="text-[9px] text-slate-500 dark:text-slate-400 mt-1 font-sans hidden sm:block">Professional background timeline verified.</div>
            </div>
          </div>

          {/* Card 2 - Lighthouse */}
          <div className="bg-white dark:bg-[#0c111d]/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex sm:flex-col items-center gap-4 text-left sm:text-center shadow-md hover:border-emerald-500/30 transition-all group">
            <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="17" className="stroke-slate-200 dark:stroke-slate-800/80" strokeWidth="2.5" />
                <circle 
                  cx="20" 
                  cy="20" 
                  r="17" 
                  className="stroke-emerald-500 dark:stroke-emerald-400 transition-all duration-1000 ease-out" 
                  strokeWidth="2.5" 
                  strokeDasharray={106.8} 
                  strokeDashoffset={0} 
                  strokeLinecap="round" 
                />
              </svg>
              <Activity size={18} className="absolute text-emerald-500 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest font-heading">Lighthouse</div>
              <div className="text-sm font-black text-slate-800 dark:text-white font-mono mt-0.5">100%</div>
              <div className="text-[9px] text-slate-500 dark:text-slate-400 mt-1 font-sans hidden sm:block">Performance & accessibility audited.</div>
            </div>
          </div>

          {/* Card 3 - Core Status */}
          <div className="bg-white dark:bg-[#0c111d]/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex sm:flex-col items-center gap-4 text-left sm:text-center shadow-md hover:border-violet-500/30 transition-all group">
            <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="17" className="stroke-slate-200 dark:stroke-slate-800/80" strokeWidth="2.5" />
                <circle 
                  cx="20" 
                  cy="20" 
                  r="17" 
                  className="stroke-violet-500 dark:stroke-violet-400 transition-all duration-1000 ease-out" 
                  strokeWidth="2.5" 
                  strokeDasharray={106.8} 
                  strokeDashoffset={106.8 * (1 - 0.95)} 
                  strokeLinecap="round" 
                />
              </svg>
              <HardDrive size={18} className="absolute text-violet-500 dark:text-violet-400 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest font-heading">Core Status</div>
              <div className="text-sm font-black text-emerald-500 dark:text-emerald-400 font-mono mt-0.5">ONLINE</div>
              <div className="text-[9px] text-slate-500 dark:text-slate-400 mt-1 font-sans hidden sm:block">Workspace services operational.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
