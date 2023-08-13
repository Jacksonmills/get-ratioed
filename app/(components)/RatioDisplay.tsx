import React from 'react';

const calculateReadableRatio = (a: number, b: number): string => {
  const percentA = (a / (a + b)) * 100;
  const percentB = (b / (a + b)) * 100;

  const gcd = (num1: number, num2: number): number => {
    return num2 === 0 ? num1 : gcd(num2, num1 % num2);
  };

  const divisor = gcd(Math.floor(percentA), Math.floor(percentB));
  return `${Math.floor(percentA / divisor)}:${Math.floor(percentB / divisor)}`;
};

export default function RatioDisplay({ a, b }: { a: number; b: number }) {
  const ratio = calculateReadableRatio(a, b);

  return (
    <div className="flex justify-center items-center gap-1">
      <span className="text-blue-500">{ratio.split(':')[0]}</span>
      <span>:</span>
      <span className="text-red-500">{ratio.split(':')[1]}</span>
    </div>
  );
}
