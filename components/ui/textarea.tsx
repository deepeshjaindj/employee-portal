import { TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex w-full rounded-[var(--radius-sm)] px-3.5 py-2.5 text-sm min-h-[100px]',
          'bg-[#0C0C10] text-[var(--text-primary)]',
          'border border-slate-700/50',
          'shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]',
          'placeholder:text-[var(--text-faint)]',
          'transition-all duration-[var(--duration-fast)] ease-out',
          'hover:border-slate-600/60',
          'focus:outline-none focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/15 focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),0_0_0_1px_rgba(59,130,246,0.1)]',
          'disabled:cursor-not-allowed disabled:opacity-35',
          'resize-y',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
