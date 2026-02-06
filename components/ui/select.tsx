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
            'bg-[#0C0C10] text-[var(--text-primary)]',
            'border border-slate-700/50',
            'shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]',
            'transition-all duration-[var(--duration-fast)] ease-out',
            'hover:border-slate-600/60',
            'focus:outline-none focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/15 focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),0_0_0_1px_rgba(59,130,246,0.1)]',
            'disabled:cursor-not-allowed disabled:opacity-35',
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
            className="text-slate-500"
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
