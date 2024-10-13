import { NextRequest } from 'next/server.js';
import { AdminDeleteUsersDto } from '@/src/entities';
import { DB } from '@/src/utils';
import { createResponse } from '@/src/utils/auth';
import { serverTools } from '@/app/api/_utils/serverTools';

export async function POST(req: NextRequest) {
  const { user, uids, }: AdminDeleteUsersDto = await req.json();

  const authCheck = await serverTools
    .jwt.tokenRefresh(user);

  if (authCheck.status === 401) {
    return createResponse<null>({
      type: 'error',
      resData: null,
      message: authCheck.message,
      status: 'Unauthorized',
    });
  }

  const findUsers = await DB.users().findMany({
    where: {
      uid: { in: uids, },
    },
  });

  await DB.auths().deleteMany({
    where: {
      userId: {
        in: findUsers.map(
          (user) => user.id
        ),
      },
    },
  });

  await DB.refreshTokens().deleteMany({
    where: {
      userId: {
        in: findUsers.map(
          (user) => user.id
        ),
      },
    },
  });

  const deletedUsers = await DB.users().deleteMany({
    where: {
      uid: { in: uids, },
    },
  });

  console.log(deletedUsers);

  return createResponse<null>({
    type: 'success',
    resData: null,
    message: `${uids.length}개의 사용자 정보가 삭제되었습니다.`,
    status: 'Ok',
  });
}
