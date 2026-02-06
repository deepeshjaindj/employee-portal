import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  size?: 'default' | 'sm' | 'lg';
}

const variantStyles: Record<string, string> = {
  default: [
    'bg-gradient-to-b from-amber-500 to-amber-600 text-stone-950 font-semibold',
    'shadow-[0_1px_2px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.15)]',
    'hover:from-amber-400 hover:to-amber-500 hover:shadow-[0_2px_12px_rgba(217,119,6,0.25),inset_0_1px_0_rgba(255,255,255,0.2)]',
    'active:from-amber-600 active:to-amber-700 active:shadow-[inset_0_1px_3px_rgba(0,0,0,0.2)]',
  ].join(' '),
  outline: [
    'border border-[var(--border-strong)] text-[var(--text-secondary)] bg-transparent',
    'hover:border-amber-600/40 hover:text-amber-400 hover:bg-amber-600/5',
    'active:bg-amber-600/10',
  ].join(' '),
  ghost: [
    'text-[var(--text-muted)] bg-transparent',
    'hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]',
    'active:bg-white/[0.04]',
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
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-root)]',
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
