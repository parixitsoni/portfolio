import React from "react";
import { Calendar, Clock, MapPin, ExternalLink, GraduationCap, Mail, Phone, Download, CheckCircle2, Atom, Layers, Palette, Code2, Globe, Zap, BarChart3, Linkedin, Github, Send, Briefcase } from "lucide-react";
import { personalData } from "../../constants/personal-data";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const getTechIcon = (tech) => {
  const t = tech.toLowerCase();
  if (t.includes("react")) {
    return <Atom size={12} className="text-sky-500 dark:text-sky-400 shrink-0" />;
  }
  if (t.includes("next")) {
    return <Layers size={12} className="text-indigo-500 dark:text-indigo-400 shrink-0" />;
  }
  if (t.includes("tailwind")) {
    return <Palette size={12} className="text-cyan-500 dark:text-cyan-400 shrink-0" />;
  }
  if (t.includes("css")) {
    return <Palette size={12} className="text-pink-500 dark:text-pink-400 shrink-0" />;
  }
  if (t.includes("js") || t.includes("javascript") || t.includes("script")) {
    return <Code2 size={12} className="text-amber-500 shrink-0" />;
  }
  if (t.includes("api") || t.includes("rest") || t.includes("graphql")) {
    return <Globe size={12} className="text-teal-600 dark:text-teal-400 shrink-0" />;
  }
  if (t.includes("vite")) {
    return <Zap size={12} className="text-purple-500 dark:text-purple-400 shrink-0" />;
  }
  if (t.includes("recharts") || t.includes("chart")) {
    return <BarChart3 size={12} className="text-emerald-500 dark:text-emerald-400 shrink-0" />;
  }
  return <Code2 size={12} className="text-slate-500 dark:text-slate-400 shrink-0" />;
};

