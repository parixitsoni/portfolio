import React from 'react';

const variants = {
  sky: 'bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 border-sky-100 dark:border-sky-500/20',
  slate: 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10',
  red: 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-100 dark:border-red-500/20',
  green: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20'
};

export const Badge = ({ 
  variant = 'sky', 
  className = '', 
  children,
  icon: Icon,
  ...props 
}) => {
  const variantClass = variants[variant] || variants.sky;
  
  return (
    <span 
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${variantClass} ${className}`}
      {...props}
    >
      {Icon && <Icon size={12} />}
      {children}
    </span>
  );
};
