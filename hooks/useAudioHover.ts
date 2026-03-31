"use client";

import { useAudio } from "@/context/AudioGuideContext";
import { useCallback } from "react";

/**
 * useAudioHover:
 * A custom hook that provides hover and focus audio narration
 * for interactive elements. Automatically speaks the provided text
 * when the element is hovered or focused.
 */
export const useAudioHover = (text: string, delay = 400) => {
  const { speak, stop } = useAudio();

  const onMouseEnter = useCallback(() => {
    speak(text, delay);
  }, [speak, text, delay]);

  const onMouseLeave = useCallback(() => {
    stop();
  }, [stop]);

  const onFocus = useCallback(() => {
    speak(text, delay);
  }, [speak, text, delay]);

  const onBlur = useCallback(() => {
    stop();
  }, [stop]);

  return {
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
  };
};