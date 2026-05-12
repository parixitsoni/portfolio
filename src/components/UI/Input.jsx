import React from 'react';
import { AlertCircle } from 'lucide-react';

export const Input = ({ 
  label, 
  error, 
  className = '', 
  containerClassName = '',
  multiline = false,
  ...props 
}) => {
  const Component = multiline ? 'textarea' : 'input';
  
  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2 px-1">
          {label} {props.required && <span className="text-red-500">*</span>}
        </label>
      )}
      <Component 
        className={`w-full px-6 py-4 bg-slate-50 dark:bg-slate-950/50 border ${error ? 'border-red-500/50' : 'border-slate-200 dark:border-white/10'} rounded-2xl focus:outline-none focus:border-sky-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 ${multiline ? 'resize-none' : ''} ${className}`} 
        {...props}
      />
      {error && (
        <div className="flex items-center gap-1 mt-2 text-red-500 text-[10px] font-bold uppercase tracking-wider px-1">
          <AlertCircle size={12} /> {error}
        </div>
      )}
    </div>
  );
};
