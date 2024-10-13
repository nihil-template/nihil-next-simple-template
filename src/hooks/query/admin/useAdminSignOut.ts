import { useMutation } from '@tanstack/react-query';
import { AdminSignOutDto } from '@/src/entities';
import { AdminQuery } from '@/src/features';

export function useAdminSignOut() {
  const query = useMutation({
    mutationFn: (adminSignOutDto: AdminSignOutDto) => (
      AdminQuery.signout(adminSignOutDto)
    ),
  });

  return query;
}
