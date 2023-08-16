import LogoSVG from '@/app/(components)/LogoSVG';
import React from 'react';

export default function loading() {
  return (
    <div className="w-screen h-screen grid place-content-center">
      <div className="animate-spin scale-150">
        <LogoSVG />
      </div>
    </div>
  );
}
