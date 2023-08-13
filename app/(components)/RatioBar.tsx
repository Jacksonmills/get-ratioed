export default function RatioBar({
  ratio,
  targetRatio,
}: {
  ratio: number;
  targetRatio: number;
}) {
  const percentage = ratio > 100 ? 100 : ratio;

  const shakeWhenFull = ratio > 100 ? 'animate-shake-all-directions' : '';

  return (
    <div
      className={`flex w-full h-2 bg-gray-500 rounded-full overflow-hidden ${shakeWhenFull}`}
    >
      <span
        className="flex bg-blue-500 h-2"
        style={{ width: `${percentage}%` }}
      />
      <span
        className="flex bg-red-500 h-2"
        style={{ width: `${101 - percentage}%` }}
      />
    </div>
  );
}
