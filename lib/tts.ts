export function speak(text: string) {
  if (typeof window === 'undefined') return;

  // Cancel any ongoing speech to prevent overlap
  window.speechSynthesis.cancel();

  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = 'tr-TR';
  
  // Try to find the user's preferred speed from localStorage if available, otherwise default to 1.0 (or 0.9 as requested)
  const savedSpeed = localStorage.getItem('tts_speed');
  speech.rate = savedSpeed ? parseFloat(savedSpeed) : 0.9;
  speech.pitch = 1.0;
  
  // Optional: Add haptic feedback when voice starts
  if ('vibrate' in navigator) {
    navigator.vibrate(50);
  }

  window.speechSynthesis.speak(speech);
}

export function stopSpeaking() {
  if (typeof window !== 'undefined') {
    window.speechSynthesis.cancel();
  }
}
