'use client';

import React from 'react';
import useWindow from '../(hooks)/useWindow';
import LogoSVG from './LogoSVG';

export default function Logo() {
  const { isMobile, isLoading } = useWindow();

  if (isLoading)
    return (
      <h1 className="flex gap-2 items-center font-bold text-xl md:text-4xl animate-spin">
        <LogoSVG />
      </h1>
    );

  return (
    <h1 className="flex gap-2 items-center font-bold text-xl md:text-4xl">
      <LogoSVG />
      {!isMobile && <span className="">Ratioed!</span>}
    </h1>
  );
}
