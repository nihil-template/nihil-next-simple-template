import { twJoin } from 'tailwind-merge';

export const adminAuthTheme = {
  container: twJoin([
    `flex flex-col items-center justify-center dvh-100 font-500 text-black-base`,
  ]),
  authBox: twJoin([
    `border-2 border-black-200 p-5 flex flex-col items-center justify-center text-md w-[calc(100dvw-40px)] mo-sm:max-w-[600px]`,
  ]),
  logoBox: twJoin([
    `flex flex-col items-center justify-center`,
  ]),
  authLogo: twJoin([
    `w-[200px]`,
  ]),
  AuthTitle: twJoin([
    `text-center font-900 text-h2`,
  ]),
};
