import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-[var(--radius-sm)] px-3.5 py-2 text-sm',
          'bg-[var(--bg-input)] text-[var(--text-primary)]',
          'border border-[var(--border-default)]',
          'shadow-[inset_0_1px_3px_rgba(0,0,0,0.25)]',
          'placeholder:text-[var(--text-faint)]',
          'transition-all duration-[var(--duration-fast)] ease-out',
          'hover:border-[var(--border-strong)]',
          'focus:outline-none focus:border-amber-600/60 focus:shadow-[inset_0_1px_3px_rgba(0,0,0,0.25),var(--accent-ring)]',
          'disabled:cursor-not-allowed disabled:opacity-40',
          '[color-scheme:dark]',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };
