import { SelectHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={cn(
            'flex h-10 w-full appearance-none rounded-[var(--radius-sm)] pl-3.5 pr-10 py-2 text-sm',
            'bg-[var(--bg-input)] text-[var(--text-primary)]',
            'border border-[var(--border-default)]',
            'shadow-[inset_0_1px_3px_rgba(0,0,0,0.25)]',
            'transition-all duration-[var(--duration-fast)] ease-out',
            'hover:border-[var(--border-strong)]',
            'focus:outline-none focus:border-amber-600/60 focus:shadow-[inset_0_1px_3px_rgba(0,0,0,0.25),var(--accent-ring)]',
            'disabled:cursor-not-allowed disabled:opacity-40',
            '[color-scheme:dark]',
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            className="text-[var(--text-faint)]"
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    );
  }
);

Select.displayName = 'Select';

export { Select };
