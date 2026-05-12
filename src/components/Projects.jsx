import React from "react";
import { ExternalLink, Github, Layout, Smartphone, Zap } from "lucide-react";

const projects = [
  {
    title: "ChildMatch & ParentFinder",
    category: "Web Application",
    description: "Architected 4 production apps using React.js and Next.js with SSR/SSG patterns for healthcare domain.",
    tech: ["Next.js", "Material UI", "Redux"],
    github: "#",
    demo: "#",
    featured: true,
    color: "bg-sky-50/50 dark:bg-sky-900/10",
    icon: <Layout className="text-sky-600 dark:text-sky-400" />
  },
  {
    title: "Task Management System",
    category: "Productivity",
    description: "A Jira-style task manager with real-time updates, drag-and-drop boards, and role-based views.",
    tech: ["React", "GraphQL", "Zustand"],
    github: "#",
    demo: "#",
    featured: false,
    color: "bg-indigo-50/50 dark:bg-indigo-900/10",
    icon: <Zap className="text-indigo-600 dark:text-indigo-400" />
  },
  {
    title: "Pointli Visualization",
    category: "Data Viz",
    description: "Interactive geo-fencing and attendance visualization module using Google Maps API.",
    tech: ["React", "Google Maps API", "SCSS"],
    github: "#",
    demo: "#",
    featured: false,
    color: "bg-emerald-50/50 dark:bg-emerald-900/10",
    icon: <Smartphone className="text-emerald-600" />
  }
];

export const Projects = () => {
  return (
    <section id="projects" className="py-24 px-6 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div>
            <h2 className="text-4xl md:text-7xl font-bold mb-4 text-slate-900 dark:text-white tracking-tight">
              Featured <span className="text-sky-600 dark:text-sky-400">Work</span>
            </h2>
            <p className="text-slate-700 dark:text-slate-400 text-lg max-w-xl font-medium">
              A selection of projects where I've led architecture, 
              optimized performance, and delivered pixel-perfect UIs.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className={`group relative overflow-hidden glass-effect-premium p-8 rounded-[3rem] transition-all duration-500 flex flex-col border border-slate-200 dark:border-white/5 ${project.featured ? 'md:col-span-2' : ''}`}
            >
              <div className={`absolute inset-0 ${project.color} opacity-30 dark:opacity-5 group-hover:opacity-60 dark:group-hover:opacity-10 transition-opacity duration-500`}></div>

              <div className="relative z-10 flex-1">
                <div className="flex justify-between items-start mb-8">
                  <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-white/10 group-hover:scale-110 transition-transform">
                    {project.icon}
                  </div>
                  <div className="flex gap-3">
                    <a href={project.github} className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"><Github size={20} /></a>
                    <a href={project.demo} className="p-2 text-slate-400 dark:text-slate-500 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"><ExternalLink size={20} /></a>
                  </div>
                </div>

                <div className="mb-8">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400 mb-2 block">
                    {project.category}
                  </span>
                  <h3 className={`font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors mb-4 ${project.featured ? 'text-4xl' : 'text-2xl'}`}>
                    {project.title}
                  </h3>
                  <p className="text-slate-700 dark:text-slate-400 text-sm leading-relaxed max-w-md font-medium">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((t) => (
                    <span key={t} className="text-[10px] font-bold px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-white/5 text-slate-600 dark:text-slate-300 shadow-sm">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
