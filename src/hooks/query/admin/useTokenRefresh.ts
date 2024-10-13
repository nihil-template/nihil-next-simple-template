import { useMutation } from '@tanstack/react-query';
import { TokenRefreshDto } from '@/src/entities';
import { AdminQuery } from '@/src/features';

export function useTokenRefresh() {
  const query = useMutation({
    mutationFn: (tokenRefreshDto: TokenRefreshDto) => (
      AdminQuery.refresh(tokenRefreshDto)
    ),
  });

  return query;
}
