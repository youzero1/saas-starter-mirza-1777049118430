'use client';

import { AlertTriangle } from 'lucide-react';
import { Part } from '@/types';

interface DeleteConfirmDialogProps {
  part: Part;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmDialog({
  part,
  isDeleting,
  onConfirm,
  onCancel,
}: DeleteConfirmDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />

      {/* Dialog */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6">
        <div className="flex items-start gap-4">
          <div className="bg-red-100 rounded-full p-3 flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Delete Part</h3>
            <p className="text-sm text-gray-600">
              Are you sure you want to delete{' '}
              <span className="font-semibold text-gray-900">{part.name}</span>{' '}
              (<span className="font-mono text-gray-700">{part.part_number}</span>)?{' '}
              This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6">
          <button onClick={onCancel} disabled={isDeleting} className="btn-secondary">
            Cancel
          </button>
          <button onClick={onConfirm} disabled={isDeleting} className="btn-danger">
            {isDeleting ? 'Deleting...' : 'Delete Part'}
          </button>
        </div>
      </div>
    </div>
  );
}
