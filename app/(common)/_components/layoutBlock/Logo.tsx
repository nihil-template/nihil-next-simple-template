'use client';

import React from 'react';
import css from '@/src/styles/module/app.module.css';

interface Props {
  children?: React.ReactNode;
}

export function Logo({ children, }: Props) {
  return (
    <>
      <div className={css.logo}>logo</div>
    </>
  );
}
