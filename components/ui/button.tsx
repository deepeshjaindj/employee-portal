import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  size?: 'default' | 'sm' | 'lg';
}

const variantStyles: Record<string, string> = {
  default: [
    'bg-blue-600 text-white font-semibold',
    'shadow-[0_1px_2px_rgba(0,0,0,0.3)]',
    'hover:bg-blue-500 hover:shadow-[0_2px_12px_rgba(59,130,246,0.25)]',
    'active:bg-blue-700',
  ].join(' '),
  outline: [
    'border border-zinc-700 text-[var(--text-secondary)] bg-transparent',
    'hover:border-blue-500/50 hover:text-blue-400 hover:bg-blue-500/5',
    'active:bg-blue-500/10',
  ].join(' '),
  ghost: [
    'text-[var(--text-muted)] bg-transparent',
    'hover:text-[var(--text-primary)] hover:bg-zinc-800',
    'active:bg-zinc-700/50',
  ].join(' '),
  destructive: [
    'bg-red-500/10 text-red-400 border border-red-500/20',
    'hover:bg-red-500/20 hover:border-red-500/30 hover:text-red-300',
    'active:bg-red-500/25',
  ].join(' '),
};

const sizeStyles: Record<string, string> = {
  default: 'h-10 px-5 py-2 text-sm',
  sm: 'h-8 px-3.5 py-1.5 text-xs',
  lg: 'h-12 px-7 py-3 text-base',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center gap-2 font-medium',
          'rounded-[var(--radius-sm)] cursor-pointer',
          'transition-all duration-[var(--duration-fast)] ease-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
          'disabled:opacity-40 disabled:pointer-events-none disabled:saturate-0',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };
