import { NextRequest } from 'next/server.js';
import { User } from '@prisma/client';
import { DB } from '@/src/utils';
import { createResponse } from '@/src/utils/auth';
import { CreateUserDto } from '@/src/entities';
import { serverTools } from '@/app/api/_utils/serverTools';

export async function GET() {
  const users = await DB.users().findMany({});

  return createResponse<User[]>({
    type: 'success',
    resData: users,
    message: 'ok',
    status: 'Ok',
  });
}

export async function POST(req: NextRequest) {
  const { password, ...createUserDto }: CreateUserDto = await req.json();

  const emailCheck = await DB.users().findFirst({
    where: {
      email: createUserDto.email,
    },
  });

  const nameCheck = await DB.users().findFirst({
    where: {
      name: createUserDto.name,
    },
  });

  if (emailCheck) {
    return createResponse<null>({
      type: 'error',
      resData: null,
      message: '이미 사용중인 이메일입니다.',
      status: 'Conflict',
    });
  }

  if (nameCheck) {
    return createResponse<null>({
      type: 'error',
      resData: null,
      message: '이미 사용중인 이름입니다.',
      status: 'Conflict',
    });
  }

  const newUser = await DB.users().create({
    data: createUserDto,
  });

  const hashedPassword = await serverTools.bcrypt.dataToHash(password);

  await DB.auths().create({
    data: {
      userId: newUser.id,
      password: hashedPassword,
    },
  });

  await DB.refreshTokens().create({
    data: {
      userId: newUser.id,
    },
  });

  return createResponse<User>({
    type: 'success',
    resData: newUser,
    message: 'ok',
    status: 'Created',
  });
}
