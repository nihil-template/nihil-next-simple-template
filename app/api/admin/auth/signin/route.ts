import { NextRequest } from 'next/server.js';
import { User } from '@prisma/client';
import { cookies } from 'next/headers';
import { SignInDto } from '@/src/entities';
import { DB } from '@/src/utils';
import { createResponse } from '@/src/utils/auth';
import { serverTools } from '@/app/api/_utils/serverTools';

export async function POST(req: NextRequest) {
  const signInDto: SignInDto = await req.json();

  const findUser = await DB.users().findFirst({
    where: {
      email: signInDto.email,
    },
  });

  if (!findUser) {
    return createResponse<null>({
      type: 'error',
      resData: null,
      message: '존재하지 않는 사용자입니다.',
      status: 'NotFound',
    });
  }

  if (!(findUser.role === 'ADMIN')) {
    return createResponse<null>({
      type: 'error',
      resData: null,
      message: '관리자 계정이 아닙니다.',
      status: 'Unauthorized',
    });
  }

  const findAuth = await DB.auths().findFirst({
    where: {
      userId: findUser.id,
    },
  });

  const comparePassword = await serverTools.bcrypt.dataCompare(
    findAuth.password,
    signInDto.password
  );

  if (!comparePassword) {
    return createResponse<null>({
      type: 'error',
      resData: null,
      message: '비밀번호가 일치하지 않습니다.',
      status: 'Unauthorized',
    });
  }

  const accessToken = await serverTools
    .jwt.genToken('accessToken', findUser);
  const refreshToken = await serverTools
    .jwt.genToken('refreshToken', findUser);

  const accessTokenInfo = await serverTools
    .jwt.tokenInfo('accessToken', accessToken.token);

  const resUser = await DB.users().update({
    where: {
      id: findUser.id,
    },
    data: {
      accessToken: accessToken.token,
      exp: accessToken.exp,
      lastSignIn: new Date().toISOString(),
    },
  });

  cookies().set('session', serverTools.common.string({
    token: accessToken.token,
    exp: accessTokenInfo.exp,
  }), {
    secure: true,
    path: '/',
    httpOnly: true,
    expires: new Date(accessTokenInfo.exp * 1000),
  });

  cookies().set('isSignedIn', '1', {
    secure: true,
    path: '/',
    httpOnly: true,
    expires: new Date('9999-12-31'),
  });

  cookies().set('uid', findUser.uid, {
    secure: true,
    path: '/',
    httpOnly: true,
    expires: new Date('9999-12-31'),
  });

  await DB.refreshTokens().update({
    where: {
      userId: findUser.id,
    },
    data: {
      refreshToken: refreshToken.token,
    },
  });

  return createResponse<User>({
    type: 'success',
    resData: resUser,
    message: 'ok',
    status: 'Ok',
  });
}
