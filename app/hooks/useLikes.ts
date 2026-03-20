import { visitorService } from '@/services/visitorService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useLikes = () => {
  const queryClient = useQueryClient();

  const { data: likes = 0 } = useQuery<number>({
    queryKey: ['likes'],
    queryFn: visitorService.getLikesCount
  });

  const addLike = useMutation({
    mutationFn: visitorService.incrementLikes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['likes'] });
      localStorage.setItem('portfolio_like', 'true');
    }
  });

  const removeLike = useMutation({
    mutationFn: visitorService.decrementLikes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['likes'] });
      localStorage.setItem('portfolio_like', 'false');
    }
  });

  return { likes, addLike, removeLike };
};
