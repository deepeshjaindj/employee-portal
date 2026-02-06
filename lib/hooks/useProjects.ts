import { useQuery } from '@tanstack/react-query';
import { Project } from '@/types';

export function useProjects(status?: 'Active' | 'On Hold' | 'Completed') {
  return useQuery({
    queryKey: ['projects', status],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (status) params.append('status', status);

      const response = await fetch(`/api/projects?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch projects');
      
      const result = await response.json();
      return result.data as Project[];
    },
  });
}