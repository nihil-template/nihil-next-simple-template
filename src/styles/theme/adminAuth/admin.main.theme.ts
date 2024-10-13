import { twJoin } from 'tailwind-merge';

export const adminMainTheme = {
  adminSignInButton: twJoin([
    `bg-black-base text-white flex flex-row justify-center items-center w-full p-2 py-3 mt-5 transition-colors duration-200 ease-in-out`,
    `hover:bg-blue-500`,
  ]),
};
