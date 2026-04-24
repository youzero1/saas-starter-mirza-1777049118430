'use client';

import { Part } from '@/types';
import CatalogCard from './CatalogCard';

interface CatalogGridProps {
  parts: Part[];
}

export default function CatalogGrid({ parts }: CatalogGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {parts.map((part) => (
        <CatalogCard key={part.id} part={part} />
      ))}
    </div>
  );
}
