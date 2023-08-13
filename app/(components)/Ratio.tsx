'use client';

import { useEffect, useState } from 'react';

export default function Ratio({ ratio }: { ratio: number }) {
  const [isAnimated, setIsAnimated] = useState(false);
  const [ratioNumber, setRatioNumber] = useState(0);

  const ratioDisplay = ratio === 100 ? '1:1' : `1:${Math.round(100 / ratio)}`;

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
      }, 10);
      return () => clearInterval(interval);
    }
  }, [isAnimated, ratio, ratioNumber]);

  return (
    <div className="text-xl font-bold text-green-500 w-full md:max-w-[800px] flex items-center flex-col gap-2">
      <div className="font-bold text-xl md:text-4xl flex justify-between w-full">
        <span>{ratioNumber}%</span>
        {ratioDisplay}
      </div>
      <RatioBar ratio={ratioNumber} targetRatio={ratio} />
    </div>
  );
}

const RatioBar = ({
  ratio,
  targetRatio,
}: {
  ratio: number;
  targetRatio: number;
}) => {
  const percentage = ratio > 100 ? 100 : ratio;

  const shakeWhenFull = ratio > 100 ? 'animate-shake-all-directions' : '';

  return (
    <div
      className={`flex w-full h-2 bg-gray-500 rounded-full overflow-hidden ${shakeWhenFull}`}
    >
      <span
        className="flex bg-green-500 h-2"
        style={{ width: `${percentage}%` }}
      />
      <span
        className="flex bg-red-500 h-2"
        style={{ width: `${101 - percentage}%` }}
      />
    </div>
  );
};
