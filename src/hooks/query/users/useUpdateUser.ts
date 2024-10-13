import { useMutation } from '@tanstack/react-query';
import { UsersQuery } from '@/src/features';
import { UpdateUser } from '@/src/entities';

export function useUpdateUser() {
  const query = useMutation({
    mutationFn: ({ id, dto, }: UpdateUser) => (
      UsersQuery.update(id, dto)
    ),
  });

  return query;
}
