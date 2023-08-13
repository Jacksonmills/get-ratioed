'use client';

import { useEffect, useState } from 'react';
import RatioBar from './RatioBar';
import RatioDisplay from './RatioDisplay';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export default function Ratio({
  likesA,
  likesB,
  ratio,
}: {
  likesA: number;
  likesB: number;
  ratio: number;
}) {
  const [isAnimated, setIsAnimated] = useState(false);
  const [ratioNumber, setRatioNumber] = useState(0);

  const opposingRatio = 100 - ratioNumber <= 0 ? '0' : 100 - ratioNumber;

  useEffect(() => {
    if (ratio > 0 && !isAnimated) {
      setIsAnimated(true);
    }
    if (isAnimated) {
      const interval = setInterval(() => {
        if (ratioNumber < ratio) {
          setRatioNumber(ratioNumber + 1);
        } else {
          clearInterval(interval);
        }
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isAnimated, ratio, ratioNumber]);

  return (
    <div className="text-xl font-bold w-full flex items-center flex-col gap-2 border p-4 rounded-xl border-slate-300 dark:border-slate-700 dark:bg-slate-900 bg-slate-100">
      <div className="font-bold text-xl md:text-4xl flex w-full">
        {/* <span className={`tabular-nums ${spaceGrotesk.className}`}>
          {ratioNumber}%
        </span> */}
        <RatioDisplay a={likesA} b={likesB} />
        {/* <span className={`tabular-nums ${spaceGrotesk.className}`}>
          {opposingRatio}%
        </span> */}
      </div>
      <RatioBar ratio={ratioNumber} />
    </div>
  );
}
