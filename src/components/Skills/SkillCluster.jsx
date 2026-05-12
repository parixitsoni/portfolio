import React from "react";

const getIcon = (slug) => `https://cdn.simpleicons.org/${slug}`;

export const SkillCluster = ({ cluster }) => (
  <div className="p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 hover:border-sky-300 dark:hover:border-sky-500/50 transition-all duration-500 flex flex-col shadow-sm hover:shadow-xl dark:hover:shadow-sky-500/5">
    <h3 className="text-[10px] font-bold text-slate-700 dark:text-slate-400 uppercase tracking-[0.25em] mb-8">{cluster.title}</h3>
    <div className="space-y-5">
      {cluster.skills.map((skill) => (
        <div key={skill.name} className="flex items-center gap-4 group">
          <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center p-2 shadow-sm border border-slate-200 dark:border-white/10 group-hover:scale-110 transition-transform group-hover:border-sky-300 dark:group-hover:border-sky-500/50">
            <img src={getIcon(skill.slug)} alt="" className="w-full h-full object-contain dark:brightness-150 opacity-80 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-xs font-bold text-slate-900 dark:text-slate-200 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">{skill.name}</span>
        </div>
      ))}
    </div>
  </div>
);
