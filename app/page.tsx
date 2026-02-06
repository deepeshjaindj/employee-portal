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
      <div className="max-w-7xl mx-auto px-5 py-8 space-y-6">
        {/* Page header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between animate-fade-in">
          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 mt-0.5">
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
        <section className="bg-zinc-900 border border-zinc-800 rounded-[var(--radius-lg)] shadow-[0_4px_32px_rgba(0,0,0,0.3)] overflow-hidden animate-slide-up" style={{ animationDelay: '100ms' }}>
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
