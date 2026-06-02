"use client";
import React, { useState, useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { Layers } from "lucide-react";
import { LearningItem } from "../../components/Learning/LearningItem";
import { AddEntryModal } from "../../components/Learning/AddEntryModal";
import { Typography } from "../../components/UI/Typography";
import { SectionHeader } from "../../components/UI/SectionHeader";
import { LearningSearch } from "../../components/Learning/LearningSearch";
import { LearningFilters } from "../../components/Learning/LearningFilters";


const CATEGORIES = ["All", "React", "Next.js", "CSS", "Coding", "JavaScript", "System Design"];
const DIFFICULTIES = ["All", "Easy", "Medium", "Hard", "Expert"];

export default function LearningClientPage({ initialData }) {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [expandedId, setExpandedId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [newItem, setNewItem] = useState({ question: "", theory: "", companies: "", category: "React", difficulty: "Medium" });

  // Persistence for live site
  useEffect(() => {
    const localEntries = localStorage.getItem('learning_vault_entries');
    if (localEntries) {
      try {
        const parsed = JSON.parse(localEntries);
        // Merge initial server data with local entries, avoiding duplicates
        const merged = [...initialData];
        parsed.forEach(local => {
          if (!merged.find(m => m.id === local.id)) {
            merged.unshift(local);
          }
        });
        setData(merged);
      } catch (e) {
        console.error("Failed to load local entries", e);
      }
    }
  }, [initialData]);

  const handleAdd = async (e) => {
    if (e) e.preventDefault();
    if (isSaving) return;
    setIsSaving(true);
    
    const payload = { 
      ...newItem, 
      id: `local-${Date.now()}`, 
      companies: typeof newItem.companies === 'string' ? newItem.companies.split(",").map(c => c.trim()).filter(c => c) : [],
      isLocal: true // Tag as local-only
    };

    // If on a static build or custom production site, don't ping non-existent server route
    const isStaticProduction = typeof window !== "undefined" && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1";

    if (isStaticProduction) {
      // Direct local storage save for production static sites to avoid console errors
      const updatedLocal = [payload, ...data];
      setData(updatedLocal);
      const existingLocal = JSON.parse(localStorage.getItem('learning_vault_entries') || '[]');
      localStorage.setItem('learning_vault_entries', JSON.stringify([payload, ...existingLocal]));
      setShowAddModal(false);
      setNewItem({ question: "", theory: "", companies: "", category: "React", difficulty: "Medium" });
      setIsSaving(false);
      return;
    }

    try {
      const res = await fetch("/api/learning", { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(payload) 
      });
      
      if (res.ok) { 
        const updatedData = await res.json();
        setData(updatedData); 
      } else {
        // Fallback for static hosting (GitHub Pages/Vercel Export)
        const updatedLocal = [payload, ...data];
        setData(updatedLocal);
        
        // Persist to localStorage
        const existingLocal = JSON.parse(localStorage.getItem('learning_vault_entries') || '[]');
        localStorage.setItem('learning_vault_entries', JSON.stringify([payload, ...existingLocal]));
      }
      
      setShowAddModal(false); 
      setNewItem({ question: "", theory: "", companies: "", category: "React", difficulty: "Medium" }); 
    } catch (e) { 
      console.error("Local save fallback:", e); 
      const updatedLocal = [payload, ...data];
      setData(updatedLocal);
      const existingLocal = JSON.parse(localStorage.getItem('learning_vault_entries') || '[]');
      localStorage.setItem('learning_vault_entries', JSON.stringify([payload, ...existingLocal]));
      setShowAddModal(false);
      setNewItem({ question: "", theory: "", companies: "", category: "React", difficulty: "Medium" }); 
    } finally { 
      setIsSaving(false); 
    }
  };

  const filteredData = data.filter(item => {
    const s = searchTerm.toLowerCase();
    const matchesSearch = item.question.toLowerCase().includes(s) || item.theory.toLowerCase().includes(s) || (item.companies && item.companies.some(c => c.toLowerCase().includes(s)));
    return matchesSearch && (selectedCategory === "All" || item.category === selectedCategory) && (selectedDifficulty === "All" || item.difficulty === selectedDifficulty);
  });

  return (
    <div className="relative min-h-screen selection:bg-sky-100 dark:selection:bg-sky-900/30">
      <Navbar />
      
      {/* Immersive Header */}
      <header className="pt-16 md:pt-24 pb-8 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionHeader 
            badge="Technical Arsenal" 
            badgeIcon={Layers} 
            title={<>Learning <span className="text-sky-600 dark:text-sky-400">Vault</span></>} 
            subtitle="A private repository of architectural patterns and implementation strategies." 
          />
        </div>
      </header>

      {/* Sticky Filter Bar */}
      <div className="sticky top-[80px] z-40 px-2 md:px-4 mb-10">
        <div className="max-w-4xl mx-auto glass-effect-premium p-2 md:p-4 rounded-[2rem] md:rounded-[2.5rem] border border-slate-200/60 dark:border-white/10 shadow-2xl backdrop-blur-3xl">
          <div className="space-y-4">
            <LearningSearch 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
              showFilters={showFilters} 
              setShowFilters={setShowFilters} 
              setShowAddModal={setShowAddModal} 
            />
            <LearningFilters 
              showFilters={showFilters} 
              setShowFilters={setShowFilters} 
              categories={CATEGORIES} 
              selectedCategory={selectedCategory} 
              setSelectedCategory={setSelectedCategory} 
              difficulties={DIFFICULTIES} 
              selectedDifficulty={selectedDifficulty} 
              setSelectedDifficulty={setSelectedDifficulty} 
            />
          </div>
        </div>
      </div>

      <main className="px-4 pb-24 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-1 animate-fadeInUp delay-200 min-h-[400px]">
            {filteredData.length > 0 ? filteredData.map(item => (
              <LearningItem key={item.id} item={item} isExpanded={expandedId === item.id} onToggle={() => setExpandedId(expandedId === item.id ? null : item.id)} />
            )) : <div className="text-center py-20 bg-slate-50 dark:bg-white/5 rounded-3xl"><Typography color="secondary" font="medium">No entries found matching your criteria.</Typography></div>}
          </div>
        </div>
      </main>
      <AddEntryModal show={showAddModal} onClose={() => setShowAddModal(false)} newItem={newItem} setNewItem={setNewItem} onAdd={handleAdd} isSaving={isSaving} />
    </div>
  );
}
