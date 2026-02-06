import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TimeEntry, CreateTimeEntryInput, UpdateTimeEntryInput } from '@/types';

// Fetch time entries
export function useTimeEntries(employeeId?: string, startDate?: string, endDate?: string) {
  return useQuery({
    queryKey: ['timeEntries', employeeId, startDate, endDate],
    enabled: !!employeeId, // only run when we know the current employee
    queryFn: async () => {
      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);

      const query = params.toString();
      const response = await fetch(`/api/time-entries${query ? `?${query}` : ''}`);
      if (!response.ok) throw new Error('Failed to fetch time entries');
      
      const result = await response.json();
      return result.data as TimeEntry[];
    },
  });
}

// Create time entry
export function useCreateTimeEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTimeEntryInput) => {
      const response = await fetch('/api/time-entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to create time entry');
      
      const result = await response.json();
      return result.data as TimeEntry;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timeEntries'] });
    },
  });
}

// Update time entry
export function useUpdateTimeEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateTimeEntryInput }) => {
      const response = await fetch(`/api/time-entries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to update time entry');
      
      const result = await response.json();
      return result.data as TimeEntry;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timeEntries'] });
    },
  });
}

// Delete time entry
export function useDeleteTimeEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/time-entries/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete time entry');
      
      const result = await response.json();
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timeEntries'] });
    },
  });
}