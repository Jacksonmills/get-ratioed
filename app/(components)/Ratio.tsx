'use client'

import { useEffect, useState } from "react";

export default function Ratio({ ratio }: { ratio: number }) {
  const [ratioNumber, setRatioNumber] = useState(0);
  const scaledRatio = ratio > 100 ? 100 : ratio; // Ensuring that the ratio never exceeds 100

  useEffect(() => {
    const interval = setInterval(() => {
      if (ratioNumber < scaledRatio) {
        setRatioNumber(ratioNumber + 1);
      } else {
        clearInterval(interval);
      }
    }, 10);
    return () => clearInterval(interval);
  }, [scaledRatio, ratioNumber]);

  return (
    <div className="text-xl font-bold w-full md:max-w-[800px]">
      <div className="flex justify-between">
        <span className="text-green-500">{ratioNumber}%</span>
        <span className="text-red-500">{100 - ratioNumber}%</span>
      </div>
      <RatioBar ratio={ratioNumber} />
    </div>
  );
}

const RatioBar = ({ ratio }: { ratio: number }) => {
  return (
    <div className="flex w-full h-2 rounded-full overflow-hidden">
      <span className="flex bg-green-500 h-2" style={{ width: `${ratio}%` }} />
      <span className="flex bg-red-500 h-2" style={{ width: `${100 - ratio}%` }} />
    </div>
  );
}
