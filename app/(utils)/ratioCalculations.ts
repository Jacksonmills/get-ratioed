export const calculateReadableRatio = (a: number, b: number): string => {
  const scale = 1000;
  const ratioA = Math.round((a / (a + b)) * scale);
  const ratioB = Math.round((b / (a + b)) * scale);

  const gcd = (num1: number, num2: number): number => {
    return num2 === 0 ? num1 : gcd(num2, num1 % num2);
  };

  const divisor = gcd(ratioA, ratioB);
  return `${ratioA / divisor}:${ratioB / divisor}`;
};

export const calculatePercentage = (a: number, b: number): number => {
  const totalLikes = a + b;
  const maxLikes = Math.max(a, b);
  return Math.round((maxLikes / totalLikes) * 100);
};