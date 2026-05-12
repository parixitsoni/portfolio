import React from "react";
import { MapPin, ChevronDown } from "lucide-react";
import { personalData } from "../../constants/personal-data";
import { HeroProfile } from "./HeroProfile";

export const Hero = () => (
  <section id="home" className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
    <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-16 relative z-10">
      <div className="flex-1 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-10 animate-fadeInUp">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          Open to Relocation / Remote
        </div>
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-8 tracking-tighter leading-none animate-fadeInUp text-slate-950 dark:text-white">
          I'm <span className="text-gradient block lg:inline font-heading">Parixit</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-400 mb-12 font-medium max-w-2xl animate-fadeInUp delay-100 leading-relaxed">
          Crafting <span className="text-slate-950 dark:text-white font-semibold underline decoration-sky-600/30">high-performance</span> digital experiences as a <span className="text-sky-600 dark:text-sky-400">Senior Frontend Developer</span>.
        </p>
        <div className="flex flex-col sm:flex-row items-center md:justify-start justify-center gap-8 animate-fadeInUp delay-200">
          <a href={`mailto:${personalData.email}`} className="px-10 py-5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/10 dark:shadow-white/5 border border-slate-900 dark:border-white/10">Start a Conversation</a>
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-500">
            <MapPin size={18} className="text-sky-600 dark:text-sky-400" />
            <span className="text-sm font-bold tracking-tight">{personalData.location}</span>
          </div>
        </div>
      </div>
      <HeroProfile />
    </div>
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20 dark:text-white">
      <ChevronDown size={32} />
    </div>
  </section>
);
