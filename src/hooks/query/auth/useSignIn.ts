import { useMutation } from '@tanstack/react-query';
import { SignInDto } from '@/src/entities';
import { AuthQuery } from '@/src/features';

export function useSignIn() {
  const query = useMutation({
    mutationFn: (signInDto: SignInDto) => (
      AuthQuery.signin(signInDto)
    ),
  });

  return query;
}
