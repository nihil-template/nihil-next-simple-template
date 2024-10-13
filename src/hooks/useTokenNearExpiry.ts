import { useUsersStore } from '@/src/hooks';

interface TokenStatus {
  isNearExpiry: boolean;
  message: string;
}

export function useTokenNearExpiry(): TokenStatus | null {
  const { me, } = useUsersStore();

  if (!me) {
    console.log('로그인 상태가 아닙니다.');
    return null;
  }

  const now = Math.floor(Date.now() / 1000);
  const timeUntilExpiry = Math.floor(me.exp) - now;

  const getTokenStatus = (): TokenStatus => {
    if (timeUntilExpiry > 180) {
      return {
        isNearExpiry: false,
        message: `토큰이 유효합니다. (${timeUntilExpiry}초 남음)`,
      };
    }
    if (timeUntilExpiry > 0) {
      return {
        isNearExpiry: true,
        message: `토큰이 곧 만료됩니다. (${timeUntilExpiry}초 후)`,
      };
    }
    return {
      isNearExpiry: true,
      message: `토큰이 만료되었습니다. (${Math.abs(timeUntilExpiry)}초 전)`,
    };
  };

  const tokenStatus = getTokenStatus();
  console.log(tokenStatus.message);

  return tokenStatus;
}
