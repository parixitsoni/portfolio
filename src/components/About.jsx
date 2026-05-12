import React from "react";
import { Award, Code2, Cpu, Globe, Rocket, Zap } from "lucide-react";

export const About = () => {
  const stats = [
    { label: "Exp.", value: "4y+", icon: <Award size={18} /> },
    { label: "Products", value: "10+", icon: <Rocket size={18} /> },
    { label: "Efficiency", value: "30%", icon: <Zap size={18} /> }
  ];

  return (
    <section id="about" className="py-16 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-slate-900 dark:text-white tracking-tight leading-tight">
              Driving digital impact through <span className="text-sky-600 dark:text-sky-400">precision.</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg mb-12 leading-relaxed font-medium">
              Senior Frontend Developer specialized in high-performance, 
              enterprise-grade applications. I bridge the gap between 
              complex architecture and minimalist user experiences.
            </p>

            <div className="flex gap-12">
              {stats.map((stat, idx) => (
                <div key={idx}>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                  <div className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {[
              { title: "Performance", desc: "Optimizing Core Web Vitals for speed.", icon: <Cpu size={20} /> },
              { title: "Accessibility", desc: "Crafting WCAG 2.1 AA compliant products.", icon: <Globe size={20} /> },
              { title: "Architecture", desc: "Scalable systems with React & Next.js.", icon: <Code2 size={20} /> }
            ].map((pillar, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-3xl border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] hover:bg-white dark:hover:bg-white/[0.05] hover:border-sky-200 dark:hover:border-sky-500/30 transition-all flex items-center gap-6"
              >
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-sky-600 dark:text-sky-400 flex-shrink-0 shadow-sm border border-slate-100 dark:border-white/5">
                  {pillar.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white tracking-tight">{pillar.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
