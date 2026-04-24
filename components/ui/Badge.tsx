interface BadgeProps {
  label: string;
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

const variantClasses: Record<string, string> = {
  default: 'bg-blue-50 text-blue-700',
  success: 'bg-green-50 text-green-700',
  warning: 'bg-orange-50 text-orange-700',
  danger: 'bg-red-50 text-red-700',
};

export default function Badge({ label, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold ${
        variantClasses[variant]
      }`}
    >
      {label}
    </span>
  );
}
