'use client';

import { useState } from 'react';
import { TimeEntryForm } from '@/components/timesheet/time-entry-form';
import { TimeEntriesList } from '@/components/timesheet/time-entries-list';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { Plus, Clock } from 'lucide-react';

export default function Home() {
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <main className="min-h-[calc(100vh-56px)]">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Page header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between animate-fade-in">
          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/8 border border-blue-500/15 shadow-[0_0_16px_rgba(59,130,246,0.06)] mt-0.5">
              <Clock className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-[var(--text-primary)] tracking-tight">
                Timesheet
              </h1>
              <p className="mt-0.5 text-sm text-[var(--text-muted)]">
                Track your time across projects and review logged hours.
              </p>
            </div>
          </div>

          <Button onClick={() => setCreateOpen(true)} size="sm">
            <Plus className="w-4 h-4" />
            New time entry
          </Button>
        </div>

        {/* Time entries table */}
        <section
          className="bg-[#111116] border border-slate-700/30 rounded-[var(--radius-lg)] shadow-[0_4px_32px_rgba(0,0,0,0.35),0_0_0_1px_rgba(148,163,184,0.03)_inset] overflow-hidden animate-slide-up"
          style={{ animationDelay: '80ms' }}
        >
          <TimeEntriesList />
        </section>
      </div>

      {/* Create dialog */}
      <Dialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        title="Log time entry"
        description="Record the hours you worked and assign them to a project."
      >
        <TimeEntryForm onSuccess={() => setCreateOpen(false)} />
      </Dialog>
    </main>
  );
}
