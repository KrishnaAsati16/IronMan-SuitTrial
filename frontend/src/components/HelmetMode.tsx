import React, { useState, useEffect } from 'react';
import { EyeOff, Radio, Shield, Cpu, Mic } from 'lucide-react';
import { useTelemetry } from '../context/TelemetryContext';
import { useJarvis } from '../context/JarvisContext';
import { useSettings } from '../context/SettingsContext';
import { useAudio } from '../context/AudioContext';
import { formatTime24 } from '../utils/formatters';

export const HelmetMode: React.FC = () => {
  const { suitTelemetry, systemStats } = useTelemetry();
  const { voiceState, messages, startVoiceInput, stopVoiceInput } = useJarvis();
  const { setHudMode } = useSettings();
  const { playClick, playCommandAccepted } = useAudio();
  const [time, setTime] = useState<string>(formatTime24());

  // Mouse parallax simulation for fictional helmet visor gyro feel
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const clockTimer = setInterval(() => setTime(formatTime24()), 1000);
    return () => clearInterval(clockTimer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 15;
    const y = (e.clientY / innerHeight - 0.5) * 15;
    setMousePos({ x, y });
  };

  const handleExit = () => {
    playCommandAccepted();
    setHudMode('normal');
  };

  const lastAssistantMessage = [...messages].reverse().find((m) => m.role === 'assistant');

  return (
    <div
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-40 bg-[#01040a] text-cyan-400 font-mono select-none overflow-hidden flex flex-col justify-between p-4 sm:p-8"
      style={{
        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.06) 0%, transparent 70%),
                          linear-gradient(rgba(0, 240, 255, 0.04) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(0, 240, 255, 0.04) 1px, transparent 1px)`,
        backgroundSize: '100% 100%, 50px 50px, 50px 50px'
      }}
    >
      {/* Sci-Fi Curved Visor Frame Borders */}
      <div className="pointer-events-none absolute inset-0 border-[6px] border-cyan-500/20 rounded-3xl m-2 shadow-[inset_0_0_80px_rgba(0,240,255,0.15)]" />

      {/* Top Status Visor Bar */}
      <div
        className="relative z-10 flex items-center justify-between border-b border-cyan-500/30 pb-2.5 transition-transform duration-100 ease-out"
        style={{ transform: `translate3d(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px, 0)` }}
      >
        <div className="flex items-center gap-3">
          <div className="px-2.5 py-1 rounded bg-cyan-950/80 border border-cyan-400/50 text-cyan-200 text-xs font-bold font-display tracking-widest">
            VISOR // TACTICAL HELMET HUD
          </div>
          <span className="text-[11px] text-cyan-400/80 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            SYNCHRONIZED (STARK SATELLITE 12)
          </span>
        </div>

        {/* Center Horizon Compass */}
        <div className="hidden md:flex items-center gap-4 text-xs font-mono text-cyan-300">
          <span>ALT: 2,450 M</span>
          <span>•</span>
          <span>AIRSPEED: 840 KM/H</span>
          <span>•</span>
          <span>HEADING: 315° NW</span>
        </div>

        {/* Right Exit & Time */}
        <div className="flex items-center gap-4">
          <div className="text-right font-mono">
            <div className="text-base font-bold text-cyan-100 glow-text-cyan">{time}</div>
            <div className="text-[9px] text-cyan-400/60">ZULU STANDARD</div>
          </div>

          <button
            onClick={handleExit}
            className="flex items-center gap-2 px-3 py-1.5 rounded bg-cyan-950/80 border border-cyan-400 text-cyan-200 hover:bg-cyan-900 font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)]"
          >
            <EyeOff className="w-4 h-4" />
            <span>EXIT HELMET</span>
          </button>
        </div>
      </div>

      {/* Center Tactical Targeting Reticle (Strictly Sci-Fi Fictional UI Element) */}
      <div
        className="relative flex-1 flex items-center justify-center pointer-events-none transition-transform duration-150 ease-out"
        style={{ transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)` }}
      >
        {/* Reticle Circle Ring */}
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
          {/* Rotating outer compass ring */}
          <div className="absolute inset-0 rounded-full border border-dashed border-cyan-400/40 animate-spin-slow" />
          <div className="absolute inset-4 rounded-full border border-cyan-400/20" />
          <div className="absolute inset-12 rounded-full border border-cyan-500/30 animate-spin-reverse" />

          {/* Crosshair Axes */}
          <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
          <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-cyan-400/60 to-transparent" />

          {/* Central Target Lock Box */}
          <div className="relative w-16 h-16 border-2 border-cyan-400/70 rounded flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.4)]">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="absolute -top-5 text-[9px] tracking-widest uppercase font-mono text-cyan-300">
              LOCK: CENTER
            </span>
          </div>

          {/* Horizon Line / Artificial Pitch Indicator */}
          <div className="absolute w-44 h-1 border-t-2 border-cyan-400/70 -translate-y-8" />
          <div className="absolute w-28 h-1 border-t border-cyan-400/50 translate-y-8" />
        </div>
      </div>

      {/* Floating Peripheral Telemetry HUD Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pointer-events-auto">
        {/* Left Peripheral: Core & Power */}
        <div
          className="p-3 rounded bg-cyan-950/40 backdrop-blur-md border border-cyan-500/30 text-xs space-y-2 transition-transform duration-100 ease-out"
          style={{ transform: `translate3d(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px, 0)` }}
        >
          <div className="flex items-center justify-between text-cyan-200 font-bold border-b border-cyan-500/30 pb-1">
            <span className="flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-hud-cyan" /> ARC REACTOR CORE
            </span>
            <span>{Math.round(suitTelemetry.corePower)}%</span>
          </div>

          <div className="flex justify-between text-[11px] text-cyan-300/80">
            <span>SUIT BATTERY:</span>
            <span className="font-bold">{Math.round(suitTelemetry.battery)}%</span>
          </div>

          <div className="flex justify-between text-[11px] text-cyan-300/80">
            <span>INTERNAL TEMP:</span>
            <span className="font-bold">{suitTelemetry.temperature.toFixed(1)}°C</span>
          </div>

          <div className="flex justify-between text-[11px] text-cyan-300/80">
            <span>REPULSOR CHARGE:</span>
            <span className="font-bold">{Math.round(suitTelemetry.repulsorCharge)}%</span>
          </div>
        </div>

        {/* Center Peripheral: Speech & JARVIS Tactical Audio Transceiver */}
        <div className="p-3 rounded bg-cyan-950/60 backdrop-blur-md border border-cyan-400/50 text-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold text-cyan-200 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-hud-cyan animate-pulse" />
              JARVIS HUD UPLINK
            </span>
            <button
              onClick={() => {
                playClick();
                if (voiceState.isListening) stopVoiceInput();
                else startVoiceInput();
              }}
              className={`px-2 py-1 rounded text-[10px] font-bold border flex items-center gap-1 ${
                voiceState.isListening
                  ? 'bg-red-950 border-red-500 text-red-300 animate-pulse'
                  : 'bg-cyan-950 border-cyan-400 text-cyan-300'
              }`}
            >
              <Mic className="w-3 h-3" />
              {voiceState.isListening ? 'LISTENING' : 'VOICE'}
            </button>
          </div>

          <div className="p-2 rounded bg-black/40 border border-cyan-500/20 text-[11px] text-cyan-200 italic line-clamp-2">
            {voiceState.transcript
              ? `"${voiceState.transcript}"`
              : lastAssistantMessage?.content || 'Awaiting tactical instructions, sir.'}
          </div>
        </div>

        {/* Right Peripheral: Avionics & Armor Integrity */}
        <div
          className="p-3 rounded bg-cyan-950/40 backdrop-blur-md border border-cyan-500/30 text-xs space-y-2 transition-transform duration-100 ease-out"
          style={{ transform: `translate3d(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px, 0)` }}
        >
          <div className="flex items-center justify-between text-cyan-200 font-bold border-b border-cyan-500/30 pb-1">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-hud-cyan" /> DEFENSE BARRIERS
            </span>
            <span className="text-emerald-400 font-bold">100% NOMINAL</span>
          </div>

          <div className="flex justify-between text-[11px] text-cyan-300/80">
            <span>HOST CPU LOAD:</span>
            <span className="font-bold">{systemStats?.cpuUsage ?? 28}%</span>
          </div>

          <div className="flex justify-between text-[11px] text-cyan-300/80">
            <span>THRUSTER VECTOR:</span>
            <span className="font-bold">STABILIZED</span>
          </div>

          <div className="flex justify-between text-[11px] text-cyan-300/80">
            <span>ARMOR STATUS:</span>
            <span className="font-bold text-emerald-400">OPTIMAL</span>
          </div>
        </div>
      </div>
    </div>
  );
};
