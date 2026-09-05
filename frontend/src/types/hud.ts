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
  colorTheme: 'stealth-black' | 'cyber-cyan' | 'crimson-gold';
  simulationMode: boolean;
  defaultCity: string;
}
