import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Modal } from "../UI/Modal";
import { Input } from "../UI/Input";
import { Button } from "../UI/Button";
import { Typography } from "../UI/Typography";

const CATEGORIES = ["React", "Next.js", "CSS", "Coding", "JavaScript", "System Design"];
const DIFFICULTIES = ["Easy", "Medium", "Hard", "Expert"];

export const AddEntryModal = ({ show, onClose, newItem, setNewItem, onAdd, isSaving }) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!newItem.question.trim()) newErrors.question = "Question is required";
    if (!newItem.theory.trim()) newErrors.theory = "Theory/Explanation is required";
    if (!newItem.category) newErrors.category = "Category is required";
    if (!newItem.difficulty) newErrors.difficulty = "Difficulty is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await onAdd(e);
        setErrors({});
      } catch (err) {
        console.error("Submit Error:", err);
      }
    }
  };

  return (
    <Modal isOpen={show} onClose={onClose} title="Add New Entry">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input 
          label="Question"
          required
          placeholder="e.g., What is closure in JS?"
          value={newItem.question}
          error={errors.question}
          onChange={(e) => setNewItem({...newItem, question: e.target.value})}
        />

        <Input 
          label="Theory (Markdown Supported)"
          required
          multiline
          rows={5}
          placeholder="Enter detailed explanation..."
          value={newItem.theory}
          error={errors.theory}
          onChange={(e) => setNewItem({...newItem, theory: e.target.value})}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-3 px-1">
              Category <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setNewItem({...newItem, category: cat})}
                  className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition-all ${
                    newItem.category === cat 
                      ? 'bg-sky-500 border-sky-500 text-white shadow-lg shadow-sky-500/20' 
                      : 'bg-transparent border-slate-200 dark:border-white/10 text-slate-500 hover:border-sky-500/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            {errors.category && (
              <Typography variant="error" className="mt-2 px-1">{errors.category}</Typography>
            )}
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-3 px-1">
              Difficulty <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {DIFFICULTIES.map(level => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setNewItem({...newItem, difficulty: level})}
                  className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition-all ${
                    newItem.difficulty === level 
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white' 
                      : 'bg-transparent border-slate-200 dark:border-white/10 text-slate-500 hover:border-slate-900/50 dark:hover:border-white/50'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
            {errors.difficulty && (
              <Typography variant="error" className="mt-2 px-1">{errors.difficulty}</Typography>
            )}
          </div>
        </div>

        <Input 
          label="Companies (comma separated)"
          placeholder="e.g., Google, Amazon, Microsoft"
          value={newItem.companies}
          onChange={(e) => setNewItem({...newItem, companies: e.target.value})}
        />

        <div className="pt-2 space-y-4">
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-bold leading-relaxed">
            ⚠️ NOTICE: Saving entries is only supported in the local development environment. 
            Once you add a question locally, push it to GitHub to update the live site.
          </div>
          <Button 
            type="submit" 
            variant="primary"
            size="xl"
            className="w-full"
            icon={PlusCircle}
            disabled={isSaving || process.env.NODE_ENV === 'production'}
          >
            {isSaving ? "Saving to Vault..." : process.env.NODE_ENV === 'production' ? "Save Disabled on Live Site" : "Save to Learning Vault"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
