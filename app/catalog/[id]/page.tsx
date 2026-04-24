'use client';

import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Tag, Car, Hash, Package, DollarSign, AlertCircle, CheckCircle, Layers } from 'lucide-react';
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
          <div className="bg-red-100 rounded-full p-4 inline-flex mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-red-600 font-semibold mb-1">Part not found</p>
          <p className="text-gray-500 text-sm mb-6">This part may have been removed or doesn&apos;t exist.</p>
          <Link href="/catalog" className="btn-primary">Back to Catalog</Link>
        </div>
      </div>
    );
  }

  const inStock = part.stock_quantity > 0;
  const stockLevel =
    part.stock_quantity === 0
      ? 'danger'
      : part.stock_quantity < 5
      ? 'warning'
      : 'success';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-200 px-6 py-0 sticky top-0 z-30 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center h-14">
          <Link
            href="/catalog"
            className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Catalog
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="card overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image panel */}
            <div className="bg-gray-100 flex items-center justify-center min-h-72 relative">
              {part.image_url ? (
                <Image
                  src={part.image_url}
                  alt={part.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="flex flex-col items-center gap-3 text-gray-300">
                  <Package className="w-20 h-20" />
                  <span className="text-sm font-medium">No image available</span>
                </div>
              )}
              {/* Category overlay */}
              <div className="absolute top-4 left-4">
                <span className="text-xs font-bold bg-blue-600 text-white px-2.5 py-1 rounded-md uppercase tracking-wide">
                  {part.category}
                </span>
              </div>
            </div>

            {/* Details panel */}
            <div className="p-8 flex flex-col">
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight leading-tight">{part.name}</h1>
                <span
                  className={`flex-shrink-0 flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${
                    inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}
                >
                  {inStock ? <CheckCircle className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                  {inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {/* Price */}
              <p className="text-4xl font-extrabold text-blue-600 mb-5">
                ${Number(part.price).toFixed(2)}
              </p>

              {/* Description */}
              {part.description && (
                <p className="text-gray-600 text-sm leading-relaxed mb-6 border-l-2 border-blue-200 pl-3">
                  {part.description}
                </p>
              )}

              {/* Specs grid */}
              <div className="grid grid-cols-1 gap-3 border-t border-gray-100 pt-6">
                <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3">
                  <Hash className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="text-xs text-gray-500 w-24 shrink-0">Part Number</span>
                  <span className="text-sm font-bold text-gray-900 font-mono">{part.part_number}</span>
                </div>

                {(part.car_make || part.car_model || part.car_year) && (
                  <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3">
                    <Car className="w-4 h-4 text-blue-400 shrink-0" />
                    <span className="text-xs text-gray-500 w-24 shrink-0">Compatibility</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {[part.car_make, part.car_model, part.car_year].filter(Boolean).join(' ')}
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3">
                  <Tag className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="text-xs text-gray-500 w-24 shrink-0">Category</span>
                  <span className="text-sm font-semibold text-gray-900">{part.category}</span>
                </div>

                <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3">
                  <Layers className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="text-xs text-gray-500 w-24 shrink-0">Stock</span>
                  <span
                    className={`text-sm font-bold ${
                      stockLevel === 'danger'
                        ? 'text-red-600'
                        : stockLevel === 'warning'
                        ? 'text-orange-500'
                        : 'text-green-600'
                    }`}
                  >
                    {part.stock_quantity} unit{part.stock_quantity !== 1 ? 's' : ''}
                  </span>
                </div>

                <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3">
                  <DollarSign className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="text-xs text-gray-500 w-24 shrink-0">Price</span>
                  <span className="text-sm font-bold text-gray-900">${Number(part.price).toFixed(2)} USD</span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/catalog"
                  className="btn-secondary w-full text-center block"
                >
                  ← Back to Catalog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
