import React from "react";
import { GraduationCap, Calendar, BookOpen } from "lucide-react";

const education = [
  {
    degree: "MCA (Master of Computer Applications)",
    institution: "Mohanlal Sukhadia University",
    period: "2017 — 2020",
    icon: <BookOpen className="text-sky-600 dark:text-sky-400" />
  },
  {
    degree: "Bachelor of Computer Science",
    institution: "Bhupal Nobles P.G. College",
    period: "2014 — 2017",
    icon: <GraduationCap className="text-indigo-600 dark:text-indigo-400" />
  }
];

export const Education = () => {
  return (
    <section id="education" className="py-16 px-6 relative bg-transparent">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white tracking-tight">
            Academic <span className="text-sky-600 dark:text-sky-400">Foundation</span>
          </h2>
        </div>

        <div className="glass-effect-premium rounded-[2.5rem] border border-slate-100 dark:border-white/5 overflow-hidden shadow-xl dark:shadow-black/20">
          <div className="divide-y divide-slate-100 dark:divide-white/5">
            {education.map((edu, idx) => (
              <div 
                key={idx}
                className="p-6 md:p-10 flex flex-row items-center gap-6 md:gap-8 group hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform border border-slate-100 dark:border-white/5 shadow-sm">
                  {edu.icon}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-base md:text-xl font-bold text-slate-900 dark:text-white mb-0.5 md:mb-1 tracking-tight truncate">
                    {edu.degree}
                  </h3>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 font-bold truncate">
                    {edu.institution}
                  </p>
                </div>

                <div className="hidden sm:flex items-center gap-2 text-slate-500 dark:text-slate-500 text-[10px] font-bold uppercase tracking-widest bg-slate-100/50 dark:bg-white/5 px-4 py-2 rounded-full border border-slate-100 dark:border-white/5">
                  <Calendar size={12} className="text-sky-500 dark:text-sky-400" />
                  {edu.period}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
