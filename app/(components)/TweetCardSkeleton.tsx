'use client';

import { Heart } from 'lucide-react';
import { Space_Grotesk } from 'next/font/google';
import React from 'react';
import { TweetSkeleton } from 'react-tweet';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export default function TweetCardSkeleton({
  isOpposing = false,
}: {
  isOpposing?: boolean;
}) {
  return (
    <div className="flex flex-col items-center md:max-w-[322px]">
      <div
        className={`translate-y-[-25%] mb-[-1%] ease-in-out dark:bg-card bg-card py-2 px-4 rounded-lg border border-border flex items-center gap-2`}
      >
        <Heart className="fill-secondary stroke-secondary" />{' '}
        <span
          className={`tabular-nums transition-all duration-200 ease-in-out font-bold text-xl md:text-4xl ${
            spaceGrotesk.className
          } ${!isOpposing ? 'text-primary' : 'text-secondary'}`}
        >
          0
        </span>
      </div>
      <div className="mb-[-24px] mt-[-12px] md:mt-none min-w-[318px]">
        <TweetSkeleton />
      </div>
    </div>
  );
}
