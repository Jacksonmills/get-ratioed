'use client'

import React from 'react'
import { Tweet } from 'react-tweet';
import { Tweet as TweetType } from 'react-tweet/api';

export default function TweetCard({tweet, isWinner}: { tweet:TweetType; isWinner: boolean }) {
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    const maxCount = tweet.favorite_count
    const increment = Math.max(Math.floor(maxCount / 100), 1)
    const intervalTime = 30;

    if (count < maxCount) {
      const interval = setInterval(() => {
        setCount((prevCount) => {
          return prevCount + increment > maxCount ? maxCount : prevCount + increment;
        });
      }, intervalTime);

      return () => clearInterval(interval);
    }
  }, [count, tweet.favorite_count])

  return (
    <div className='flex flex-col items-center'>
      <div className={`font-bold ${isWinner ? 'text-green-500' : 'text-red-500'}`}>
        <span className='text-4xl'>{count}</span> <span className='text-white font-thin'>likes</span>
      </div>
      <Tweet id={tweet.id_str} />
    </div>
  )
}
