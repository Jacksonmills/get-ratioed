'use client';

import { useEffect, useState } from 'react';
import RatioBar from './RatioBar';
import RatioDisplay from './RatioDisplay';
import { Space_Grotesk } from 'next/font/google';
import {
  calculatePercentage,
  calculateReadableRatio,
} from '../(utils)/ratioCalculations';
import { DURATION } from '@/lib/constants';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export default function Ratio({
  likesA,
  likesB,
}: {
  likesA: number;
  likesB: number;
}) {
  const [isAnimated, setIsAnimated] = useState(false);
  const [ratioPercentage, setRatioPercentage] = useState(0);
  const calculatedRatio = calculateReadableRatio(likesA, likesB);
  const winningPercentage = calculatePercentage(likesA, likesB);

  useEffect(() => {
    if (winningPercentage > 0 && !isAnimated) {
      setIsAnimated(true);
    }
    if (isAnimated) {
      const interval = setInterval(() => {
        if (ratioPercentage < winningPercentage) {
          setRatioPercentage(ratioPercentage + 1);
        } else {
          clearInterval(interval);
        }
      }, DURATION);
      return () => clearInterval(interval);
    }
  }, [isAnimated, ratioPercentage, winningPercentage]);

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <p className="text-slate-600">
        Numbers may vary due to tweet updates & rounding.
      </p>
      <div className="text-xl font-bold w-full flex items-center flex-col gap-2 border p-4 rounded-xl border-slate-300 dark:border-slate-700 dark:bg-slate-900 bg-slate-100">
        <div className="font-bold text-xl md:text-4xl flex w-full justify-between">
          <RatioDisplay
            ratio={calculatedRatio}
            percentage={winningPercentage}
          />
        </div>
        <RatioBar ratio={ratioPercentage} isTweetAWinner={likesA > likesB} />
      </div>
    </div>
  );
}
