import { useMutation } from '@tanstack/react-query';
import { CreateUserDto } from '@/src/entities';
import { UsersQuery } from '@/src/features';

export function useCreateUser() {
  const query = useMutation({
    mutationFn: (createUserDto: CreateUserDto) => (
      UsersQuery.create(createUserDto)
    ),
  });

  return query;
}
