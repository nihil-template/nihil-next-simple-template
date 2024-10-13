import { useMutation } from '@tanstack/react-query';
import { AdminDeleteUsersDto } from '@/src/entities';
import { AdminQuery } from '@/src/features';

export function useAdminDeleteUsers() {
  const query = useMutation({
    mutationFn: (adminDeleteUsers: AdminDeleteUsersDto) => (
      AdminQuery.usersDeletes(adminDeleteUsers)
    ),
  });

  return query;
}
