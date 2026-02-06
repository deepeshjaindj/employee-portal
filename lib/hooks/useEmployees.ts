import { useQuery } from '@tanstack/react-query';
import { Employee } from '@/types';

export function useEmployees(status?: 'Active' | 'Inactive') {
  return useQuery({
    queryKey: ['employees', status],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (status) params.append('status', status);

      const response = await fetch(`/api/employees?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch employees');
      
      const result = await response.json();
      return result.data as Employee[];
    },
  });
}