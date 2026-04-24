'use client';

import { Part } from '@/types';
import { Edit2, Trash2 } from 'lucide-react';
import Badge from '@/components/ui/Badge';

interface PartsTableProps {
  parts: Part[];
  onEdit: (part: Part) => void;
  onDelete: (part: Part) => void;
}

export default function PartsTable({ parts, onEdit, onDelete }: PartsTableProps) {
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Part #</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Name</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Category</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Compatibility</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Price</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Stock</th>
              <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {parts.map((part) => (
              <tr key={part.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <span className="font-mono text-sm text-gray-700">{part.part_number}</span>
                </td>
                <td className="px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{part.name}</p>
                    {part.description && (
                      <p className="text-xs text-gray-400 truncate max-w-48">{part.description}</p>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Badge label={part.category} />
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-gray-600">
                    {[part.car_make, part.car_model, part.car_year].filter(Boolean).join(' ') || '—'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold text-gray-900">${Number(part.price).toFixed(2)}</span>
                </td>
                <td className="px-4 py-3">
                  <Badge
                    label={`${part.stock_quantity} units`}
                    variant={part.stock_quantity === 0 ? 'danger' : part.stock_quantity < 5 ? 'warning' : 'success'}
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(part)}
                      className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit part"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(part)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete part"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
