'use client';

import { DURATION } from '@/lib/constants';
import { Space_Grotesk } from 'next/font/google';
import React from 'react';
import { Tweet } from 'react-tweet';
import { Tweet as TweetType } from 'react-tweet/api';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export default function TweetCard({
  tweet,
  isWinner,
  isOpposing = false,
}: {
  tweet: TweetType;
  isWinner: boolean;
  isOpposing?: boolean;
}) {
  const [count, setCount] = React.useState(0);

  const animate =
    count >= tweet.favorite_count && isWinner ? `animate-bounce` : '';

  React.useEffect(() => {
    const maxCount = tweet.favorite_count;
    const increment = Math.max(Math.floor(maxCount / 250), 1);
    const intervalTime = DURATION;

    if (count < maxCount) {
      const interval = setInterval(() => {
        setCount((prevCount) => {
          return prevCount + increment > maxCount
            ? maxCount
            : prevCount + increment;
        });
      }, intervalTime / 4);

      return () => clearInterval(interval);
    }
  }, [count, tweet.favorite_count]);

  return (
    <div className="flex flex-col items-center md:max-w-[322px]">
      <div
        className={`${animate} translate-y-[-25%] mb-[-1%] ease-in-out dark:bg-card bg-card py-2 px-4 rounded-lg border border-border flex items-center gap-2`}
      >
        ❤️{' '}
        <span
          className={`tabular-nums transition-all duration-200 ease-in-out font-bold text-xl md:text-4xl ${
            spaceGrotesk.className
          } ${!isOpposing ? 'text-primary' : 'text-secondary'}`}
        >
          {count}
        </span>
      </div>
      <div className="mb-[-24px] mt-[-12px] md:mt-none min-w-[318px]">
        <Tweet id={tweet.id_str} />
      </div>
    </div>
  );
}
