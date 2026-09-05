import { useState, useEffect, useRef, useCallback } from 'react';

interface VoiceAssistantProps {
  onCommand?: (transcript: string) => void;
}

export function useVoiceAssistant({ onCommand }: VoiceAssistantProps = {}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [supported, setSupported] = useState(true);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRec) {
      setSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
      };

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);

        if (event.results[0]?.isFinal) {
          if (onCommand && currentTranscript.trim()) {
            onCommand(currentTranscript.trim());
          }
        }
      };

      recognition.onerror = (event: any) => {
        if (event.error !== 'no-speech') {
          setError(`Microphone error: ${event.error}`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } catch (e: any) {
      setSupported(false);
      setError('Speech recognition could not be initialized.');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [onCommand]);

  const startListening = useCallback(() => {
    if (!supported || !recognitionRef.current) {
      setError('Voice recognition is not supported in this browser. Please use text input.');
      return;
    }
    try {
      setTranscript('');
      setError(null);
      recognitionRef.current.start();
    } catch (e: any) {
      // If already started, ignore
      console.warn('Recognition start caught', e);
    }
  }, [supported]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  }, []);

  return {
    startListening,
    stopListening,
    isListening,
    transcript,
    error,
    supported
  };
}
