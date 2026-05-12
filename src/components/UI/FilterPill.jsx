import React from 'react';

export const FilterPill = ({ 
  label, 
  isActive, 
  onClick, 
  variant = 'sky' 
}) => {
  const activeClasses = {
    sky: 'bg-sky-500 border-sky-500 text-white shadow-lg shadow-sky-500/20',
    dark: 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white'
  };
  
  const inactiveClasses = 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-500 hover:border-slate-400 dark:hover:border-slate-500';

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-2xl text-[10px] font-bold uppercase tracking-wider border transition-all whitespace-nowrap ${
        isActive ? activeClasses[variant] : inactiveClasses
      }`}
    >
      {label}
    </button>
  );
};
