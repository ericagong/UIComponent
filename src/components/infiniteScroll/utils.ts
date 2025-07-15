const randomShuffle = <T>(arr: T[]): T[] => {
  // Fisher-Yates shuffle algorithm
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

export const randomize = <T>(arr: T[], length: number = 1): T[] => {
  if (!Array.isArray(arr) || arr.length === 0) return [];

  const shuffled = randomShuffle(arr);
  const endIdx = Math.min(length, arr.length);

  return shuffled.slice(0, endIdx);
};

export const getRandomNumber = ({
  min = 0,
  max = 0,
  step = 1,
}: {
  min: number;
  max: number;
  step: number;
}) => {
  if (max < min || max - min < step)
    throw new Error(
      `[Wrong Arguments] min: ${min}, max: ${max}, step: ${step}`,
    );

  // [min, max) 범위에서 step 단위로 랜덤한 숫자 생성
  const randomNum = Math.random() * (max - min) + min;
  const steppedNum = Math.floor(randomNum / step) * step;
  return Math.max(steppedNum, min);
};

export const waitFor = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
