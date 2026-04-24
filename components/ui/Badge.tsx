import { clsx } from 'clsx';

interface BadgeProps {
  label: string;
  variant?: 'default' | 'success' | 'danger' | 'warning';
}

export default function Badge({ label, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
        {
          'bg-blue-100 text-blue-700': variant === 'default',
          'bg-green-100 text-green-700': variant === 'success',
          'bg-red-100 text-red-700': variant === 'danger',
          'bg-yellow-100 text-yellow-700': variant === 'warning',
        }
      )}
    >
      {label}
    </span>
  );
}
