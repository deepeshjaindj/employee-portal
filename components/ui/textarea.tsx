import { TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex w-full rounded-[var(--radius-sm)] px-3.5 py-2.5 text-sm min-h-[100px]',
          'bg-[var(--bg-input)] text-[var(--text-primary)]',
          'border border-[var(--border-default)]',
          'shadow-[inset_0_1px_3px_rgba(0,0,0,0.25)]',
          'placeholder:text-[var(--text-faint)]',
          'transition-all duration-[var(--duration-fast)] ease-out',
          'hover:border-[var(--border-strong)]',
          'focus:outline-none focus:border-amber-600/60 focus:shadow-[inset_0_1px_3px_rgba(0,0,0,0.25),var(--accent-ring)]',
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
