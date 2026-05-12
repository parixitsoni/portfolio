import React from "react";
import { X, PlusCircle } from "lucide-react";

export const AddEntryModal = ({ show, onClose, newItem, setNewItem, onAdd }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/20 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-[3rem] p-10 shadow-2xl border border-slate-200 dark:border-white/10 animate-scaleIn">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Add Entry</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-all"><X size={24} /></button>
        </div>
        <form onSubmit={onAdd} className="space-y-6">
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2 px-1">Question</label>
            <input required type="text" className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-2xl focus:outline-none focus:border-sky-500 transition-all text-slate-900 dark:text-white" placeholder="e.g., What is closure?" value={newItem.question} onChange={(e) => setNewItem({...newItem, question: e.target.value})} />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2 px-1">Theory (Markdown Supported)</label>
            <textarea required rows="4" className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-2xl focus:outline-none focus:border-sky-500 transition-all text-slate-900 dark:text-white resize-none" placeholder="Enter detailed explanation..." value={newItem.theory} onChange={(e) => setNewItem({...newItem, theory: e.target.value})} />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2 px-1">Companies (comma separated)</label>
            <input type="text" className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-2xl focus:outline-none focus:border-sky-500 transition-all text-slate-900 dark:text-white" placeholder="e.g., Google, Amazon" value={newItem.companies} onChange={(e) => setNewItem({...newItem, companies: e.target.value})} />
          </div>
          <button type="submit" className="w-full py-5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-sky-600/20 flex items-center justify-center gap-2">
            <PlusCircle size={20} />Save to Vault
          </button>
        </form>
      </div>
    </div>
  );
};
