import React from "react";
import { Calendar, MapPin, ChevronRight } from "lucide-react";
import { getDateRange, calculateDuration } from "../../utils/formatting";
import { getAssetPath } from "../../utils/paths";

export const ExperienceCard = ({ exp, idx }) => (
  <div className={`relative flex flex-col md:flex-row gap-12 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
    <div className="absolute left-0 md:left-1/2 top-0 -translate-x-1/2 z-20 hidden md:block">
      <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-3 shadow-xl overflow-hidden group">
        <img 
          src={getAssetPath(exp.logo)} 
          alt={exp.company} 
          className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
          onError={(e) => {
            e.target.src = "https://cdn.lucide.dev/icons/briefcase.svg";
            e.target.className = "w-full h-full object-contain opacity-20 dark:invert";
          }}
        />
      </div>
    </div>
    <div className="flex-1 md:w-[45%] ml-8 md:ml-0">
      <div className="glass-effect-premium p-8 md:p-10 rounded-[3rem] transition-all duration-500 group relative">
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-900/40 text-sky-700 dark:text-sky-400 text-[10px] font-bold uppercase tracking-widest border border-sky-200 dark:border-sky-500/20">
              {calculateDuration(exp.startDate, exp.endDate)}
            </span>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-500 text-xs font-medium">
              <Calendar size={14} />
              {getDateRange(exp.startDate, exp.endDate)}
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-slate-950 dark:text-white mb-1 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">{exp.company}</h3>
            <div className="flex items-center gap-2 text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">
              <ChevronRight size={18} className="text-sky-600 dark:text-sky-400" />
              {exp.title}
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-500 text-xs font-bold">
              <MapPin size={12} />
              {exp.location}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          {exp.summary && <p className="text-slate-800 dark:text-slate-300 text-sm italic font-medium border-l-2 border-sky-600/30 dark:border-sky-400/30 pl-4 leading-relaxed">"{exp.summary}"</p>}
          {exp.highlights && (
            <ul className="grid gap-4">
              {exp.highlights.map((h, i) => (
                <li key={i} className="flex gap-4 text-slate-700 dark:text-slate-400 text-sm leading-relaxed font-medium group/item">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sky-600 dark:bg-sky-400 opacity-40 group-hover/item:opacity-100 transition-colors flex-shrink-0"></div>
                  {h}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
    <div className="hidden md:block flex-1"></div>
  </div>
);
