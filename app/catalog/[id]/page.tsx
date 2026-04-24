'use client';

import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Tag, Car, Hash, Package, DollarSign, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchPart } from '@/lib/api';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function PartDetailPage({ params }: { params: { id: string } }) {
  const { data: part, isLoading, isError } = useQuery({
    queryKey: ['part', params.id],
    queryFn: () => fetchPart(params.id),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError || !part) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-medium mb-4">Part not found or failed to load.</p>
          <Link href="/catalog" className="btn-primary">Back to Catalog</Link>
        </div>
      </div>
    );
  }

  const inStock = part.stock_quantity > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <Link
            href="/catalog"
            className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Catalog
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="card overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Image */}
            <div className="bg-gray-100 flex items-center justify-center min-h-64 relative">
              {part.image_url ? (
                <Image
                  src={part.image_url}
                  alt={part.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="flex flex-col items-center gap-3 text-gray-400">
                  <Package className="w-16 h-16" />
                  <span className="text-sm">No image available</span>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase tracking-wide">
                    {part.category}
                  </span>
                  <h1 className="text-2xl font-bold text-gray-900 mt-2">{part.name}</h1>
                </div>
                <div className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-full ${
                  inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {inStock ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  {inStock ? 'In Stock' : 'Out of Stock'}
                </div>
              </div>

              <p className="text-3xl font-extrabold text-gray-900 mb-6">
                ${Number(part.price).toFixed(2)}
              </p>

              {part.description && (
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">{part.description}</p>
              )}

              <div className="space-y-3 border-t border-gray-100 pt-6">
                <div className="flex items-center gap-3">
                  <Hash className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">Part Number:</span>
                  <span className="text-sm font-semibold text-gray-900 font-mono">{part.part_number}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Car className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">Compatibility:</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {[part.car_make, part.car_model, part.car_year].filter(Boolean).join(' ')}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Tag className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">Category:</span>
                  <span className="text-sm font-semibold text-gray-900">{part.category}</span>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">Stock:</span>
                  <span className={`text-sm font-semibold ${
                    inStock ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {part.stock_quantity} units
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
