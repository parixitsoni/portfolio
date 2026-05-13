import React, { useState } from "react";
import { ExternalLink, Star, Activity, Users, ShieldCheck, LayoutDashboard, Package, CreditCard, ShoppingBag, Filter, Zap, Search } from "lucide-react";
import { getAssetPath } from "../utils/paths";

const PROJECTS = [
  {
    id: "hsl",
    title: "HSL Clinical Dashboard",
    subtitle: "Clinical Command Center",
    category: "Healthcare & SaaS",
    url: "https://hsl-clinical-dashboard.vercel.app/",
    screenshot: "/project-hsl.png",
    description:
      "A high-fidelity medical & clinical management system built to centralize patient oversight, compliance tracking, inventory control, and financial operations — all in a single real-time command interface.",
    stack: ["Next.js", "React", "Tailwind CSS", "Recharts", "Framer Motion"],
    highlights: [
      { icon: LayoutDashboard, label: "Command Overview",  desc: "Live KPIs and operational trend charts" },
      { icon: Users,           label: "Patient Directory", desc: "Real-time patient status tracking" },
      { icon: ShieldCheck,     label: "Compliance Portal", desc: "Clinical disclosure governance" },
      { icon: Package,         label: "Smart Inventory",   desc: "Anomaly detection & restocking alerts" },
      { icon: CreditCard,      label: "Financial Ledger",  desc: "Revenue & invoice management" },
      { icon: Activity,        label: "Live Telemetry",    desc: "Continuous system event feed" },
    ],
  },
  {
    id: "products",
    title: "Dynamic Product List",
    subtitle: "E-Commerce Showcase",
    category: "E-Commerce & UI",
    url: "https://dynamic-productlist.vercel.app/",
    screenshot: "/project-products.png",
    description:
      "A sleek, high-performance product listing application with dynamic filtering, real-time search, category navigation, and a responsive card-based UI — demonstrating advanced React state management patterns.",
    stack: ["React", "CSS Modules", "REST API", "Vite"],
    highlights: [
      { icon: ShoppingBag, label: "Product Cards",    desc: "Elegant card grid with images & ratings" },
      { icon: Filter,      label: "Live Filtering",   desc: "Multi-category and price-range filters" },
      { icon: Search,      label: "Real-time Search", desc: "Instant search with debounced queries" },
      { icon: Zap,         label: "Fast Performance", desc: "Optimized renders with React memo" },
    ],
  },
];

export const Projects = () => {
  const [active, setActive] = useState("hsl");
  const project = PROJECTS.find((p) => p.id === active);

  return (
    <section id="projects" className="py-16 px-4 md:px-6 relative bg-transparent">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-[11px] font-black uppercase tracking-widest mb-5">
            <Star size={12} className="fill-current" />
            Proudly Built
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white tracking-tight">
            Featured <span className="text-sky-600 dark:text-sky-400">Projects</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Applications I designed and engineered end-to-end — from architecture to production.
          </p>
        </div>

        {/* Project Tabs */}
        <div className="flex justify-center gap-3 mb-10">
          {PROJECTS.map((p) => (
            <button
              key={p.id}
              onClick={() => setActive(p.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider border transition-all ${
                active === p.id
                  ? "bg-sky-500/10 border-sky-500/20 text-sky-600 dark:text-sky-400 scale-105 shadow-lg"
                  : "border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-white/20"
              }`}
            >
              {p.title.split(" ").slice(0, 2).join(" ")}
            </button>
          ))}
        </div>

        {/* Main Card */}
        <div className="glass-effect-premium rounded-[2.5rem] md:rounded-[3rem] border border-slate-200 dark:border-white/10 overflow-hidden shadow-2xl">

          {/* Browser Bar */}
          <div className="flex items-center justify-between px-5 md:px-8 py-4 border-b border-slate-100 dark:border-white/5 bg-slate-50/60 dark:bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/70"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-400/70"></span>
              </div>
              <span className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">
                {project.url.replace("https://", "")}
              </span>
            </div>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-white text-[10px] font-black uppercase tracking-wider transition-all hover:scale-105 shadow-lg bg-sky-600 hover:bg-sky-500 shadow-sky-500/20"
            >
              <ExternalLink size={13} />
              Live Demo
            </a>
          </div>

          {/* Screenshot */}
          <div className="relative overflow-hidden bg-slate-100 dark:bg-slate-900 border-b border-slate-100 dark:border-white/5" style={{ maxHeight: "340px" }}>
            <img
              src={getAssetPath(project.screenshot)}
              alt={project.title}
              className="w-full object-cover object-top"
              style={{ maxHeight: "340px" }}
            />
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-[#020617] to-transparent pointer-events-none"></div>
          </div>

          {/* Body */}
          <div className="p-6 md:p-10 grid md:grid-cols-2 gap-8 md:gap-12 items-start">

            {/* Left */}
            <div>
              <div className="inline-block px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border mb-4 bg-sky-500/10 border-sky-500/20 text-sky-600 dark:text-sky-400">
                {project.category}
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-1 tracking-tight">
                {project.title}
              </h3>
              <p className="text-xs font-black uppercase tracking-widest mb-5 text-sky-600 dark:text-sky-400">
                {project.subtitle}
              </p>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-8 text-sm md:text-base">
                {project.description}
              </p>
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span key={tech} className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — highlights */}
            <div className="grid grid-cols-2 gap-3">
              {project.highlights.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 hover:border-sky-300 dark:hover:border-sky-500/40 transition-all group">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3 transition-colors bg-sky-500/10 group-hover:bg-sky-500/20 text-sky-600 dark:text-sky-400">
                    <Icon size={15} />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white mb-1 leading-tight">{label}</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
