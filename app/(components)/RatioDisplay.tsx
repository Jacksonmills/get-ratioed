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
  const [percentageCount, setPercentageCount] = useState(0);

  useEffect(() => {
    if (percentageCount < percentage) {
      setTimeout(() => {
        setPercentageCount((percentageCount) => percentageCount + 1);
      }, DURATION);
    }
  }, [percentage, percentageCount]);

  return (
    <>
      <span className={`tabular-nums ${spaceGrotesk.className}`}>
        {percentage}%
      </span>

      <div
        className={`${
          percentageCount === percentage && 'animate-ping repeat-1 opacity-100'
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
