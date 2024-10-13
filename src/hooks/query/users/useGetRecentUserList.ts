import { useQuery } from '@tanstack/react-query';
import { userKeys } from '@/src/entities';
import { UsersQuery } from '@/src/features';
import { useDone, useLoading } from '@/src/hooks';

export function useGetRecentUserList() {
  const {
    data, isLoading, isFetching, isSuccess, ...query
  } = useQuery({
    queryKey: userKeys.recentList,
    queryFn: UsersQuery.getRecent,
  });

  const loading = useLoading(isLoading, isFetching);
  const done = useDone(loading, isSuccess);

  return {
    ...query,
    users: data,
    loading,
    done,
  };
}
