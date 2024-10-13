'use client';

import React from 'react';
import css from '@/src/styles/module/app.module.css';

interface Props {
  children?: React.ReactNode;
}

export function Footer({ children, }: Props) {
  return (
    <>
      <footer className={css.footer}>footer</footer>
    </>
  );
}
