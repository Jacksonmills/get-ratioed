'use client';

import { useEffect, useState } from 'react';
import RatioBar from './RatioBar';
import { Space_Grotesk } from 'next/font/google';
import { calculatePercentage } from '../(utils)/ratioCalculations';
import { DURATION } from '@/lib/constants';
import { Link2 } from 'lucide-react';
import { Button } from './ui/button';
import toast from 'react-hot-toast';

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
  const winningPercentage = calculatePercentage(likesA, likesB);

  const animate = ratioPercentage === winningPercentage ? 'animate-ping' : '';

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
    <div className="flex flex-col items-center gap-1 w-full">
      <div className="flex items-center justify-between w-full">
        <p className="text-slate-600 text-xs">Results may vary</p>
        <Button
          variant={`ghost`}
          className="flex items-center gap-2 font-bold"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            toast.success('Copied link to clipboard', {
              position: 'bottom-center',
              icon: '📋',
            });
          }}
        >
          <Link2 size={24} className="-rotate-45" />
          Copy link
        </Button>
      </div>
      <div className="text-xl font-bold w-full flex items-center flex-col gap-2 border p-4 rounded-xl border-border bg-card">
        <div
          className={`font-bold text-4xl md:text-6xl ${animate} repeat-1 ease-in-out`}
        >
          <span className={`tabular-nums ${spaceGrotesk.className}`}>
            {ratioPercentage}%
          </span>
        </div>
        <RatioBar
          ratio={ratioPercentage}
          targetPercentage={winningPercentage}
          isTweetAWinner={likesA > likesB}
        />
      </div>
    </div>
  );
}
