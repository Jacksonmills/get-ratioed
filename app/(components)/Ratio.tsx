'use client'

import { useEffect, useState } from "react";

export default function Ratio({ ratio }: { ratio: number }) {
  const [isAnimated, setIsAnimated] = useState(false);
  const [ratioNumber, setRatioNumber] = useState(0);

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
    <div className="text-xl font-bold text-green-500 w-full">
      {ratioNumber}%
      <RatioBar ratio={ratioNumber} targetRatio={ratio} />
    </div>
  );
}

const RatioBar = ({ ratio, targetRatio }: { ratio: number, targetRatio: number }) => {
  if (ratio > 100) {
    ratio = 100;
    targetRatio = 100;
  };
  
  const shakeWhenFull = targetRatio === 100 && ratio === targetRatio ? 'animate-shake' : '';

  return (
    <div className={`flex w-full h-2 bg-gray-500 rounded-full overflow-hidden ${shakeWhenFull}`}>
      <span className="flex bg-green-500 h-2" style={{ width: `${ratio}%` }} />
      <span className="flex bg-red-500 h-2" style={{ width: `${100 - ratio}%` }} />
    </div>
  );
}
