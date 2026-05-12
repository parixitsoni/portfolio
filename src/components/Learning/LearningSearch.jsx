import React from 'react';
import { Search, Filter, Plus, Moon, Sun } from 'lucide-react';
import { Input } from '../UI/Input';
import { Button } from '../UI/Button';
import { useTheme } from '../../hooks/useTheme';

export const LearningSearch = ({ 
  searchTerm, 
  setSearchTerm, 
  showFilters, 
  setShowFilters, 
  setShowAddModal 
}) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="flex gap-3 md:gap-4">
      <div className="relative flex-1 group">
        <Input 
          placeholder="Search vault..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 md:pl-14 py-3 md:py-4 !rounded-2xl md:!rounded-3xl"
          containerClassName="mb-0"
        />
        <Search className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors" size={18} />
      </div>
      <div className="flex gap-2">
        <Button 
          onClick={() => setShowFilters(!showFilters)} 
          variant={showFilters ? "primary" : "outline"}
          size="icon"
          className="w-12 h-12 md:w-14 md:h-14 rounded-2xl md:rounded-3xl flex-shrink-0 border-2 transition-all duration-300"
        >
          <Filter size={20} className={showFilters ? "scale-110" : ""} />
        </Button>
        <Button 
          onClick={() => setShowAddModal(true)} 
          variant="secondary"
          size="icon"
          className="w-12 h-12 md:w-14 md:h-14 rounded-2xl md:rounded-3xl flex-shrink-0"
        >
          <Plus size={24} />
        </Button>
      </div>
    </div>
  );
};
