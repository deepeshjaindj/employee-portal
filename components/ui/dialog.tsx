'use client';

import type { ReactNode } from 'react';
import { X } from 'lucide-react';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: ReactNode;
}

export function Dialog({ open, onOpenChange, title, description, children }: DialogProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-overlay bg-black/65 backdrop-blur-md"
      onClick={() => onOpenChange(false)}
    >
      <div
        className={[
          'w-full max-w-lg',
          'bg-[#1A1A21]',
          'border border-slate-700/40',
          'rounded-[var(--radius-xl)]',
          'shadow-[0_12px_64px_rgba(0,0,0,0.6),0_0_0_1px_rgba(148,163,184,0.04)_inset,0_1px_0_rgba(148,163,184,0.04)_inset]',
          'accent-bar-top',
          'p-7 space-y-5',
          'animate-slide-up',
        ].join(' ')}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || description) && (
          <div className="flex items-start justify-between gap-4 pt-0.5">
            <div className="space-y-1.5">
              {title && (
                <h2 className="text-lg font-semibold text-[var(--text-primary)] tracking-tight">
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-[13px] text-[var(--text-muted)] leading-relaxed">
                  {description}
                </p>
              )}
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="flex-shrink-0 p-1.5 rounded-[var(--radius-sm)] text-[var(--text-faint)] hover:text-[var(--text-secondary)] hover:bg-slate-700/40 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Content */}
        <div>{children}</div>
      </div>
    </div>
  );
}
