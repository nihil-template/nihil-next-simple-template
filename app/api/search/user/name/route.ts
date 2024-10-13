import { NextRequest } from 'next/server.js';
import { User } from '@prisma/client';
import { DB } from '@/src/utils';
import { createResponse } from '@/src/utils/auth';

export async function GET(req: NextRequest) {
  const nameString = req.nextUrl.searchParams.get('name');

  const users = await DB.users().findMany({
    where: {
      name: {
        contains: nameString,
      },
    },
  });

  return createResponse<User[]>({
    type: 'success',
    resData: users,
    message: users.length !== 0
      ? `해당 문자가 포함된 닉네임을 사용중인 ${users.length}명의 사용자를 조회헀습니다.`
      : '해당 문자가 포함된 닉네임이 없습니다.',
    status: 'Ok',
  });
}
