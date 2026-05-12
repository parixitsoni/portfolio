import React from "react";
import { experiences } from "./data";
import { ExperienceCard } from "./ExperienceCard";

export const Experience = () => (
  <section id="experience" className="py-16 px-6 relative overflow-hidden">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-24">
        <h2 className="text-4xl md:text-7xl font-bold mb-6 text-slate-950 dark:text-white tracking-tight">Career Journey</h2>
        <p className="text-slate-700 dark:text-slate-400 text-lg max-w-2xl mx-auto font-medium">
          Professional trajectory focused on technical leadership and architecting enterprise-grade frontend systems.
        </p>
      </div>
      <div className="relative">
        <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[4px] bg-sky-500/20 md:-translate-x-1/2 blur-[2px]"></div>
        <div className="absolute left-[16px] md:left-1/2 top-0 bottom-0 w-[2px] bg-sky-500/80 md:-translate-x-1/2"></div>
        <div className="space-y-24">
          {experiences.map((exp, idx) => (
            <ExperienceCard key={idx} exp={exp} idx={idx} />
          ))}
        </div>
      </div>
    </div>
  </section>
);
