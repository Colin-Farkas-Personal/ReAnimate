// animationUtils.ts
export type TAnimationCallback = {
  progress: number;
  from: number;
  to: number;
};
export function calculateNewValue(easeValue: number, from: number, to: number) {
  return easeValue * to + from;
}
export const animatePromise = (
  animationCallback: ({ progress, to }: TAnimationCallback) => void,
  intervalDuration: number,
  valueStart: number,
  valueEnd: number
): Promise<void> => {
  return new Promise<void>((resolve) => {
    const startTime = performance.now();

    const animateCallback = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / intervalDuration, 1);
      const to = valueEnd - valueStart;
      animationCallback({ progress, from: valueStart, to });

      if (progress < 1) {
        requestAnimationFrame(animateCallback);
      } else {
        resolve();
      }
    };

    requestAnimationFrame(animateCallback);
  });
};
