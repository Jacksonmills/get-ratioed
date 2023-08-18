export default function RatioBar({
  ratio,
  isTweetAWinner,
  targetPercentage,
}: {
  ratio: number;
  isTweetAWinner: boolean;
  targetPercentage: number;
}) {
  const percentage = ratio > 100 ? 100 : ratio;
  const winningPercentage = isTweetAWinner ? percentage : 100 - percentage;
  const losingPercentage = 100 - winningPercentage;

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

      <span
        className={`emojiExplode absolute transition-all duration-200 delay-100 ease ${
          winningPercentage !== targetPercentage && 'animate-none'
        }`}
        style={{
          transform: `scale(${winningPercentage === targetPercentage ? 1 : 0})`,
          left: `calc(${winningPercentage}% - 0.5em)`,
        }}
      />
    </div>
  );
}
