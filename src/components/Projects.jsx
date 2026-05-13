import React from "react";
import { ExternalLink, Star, Activity, Users, ShieldCheck, LayoutDashboard, Package, CreditCard } from "lucide-react";

const PROJECT = {
  title: "HSL Clinical Dashboard",
  subtitle: "Clinical Command Center",
  description:
    "A high-fidelity medical & clinical management system built to centralize patient oversight, compliance tracking, inventory control, and financial operations — all in a single real-time command interface.",
  url: "https://hsl-clinical-dashboard.vercel.app/",
  stack: ["Next.js", "React", "Tailwind CSS", "Recharts", "Framer Motion", "Lucide Icons"],
  highlights: [
    { icon: LayoutDashboard, label: "Command Overview",   desc: "Live KPIs, telemetry stream, and operational trend charts" },
    { icon: Users,           label: "Patient Directory",  desc: "Searchable patient records with real-time status tracking" },
    { icon: ShieldCheck,     label: "Compliance Portal",  desc: "Clinical disclosure governance with Signed / Pending status" },
    { icon: Package,         label: "Smart Inventory",    desc: "Stock monitor with anomaly detection & restocking alerts" },
    { icon: CreditCard,      label: "Financial Ledger",   desc: "Revenue tracking and invoice management dashboard" },
    { icon: Activity,        label: "Live Telemetry",     desc: "Continuous system event feed simulating production-grade ops" },
  ],
};

export const Projects = () => (
  <section id="projects" className="py-16 px-6 relative bg-transparent">
    <div className="max-w-6xl mx-auto">

      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-[11px] font-black uppercase tracking-widest mb-6">
          <Star size={13} className="fill-current" />
          Proudly Built
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white tracking-tight">
          Featured <span className="text-sky-600 dark:text-sky-400">Project</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          A full-scale application I designed and engineered end-to-end — from architecture to production deployment.
        </p>
      </div>

      {/* Project Card */}
      <div className="glass-effect-premium rounded-[3rem] border border-slate-200 dark:border-white/10 overflow-hidden shadow-2xl">

        {/* Browser chrome bar */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100 dark:border-white/5 bg-slate-50/60 dark:bg-white/[0.02]">
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-400/70"></span>
              <span className="w-3 h-3 rounded-full bg-amber-400/70"></span>
              <span className="w-3 h-3 rounded-full bg-green-400/70"></span>
            </div>
            <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
              hsl-clinical-dashboard.vercel.app
            </span>
          </div>
          <a
            href={PROJECT.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-sky-600 text-white text-xs font-black uppercase tracking-wider hover:bg-sky-500 transition-all hover:scale-105 shadow-lg shadow-sky-500/20"
          >
            <ExternalLink size={14} />
            Live Demo
          </a>
        </div>

        {/* Body */}
        <div className="p-8 md:p-12 grid md:grid-cols-2 gap-12 items-start">

          {/* Left — About */}
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
              {PROJECT.title}
            </h3>
            <p className="text-sky-600 dark:text-sky-400 text-xs font-black uppercase tracking-widest mb-6">
              {PROJECT.subtitle}
            </p>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-10">
              {PROJECT.description}
            </p>

            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {PROJECT.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Module highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PROJECT.highlights.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 hover:border-sky-300 dark:hover:border-sky-500/40 transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-sky-500/10 flex items-center justify-center mb-3 group-hover:bg-sky-500/20 transition-colors">
                  <Icon size={17} className="text-sky-600 dark:text-sky-400" />
                </div>
                <p className="text-[11px] font-black uppercase tracking-widest text-slate-900 dark:text-white mb-1">{label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  </section>
);