export const VisualPreview = ({ activeFile }) => {
  if (!activeFile) return null;

  return (
    <div className="max-w-2xl mx-auto py-2 sm:py-6">
      {activeFile.previewType === "profile" && (
        <div className="bg-white dark:bg-[#060b13] p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xl space-y-8 transition-colors duration-300">
          
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-5 pb-6 border-b border-slate-200/60 dark:border-slate-800/60">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-sky-400 via-blue-500 to-indigo-500 flex items-center justify-center text-white font-black text-4xl shadow-xl shadow-sky-500/10 shrink-0 font-heading select-none relative group overflow-hidden">
              <span className="relative z-10">P</span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="space-y-1.5 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 justify-center sm:justify-start">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight font-sans tracking-tight">
                  {personalData.name}
                </h2>
                <span className="self-center px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[9px] font-black uppercase tracking-wider shadow-sm select-none">
                  Active
                </span>
              </div>
              <p className="text-slate-500 dark:text-sky-400/80 text-xs sm:text-sm font-bold tracking-wide font-sans">
                Senior Frontend Engineer & UI Architect
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-400 text-[11px] font-semibold font-sans">
                <MapPin size={11} className="text-sky-500" />
                <span>Udaipur, Rajasthan, India</span>
              </div>
            </div>
          </div>

          {/* Clean Flat Metrics Grid (No borders/boxes, vertical dividers) */}
          <div className="grid grid-cols-3 py-2 border-b border-slate-200/60 dark:border-slate-800/60 text-center">
            <div className="border-r border-slate-200/60 dark:border-slate-800/60">
              <div className="text-2xl font-black text-slate-900 dark:text-white font-sans tracking-tight">4.2+</div>
              <div className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1 font-sans">Years Exp</div>
            </div>
            <div className="border-r border-slate-200/60 dark:border-slate-800/60">
              <div className="text-2xl font-black text-slate-900 dark:text-white font-sans tracking-tight">10+</div>
              <div className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1 font-sans">Products</div>
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900 dark:text-white font-sans tracking-tight">100%</div>
              <div className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1 font-sans">Vitals</div>
            </div>
          </div>
          
          {/* Bio Summary Text */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 font-sans">Profile Abstract</h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-[15px] leading-relaxed font-sans font-medium text-justify">
              {personalData.summary}
            </p>
          </div>

          {/* Social Links — sleek borderless circles */}
          <div className="flex justify-center items-center gap-3.5 flex-wrap w-full py-3 bg-slate-50/50 dark:bg-slate-900/10 rounded-2xl border border-slate-100 dark:border-slate-900/50">
            <a
              href="mailto:parikshitsoni85@gmail.com"
              title="Send Mail"
              className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/20 text-red-500 dark:text-red-400 flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300"
            >
              <Mail size={17} />
            </a>
            <a
              href="https://linkedin.com/in/parixitsoni"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn Profile"
              className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
            >
              <Linkedin size={17} />
            </a>
            <a
              href="https://github.com/parixitsoni"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub Profile"
              className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800/30 text-slate-700 dark:text-slate-300 flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-slate-500/10 transition-all duration-300"
            >
              <Github size={17} />
            </a>
            <a
              href="tel:+917597191971"
              title="Call Phone"
              className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300"
            >
              <Phone size={17} />
            </a>
            <a
              href="/Parixit_Soni_Resume.pdf"
              download="Parixit_Soni_Resume.pdf"
              title="Download CV (PDF)"
              className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/20 text-sky-600 dark:text-sky-400 flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-sky-500/10 transition-all duration-300 cursor-pointer"
            >
              <Download size={17} />
            </a>
          </div>

          {/* Architectural Focus Core Values */}
          <div className="space-y-4 pt-2">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 font-sans">Core Values & Focus</h3>
            <div className="grid gap-3">
              {[
                { label: "Performance First", desc: "Optimizing code-splitting, static bundles, and Core Web Vitals." },
                { label: "Design Systems Integration", desc: "Crafting accessible (WCAG 2.1 AA) responsive component structures." },
                { label: "Clean Code Architecture", desc: "Engineering maintainable, modular React/Next.js single page systems." }
              ].map((value, idx) => (
                <div key={idx} className="flex gap-3 p-3 bg-slate-50/50 dark:bg-slate-900/5 border border-slate-100 dark:border-slate-900/50 rounded-xl hover:border-sky-500/20 dark:hover:border-sky-500/20 transition-all">
                  <CheckCircle2 size={16} className="text-sky-500 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200 font-sans">{value.label}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-sans leading-relaxed">{value.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Career Timeline */}
          <div className="space-y-5 pt-2">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 font-sans">Career Path</h3>
            
            <div className="space-y-1">
              {[
                {
                  icon: <Briefcase size={12} className="text-white" />,
                  dotColor: "bg-sky-500 shadow-sky-500/20",
                  lineColor: "bg-slate-200 dark:bg-slate-800",
                  title: "Manager, Band C1",
                  org: "EXL Service (Remote)",
                  period: "Jan 2026 — Feb 2026",
                  desc: "Led frontend strategy & clinical analytics dashboard architecture decisions.",
                  isLast: false,
                },
                {
                  icon: <Briefcase size={12} className="text-white" />,
                  dotColor: "bg-sky-500 shadow-sky-500/20",
                  lineColor: "bg-slate-200 dark:bg-slate-800",
                  title: "Senior Consultant",
                  org: "Cairs Solutions (Remote)",
                  period: "Mar 2024 — Oct 2025",
                  desc: "Architected 4 production apps using React/Next.js, built a reusable UI component library, and optimized web vitals.",
                  isLast: false,
                },
                {
                  icon: <Briefcase size={12} className="text-white" />,
                  dotColor: "bg-sky-500 shadow-sky-500/20",
                  lineColor: "bg-slate-200 dark:bg-slate-800",
                  title: "Frontend Developer",
                  org: "IndiaNIC Infotech (Remote)",
                  period: "Aug 2021 — Oct 2023",
                  desc: "Engineered geo-fencing maps widgets, real-time GraphQL dashboards, and maintained Jest/RTL unit tests.",
                  isLast: false,
                },
                {
                  icon: <GraduationCap size={12} className="text-white" />,
                  dotColor: "bg-indigo-500 shadow-indigo-500/20",
                  lineColor: "transparent",
                  title: "Master of Computer Applications (MCA)",
                  org: "Mohanlal Sukhadia University",
                  period: "2017 — 2020",
                  desc: "Completed postgraduate specialization in computer applications and software systems.",
                  isLast: true,
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 group">
                  {/* Timeline connectors */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className={`w-7 h-7 rounded-lg ${item.dotColor} flex items-center justify-center shrink-0 mt-1 transition-transform group-hover:scale-110 duration-300`}>
                      {item.icon}
                    </div>
                    {!item.isLast && (
                      <div className={`w-0.5 flex-1 mt-1.5 mb-1.5 ${item.lineColor}`} />
                    )}
                  </div>

                  {/* Content card */}
                  <div className="flex-1 pb-6">
                    <div className="p-4 bg-slate-50/30 dark:bg-slate-900/5 border border-slate-100/70 dark:border-slate-900/60 rounded-2xl space-y-2 group-hover:border-sky-500/15 transition-all duration-300">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="text-xs font-black text-slate-800 dark:text-white font-sans leading-tight">
                          {item.title}
                        </h4>
                        <span className="text-[9px] font-black uppercase text-sky-600 dark:text-sky-400 bg-sky-500/5 px-2 py-0.5 rounded-md border border-sky-500/10">
                          {item.period}
                        </span>
                      </div>
                      <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest font-sans">
                        {item.org}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeFile.previewType === "work" && (
        <div className="bg-white dark:bg-[#0c111d]/85 backdrop-blur-xl p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-xl dark:shadow-2xl space-y-4 transition-colors duration-300">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
            <div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-wider font-heading">
                Work Experience
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mt-3 font-heading leading-tight">{activeFile.data.company}</h2>
              <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-350 mt-1 font-heading">{activeFile.data.title}</h3>
            </div>
            <span className="self-start text-[10px] font-bold text-slate-600 dark:text-slate-200 uppercase tracking-wider bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shrink-0">
              <Calendar size={13} className="text-sky-500 dark:text-sky-400" />
              {activeFile.data.duration}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <MapPin size={14} className="text-sky-500 dark:text-sky-400 shrink-0" />
            <span>{activeFile.data.location}</span>
          </div>

          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-sans font-semibold">{activeFile.data.desc}</p>

          <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800/60">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 font-heading">Key Highlights</h4>
            <ul className="space-y-2.5">
              {activeFile.data.highlights.map((h, idx) => (
                <li key={idx} className="flex gap-2.5 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-medium leading-relaxed font-sans">
                  <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {activeFile.previewType === "project" && (
        <div className="bg-white dark:bg-[#0c111d]/85 backdrop-blur-xl p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-xl dark:shadow-2xl space-y-4 transition-colors duration-300">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
            <div>
              <span className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-600 dark:text-violet-400 text-[10px] font-black uppercase tracking-wider font-heading">
                Project Showcase
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mt-3 font-heading leading-tight">{activeFile.data.title}</h2>
              <h3 className="text-xs font-bold text-violet-500 dark:text-violet-400 mt-0.5 font-heading">{activeFile.data.subtitle}</h3>
            </div>
            <a
              href={activeFile.data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start text-xs font-black text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-md shadow-violet-600/20 px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all hover:scale-105 shrink-0"
            >
              <ExternalLink size={13} />
              Live Demo
            </a>
          </div>

          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-sans font-semibold">{activeFile.data.desc}</p>

          <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800/60">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 font-heading">Tech Stack</h4>
            <div className="flex flex-wrap gap-1.5">
              {activeFile.data.tech.map(t => (
                <span key={t} className="px-3 py-1 rounded-lg text-xs font-bold bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  {getTechIcon(t)}
                  <span>{t}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeFile.previewType === "education" && (
        <div className="bg-white dark:bg-[#0c111d]/85 backdrop-blur-xl p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-xl dark:shadow-2xl space-y-4 transition-colors duration-300">
          <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-600 dark:text-amber-400 text-[10px] font-black uppercase tracking-wider font-heading">
            Academic Records
          </span>

          <div className="divide-y divide-slate-200 dark:divide-slate-800/60">
            {activeFile.data.map((edu, idx) => (
              <div key={idx} className="py-3.5 first:pt-0 last:pb-0 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-[#050811] border border-slate-200 dark:border-slate-800/80 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                  <GraduationCap size={18} />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-white font-heading leading-snug">{edu.degree}</h3>
                  <p className="text-xs text-slate-550 dark:text-slate-400 font-semibold mt-0.5">{edu.institution}</p>
                  <div className="flex gap-4 mt-1.5 text-[10px] font-semibold text-slate-500 dark:text-slate-400 font-mono">
                    <span>📅 {edu.period}</span>
                    <span>🏆 {edu.grade}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeFile.previewType === "contact" && (
        <div className="bg-white dark:bg-[#0c111d]/85 backdrop-blur-xl p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-xl dark:shadow-2xl space-y-4 transition-colors duration-300">
          <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/25 text-sky-600 dark:text-sky-400 text-[10px] font-black uppercase tracking-wider font-heading">
            Contact Interface
          </span>
          
          <h2 className="text-xl font-bold text-slate-800 dark:text-white font-heading">Let's build something epic!</h2>

          <div className="grid gap-2.5 pt-1">
            <a href={`mailto:${personalData.email}`} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-all group">
              <Send size={15} className="text-sky-500 dark:text-sky-400 group-hover:scale-110 transition-transform shrink-0" />
              <span className="text-xs sm:text-sm font-semibold truncate text-slate-700 dark:text-slate-200 font-sans">{personalData.email}</span>
            </a>
            <a href={`tel:${personalData.phone}`} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-all group">
              <Phone size={15} className="text-sky-500 dark:text-sky-400 group-hover:scale-110 transition-transform shrink-0" />
              <span className="text-xs sm:text-sm font-semibold truncate text-slate-700 dark:text-slate-200 font-sans">{personalData.phone}</span>
            </a>
          </div>

          <a 
            href={personalData.resumeUrl}
            download="Parixit_Soni_Resume.pdf"
            className="w-full flex items-center justify-center gap-2 p-3 bg-slate-900 dark:bg-slate-950 hover:bg-slate-800 dark:hover:bg-slate-900 text-white font-bold rounded-xl border border-slate-700 dark:border-slate-800 transition-all cursor-pointer shadow-md text-xs font-heading"
          >
            <Download size={15} className="text-sky-400 animate-bounce" />
            <span>Download Full CV</span>
          </a>
        </div>
      )}

      {activeFile.previewType === "updates" && (
        <div className="bg-white dark:bg-[#0c111d]/85 backdrop-blur-xl p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-xl dark:shadow-2xl space-y-4 transition-colors duration-300">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/60 pb-4">
            <div>
              <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/25 text-sky-600 dark:text-sky-400 text-[10px] font-black uppercase tracking-wider font-heading">
                System Updates
              </span>
              <h2 className="text-xl font-bold text-slate-850 dark:text-white font-heading mt-2">Portfolio Changelog</h2>
            </div>
            <div className="text-right">
              <div className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 bg-sky-500/5 px-2.5 py-1 rounded-lg border border-sky-500/15">
                v{activeFile.data.version}
              </div>
              <div className="text-[9px] text-slate-400 dark:text-slate-500 font-mono mt-1">
                {activeFile.data.lastUpdated}
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-1">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-450 dark:text-slate-500 font-heading">Latest Features</h3>
            <ul className="space-y-2 text-xs text-slate-650 dark:text-slate-350 font-semibold leading-relaxed list-none pl-0">
              {activeFile.data.changelog.map((item, idx) => (
                <li key={idx} className="flex gap-2.5 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-550 dark:bg-sky-400 mt-1.5 shrink-0 animate-pulse"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800/60 text-[9px] text-slate-400 dark:text-slate-500 font-sans italic font-bold">
            *Recruiter Note: Parixit built this modular update system using unified client-side state hooks to bridge classic and developer workspace layouts.
          </div>
        </div>
      )}

      {activeFile.previewType === "blog" && (
        <div className="bg-white dark:bg-[#0c111d]/85 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-xl space-y-4 transition-colors duration-300 select-text">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 border-b border-slate-200 dark:border-slate-800/60 pb-4">
            <div>
              <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/25 text-sky-600 dark:text-sky-400 text-[10px] font-black uppercase tracking-wider font-heading">
                {activeFile.data.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-3 font-heading leading-tight">
                {activeFile.data.title}
              </h2>
            </div>
            <div className="text-right shrink-0">
              <div className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1.5 justify-end">
                <Calendar size={12} className="text-sky-500" />
                {activeFile.data.date}
              </div>
              <div className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1.5 justify-end mt-1">
                <Clock size={12} className="text-indigo-500" />
                {activeFile.data.readTime}
              </div>
            </div>
          </div>

          <div className="pt-2">
            <article className="prose prose-sky dark:prose-invert max-w-none text-slate-700 dark:text-slate-350 font-sans leading-relaxed text-justify">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {activeFile.content}
              </ReactMarkdown>
            </article>
          </div>
        </div>
      )}
    </div>
  );
};
