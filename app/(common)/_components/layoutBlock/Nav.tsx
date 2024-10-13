'use client';

import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

interface Props {
  children?: React.ReactNode;
}

const StyledNav = styled.nav``;

export function Nav({ children, }: Props) {
  return (
    <>
      <StyledNav>
        <Link href='/'>홈</Link>
      </StyledNav>
    </>
  );
}
