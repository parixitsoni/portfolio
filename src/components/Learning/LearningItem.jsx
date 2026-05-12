import React from "react";
import { Book, ChevronDown, Layers, Building2, Briefcase } from "lucide-react";
import ReactMarkdown from 'react-markdown';

export const LearningItem = ({ item, isExpanded, onToggle }) => (
  <div className={`glass-effect-premium rounded-[2.5rem] border transition-all duration-500 overflow-hidden ${isExpanded ? "border-sky-500/30 ring-4 ring-sky-500/5" : "border-slate-200 dark:border-white/5 hover:border-sky-500/20"}`}>
    <div className="p-8 cursor-pointer flex items-start justify-between group" onClick={onToggle}>
      <div className="flex items-start gap-6">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${isExpanded ? "bg-sky-600 text-white shadow-lg shadow-sky-500/20" : "bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 group-hover:bg-sky-50 dark:group-hover:bg-sky-900/20 group-hover:text-sky-600 dark:group-hover:text-sky-400"}`}>
          <Book size={24} />
        </div>
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 text-[10px] font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest border border-slate-200 dark:border-white/5">{item.category}</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-snug">{item.question}</h3>
        </div>
      </div>
      <div className={`mt-4 p-2 rounded-full transition-transform duration-500 ${isExpanded ? "rotate-180 bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400" : "text-slate-400"}`}>
        <ChevronDown size={20} />
      </div>
    </div>
    {isExpanded && (
      <div className="px-8 pb-8 animate-fadeInUp">
        <div className="pt-8 border-t border-slate-100 dark:border-white/5 space-y-8">
          <div>
            <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-bold uppercase tracking-widest text-[10px] mb-4"><Layers size={14} />Conceptual Theory</div>
            <div className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium bg-slate-50 dark:bg-white/[0.02] p-8 rounded-[2rem] border border-slate-100 dark:border-white/5 prose dark:prose-invert prose-slate max-w-none prose-sm md:prose-base prose-headings:text-sky-600 dark:prose-headings:text-sky-400 prose-code:text-sky-600 dark:prose-code:text-sky-400 prose-pre:bg-slate-900 dark:prose-pre:bg-black/40 prose-pre:rounded-2xl prose-a:text-sky-500">
              <ReactMarkdown>{item.theory}</ReactMarkdown>
            </div>
          </div>
          {item.companies?.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-bold uppercase tracking-widest text-[10px] mb-4"><Building2 size={14} />Organization Patterns</div>
              <div className="flex flex-wrap gap-2">
                {item.companies.map(company => (
                  <span key={company} className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2 shadow-sm">
                    <Briefcase size={14} className="text-slate-400" />{company}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )}
  </div>
);
