import React from "react";
import { Sparkles } from "lucide-react";
import { skillClusters } from "./data";
import { SkillCluster } from "./SkillCluster";

export const Skills = () => (
  <section id="skills" className="py-24 px-6 relative bg-transparent">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white tracking-tight leading-tight">
          Technical <span className="text-sky-600 dark:text-sky-400">Arsenal</span>
        </h2>
        <div className="flex justify-center items-center gap-2 text-slate-600 dark:text-slate-400 font-bold uppercase tracking-widest text-[10px]">
          <Sparkles size={14} className="text-sky-500" />
          System Diagnostics: All Engines Optimal
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillClusters.map((cluster, idx) => (
          <SkillCluster key={idx} cluster={cluster} />
        ))}
      </div>
    </div>
  </section>
);
