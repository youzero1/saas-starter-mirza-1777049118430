'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Car } from 'lucide-react';
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

  const handleEdit = (part: Part) => {
    setEditingPart(part);
  };

  const handleDelete = (part: Part) => {
    setDeletingPart(part);
  };

  const handleFormClose = () => {
    setIsAddModalOpen(false);
    setEditingPart(null);
  };

  const handleFormSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['parts'] });
    handleFormClose();
  };

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
            <span className="text-sm text-gray-500 font-medium">Staff Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/catalog"
              className="text-sm text-gray-600 hover:text-gray-900 font-medium px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              View Catalog
            </Link>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="btn-primary flex items-center gap-2 text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Part
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Parts Inventory</h1>
          <p className="text-gray-500 text-sm mt-1">
            {parts ? `${parts.length} part${parts.length !== 1 ? 's' : ''} in inventory` : 'Loading...'}
          </p>
        </div>

        {/* Filters */}
        <SearchFilters filters={filters} onChange={setFilters} />

        {/* Content */}
        <div className="mt-6">
          {isLoading ? (
            <div className="card p-16 flex items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : isError ? (
            <div className="card p-16 text-center">
              <p className="text-red-600 font-medium">Failed to load parts. Please check your Supabase configuration.</p>
            </div>
          ) : parts && parts.length === 0 ? (
            <EmptyState
              title="No parts found"
              description={Object.values(filters).some((v) => v) ? 'Try adjusting your search filters.' : 'Get started by adding your first part.'}
              action={
                !Object.values(filters).some((v) => v) ? (
                  <button onClick={() => setIsAddModalOpen(true)} className="btn-primary flex items-center gap-2">
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
