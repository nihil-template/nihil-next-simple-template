import { User } from '@prisma/client';

export function adminCheck(me: User) {
  return ((me?.role === 'ADMIN')
    || (process.env.NODE_ENV === 'development'));
}
