interface BadgeProps {
  label: string;
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

const variantClasses = {
  default: 'bg-blue-50 text-blue-700',
  success: 'bg-green-50 text-green-700',
  warning: 'bg-yellow-50 text-yellow-700',
  danger: 'bg-red-50 text-red-700',
};

export default function Badge({ label, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${
        variantClasses[variant]
      }`}
    >
      {label}
    </span>
  );
}
