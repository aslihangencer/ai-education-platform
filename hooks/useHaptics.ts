'use client';

export const useHaptics = () => {
  const triggerHaptic = (pattern: number | number[] = 10) => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  };

  const errorHaptic = () => triggerHaptic([50, 100, 50]);
  const successHaptic = () => triggerHaptic(20);
  const infoHaptic = () => triggerHaptic(10);

  return { triggerHaptic, errorHaptic, successHaptic, infoHaptic };
};
