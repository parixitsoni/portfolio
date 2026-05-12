import React from 'react';

const variants = {
  primary: 'bg-sky-600 hover:bg-sky-500 text-white shadow-lg shadow-sky-600/20',
  secondary: 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-xl',
  outline: 'border border-slate-200 dark:border-white/10 hover:border-sky-500 dark:hover:border-sky-500 text-slate-900 dark:text-white bg-transparent',
  ghost: 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 hover:text-slate-900 dark:hover:text-white'
};

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
  xl: 'px-10 py-5 text-lg',
  icon: 'p-2'
};

export const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  icon: Icon,
  iconPosition = 'left',
  ...props 
}) => {
  const variantClass = variants[variant] || variants.primary;
  const sizeClass = sizes[size] || sizes.md;
  
  return (
    <button 
      className={`inline-flex items-center justify-center gap-2 font-bold rounded-2xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 14 : 20} />}
      {children}
      {Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 14 : 20} />}
    </button>
  );
};
