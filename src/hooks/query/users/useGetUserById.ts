import { useQuery } from '@tanstack/react-query';
import { userKeys } from '@/src/entities';
import { UsersQuery } from '@/src/features';
import { useDone, useLoading } from '@/src/hooks';

export function useGetUserById(id: number) {
  const {
    data, isLoading, isFetching, isSuccess, ...query
  } = useQuery({
    queryKey: userKeys.detailId(id),
    queryFn: () => UsersQuery.getById(id),
    enabled: !!id,
  });

  const loading = useLoading(isLoading, isFetching);
  const done = useDone(loading, isSuccess);

  return {
    ...query,
    user: data,
    loading,
    done,
  };
}
