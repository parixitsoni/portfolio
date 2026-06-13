import React from "react";
import { MapPin, ChevronDown } from "lucide-react";
import { personalData } from "../../constants/personal-data";
import { HeroProfile } from "./HeroProfile";
import { getAssetPath } from "../../utils/paths";

export const Hero = () => (
  <section id="home" className="min-h-screen flex items-center justify-center px-4 md:px-6 relative pt-32 pb-20">
    <div className="max-w-5xl w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 relative z-10">
      <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-8 animate-fadeInUp">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          Open to work
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 tracking-tight leading-[1.1] animate-fadeInUp text-slate-900 dark:text-white">
          Hi, I'm <span className="text-sky-600 dark:text-sky-500">Parixit</span>. <br />
          Building interfaces <br />
          with <span className="italic font-serif text-sky-600/80">purpose.</span>
        </h1>
        
        <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 mb-10 font-medium max-w-lg animate-fadeInUp delay-100 leading-relaxed mx-auto lg:mx-0">
          I specialize in crafting high-performance, accessible, and scalable web applications using React and Next.js.
        </p>
        
        <div className="flex flex-row items-center lg:justify-start justify-center gap-2 sm:gap-6 animate-fadeInUp delay-200">
          <a href={getAssetPath("/Parixit_Soni_Resume.pdf")} download="Parixit_Soni_Resume.pdf" className="px-5 sm:px-10 py-4 sm:py-5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-[11px] sm:text-base font-bold rounded-2xl shadow-xl border border-slate-900 dark:border-white/10 hover:scale-[1.02] transition-all whitespace-nowrap">
            Download Resume
          </a>
          <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-4 sm:py-5 bg-white/10 dark:bg-white/5 rounded-2xl border border-slate-200/50 dark:border-white/10 backdrop-blur-md">
            <MapPin size={16} className="text-sky-500 shrink-0" />
            <span className="text-[9px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest whitespace-nowrap">{personalData.location}</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 w-full flex justify-center lg:justify-end order-1 lg:order-2 animate-fadeInUp delay-300">
        <HeroProfile />
      </div>
    </div>

    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-20 animate-bounce">
      <div className="w-[1px] h-12 bg-gradient-to-b from-sky-500 to-transparent"></div>
      <ChevronDown size={16} />
    </div>
  </section>
);
