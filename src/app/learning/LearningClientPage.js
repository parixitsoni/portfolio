"use client";
import React, { useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Layers } from "lucide-react";
import { LearningItem } from "../../components/Learning/LearningItem";
import { AddEntryModal } from "../../components/Learning/AddEntryModal";
import { Typography } from "../../components/UI/Typography";
import { SectionHeader } from "../../components/UI/SectionHeader";
import { LearningSearch } from "../../components/Learning/LearningSearch";
import { LearningFilters } from "../../components/Learning/LearningFilters";
import { Card } from "../../components/UI/Card";

const CATEGORIES = ["All", "React", "Next.js", "CSS", "Coding", "JavaScript", "System Design"];
const DIFFICULTIES = ["All", "Easy", "Medium", "Hard", "Expert"];

export default function LearningClientPage({ initialData }) {
  const [data, setData] = useState(initialData || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [expandedId, setExpandedId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [newItem, setNewItem] = useState({ question: "", theory: "", companies: "", category: "React", difficulty: "Medium" });

  const handleAdd = async (e) => {
    if (e) e.preventDefault();
    if (isSaving) return;
    setIsSaving(true);
    
    const payload = { 
      ...newItem, 
      id: Date.now(), // Generate temporary ID for local view
      companies: typeof newItem.companies === 'string' ? newItem.companies.split(",").map(c => c.trim()).filter(c => c) : [] 
    };

    try {
      const res = await fetch("/api/learning", { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(payload) 
      });
      
      if (res.ok) { 
        setData(await res.json()); 
      } else {
        // Fallback for static hosting (GitHub Pages)
        // Add to local state so user sees it immediately
        setData(prev => [payload, ...prev]);
      }
      
      setShowAddModal(false); 
      setNewItem({ question: "", theory: "", companies: "", category: "React", difficulty: "Medium" }); 
    } catch (e) { 
      console.error(e); 
      // Even on network error, show it locally for UX
      setData(prev => [payload, ...prev]);
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
      <header className="pt-20 md:pt-32 pb-10 px-4">
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
      <div className="sticky top-[72px] z-40 px-4 mb-8">
        <div className="max-w-4xl mx-auto glass-effect-premium p-3 md:p-4 rounded-[2rem] md:rounded-[2.5rem] border border-slate-200/60 dark:border-white/10 shadow-2xl backdrop-blur-3xl">
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
