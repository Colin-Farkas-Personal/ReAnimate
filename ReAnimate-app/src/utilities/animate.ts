// animationUtils.ts
export type TAnimationCallback = {
  progress: number;
  to: number;
};

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
      const to = valueEnd - valueStart + valueStart;
      animationCallback({ progress, to });

      if (progress < 1) {
        requestAnimationFrame(animateCallback);
      } else {
        resolve();
      }
    };

    requestAnimationFrame(animateCallback);
  });
};
