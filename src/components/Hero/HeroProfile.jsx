import React from "react";

export const HeroProfile = () => (
  <div className="relative animate-fadeInUp delay-300 group">
    <div className="w-64 h-64 md:w-80 md:h-80 rounded-[4rem] p-3 glass-effect-premium border border-slate-200 dark:border-white/10 relative z-10 rotate-3 group-hover:rotate-0 transition-all duration-700 overflow-hidden shadow-2xl">
      <img 
        src="/parixit_img.jpg" 
        alt="Parixit Soni" 
        className="w-full h-full object-cover rounded-[3.5rem] grayscale group-hover:grayscale-0 transition-all duration-700 scale-110"
      />
    </div>
    <div className="absolute inset-0 border-2 border-sky-600/20 dark:border-sky-400/20 rounded-[4rem] -rotate-3 scale-105 translate-x-4 translate-y-4 -z-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700"></div>
  </div>
);
