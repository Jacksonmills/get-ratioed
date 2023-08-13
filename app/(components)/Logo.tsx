'use client';

import React from 'react';
import useWindow from '../(hooks)/useWindow';

export default function Logo() {
  const { isMobile } = useWindow();

  return (
    <div className="flex gap-1 items-baseline">
      <div className="md:w-[1.8rem] md:h-[1.8rem] w-[1.4rem] h-[1.4rem] relative top-[-6px] md:top-[-10px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 156.6 210"
          fill={`currentColor`}
        >
          <path d="M0,210V0H91.2c13.2,0,24.7,2.3,34.5,6.9,9.8,4.6,17.4,11.1,22.8,19.5,5.4,8.4,8.1,18.3,8.1,29.7v3.6c0,12.6-3,22.8-9,30.6s-13.4,13.5-22.2,17.1v5.4c8,.4,14.2,3.15,18.6,8.25,4.4,5.1,6.6,11.85,6.6,20.25v68.7h-39.6v-63c0-4.8-1.25-8.7-3.75-11.7-2.5-3-6.65-4.5-12.45-4.5H39.6v79.2H0Z" />
          <circle className="fill-[#2a66ff]" cx="78.25" cy="59.06" r="42.44" />
          <path
            className="fill-[#80a7ff]"
            d="M120.69,59.06c0,23.44-19,42.44-42.44,42.44s-42.44-19-42.44-42.44"
          />
          <path
            className="fill-[#aa0900]"
            d="M99.26,22.25c20.39,11.56,27.55,37.45,16,57.85-11.56,20.39-37.45,27.55-57.85,16"
          />
        </svg>
      </div>
      {!isMobile && <span className="uppercase">atioed!</span>}
    </div>
  );
}
