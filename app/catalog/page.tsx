'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Car, Settings, AlertCircle, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';
import { fetchParts } from '@/lib/api';
import { PartFilters } from '@/types';
import CatalogGrid from '@/components/catalog/CatalogGrid';
import SearchFilters from '@/components/dashboard/SearchFilters';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import EmptyState from '@/components/ui/EmptyState';

export default function CatalogPage() {
  const [filters, setFilters] = useState<PartFilters>({
    search: '',
    category: '',
    make: '',
    model: '',
    year: '',
  });

  const { data: parts, isLoading, isError } = useQuery({
    queryKey: ['parts', filters],
    queryFn: () => fetchParts(filters),
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm px-6 py-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-14">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <div className="bg-blue-600 rounded-lg p-1.5 shadow">
                <Car className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-gray-900 text-sm">AutoParts Pro</span>
            </Link>
            <div className="h-5 w-px bg-gray-200" />
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-sm font-semibold text-blue-600">Customer Catalog</span>
            </div>
          </div>
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 font-medium px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Settings className="w-4 h-4" />
            Staff Dashboard
          </Link>
        </div>
      </nav>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white px-6 py-14">
        <div className="max-w-7xl mx-auto">
          <p className="text-blue-200 text-xs font-semibold uppercase tracking-widest mb-2">Browse & Discover</p>
          <h1 className="text-4xl font-extrabold mb-2 tracking-tight">Parts Catalog</h1>
          <p className="text-blue-100/80 text-base max-w-xl">
            Browse our complete inventory of genuine and aftermarket car spare parts. Find the right part for your vehicle.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <SearchFilters filters={filters} onChange={setFilters} />

        {/* Results meta */}
        <div className="flex items-center justify-between mt-5 mb-4">
          {parts ? (
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-gray-400" />
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-700">{parts.length}</span>{' '}
                part{parts.length !== 1 ? 's' : ''} found
              </p>
            </div>
          ) : (
            <div />
          )}
        </div>

        {/* Content */}
        <div>
          {isLoading ? (
            <div className="flex items-center justify-center py-28">
              <LoadingSpinner />
            </div>
          ) : isError ? (
            <div className="card p-16 flex flex-col items-center justify-center gap-3 text-center">
              <div className="bg-red-100 rounded-full p-3">
                <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <p className="text-red-600 font-semibold">Failed to load parts</p>
                <p className="text-gray-500 text-sm mt-1">Please try refreshing the page.</p>
              </div>
            </div>
          ) : parts && parts.length === 0 ? (
            <EmptyState
              title="No parts found"
              description="Try adjusting your search or filters to find what you're looking for."
            />
          ) : (
            <CatalogGrid parts={parts || []} />
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 px-6 py-6 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 rounded-lg p-1">
              <Car className="w-3 h-3 text-white" />
            </div>
            <span className="text-gray-500 text-sm font-medium">AutoParts Pro</span>
          </div>
          <p className="text-gray-400 text-xs">© {new Date().getFullYear()} AutoParts Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
