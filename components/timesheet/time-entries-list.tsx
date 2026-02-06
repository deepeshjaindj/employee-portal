'use client';

import { useState } from 'react';
import { useTimeEntries, useDeleteTimeEntry } from '@/lib/hooks/useTimeEntries';
import { Button } from '@/components/ui/button';
import { Trash2, Calendar, Briefcase, FileText, Clock, Inbox } from 'lucide-react';
import { useSession } from 'next-auth/react';

export function TimeEntriesList() {
  const { data: session, status } = useSession();
  const employeeId = (session?.user as any)?.employeeId as string | undefined;
  const [startDate, setStartDate] = useState<string | undefined>();
  const [endDate, setEndDate] = useState<string | undefined>();
  const { data: entries, isLoading } = useTimeEntries(employeeId, startDate, endDate);
  const deleteEntry = useDeleteTimeEntry();

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      try {
        await deleteEntry.mutateAsync(id);
        alert('Entry deleted successfully!');
      } catch (error) {
        alert('Failed to delete entry');
      }
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center gap-3">
        <div className="h-5 w-5 rounded-full border-2 border-blue-500/25 border-t-blue-500 animate-spin" />
        <p className="text-sm text-[var(--text-faint)]">Loading time entries...</p>
      </div>
    );
  }

  if (!entries || entries.length === 0) {
    return (
      <div className="p-14 flex flex-col items-center justify-center gap-4 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800/60 border border-[var(--border-subtle)]">
          <Inbox className="w-5 h-5 text-[var(--text-faint)]" />
        </div>
        <div className="space-y-1.5">
          <p className="text-sm font-medium text-[var(--text-secondary)]">No time entries yet</p>
          <p className="text-xs text-[var(--text-faint)] max-w-[260px] leading-relaxed">
            Use the &quot;New time entry&quot; button above to log your first entry.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Table header info */}
      <div className="flex flex-col gap-2 px-6 pt-5 pb-3.5 border-b border-[var(--border-subtle)] sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-0.5">
          <h2 className="text-[13px] font-semibold text-[var(--text-secondary)] tracking-tight">
            Logged entries
          </h2>
          <p className="text-[11px] text-[var(--text-faint)]">
            Showing {entries.length} {entries.length === 1 ? 'entry' : 'entries'}{startDate || endDate ? ' in selected period' : ''}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--border-subtle)] bg-[#0E0E13]">
              <th className="px-6 py-3 text-left">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-slate-600" />
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-[0.08em]">Date</span>
                </div>
              </th>
              <th className="px-6 py-3 text-left">
                <div className="flex items-center gap-1.5">
                  <Briefcase className="w-3 h-3 text-slate-600" />
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-[0.08em]">Project</span>
                </div>
              </th>
              <th className="px-6 py-3 text-left">
                <div className="flex items-center gap-1.5">
                  <FileText className="w-3 h-3 text-slate-600" />
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-[0.08em]">Description</span>
                </div>
              </th>
              <th className="px-6 py-3 text-right">
                <div className="flex items-center justify-end gap-1.5">
                  <Clock className="w-3 h-3 text-slate-600" />
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-[0.08em]">Hours</span>
                </div>
              </th>
              <th className="px-4 py-3 w-12" />
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, i) => (
              <tr
                key={entry.id}
                className="group border-b border-[var(--border-subtle)] last:border-b-0 transition-colors duration-100 hover:bg-blue-500/[0.025]"
              >
                <td className="px-6 py-3.5 whitespace-nowrap">
                  <span className="text-xs font-medium text-[var(--text-secondary)] tabular-nums tracking-tight">
                    {entry.date}
                  </span>
                </td>
                <td className="px-6 py-3.5 whitespace-nowrap">
                  <span className="inline-flex items-center gap-2 text-xs font-medium text-[var(--text-primary)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500/50 ring-2 ring-blue-500/10" />
                    {entry.projectName || entry.projectId}
                  </span>
                </td>
                <td className="px-6 py-3.5">
                  <span className="text-xs text-[var(--text-muted)] line-clamp-1">
                    {entry.description || <span className="italic text-[var(--text-faint)]">No description</span>}
                  </span>
                </td>
                <td className="px-6 py-3.5 whitespace-nowrap text-right">
                  <span className="inline-flex items-center justify-center min-w-[48px] px-2.5 py-1 rounded-md bg-blue-500/8 border border-blue-500/10 text-[11px] font-semibold text-blue-400 tabular-nums tracking-tight">
                    {(entry.hours / 3600).toFixed(2)}h
                  </span>
                </td>
                <td className="px-3 py-3.5 text-right">
                  <button
                    onClick={() => handleDelete(entry.id)}
                    disabled={deleteEntry.isPending}
                    className="p-1.5 rounded-md text-[var(--text-faint)] opacity-0 group-hover:opacity-100
                      hover:text-rose-400 hover:bg-rose-500/8
                      disabled:opacity-30 disabled:pointer-events-none
                      transition-all duration-100 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
