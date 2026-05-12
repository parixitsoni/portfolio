"use client";
import React, { useState, useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { Search, Plus, Layers } from "lucide-react";
import { LearningItem } from "../../components/Learning/LearningItem";
import { AddEntryModal } from "../../components/Learning/AddEntryModal";

export default function LearningPage() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState({ question: "", theory: "", companies: "", category: "React" });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/learning");
      const json = await res.json();
      setData(Array.isArray(json) ? json : []);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const payload = { ...newItem, companies: newItem.companies.split(",").map(c => c.trim()).filter(c => c) };
    try {
      const res = await fetch("/api/learning", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (res.ok) {
        setData(await res.json());
        setShowAddModal(false);
        setNewItem({ question: "", theory: "", companies: "", category: "React" });
      }
    } catch (e) { console.error(e); }
  };

  const filteredData = data.filter(item => 
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.theory.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.companies && item.companies.some(c => c.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  return (
    <>
      <Navbar />
      <main className="flex-1 overflow-y-auto p-6 md:p-12 bg-white dark:bg-slate-950 scroll-smooth custom-scrollbar relative">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12 animate-fadeInUp">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 text-[10px] font-bold uppercase tracking-widest mb-6 border border-sky-100 dark:border-sky-500/20"><Layers size={12} />Private Knowledge Base</div>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">Learning <span className="text-sky-600 dark:text-sky-400">Vault</span></h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">A private collection of technical theory and interview patterns for reference.</p>
          </header>
          <div className="flex gap-4 mb-12 animate-fadeInUp delay-100">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors" size={20} />
              <input type="text" placeholder="Search questions..." className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-3xl focus:outline-none focus:border-sky-500 text-slate-900 dark:text-white" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <button onClick={() => setShowAddModal(true)} className="p-4 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-3xl transition-all shadow-xl"><Plus size={24} /></button>
          </div>
          <div className="space-y-6 animate-fadeInUp delay-200">
            {loading ? <div className="text-center py-20 animate-spin w-10 h-10 border-4 border-sky-500/30 border-t-sky-500 rounded-full mx-auto" /> : 
              filteredData.map(item => <LearningItem key={item.id} item={item} isExpanded={expandedId === item.id} onToggle={() => setExpandedId(expandedId === item.id ? null : item.id)} />)
            }
          </div>
        </div>
        <AddEntryModal show={showAddModal} onClose={() => setShowAddModal(false)} newItem={newItem} setNewItem={setNewItem} onAdd={handleAdd} />
      </main>
    </>
  );
}
