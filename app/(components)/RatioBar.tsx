'use client';

import { useEffect, useState } from 'react';

function getThreeRandomEmojis() {
  const ratioReactions = [
    '🍿',
    '🎣',
    '🚂',
    '🤡',
    '🍅',
    '🤯',
    '🎤',
    '🤭',
    '🥴',
    '💀',
    '🍵',
    '🎪',
    '🌋',
    '🍔',
    '🤖',
    '🎉',
    '📉',
    '👀',
    '🎈',
    '🕶️',
    '🤬',
    '🔥',
    '👏',
    '💥',
    '😭',
    '🤯',
    '🤔',
    '🤫',
    '🤐',
    '🤨',
  ];

  const shuffled = ratioReactions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
}

export default function RatioBar({
  ratio,
  isTweetAWinner,
  targetPercentage,
}: {
  ratio: number;
  isTweetAWinner: boolean;
  targetPercentage: number;
}) {
  const [emojis, setEmojis] = useState(['🤬', '🔥', '👀']);

  const percentage = ratio > 100 ? 100 : ratio;
  const winningPercentage = isTweetAWinner ? percentage : 100 - percentage;
  const losingPercentage = 100 - winningPercentage;

  useEffect(() => {
    setEmojis(getThreeRandomEmojis());
  }, []);

  return (
    <div className="relative w-full">
      <div className="flex w-full h-2 bg-gray-500 rounded-full overflow-hidden">
        <span
          className="flex h-2 bg-primary transition-width duration-200 ease"
          style={{ width: `${winningPercentage}%` }}
        ></span>
        <span
          className="flex h-2 bg-secondary transition-width duration-200 ease"
          style={{
            width: `${losingPercentage}%`,
            direction: isTweetAWinner ? 'ltr' : 'rtl',
          }}
        />
        <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full w-[1px] bg-current" />
      </div>

      <EmojiSplode
        emoji={emojis[0]}
        winningPercentage={
          isTweetAWinner ? winningPercentage : losingPercentage
        }
        targetPercentage={targetPercentage}
        isTweetAWinner={isTweetAWinner}
        direction="top"
      />
      <EmojiSplode
        emoji={emojis[1]}
        winningPercentage={
          isTweetAWinner ? winningPercentage : losingPercentage
        }
        targetPercentage={targetPercentage}
        isTweetAWinner={isTweetAWinner}
        direction="middle"
      />
      <EmojiSplode
        emoji={emojis[2]}
        winningPercentage={
          isTweetAWinner ? winningPercentage : losingPercentage
        }
        targetPercentage={targetPercentage}
        isTweetAWinner={isTweetAWinner}
        direction="bottom"
      />
    </div>
  );
}

function EmojiSplode({
  emoji,
  winningPercentage,
  targetPercentage,
  isTweetAWinner,
  direction = 'top',
}: {
  emoji: string;
  winningPercentage: number;
  targetPercentage: number;
  isTweetAWinner: boolean;
  direction?: 'top' | 'middle' | 'bottom';
}) {
  const randomDelay = ['300', '500', '700', '1000'];
  const randomIndex = Math.floor(Math.random() * randomDelay.length);
  let transformString = '';

  switch (direction) {
    case 'top':
      transformString = isTweetAWinner
        ? '-translate-y-full translate-x-1/2 rotate-45'
        : '-translate-y-full -translate-x-1/2 -rotate-45';
      break;
    case 'middle':
      transformString = isTweetAWinner
        ? 'translate-y-none translate-x-full -rotate-360'
        : 'translate-y-none -translate-x-full rotate-360';
      break;
    case 'bottom':
      transformString = isTweetAWinner
        ? 'translate-y-1/2 translate-x-1/2 -rotate-45'
        : 'translate-y-1/2 -translate-x-1/2 rotate-45';
      break;
  }

  return (
    <div
      className={`transition-transform delay-${
        randomDelay[randomIndex]
      } duration-1000 ${
        winningPercentage === targetPercentage ? 'translate-y-[50px]' : ''
      }`}
    >
      <span
        className={`absolute rotate-0 transition-all delay-200 duration-${
          randomDelay[randomIndex]
        } ease-out top-[-0.5em] left-0 ${
          winningPercentage === targetPercentage
            ? `opacity-100 scale-150 ${transformString}`
            : 'opacity-0 scale-0'
        }`}
        style={{
          left: isTweetAWinner ? `calc(${targetPercentage}% - 0.5em)` : 'unset',
          right: isTweetAWinner
            ? 'unset'
            : `calc(${targetPercentage}% - 0.5em)`,
        }}
      >
        <span
          className={`block transition-opacity ease-out duration-1000 delay-${
            randomDelay[randomIndex]
          } ${
            winningPercentage === targetPercentage ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {emoji}
        </span>
      </span>
    </div>
  );
}
