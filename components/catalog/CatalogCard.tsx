'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Package, CheckCircle, AlertCircle } from 'lucide-react';
import { Part } from '@/types';

interface CatalogCardProps {
  part: Part;
}

export default function CatalogCard({ part }: CatalogCardProps) {
  const inStock = part.stock_quantity > 0;

  return (
    <Link
      href={`/catalog/${part.id}`}
      className="card hover:shadow-md transition-shadow duration-200 flex flex-col group overflow-hidden"
    >
      {/* Image */}
      <div className="relative bg-gray-100 h-44 flex items-center justify-center overflow-hidden">
        {part.image_url ? (
          <Image
            src={part.image_url}
            alt={part.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <Package className="w-12 h-12 text-gray-300" />
        )}
        {/* Category badge */}
        <div className="absolute top-2 left-2">
          <span className="text-xs font-semibold bg-blue-600 text-white px-2 py-0.5 rounded-md">
            {part.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-gray-400 font-mono mb-1">{part.part_number}</p>
        <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
          {part.name}
        </h3>
        {(part.car_make || part.car_model) && (
          <p className="text-xs text-gray-500 mb-3">
            {[part.car_make, part.car_model, part.car_year].filter(Boolean).join(' ')}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-extrabold text-gray-900">
            ${Number(part.price).toFixed(2)}
          </span>
          <span
            className={`flex items-center gap-1 text-xs font-semibold ${
              inStock ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {inStock ? (
              <><CheckCircle className="w-3.5 h-3.5" /> In Stock</>
            ) : (
              <><AlertCircle className="w-3.5 h-3.5" /> Out of Stock</>
            )}
          </span>
        </div>
      </div>
    </Link>
  );
}
