import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

export const Modal = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Close on click outside
  const handleBackdropClick = (e) => {
    // Only close if the click was directly on the background overlay
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed top-0 left-0 w-full h-full z-[1000] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fadeIn"
      onMouseDown={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        className="bg-white dark:bg-slate-900 w-full max-w-xl max-h-[85vh] rounded-[3rem] shadow-2xl border border-slate-200 dark:border-white/10 animate-scaleIn relative flex flex-col overflow-hidden"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Background Blobs for Aesthetic */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header - Fixed */}
        <div className="flex justify-between items-center p-8 md:p-10 pb-0 relative z-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{title}</h2>
            <div className="h-1 w-12 bg-sky-500 rounded-full mt-1"></div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-all text-slate-500 hover:text-slate-900 dark:hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="p-8 md:p-10 pt-6 relative z-10 overflow-y-auto flex-1 custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};
