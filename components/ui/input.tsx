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
          'bg-[#111113] text-[var(--text-primary)]',
          'border border-zinc-700/80',
          'placeholder:text-[var(--text-faint)]',
          'transition-all duration-[var(--duration-fast)] ease-out',
          'hover:border-zinc-600',
          'focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
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
