export default function RatioBar({ ratio }: { ratio: number }) {
  const percentage = ratio > 100 ? 100 : ratio;

  const shakeWhenFull = ratio > 100 ? 'animate-shake-all-directions' : '';

  return (
    <div
      className={`flex w-full h-2 bg-gray-500 rounded-full overflow-hidden ${shakeWhenFull} relative`}
    >
      <span
        className="flex bg-blue-500 h-2"
        style={{ width: `${percentage}%` }}
      />
      <span
        className="flex bg-red-500 h-2"
        style={{ width: `${101 - percentage}%` }}
      />
      <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full w-[1px] bg-yellow-200" />
    </div>
  );
}
