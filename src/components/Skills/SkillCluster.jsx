import React from "react";

const getIcon = (slug) => `https://cdn.simpleicons.org/${slug}`;

export const SkillCluster = ({ cluster }) => (
  <div className="p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 hover:border-sky-300 dark:hover:border-sky-500/50 transition-all duration-500 flex flex-col shadow-sm hover:shadow-xl dark:hover:shadow-sky-500/5">
    <h3 className="text-[9px] font-bold text-slate-700 dark:text-slate-400 uppercase tracking-[0.25em] mb-6">{cluster.title}</h3>
    <div className="grid grid-cols-2 sm:grid-cols-1 gap-4 md:gap-5">
      {cluster.skills.map((skill) => (
        <div 
          key={skill.name} 
          className="flex items-center gap-3 group cursor-pointer"
          style={{
            "--brand-color": skill.color,
            "--glow-color": `${skill.color}33`,
          }}
        >
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center p-2 shadow-sm border border-slate-100 dark:border-white/10 group-hover:scale-110 transition-all duration-300 group-hover:border-[var(--brand-color)] group-hover:shadow-[0_0_15px_var(--glow-color)]">
            <img src={getIcon(skill.slug)} alt="" className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-[10px] md:text-xs font-bold text-slate-900 dark:text-slate-200 group-hover:text-[var(--brand-color)] transition-colors truncate">{skill.name}</span>
        </div>
      ))}
    </div>
  </div>
);
