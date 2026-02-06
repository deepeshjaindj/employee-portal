import { TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex w-full rounded-[var(--radius-sm)] px-3.5 py-2.5 text-sm min-h-[100px]',
          'bg-[#111113] text-[var(--text-primary)]',
          'border border-zinc-700/80',
          'placeholder:text-[var(--text-faint)]',
          'transition-all duration-[var(--duration-fast)] ease-out',
          'hover:border-zinc-600',
          'focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
          'disabled:cursor-not-allowed disabled:opacity-40',
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
