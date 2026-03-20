import { projectService } from '@/services/projectService';
import { visitorService } from '@/services/visitorService';
import type { IProject } from '@/types/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useProjects = () => {
  const queryClient = useQueryClient();

  const { data } = useQuery<IProject[]>({
    queryKey: ['projects'],
    queryFn: projectService.getProjectLikes
  });

  const addLike = useMutation({
    mutationFn: projectService.incrementProjectLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    }
  });

  const removeLike = useMutation({
    mutationFn: projectService.decrementProjectLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    }
  });

  return { data, addLike, removeLike };
};
