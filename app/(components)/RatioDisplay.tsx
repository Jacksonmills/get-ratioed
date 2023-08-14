'use client';

import { Space_Grotesk } from 'next/font/google';
import React, { useEffect, useState } from 'react';
import {
  calculatePercentage,
  calculateReadableRatio,
} from '../(utils)/ratioCalculations';
import { DURATION } from '@/lib/constants';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export default function RatioDisplay({ a, b }: { a: number; b: number }) {
  const [ratioCountA, ratioCountB] = useState([0, 0]);
  const [percentage, setPercentage] = useState(0);

  const ratio = calculateReadableRatio(a, b); // 16:9
  const ratioAsPercentage = calculatePercentage(a, b); // 56

  useEffect(() => {
    if (percentage < ratioAsPercentage) {
      setTimeout(() => {
        setPercentage((percentage) => percentage + 1);
      }, DURATION);
    }
  }, [percentage, ratioAsPercentage]);

  return (
    <>
      <span className={`tabular-nums ${spaceGrotesk.className}`}>
        {percentage}%
      </span>

      <div
        className={`${
          percentage === ratioAsPercentage &&
          'animate-ping repeat-1 opacity-100'
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
