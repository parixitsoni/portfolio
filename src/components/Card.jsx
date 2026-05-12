import React from "react";

export const Card = ({ children, className = "", hover = true }) => {
  const baseClasses = `
    glass-effect
    rounded-xl p-6
    transition-all duration-300
    ${hover ? "hover:glass-effect-strong hover:shadow-lg" : ""}
  `;

  return <div className={`${baseClasses} ${className}`}>{children}</div>;
};

export const GlassButton = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`
        glass-effect
        px-6 py-3 rounded-xl font-medium
        text-slate-100
        hover:glass-effect-strong hover:shadow-lg
        transition-all duration-300
        transform hover:scale-105
        ${className}
      `}
    >
      {children}
    </button>
  );
};
