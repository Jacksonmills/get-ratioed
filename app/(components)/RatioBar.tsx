export default function RatioBar({
  ratio,
  isTweetAWinner,
}: {
  ratio: number;
  isTweetAWinner: boolean;
}) {
  const percentage = ratio > 100 ? 100 : ratio;
  const winningPercentage = isTweetAWinner ? percentage : 100 - percentage;
  const losingPercentage = 100 - winningPercentage;

  return (
    <div className="flex w-full h-2 bg-gray-500 rounded-full overflow-hidden relative">
      <span
        className="flex h-2 bg-primary"
        style={{ width: `${winningPercentage}%` }}
      />
      <span
        className="flex h-2 bg-secondary"
        style={{
          width: `${losingPercentage}%`,
          direction: isTweetAWinner ? 'ltr' : 'rtl',
        }}
      />
      <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full w-[1px] bg-current" />
    </div>
  );
}
