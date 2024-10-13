'use client';

import React from 'react';
import css from '@/src/styles/module/app.module.css';
import { Logo, Nav } from '@/app/(common)/_components';

interface Props {
  children?: React.ReactNode;
}

export function Header({ children, }: Props) {
  return (
    <>
      <header className={css.header}>
        <Logo />

        <div>
          <Nav />
        </div>
      </header>
    </>
  );
}
