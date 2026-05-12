import React from "react";
import { personalData } from "../constants/personal-data";
import { Linkedin, ArrowUp, Github, Send } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-20 px-6 relative overflow-hidden border-t border-slate-100 dark:border-white/5 bg-transparent">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white tracking-tight">
            Let's build something <span className="text-sky-600 dark:text-sky-400">extraordinary.</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
            I'm currently open to new opportunities and interesting projects. 
          </p>
          
          <a 
            href={`mailto:${personalData.email}`}
            className="inline-flex items-center gap-3 px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-2xl hover:scale-105 transition-all shadow-xl shadow-black/10 dark:shadow-white/5"
          >
            <Send size={20} />
            Send an Email
          </a>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-slate-100 dark:border-white/5">
          <p className="text-slate-600 dark:text-slate-400 text-[10px] font-bold tracking-widest uppercase">
            © {currentYear} {personalData.name}
          </p>

          <div className="flex items-center gap-8 text-slate-400">
            <a href={personalData.socials.linkedin} className="hover:text-sky-600 transition-colors">
              <Linkedin size={18} />
            </a>
            <a href={personalData.socials.github} className="hover:text-slate-900 dark:hover:text-white transition-colors">
              <Github size={18} />
            </a>
            <div className="w-px h-4 bg-slate-200 dark:bg-white/10 mx-2"></div>
            <a href="#home" className="flex items-center gap-2 hover:text-sky-600 transition-colors">
              <span className="text-[10px] font-bold uppercase tracking-widest">Back to Top</span>
              <ArrowUp size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
