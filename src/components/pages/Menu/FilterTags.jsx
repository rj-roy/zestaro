'use client';

import { Utensils, Leaf, WheatOff, Flame } from 'lucide-react';

const filters = [
  { id: 'vegetarian', label: 'Vegetarian', icon: Leaf },
  { id: 'vegan', label: 'Vegan', icon: Leaf },
  { id: 'gluten-free', label: 'Gluten-Free', icon: WheatOff },
  { id: 'spicy', label: 'Spicy', icon: Flame },
];

export default function FilterTags({ selectedFilters, onFilterChange }) {
  const toggleFilter = (filterId) => {
    if (selectedFilters.includes(filterId)) {
      onFilterChange(selectedFilters.filter((f) => f !== filterId));
    } else {
      onFilterChange([...selectedFilters, filterId]);
    }
  };

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {filters.map((filter) => {
        const Icon = filter.icon;
        const isSelected = selectedFilters.includes(filter.id);
        
        return (
          <button
            key={filter.id}
            onClick={() => toggleFilter(filter.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              isSelected
                ? 'bg-primary text-tertiary shadow-md'
                : 'bg-white dark:bg-neutral/20 text-secondary dark:text-tertiary border border-neutral/20 hover:border-primary'
            }`}
          >
            <Icon className="w-4 h-4" />
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}