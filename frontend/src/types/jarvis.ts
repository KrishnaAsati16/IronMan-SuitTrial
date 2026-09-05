export interface JarvisMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  commandDetected?: {
    type: string;
    target?: string;
  };
  provider?: string;
  latencyMs?: number;
}

export interface VoiceState {
  isListening: boolean;
  transcript: string;
  isSpeaking: boolean;
  supported: boolean;
  error: string | null;
}

export interface JarvisStatus {
  status: 'ONLINE' | 'OFFLINE' | 'DEGRADED';
  mode: string;
  provider: string;
  latencyMs: number;
  voiceEnabled: boolean;
  aiConnected: boolean;
}
