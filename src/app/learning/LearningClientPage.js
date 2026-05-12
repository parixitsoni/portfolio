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
    const payload = { ...newItem, companies: typeof newItem.companies === 'string' ? newItem.companies.split(",").map(c => c.trim()).filter(c => c) : [] };
    try {
      const res = await fetch("/api/learning", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (res.ok) { 
        setData(await res.json()); 
        setShowAddModal(false); 
        setNewItem({ question: "", theory: "", companies: "", category: "React", difficulty: "Medium" }); 
      }
    } catch (e) { console.error(e); } finally { setIsSaving(false); }
  };

  const filteredData = data.filter(item => {
    const s = searchTerm.toLowerCase();
    const matchesSearch = item.question.toLowerCase().includes(s) || item.theory.toLowerCase().includes(s) || (item.companies && item.companies.some(c => c.toLowerCase().includes(s)));
    return matchesSearch && (selectedCategory === "All" || item.category === selectedCategory) && (selectedDifficulty === "All" || item.difficulty === selectedDifficulty);
  });

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="p-4 md:p-12 bg-transparent relative z-10 pt-12 md:pt-20">
        <div className="max-w-4xl mx-auto">
          <SectionHeader badge="Private Knowledge Base" badgeIcon={Layers} title={<>Learning <span className="text-sky-600 dark:text-sky-400">Vault</span></>} subtitle="A private collection of technical theory and interview patterns." />
          <div className="space-y-6 mb-10 animate-fadeInUp delay-100">
            <LearningSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} showFilters={showFilters} setShowFilters={setShowFilters} setShowAddModal={setShowAddModal} />
            <LearningFilters showFilters={showFilters} setShowFilters={setShowFilters} categories={CATEGORIES} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} difficulties={DIFFICULTIES} selectedDifficulty={selectedDifficulty} setSelectedDifficulty={setSelectedDifficulty} />
          </div>
          <div className="space-y-1 animate-fadeInUp delay-200 min-h-[400px] mb-20">
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
