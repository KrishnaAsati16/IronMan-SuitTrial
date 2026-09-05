import React from 'react';
import { X, Sliders, Volume2, Activity, Shield, RefreshCw } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { useTelemetry } from '../context/TelemetryContext';
import { useAudio } from '../context/AudioContext';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ isOpen, onClose }) => {
  const { settings, updateSettings, resetSettings } = useSettings();
  const { voices } = useSpeechSynthesis();
  const { isConnected } = useTelemetry();
  const { playClick, playCommandAccepted } = useAudio();

  if (!isOpen) return null;

  const handleClose = () => {
    playClick();
    onClose();
  };

  const handleReset = () => {
    playClick();
    resetSettings();
    playCommandAccepted();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-lg bg-[#050505] border border-cyan-400/50 shadow-[0_0_50px_rgba(0,0,0,0.9)] p-6 font-mono text-xs">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cyan-500/30 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-hud-cyan animate-pulse" />
            <div>
              <h2 className="text-base font-bold uppercase font-display text-cyan-100">
                SYSTEM CONFIGURATION & PROTOCOLS
              </h2>
              <p className="text-[10px] text-cyan-400/60 uppercase">
                STARK INDUSTRIES SECURE TELEMETRY SETTINGS
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 hover:text-white hover:border-cyan-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          {/* Section: JARVIS Voice & Audio */}
          <div className="p-3 rounded bg-cyan-950/30 border border-cyan-500/20 space-y-3">
            <h3 className="text-xs font-bold text-cyan-200 uppercase flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-hud-cyan" /> JARVIS VOICE & AUDIO FEEDBACK
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Voice Enable Toggle */}
              <label className="flex items-center justify-between p-2 rounded bg-cyan-950/50 border border-cyan-500/30 cursor-pointer">
                <span className="text-cyan-300">Speech Synthesis Voice</span>
                <input
                  type="checkbox"
                  checked={settings.voiceEnabled}
                  onChange={(e) => updateSettings({ voiceEnabled: e.target.checked })}
                  className="rounded text-cyan-500 focus:ring-0 accent-cyan-400"
                />
              </label>

              {/* Sound Effects Toggle */}
              <label className="flex items-center justify-between p-2 rounded bg-cyan-950/50 border border-cyan-500/30 cursor-pointer">
                <span className="text-cyan-300">Procedural HUD Sound Effects</span>
                <input
                  type="checkbox"
                  checked={settings.soundEffectsEnabled}
                  onChange={(e) => updateSettings({ soundEffectsEnabled: e.target.checked })}
                  className="rounded text-cyan-500 focus:ring-0 accent-cyan-400"
                />
              </label>
            </div>

            {/* Voice Selection */}
            {voices.length > 0 && (
              <div>
                <label className="block text-cyan-400/80 mb-1 text-[11px] uppercase">
                  Available System Voice
                </label>
                <select
                  value={settings.selectedVoiceName}
                  onChange={(e) => updateSettings({ selectedVoiceName: e.target.value })}
                  className="w-full rounded bg-cyan-950/60 border border-cyan-500/40 p-2 text-cyan-100 focus:outline-none focus:border-cyan-300"
                >
                  <option value="">Default British JARVIS / System Match</option>
                  {voices.map((v) => (
                    <option key={v.name} value={v.name}>
                      {v.name} ({v.lang})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Speech Rate & Pitch Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <div className="flex justify-between text-cyan-300 mb-1">
                  <span>Speech Rate</span>
                  <span>{settings.speechRate.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.6"
                  max="1.6"
                  step="0.1"
                  value={settings.speechRate}
                  onChange={(e) => updateSettings({ speechRate: parseFloat(e.target.value) })}
                  className="w-full accent-cyan-400"
                />
              </div>

              <div>
                <div className="flex justify-between text-cyan-300 mb-1">
                  <span>Pitch Modulation</span>
                  <span>{settings.speechPitch.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="0.6"
                  max="1.4"
                  step="0.1"
                  value={settings.speechPitch}
                  onChange={(e) => updateSettings({ speechPitch: parseFloat(e.target.value) })}
                  className="w-full accent-cyan-400"
                />
              </div>
            </div>
          </div>

          {/* Section: Visuals & HUD Aesthetics */}
          <div className="p-3 rounded bg-cyan-950/30 border border-cyan-500/20 space-y-3">
            <h3 className="text-xs font-bold text-cyan-200 uppercase flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-hud-cyan" /> DISPLAY & VISUAL ANIMATION
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-center justify-between p-2 rounded bg-cyan-950/50 border border-cyan-500/30 cursor-pointer">
                <span className="text-cyan-300">Arc Reactor Animations</span>
                <input
                  type="checkbox"
                  checked={settings.animationsEnabled}
                  onChange={(e) => updateSettings({ animationsEnabled: e.target.checked })}
                  className="rounded text-cyan-500 accent-cyan-400"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded bg-cyan-950/50 border border-cyan-500/30 cursor-pointer">
                <span className="text-cyan-300">Continuous Telemetry Sim</span>
                <input
                  type="checkbox"
                  checked={settings.simulationMode}
                  onChange={(e) => updateSettings({ simulationMode: e.target.checked })}
                  className="rounded text-cyan-500 accent-cyan-400"
                />
              </label>
            </div>

            <div>
              <label className="block text-cyan-400/80 mb-1 text-[11px] uppercase">
                Color Palette & Theme
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'stealth-black', name: 'Stealth Black', desc: 'Pure Pitch Black' },
                  { id: 'cyber-cyan', name: 'Cyber Cyan', desc: 'Stark Navy' },
                  { id: 'crimson-gold', name: 'Mark III', desc: 'Crimson & Gold' }
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => updateSettings({ colorTheme: t.id as any })}
                    className={`py-2 px-2.5 rounded border text-center transition-all ${
                      settings.colorTheme === t.id
                        ? 'bg-cyan-950 border-cyan-400 text-white shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                        : 'bg-black/60 border-cyan-500/20 text-cyan-400/70 hover:border-cyan-500/40'
                    }`}
                  >
                    <span className="block font-bold text-xs uppercase">{t.name}</span>
                    <span className="block text-[9px] opacity-75">{t.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-cyan-400/80 mb-1 text-[11px] uppercase">
                Theme Neon Intensity
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['subtle', 'high', 'ultra'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => updateSettings({ themeIntensity: lvl })}
                    className={`py-1.5 px-3 rounded border uppercase font-bold text-center transition-all ${
                      settings.themeIntensity === lvl
                        ? 'bg-cyan-900/60 border-cyan-400 text-white shadow-[0_0_10px_rgba(0,240,255,0.4)]'
                        : 'bg-cyan-950/30 border-cyan-500/20 text-cyan-400/70 hover:border-cyan-500/40'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section: Backend & IoT Telemetry Uplink */}
          <div className="p-3 rounded bg-cyan-950/30 border border-cyan-500/20 space-y-2">
            <h3 className="text-xs font-bold text-cyan-200 uppercase flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-hud-cyan" /> MAINFRAME CONNECTION STATUS
            </h3>

            <div className="flex items-center justify-between p-2 rounded bg-cyan-950/60 border border-cyan-500/30">
              <span className="text-cyan-300">Backend Server Port: 5000</span>
              <span
                className={`px-2 py-0.5 rounded font-bold ${
                  isConnected ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'
                }`}
              >
                {isConnected ? 'ONLINE & STREAMING' : 'OFFLINE (SIMULATION ACTIVE)'}
              </span>
            </div>

            <p className="text-[10px] text-cyan-400/60 leading-normal">
              Physical ESP32 microcontrollers can connect directly to WebSocket port 5000 via
              /socket.io/ to broadcast real-world hardware telemetry into this HUD.
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-4 pt-3 border-t border-cyan-500/30 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 hover:text-white transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>RESET DEFAULTS</span>
          </button>

          <button
            onClick={handleClose}
            className="px-5 py-1.5 rounded bg-cyan-950 border border-cyan-400 text-cyan-200 hover:bg-cyan-900 font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,240,255,0.2)]"
          >
            SAVE & CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
