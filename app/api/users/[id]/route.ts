import { NextRequest } from 'next/server.js';
import { User } from '@prisma/client';
import { DB } from '@/src/utils';
import { createResponse } from '@/src/utils/auth';
import { DeleteUserDto, UpdateUserDto } from '@/src/entities';
import { serverTools } from '@/app/api/_utils/serverTools';

interface Params {
  params: {
    id: string;
  }
}

export async function GET(req: NextRequest, { params, }: Params) {
  const user = await DB.users().findFirst({
    where: {
      id: parseInt(params.id, 10),
    },
  });

  if (user === null) {
    return createResponse<null>({
      type: 'success',
      resData: null,
      message: '존재하지 않는 유저입니다.',
      status: 'Ok',
    });
  }

  return createResponse<User>({
    type: 'success',
    resData: user,
    message: 'ok',
    status: 'Ok',
  });
}

export async function PATCH(
  req: NextRequest,
  { params, }: Params
) {
  const { user, password, ...updateUserDto }: UpdateUserDto = await req.json();

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

  let hashedPassword: string;

  if (password) {
    hashedPassword = await serverTools.bcrypt.dataToHash(password);

    await DB.auths().update({
      where: {
        id: parseInt(params.id, 10),
      },
      data: {
        password: hashedPassword,
      },
    });
  }

  const updatedUser = await DB.users().update({
    where: {
      id: parseInt(params.id, 10),
    },
    data: {
      email: updateUserDto.email,
      name: updateUserDto.name,
      role: updateUserDto.role,
    },
  });

  return createResponse<User>({
    type: 'success',
    resData: updatedUser,
    message: 'ok',
    status: 'Ok',
  });
}

export async function DELETE(
  req: NextRequest,
  { params, }: Params
) {
  const { user, uids: [ uid, ], }: DeleteUserDto = await req.json();

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

  await DB.auths().deleteMany({
    where: {
      userId: +params.id,
    },
  });

  await DB.refreshTokens().deleteMany({
    where: {
      userId: +params.id,
    },
  });

  // 2. 그런 다음 사용자(User) 삭제
  await DB.users().delete({
    where: {
      uid,
    },
  });

  // TODO - 개별 삭제 & 어드민 유저 삭제 손봐야 함. 저거 왜 삭제가 안되지..
  return createResponse<null>({
    type: 'success',
    resData: null,
    message: `[${uid}] 사용자 정보가 삭제되었습니다.`,
    status: 'Ok',
  });
}
