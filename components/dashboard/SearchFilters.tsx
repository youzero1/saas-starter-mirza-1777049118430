'use client';

import { Search, X } from 'lucide-react';
import { PartFilters } from '@/types';

interface SearchFiltersProps {
  filters: PartFilters;
  onChange: (filters: PartFilters) => void;
}

export default function SearchFilters({ filters, onChange }: SearchFiltersProps) {
  const hasActiveFilters = Object.values(filters).some((v) => v !== '');

  const handleClear = () => {
    onChange({ search: '', category: '', make: '', model: '', year: '' });
  };

  return (
    <div className="card p-4 space-y-3">
      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, part number, or category..."
          value={filters.search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange({ ...filters, search: e.target.value })
          }
          className="input-field pl-10"
        />
      </div>

      {/* Filter row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <input
          type="text"
          placeholder="Category"
          value={filters.category}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange({ ...filters, category: e.target.value })
          }
          className="input-field"
        />
        <input
          type="text"
          placeholder="Car Make (e.g. Toyota)"
          value={filters.make}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange({ ...filters, make: e.target.value })
          }
          className="input-field"
        />
        <input
          type="text"
          placeholder="Car Model"
          value={filters.model}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange({ ...filters, model: e.target.value })
          }
          className="input-field"
        />
        <input
          type="text"
          placeholder="Year"
          value={filters.year}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange({ ...filters, year: e.target.value })
          }
          className="input-field"
        />
      </div>

      {hasActiveFilters && (
        <button
          onClick={handleClear}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
          Clear all filters
        </button>
      )}
    </div>
  );
}
