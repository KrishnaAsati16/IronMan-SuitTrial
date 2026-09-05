export type HudMode = 'normal' | 'helmet';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: number;
}

export interface AppSettings {
  voiceEnabled: boolean;
  selectedVoiceName: string;
  speechRate: number;
  speechPitch: number;
  soundEffectsEnabled: boolean;
  animationsEnabled: boolean;
  themeIntensity: 'subtle' | 'high' | 'ultra';
  simulationMode: boolean;
  defaultCity: string;
}
