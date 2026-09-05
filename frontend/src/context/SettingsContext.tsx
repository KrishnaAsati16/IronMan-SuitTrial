import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppSettings, HudMode } from '../types/hud';

interface SettingsContextType {
  settings: AppSettings;
  hudMode: HudMode;
  setHudMode: (mode: HudMode) => void;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  resetSettings: () => void;
}

const DEFAULT_SETTINGS: AppSettings = {
  voiceEnabled: true,
  selectedVoiceName: '',
  speechRate: 1.0,
  speechPitch: 1.0,
  soundEffectsEnabled: true,
  animationsEnabled: true,
  themeIntensity: 'high',
  colorTheme: 'stealth-black',
  simulationMode: true,
  defaultCity: 'Malibu'
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem('ironman_hud_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_SETTINGS,
          ...parsed,
          colorTheme: parsed.colorTheme || 'stealth-black'
        };
      }
      return DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [hudMode, setHudMode] = useState<HudMode>('normal');

  useEffect(() => {
    try {
      localStorage.setItem('ironman_hud_settings', JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to save settings to localStorage', e);
    }
  }, [settings]);

  const updateSettings = (partial: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <SettingsContext.Provider value={{ settings, hudMode, setHudMode, updateSettings, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
};
