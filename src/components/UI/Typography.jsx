import React from 'react';

const variants = {
  h1: 'text-3xl md:text-5xl font-black tracking-tight',
  h2: 'text-2xl md:text-3xl font-bold tracking-tight',
  h3: 'text-xl md:text-2xl font-bold tracking-tight',
  h4: 'text-lg font-bold',
  body1: 'text-base md:text-lg font-medium',
  body2: 'text-sm md:text-base',
  caption: 'text-[10px] font-black uppercase tracking-widest',
  error: 'text-[10px] font-bold uppercase tracking-wider text-red-500'
};

const colors = {
  primary: 'text-slate-900 dark:text-white',
  secondary: 'text-slate-600 dark:text-slate-400',
  sky: 'text-sky-600 dark:text-sky-400',
  slate: 'text-slate-500',
  red: 'text-red-500'
};

export const Typography = ({ 
  variant = 'body2', 
  color = 'primary', 
  className = '', 
  children,
  component: Component = 'p',
  ...props 
}) => {
  const variantClass = variants[variant] || variants.body2;
  const colorClass = colors[color] || '';
  
  return (
    <Component 
      className={`${variantClass} ${colorClass} ${className}`} 
      {...props}
    >
      {children}
    </Component>
  );
};
