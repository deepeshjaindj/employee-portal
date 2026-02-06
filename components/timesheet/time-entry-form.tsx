'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useCreateTimeEntry } from '@/lib/hooks/useTimeEntries';
import { useProjects } from '@/lib/hooks/useProjects';
import { CreateTimeEntryInput } from '@/types';
import { formatDateForAirtable } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import { Loader2 } from 'lucide-react';

interface TimeEntryFormProps {
  onSuccess?: () => void;
}

export function TimeEntryForm({ onSuccess }: TimeEntryFormProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateTimeEntryInput>();
  const createTimeEntry = useCreateTimeEntry();
  const { data: session, status } = useSession();
  const employeeId = (session?.user as any)?.employeeId as string | undefined;
  const { data: projects, isLoading: projectsLoading } = useProjects('Active');
  const visibleProjects = projects?.filter((proj) =>
    employeeId ? proj.projectMembers?.includes(employeeId) : true
  );

  const onSubmit = async (data: any) => {
    try {
      await createTimeEntry.mutateAsync({
        employeeId: employeeId!,
        projectId: data.projectId,
        date: data.date,
        hours: parseFloat(data.hours),
        description: data.description,
      });

      reset();
      onSuccess?.();
    } catch (error) {
      alert('Failed to create time entry');
    }
  };

  if (status === 'loading' || projectsLoading) {
    return (
      <div className="py-12 flex flex-col items-center justify-center gap-3">
        <div className="h-5 w-5 rounded-full border-2 border-blue-500/25 border-t-blue-500 animate-spin" />
        <p className="text-sm text-[var(--text-faint)]">Loading form...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Project */}
      <div className="space-y-2">
        <label className="block text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-[0.08em]">
          Project
        </label>
        <Select {...register('projectId', { required: 'Project is required' })}>
          <option value="">Select a project...</option>
          {visibleProjects?.map((proj) => (
            <option key={proj.id} value={proj.id}>
              {proj.name}
            </option>
          ))}
        </Select>
        {errors.projectId && (
          <p className="text-[12px] text-rose-400 flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-rose-400" />
            {errors.projectId.message}
          </p>
        )}
      </div>

      {/* Date & Hours row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-[0.08em]">
            Date
          </label>
          <Input
            type="date"
            {...register('date', { required: 'Date is required' })}
            defaultValue={formatDateForAirtable(new Date())}
          />
          {errors.date && (
            <p className="text-[12px] text-rose-400 flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-rose-400" />
              {errors.date.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-[0.08em]">
            Hours
          </label>
          <Input
            type="number"
            step="0.25"
            min="0.25"
            max="24"
            placeholder="0.00"
            {...register('hours', {
              required: 'Hours is required',
              min: { value: 0.25, message: 'Minimum 0.25 hours' },
              max: { value: 24, message: 'Maximum 24 hours' }
            })}
          />
          {errors.hours && (
            <p className="text-[12px] text-rose-400 flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-rose-400" />
              {errors.hours.message}
            </p>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="block text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-[0.08em]">
          Task Description
          <span className="ml-1.5 font-normal text-[var(--text-faint)] normal-case tracking-normal text-[11px]">optional</span>
        </label>
        <Textarea
          {...register('description')}
          placeholder="What did you work on?"
          rows={3}
        />
      </div>

      {/* Submit */}
      <Button type="submit" disabled={createTimeEntry.isPending} className="w-full mt-1">
        {createTimeEntry.isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Saving...
          </>
        ) : (
          'Save time entry'
        )}
      </Button>
    </form>
  );
}
