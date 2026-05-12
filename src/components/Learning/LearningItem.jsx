import React from "react";
import { Book, ChevronDown, Layers, Building2, Briefcase, Zap } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card } from "../UI/Card";
import { Badge } from "../UI/Badge";
import { Typography } from "../UI/Typography";

const difficultyColors = {
  Easy: "green",
  Medium: "sky",
  Hard: "red",
  Expert: "red"
};

export const LearningItem = ({ item, isExpanded, onToggle }) => (
  <div className={`transition-all duration-500 ${isExpanded ? "py-8 md:py-12 border-y border-slate-100 dark:border-white/5 bg-white/40 dark:bg-slate-900/40" : "border-b border-slate-50 dark:border-white/5 last:border-0"}`}>
    <div 
      className={`px-4 md:px-6 cursor-pointer flex items-start gap-4 group transition-all ${isExpanded ? "mb-10" : "py-6 hover:bg-sky-500/[0.02]"}`}
      onClick={onToggle}
    >
      <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs transition-colors ${isExpanded ? "bg-sky-600 text-white" : "bg-slate-100 dark:bg-white/5 text-sky-600"}`}>
        Q.
      </div>
      
      <div className="flex-1 min-w-0">
        {!isExpanded && (
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 text-[8px] font-black uppercase tracking-widest text-slate-500">{item.category}</span>
          </div>
        )}
        <Typography variant="h4" className={`transition-all ${isExpanded ? "text-3xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.95]" : "text-lg md:text-xl font-bold text-slate-700 dark:text-slate-300 group-hover:text-sky-600 dark:group-hover:text-sky-400"}`}>
          {item.question}
        </Typography>
      </div>

      <div className={`mt-1.5 p-1 rounded-full transition-all duration-500 ${isExpanded ? "rotate-180 bg-sky-100 dark:bg-sky-900/30 text-sky-600" : "text-slate-300"}`}>
        <ChevronDown size={18} />
      </div>
    </div>
    
    {isExpanded && (
      <div className="px-4 md:px-12 animate-fadeInUp">
        <div className="space-y-12">
          {/* Metadata Bar */}
          <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-slate-100 dark:border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-sky-50 dark:bg-sky-900/30 flex items-center justify-center text-sky-600">
                <Layers size={14} />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Category</p>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{item.category}</p>
              </div>
            </div>
            {item.difficulty && (
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${difficultyColors[item.difficulty] === "red" ? "bg-red-50 text-red-500" : "bg-amber-50 text-amber-500"}`}>
                  <Zap size={14} />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Difficulty</p>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{item.difficulty}</p>
                </div>
              </div>
            )}
          </div>

          <div className="max-w-none">
            <div className="text-slate-800 dark:text-slate-200 leading-relaxed text-lg md:text-xl prose dark:prose-invert prose-slate max-w-full 
              prose-pre:bg-slate-950 prose-pre:p-4 prose-pre:rounded-2xl prose-pre:border prose-pre:border-white/10 prose-pre:overflow-x-auto
              prose-code:text-sky-600 dark:prose-code:text-sky-400 prose-code:bg-sky-500/5 prose-code:px-1.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
              prose-table:block prose-table:overflow-x-auto prose-table:border prose-table:border-slate-100 dark:prose-table:border-white/5 prose-table:rounded-2xl
              prose-th:bg-slate-50 dark:prose-th:bg-white/5 prose-th:p-4 prose-th:text-sky-600 dark:prose-th:text-sky-400
              prose-td:p-4 prose-td:border-t prose-td:border-slate-100 dark:prose-td:border-white/5">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{item.theory}</ReactMarkdown>
            </div>
          </div>
          
          {item.companies?.length > 0 && (
            <div className="pt-8 border-t border-slate-100 dark:border-white/5">
              <Typography variant="caption" color="sky" className="flex items-center gap-2 mb-4">
                <Building2 size={14} /> Organization Context
              </Typography>
              <div className="flex flex-wrap gap-3">
                {item.companies.map(company => (
                  <span key={company} className="px-4 py-2 text-xs font-bold bg-white dark:bg-white/5 text-slate-600 dark:text-slate-400 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
                    {company}
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
