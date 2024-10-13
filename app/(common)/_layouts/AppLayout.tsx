'use client';

import React from 'react';
import { AppMain, Footer, Header } from '@/app/(common)/_components';

interface Props {
  children?: React.ReactNode;
}

export function AppLayout({ children, }: Props) {
  return (
    <>
      <Header />

      <AppMain>
        {children}
      </AppMain>

      <Footer />
    </>
  );
}
