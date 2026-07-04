'use client';

import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full lg:w-80">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral" />
      <input
        type="text"
        placeholder="Search for dishes..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3 rounded-full bg-white dark:bg-neutral/20 border border-neutral/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-secondary dark:text-tertiary placeholder-neutral"
      />
    </div>
  );
}