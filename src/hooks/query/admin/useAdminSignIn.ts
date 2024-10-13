import { useMutation } from '@tanstack/react-query';
import { AdminSignInDto } from '@/src/entities';
import { AdminQuery } from '@/src/features';

export function useAdminSignIn() {
  const query = useMutation({
    mutationFn: (adminSignInDto: AdminSignInDto) => (
      AdminQuery.signIn(adminSignInDto)
    ),
  });

  return query;
}
