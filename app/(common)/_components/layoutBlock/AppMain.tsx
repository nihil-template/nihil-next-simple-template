import React from 'react';
import css from '@/src/styles/module/app.module.css';

interface Props {
  children: React.ReactNode;
}

export function AppMain({ children, }: Props) {
  return (
    <>
      <main className={css.container}>{children}</main>
    </>
  );
}
