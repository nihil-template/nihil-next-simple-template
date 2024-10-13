import { NextRequest } from 'next/server.js';
import { User } from '@prisma/client';
import { TokenRefreshDto } from '@/src/entities';
import { serverTools } from '@/app/api/_utils/serverTools';
import { createResponse } from '@/src/utils/auth';

export async function POST(req: NextRequest) {
  const tokenRefreshDto: TokenRefreshDto = await req.json();

  const authCheck = await serverTools
    .jwt.tokenRefresh(tokenRefreshDto.user);

  if (authCheck.status === 401) {
    return createResponse<null>({
      type: 'error',
      resData: null,
      message: authCheck.message,
      status: 'Unauthorized',
    });
  }

  return createResponse<User>({
    type: 'success',
    resData: authCheck.resData,
    message: authCheck.message,
    status: 'Ok',
  });
}
