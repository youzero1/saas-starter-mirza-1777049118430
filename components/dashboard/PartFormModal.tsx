'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { Part, PartFormData } from '@/types';
import { createPart, updatePart } from '@/lib/api';

interface PartFormModalProps {
  part: Part | null;
  onClose: () => void;
  onSuccess: () => void;
}

const CATEGORIES = [
  'Engine', 'Brakes', 'Suspension', 'Transmission', 'Electrical',
  'Body & Exterior', 'Interior', 'Cooling', 'Fuel System', 'Exhaust',
  'Steering', 'Tyres & Wheels', 'Filters', 'Belts & Chains', 'Other',
];

export default function PartFormModal({ part, onClose, onSuccess }: PartFormModalProps) {
  const isEditing = Boolean(part);

  const [formData, setFormData] = useState<PartFormData>({
    part_number: part?.part_number || '',
    name: part?.name || '',
    description: part?.description || '',
    category: part?.category || '',
    car_make: part?.car_make || '',
    car_model: part?.car_model || '',
    car_year: part?.car_year || '',
    price: part?.price !== undefined ? String(part.price) : '',
    stock_quantity: part?.stock_quantity !== undefined ? String(part.stock_quantity) : '',
    image_url: part?.image_url || '',
  });

  const [errors, setErrors] = useState<Partial<PartFormData>>({});

  const mutation = useMutation({
    mutationFn: (data: PartFormData) =>
      isEditing && part ? updatePart(part.id, data) : createPart(data),
    onSuccess,
  });

  const validate = (): boolean => {
    const newErrors: Partial<PartFormData> = {};
    if (!formData.part_number.trim()) newErrors.part_number = 'Part number is required';
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.price || isNaN(Number(formData.price))) newErrors.price = 'Valid price is required';
    if (!formData.stock_quantity || isNaN(Number(formData.stock_quantity))) newErrors.stock_quantity = 'Valid quantity is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    mutation.mutate(formData);
  };

  const handleChange = (field: keyof PartFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">
            {isEditing ? 'Edit Part' : 'Add New Part'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="px-6 py-5 space-y-5">
            {mutation.isError && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
                {mutation.error instanceof Error ? mutation.error.message : 'Something went wrong'}
              </div>
            )}

            {/* Part Number & Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Part Number *</label>
                <input
                  type="text"
                  value={formData.part_number}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('part_number', e.target.value)}
                  className={`input-field ${errors.part_number ? 'border-red-400 focus:ring-red-400' : ''}`}
                  placeholder="e.g. TY-2023-BRK"
                />
                {errors.part_number && <p className="text-red-500 text-xs mt-1">{errors.part_number}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Part Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('name', e.target.value)}
                  className={`input-field ${errors.name ? 'border-red-400 focus:ring-red-400' : ''}`}
                  placeholder="e.g. Front Brake Pads"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select
                value={formData.category}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange('category', e.target.value)}
                className={`input-field ${errors.category ? 'border-red-400 focus:ring-red-400' : ''}`}
              >
                <option value="">Select a category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange('description', e.target.value)}
                className="input-field resize-none"
                rows={3}
                placeholder="Brief description of the part..."
              />
            </div>

            {/* Car Compatibility */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Car Compatibility</label>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <input
                    type="text"
                    value={formData.car_make}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('car_make', e.target.value)}
                    className="input-field"
                    placeholder="Make (Toyota)"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={formData.car_model}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('car_model', e.target.value)}
                    className="input-field"
                    placeholder="Model (Camry)"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={formData.car_year}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('car_year', e.target.value)}
                    className="input-field"
                    placeholder="Year (2022)"
                  />
                </div>
              </div>
            </div>

            {/* Price & Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (USD) *</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('price', e.target.value)}
                  className={`input-field ${errors.price ? 'border-red-400 focus:ring-red-400' : ''}`}
                  placeholder="0.00"
                />
                {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity *</label>
                <input
                  type="number"
                  min="0"
                  value={formData.stock_quantity}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('stock_quantity', e.target.value)}
                  className={`input-field ${errors.stock_quantity ? 'border-red-400 focus:ring-red-400' : ''}`}
                  placeholder="0"
                />
                {errors.stock_quantity && <p className="text-red-500 text-xs mt-1">{errors.stock_quantity}</p>}
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="url"
                value={formData.image_url}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('image_url', e.target.value)}
                className="input-field"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={mutation.isPending} className="btn-primary">
              {mutation.isPending ? 'Saving...' : isEditing ? 'Save Changes' : 'Add Part'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
