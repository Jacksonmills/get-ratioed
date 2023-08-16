'use client';

import React from 'react';
import useWindow from '../(hooks)/useWindow';
import LogoSVG from './LogoSVG';

export default function Logo() {
  const { isMobile } = useWindow();

  if (isMobile === null) return null;

  return (
    <div className="flex gap-1 items-center">
      <LogoSVG />
      {!isMobile && <span className="uppercase">Ratioed!</span>}
    </div>
  );
}
