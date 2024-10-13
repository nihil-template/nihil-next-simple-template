import { useMutation } from '@tanstack/react-query';
import { DeleteUser } from '@/src/entities';
import { UsersQuery } from '@/src/features';

export function useDeleteUser() {
  const query = useMutation({
    mutationFn: ({ id, dto, }: DeleteUser) => (
      UsersQuery.delete(id, dto)
    ),
  });

  return query;
}
