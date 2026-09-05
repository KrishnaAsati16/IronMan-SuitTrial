import React, { useState, useEffect } from 'react';
import { Shield, Radio, Cpu, Eye, Volume2, VolumeX, Settings, Sparkles } from 'lucide-react';
import { useTelemetry } from '../context/TelemetryContext';
import { useSettings } from '../context/SettingsContext';
import { useAudio } from '../context/AudioContext';
import { formatTime24 } from '../utils/formatters';

interface HudHeaderProps {
  onOpenSettings: () => void;
}

export const HudHeader: React.FC<HudHeaderProps> = ({ onOpenSettings }) => {
  const { isConnected, latencyMs, suitTelemetry } = useTelemetry();
  const { settings, updateSettings, hudMode, setHudMode } = useSettings();
  const { playClick, playCommandAccepted } = useAudio();
  const [time, setTime] = useState<string>(formatTime24());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(formatTime24());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleSound = () => {
    playClick();
    updateSettings({ soundEffectsEnabled: !settings.soundEffectsEnabled });
  };

  const toggleHelmet = () => {
    playCommandAccepted();
    setHudMode(hudMode === 'normal' ? 'helmet' : 'normal');
  };

  return (
    <header className="relative w-full border-b border-cyan-500/30 bg-black/95 backdrop-blur-md px-4 py-3 z-30">
      {/* Upper accent cyan line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Suit ID & Core Status */}
        <div className="flex items-center gap-3">
          <div className="relative p-2 rounded border border-cyan-500/40 bg-cyan-950/40 shadow-[0_0_10px_rgba(0,240,255,0.2)]">
            <Shield className="w-6 h-6 text-hud-cyan animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg md:text-xl font-black tracking-widest uppercase font-display text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-cyan-400">
                IRON MAN SUIT
              </h1>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/50 font-mono">
                MK-85
              </span>
            </div>
            <p className="text-[11px] text-cyan-400/70 tracking-wider font-mono flex items-center gap-2">
              <span>J.A.R.V.I.S. QUANTUM OS</span>
              <span>•</span>
              <span className={isConnected ? 'text-emerald-400' : 'text-amber-400'}>
                {isConnected ? 'ONLINE' : 'OFFLINE (DEMO CACHE)'}
              </span>
            </p>
          </div>
        </div>

        {/* Center: Real-Time Telemetry Bar */}
        <div className="hidden lg:flex items-center gap-4 px-4 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-hud-cyan" />
            <span className="text-cyan-400/60">CORE:</span>
            <span className="font-bold text-cyan-200">{Math.round(suitTelemetry.corePower)}%</span>
          </div>

          <div className="w-[1px] h-3 bg-cyan-500/30" />

          <div className="flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-hud-cyan" />
            <span className="text-cyan-400/60">PING:</span>
            <span className="font-bold text-cyan-200">{latencyMs}ms</span>
          </div>

          <div className="w-[1px] h-3 bg-cyan-500/30" />

          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-hud-cyan" />
            <span className="text-cyan-400/60">SENSORS:</span>
            <span className="font-bold text-emerald-400">
              {suitTelemetry.sensorsOnline}/{suitTelemetry.sensorsTotal}
            </span>
          </div>
        </div>

        {/* Right: Actions & Clock */}
        <div className="flex items-center gap-3">
          {/* Clock */}
          <div className="text-right font-mono pr-2 border-r border-cyan-500/30">
            <div className="text-sm md:text-base font-bold tracking-widest text-cyan-100 glow-text-cyan">
              {time}
            </div>
            <div className="text-[10px] text-cyan-400/60 tracking-wider">LOCAL TIME</div>
          </div>

          {/* Helmet Mode Button */}
          <button
            onClick={toggleHelmet}
            title="Toggle Fullscreen Tactical Helmet Mode"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-cyan-950/70 border border-cyan-400/60 text-cyan-300 hover:bg-cyan-900/60 hover:text-white transition-all text-xs font-mono shadow-[0_0_10px_rgba(0,240,255,0.2)]"
          >
            <Eye className="w-4 h-4 text-hud-cyan" />
            <span className="hidden sm:inline">HELMET HUD</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={settings.soundEffectsEnabled ? 'Mute Interface Sounds' : 'Unmute Interface Sounds'}
            className="p-2 rounded bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 hover:text-white hover:border-cyan-400 transition-all"
          >
            {settings.soundEffectsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-red-400" />}
          </button>

          {/* Settings Modal Toggle */}
          <button
            onClick={() => {
              playClick();
              onOpenSettings();
            }}
            title="System Settings"
            className="p-2 rounded bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 hover:text-white hover:border-cyan-400 transition-all"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
