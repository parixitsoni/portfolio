import React from "react";
import { Typography } from "../UI/Typography";
import { FilterPill } from "../UI/FilterPill";
import { X } from "lucide-react";

export const LearningFilters = ({ 
  showFilters, 
  setShowFilters,
  categories, 
  selectedCategory, 
  setSelectedCategory,
  difficulties,
  selectedDifficulty,
  setSelectedDifficulty
}) => (
  <div className={`fixed inset-0 z-[110] transition-all duration-500 ${showFilters ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
    {/* Backdrop */}
    <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-md" onClick={() => setShowFilters(false)}></div>
    
    {/* Drawer */}
    <div className={`absolute bottom-0 left-0 right-0 md:relative md:inset-auto bg-white dark:bg-slate-900 rounded-t-[3rem] md:rounded-[2.5rem] p-8 md:p-8 border-t md:border border-slate-200 dark:border-white/10 shadow-2xl transition-transform duration-500 ${showFilters ? 'translate-y-0' : 'translate-y-full md:translate-y-0'}`}>
      <div className="flex items-center justify-between mb-8 md:hidden">
        <Typography variant="h3">Filters</Typography>
        <button onClick={() => setShowFilters(false)} className="p-3 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500">
          <X size={20} />
        </button>
      </div>

      <div className="space-y-10">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-6 bg-sky-500 rounded-full"></div>
            <Typography variant="caption" color="slate" className="font-black text-xs uppercase tracking-widest">Category</Typography>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map(cat => (
              <FilterPill 
                key={cat}
                label={cat}
                isActive={selectedCategory === cat}
                onClick={() => { setSelectedCategory(cat); if (window.innerWidth < 768) setShowFilters(false); }}
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-6 bg-amber-500 rounded-full"></div>
            <Typography variant="caption" color="slate" className="font-black text-xs uppercase tracking-widest">Difficulty</Typography>
          </div>
          <div className="flex flex-wrap gap-3">
            {difficulties.map(level => (
              <FilterPill 
                key={level}
                label={level}
                isActive={selectedDifficulty === level}
                onClick={() => { setSelectedDifficulty(level); if (window.innerWidth < 768) setShowFilters(false); }}
                variant="dark"
              />
            ))}
          </div>
        </div>
      </div>
      
      <button 
        onClick={() => setShowFilters(false)}
        className="w-full mt-10 py-4 bg-sky-600 text-white font-bold rounded-2xl md:hidden shadow-lg shadow-sky-500/20"
      >
        Apply Filters
      </button>
    </div>
  </div>
);
