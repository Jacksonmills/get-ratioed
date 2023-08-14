'use client';

import { Space_Grotesk } from 'next/font/google';
import React, { useEffect, useState } from 'react';
import { DURATION } from '@/lib/constants';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export default function RatioDisplay({
  ratio,
  percentage,
}: {
  ratio: string;
  percentage: number;
}) {
  const [finishedAnimation, setFinishedAnimation] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFinishedAnimation(true);
    }, DURATION * 2);
  }, []);

  return (
    <>
      <span className={`tabular-nums ${spaceGrotesk.className}`}>
        {percentage}%
      </span>

      <div
        className={`${
          finishedAnimation && 'animate-ping repeat-1 opacity-100'
        } opacity-0 flex justify-center items-center gap-1 ${
          spaceGrotesk.className
        }`}
      >
        <span className="tabular-nums text-blue-500">
          {ratio.split(':')[0]}
        </span>
        <span>:</span>
        <span className="tabular-nums text-red-500">{ratio.split(':')[1]}</span>
      </div>
    </>
  );
}
