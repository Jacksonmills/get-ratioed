'use client';

import React from 'react';
import { Tweet } from 'react-tweet';
import { Tweet as TweetType } from 'react-tweet/api';

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
    count >= tweet.favorite_count && isWinner ? 'animate-bounce' : '';

  React.useEffect(() => {
    const maxCount = tweet.favorite_count;
    const increment = Math.max(Math.floor(maxCount / 100), 1);
    const intervalTime = 30;

    if (count < maxCount) {
      const interval = setInterval(() => {
        setCount((prevCount) => {
          return prevCount + increment > maxCount
            ? maxCount
            : prevCount + increment;
        });
      }, intervalTime);

      return () => clearInterval(interval);
    }
  }, [count, tweet.favorite_count]);

  return (
    <div className="flex flex-col items-center">
      <div
        className={`${animate} dark:bg-slate-900 bg-slate-100 py-2 px-4 rounded-lg border border-slate-300 dark:border-slate-700`}
      >
        <span
          className={`font-bold text-xl md:text-4xl ${
            !isOpposing ? 'text-blue-500' : 'text-red-500'
          }`}
        >
          {count}
        </span>{' '}
        likes
      </div>
      <div className="mb-[-24px] mt-[-12px] md:mt-none">
        <Tweet id={tweet.id_str} />
      </div>
    </div>
  );
}
