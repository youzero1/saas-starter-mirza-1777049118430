'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Car, Package } from 'lucide-react';
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
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-blue-600 rounded-xl p-2">
                <Car className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-gray-900">AutoParts Pro</span>
            </Link>
            <span className="text-gray-300">|</span>
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">Customer Catalog</span>
          </div>
          <Link
            href="/dashboard"
            className="text-sm text-gray-600 hover:text-gray-900 font-medium px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-1.5"
          >
            <Package className="w-4 h-4" />
            Staff Dashboard
          </Link>
        </div>
      </nav>

      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-extrabold mb-2">Parts Catalog</h1>
          <p className="text-blue-200">Browse our complete inventory of car spare parts</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <SearchFilters filters={filters} onChange={setFilters} />

        {/* Results count */}
        {parts && (
          <p className="text-sm text-gray-500 mt-4 mb-2">
            Showing {parts.length} part{parts.length !== 1 ? 's' : ''}
          </p>
        )}

        {/* Content */}
        <div className="mt-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-24">
              <LoadingSpinner />
            </div>
          ) : isError ? (
            <div className="card p-16 text-center">
              <p className="text-red-600 font-medium">Failed to load parts. Please check your configuration.</p>
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
    </div>
  );
}
