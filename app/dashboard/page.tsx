'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Car, LayoutGrid, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { fetchParts, deletePart } from '@/lib/api';
import { Part, PartFilters } from '@/types';
import PartsTable from '@/components/dashboard/PartsTable';
import SearchFilters from '@/components/dashboard/SearchFilters';
import PartFormModal from '@/components/dashboard/PartFormModal';
import DeleteConfirmDialog from '@/components/dashboard/DeleteConfirmDialog';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import EmptyState from '@/components/ui/EmptyState';

export default function DashboardPage() {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<PartFilters>({
    search: '',
    category: '',
    make: '',
    model: '',
    year: '',
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPart, setEditingPart] = useState<Part | null>(null);
  const [deletingPart, setDeletingPart] = useState<Part | null>(null);

  const { data: parts, isLoading, isError } = useQuery({
    queryKey: ['parts', filters],
    queryFn: () => fetchParts(filters),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deletePart(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['parts'] });
      setDeletingPart(null);
    },
  });

  const handleEdit = (part: Part) => setEditingPart(part);
  const handleDelete = (part: Part) => setDeletingPart(part);

  const handleFormClose = () => {
    setIsAddModalOpen(false);
    setEditingPart(null);
  };

  const handleFormSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['parts'] });
    handleFormClose();
  };

  const hasFilters = Object.values(filters).some((v) => v);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-200 px-6 py-0 sticky top-0 z-30 shadow-sm">
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
              <div className="w-2 h-2 rounded-full bg-orange-400" />
              <span className="text-sm font-semibold text-gray-700">Staff Dashboard</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/catalog"
              className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-blue-600 font-medium px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <LayoutGrid className="w-4 h-4" />
              Customer Catalog
            </Link>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="btn-primary flex items-center gap-1.5 text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Part
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Parts Inventory</h1>
            <p className="text-gray-500 text-sm mt-0.5">
              {isLoading
                ? 'Loading inventory...'
                : parts
                ? `${parts.length} part${parts.length !== 1 ? 's' : ''} in inventory`
                : ''}
            </p>
          </div>
        </div>

        {/* Filters */}
        <SearchFilters filters={filters} onChange={setFilters} />

        {/* Content */}
        <div className="mt-6">
          {isLoading ? (
            <div className="card p-20 flex items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : isError ? (
            <div className="card p-16 flex flex-col items-center justify-center gap-3 text-center">
              <div className="bg-red-100 rounded-full p-3">
                <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <p className="text-red-600 font-semibold">Failed to load parts</p>
                <p className="text-gray-500 text-sm mt-1">Please check your Supabase configuration and try again.</p>
              </div>
            </div>
          ) : parts && parts.length === 0 ? (
            <EmptyState
              title="No parts found"
              description={
                hasFilters
                  ? 'Try adjusting your search or filters.'
                  : 'Start building your inventory by adding the first part.'
              }
              action={
                !hasFilters ? (
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="btn-primary flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add First Part
                  </button>
                ) : undefined
              }
            />
          ) : (
            <PartsTable
              parts={parts || []}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>

      {/* Modals */}
      {(isAddModalOpen || editingPart) && (
        <PartFormModal
          part={editingPart}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}

      {deletingPart && (
        <DeleteConfirmDialog
          part={deletingPart}
          isDeleting={deleteMutation.isPending}
          onConfirm={() => deleteMutation.mutate(deletingPart.id)}
          onCancel={() => setDeletingPart(null)}
        />
      )}
    </div>
  );
}
