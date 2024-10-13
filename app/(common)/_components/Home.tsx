'use client';

import React from 'react';
import css from '@/src/styles/module/home.module.css';

interface Props {
  children?: React.ReactNode;
}

export function Home({ children, }: Props) {
  return (
    <>
      <div className={css.test}>content</div>
    </>
  );
}
