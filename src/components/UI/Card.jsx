import React from 'react';

export const Card = ({ 
  className = '', 
  children, 
  hover = false,
  ...props 
}) => {
  return (
    <div 
      className={`bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-[2rem] p-6 transition-all ${hover ? 'hover:border-sky-500/50 hover:shadow-2xl hover:shadow-sky-500/5 hover:-translate-y-1' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
