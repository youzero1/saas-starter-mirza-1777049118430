import { Package } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export default function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="card p-16 flex flex-col items-center justify-center text-center gap-4">
      <div className="bg-gray-100 rounded-full p-5">
        <Package className="w-10 h-10 text-gray-300" />
      </div>
      <div>
        <h3 className="text-base font-bold text-gray-700 mb-1">{title}</h3>
        <p className="text-sm text-gray-400 max-w-xs">{description}</p>
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
