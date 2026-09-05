import React, { createContext, useContext, useEffect } from 'react';
import { audioSynth } from '../utils/audioSynthesizer';
import { useSettings } from './SettingsContext';

interface AudioContextType {
  playClick: () => void;
  playCommandAccepted: () => void;
  playWarning: () => void;
  playSystemOnline: () => void;
  playStartupSound: () => void;
}

const AudioCtx = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { settings } = useSettings();

  useEffect(() => {
    audioSynth.setMuted(!settings.soundEffectsEnabled);
  }, [settings.soundEffectsEnabled]);

  const value: AudioContextType = {
    playClick: () => audioSynth.playClick(),
    playCommandAccepted: () => audioSynth.playCommandAccepted(),
    playWarning: () => audioSynth.playWarning(),
    playSystemOnline: () => audioSynth.playSystemOnline(),
    playStartupSound: () => audioSynth.playStartupSound()
  };

  return <AudioCtx.Provider value={value}>{children}</AudioCtx.Provider>;
};

export const useAudio = (): AudioContextType => {
  const context = useContext(AudioCtx);
  if (!context) throw new Error('useAudio must be used within AudioProvider');
  return context;
};
