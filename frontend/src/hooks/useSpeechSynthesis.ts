import { useState, useEffect, useCallback } from 'react';
import { useSettings } from '../context/SettingsContext';

export function useSpeechSynthesis() {
  const { settings } = useSettings();
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const loadVoices = () => {
      const available = window.speechSynthesis.getVoices();
      setVoices(available);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (!settings.voiceEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) {
        return;
      }

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = settings.speechRate || 1.0;
      utterance.pitch = settings.speechPitch || 1.0;

      // Prefer a British English voice for authentic JARVIS feel (Daniel, George, Oliver, Arthur, etc.)
      if (voices.length > 0) {
        let voice: SpeechSynthesisVoice | undefined;
        if (settings.selectedVoiceName) {
          voice = voices.find((v) => v.name === settings.selectedVoiceName);
        }
        if (!voice) {
          voice =
            voices.find((v) => v.lang === 'en-GB' && v.name.toLowerCase().includes('male')) ||
            voices.find((v) => v.lang === 'en-GB') ||
            voices.find((v) => v.lang.startsWith('en') && v.name.toLowerCase().includes('natural')) ||
            voices.find((v) => v.lang.startsWith('en'));
        }
        if (voice) {
          utterance.voice = voice;
        }
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    },
    [settings.voiceEnabled, settings.selectedVoiceName, settings.speechRate, settings.speechPitch, voices]
  );

  return { speak, stopSpeaking, isSpeaking, voices };
}
