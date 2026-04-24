import { Package } from 'lucide-react';
import { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export default function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="card p-16 flex flex-col items-center justify-center text-center">
      <div className="bg-gray-100 rounded-full p-5 mb-4">
        <Package className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 max-w-xs mb-6">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
