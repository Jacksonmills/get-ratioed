'use client';

import React from 'react';
import LogoSVG from './LogoSVG';

export default function Logo() {
  return (
    <h1 className="flex gap-2 items-center font-bold text-xl md:text-4xl">
      <div className="animate-spin repeat-1">
        <LogoSVG />
      </div>
      <span className="md:block hidden">Ratioed!</span>
    </h1>
  );
}
