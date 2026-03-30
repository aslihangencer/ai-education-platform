"use client";
import React, { createContext, useContext, useRef, useCallback } from 'react';

/**
 * AudioGuideContext:
 * Centralizes the Web Speech API (speechSynthesis) to manage 
 * all on-hover and focus-driven accessibility narration.
 * Prevents "audio noise" by cancelling previous utterances and 
 * implementing a slight debounce for rapid mouse movements.
 */
interface AudioContextType {
  speak: (text: string, delay?: number) => void;
  stop: () => void;
}

const AudioGuideContext = createContext<AudioContextType | null>(null);

export const AudioGuideProvider = ({ children }: { children: React.ReactNode }) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  const stop = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (synthRef.current) {
        synthRef.current.cancel();
    }
  }, []);

  const speak = useCallback((text: string, delay = 400) => {
    stop();
    if (!synthRef.current) return;

    timeoutRef.current = setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "tr-TR";
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      synthRef.current?.speak(utterance);
    }, delay);
  }, [stop]);

  return (
    <AudioGuideContext.Provider value={{ speak, stop }}>
      {children}
    </AudioGuideContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioGuideContext);
  if (!context) {
    // Return a dummy implementation to prevent crashes if used outside provider
    return {
      speak: (text: string) => console.log("AudioGuide not available:", text),
      stop: () => {}
    };
  }
  return context;
};
