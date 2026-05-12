import React from "react";

export const Layout = ({ children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center p-2 md:p-6 bg-white dark:bg-[#020617] mesh-gradient relative transition-colors duration-700 overflow-hidden">
      {/* Background Vibrant Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-sky-500/10 dark:bg-sky-400/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-blue-600/10 dark:bg-blue-500/15 rounded-full blur-[120px]"></div>
      </div>

      {/* Main Application Container - The "Glass Frame" */}
      <div className="w-full h-full rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-[0_40px_120px_-20px_rgba(15,23,42,0.3)] dark:shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)] flex flex-col bg-white/80 dark:bg-slate-950/80 backdrop-blur-3xl border border-slate-200 dark:border-white/10 relative z-10 transition-all duration-500">
        {children}
      </div>
    </div>
  );
};
