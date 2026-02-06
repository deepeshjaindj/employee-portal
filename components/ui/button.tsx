import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  size?: 'default' | 'sm' | 'lg';
}

const variantStyles: Record<string, string> = {
  default: [
    'bg-blue-600 text-white font-semibold',
    'shadow-[0_1px_3px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]',
    'hover:bg-blue-500 hover:shadow-[0_2px_16px_rgba(59,130,246,0.3),inset_0_1px_0_rgba(255,255,255,0.12)]',
    'active:bg-blue-700 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]',
  ].join(' '),
  outline: [
    'border border-slate-700/60 text-[var(--text-secondary)] bg-transparent',
    'hover:border-blue-500/40 hover:text-blue-400 hover:bg-blue-500/[0.06]',
    'active:bg-blue-500/10',
  ].join(' '),
  ghost: [
    'text-[var(--text-muted)] bg-transparent',
    'hover:text-[var(--text-primary)] hover:bg-slate-800/60',
    'active:bg-slate-700/40',
  ].join(' '),
  destructive: [
    'bg-rose-500/8 text-rose-400 border border-rose-500/15',
    'hover:bg-rose-500/15 hover:border-rose-500/25 hover:text-rose-300',
    'active:bg-rose-500/20',
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
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06060A]',
          'disabled:opacity-35 disabled:pointer-events-none disabled:saturate-0',
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
