import { NextRequest } from 'next/server.js';
import { cookies } from 'next/headers';
import { SignOutDto } from '@/src/entities';
import { createResponse } from '@/src/utils/auth';
import { DB } from '@/src/utils';
import { serverTools } from '@/app/api/_utils/serverTools';

export async function POST(req: NextRequest) {
  const signOutDto: SignOutDto = await req.json();

  const authCheck = await serverTools
    .jwt.tokenRefresh(signOutDto.user);

  if (authCheck.status === 401) {
    return createResponse<null>({
      type: 'error',
      resData: null,
      message: authCheck.message,
      status: 'Unauthorized',
    });
  }

  if (authCheck.resData.role !== 'ADMIN') {
    return createResponse<null>({
      type: 'error',
      resData: null,
      message: '관리자 계정이 아닙니다.',
      status: 'Unauthorized',
    });
  }

  await DB.users().update({
    where: {
      id: signOutDto.user.id,
    },
    data: {
      accessToken: null,
    },
  });

  await DB.refreshTokens().update({
    where: {
      userId: signOutDto.user.id,
    },
    data: {
      refreshToken: null,
    },
  });

  cookies().set('session', '', {
    secure: true,
    path: '/',
    httpOnly: true,
    expires: new Date(0),
  });

  cookies().set('isSignedIn', '0', {
    secure: true,
    path: '/',
    httpOnly: true,
    expires: new Date('9999-12-31'),
  });

  cookies().set('uid', '', {
    secure: true,
    path: '/',
    httpOnly: true,
    expires: new Date(0),
  });

  return createResponse<null>({
    type: 'success',
    resData: null,
    message: 'ok',
    status: 'Ok',
  });
}
