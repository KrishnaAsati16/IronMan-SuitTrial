import React from 'react';
import { Zap, Activity, Flame } from 'lucide-react';
import { useTelemetry } from '../context/TelemetryContext';
import { useAudio } from '../context/AudioContext';
import { toggleReactorApi } from '../services/api';

export const ArcReactor: React.FC = () => {
  const { suitTelemetry } = useTelemetry();
  const { playClick, playCommandAccepted, playWarning } = useAudio();

  const isOverdrive = suitTelemetry.overdriveActive;
  const power = Math.round(suitTelemetry.corePower);

  const handleToggle = async () => {
    playClick();
    try {
      const res = await toggleReactorApi();
      if (res.overdrive) {
        playWarning();
      } else {
        playCommandAccepted();
      }
    } catch (e) {
      console.warn('Reactor toggle API error', e);
    }
  };

  const primaryGlow = isOverdrive ? '#ef4444' : '#00f0ff';
  const secondaryGlow = isOverdrive ? '#f59e0b' : '#38bdf8';

  return (
    <div className="relative flex flex-col items-center justify-center p-4">
      {/* Background ambient glow */}
      <div
        className="absolute w-64 h-64 rounded-full pointer-events-none transition-all duration-700 blur-3xl opacity-30"
        style={{ backgroundColor: primaryGlow }}
      />

      {/* Main Reactor Graphic Container */}
      <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center cursor-pointer group" onClick={handleToggle}>
        {/* SVG Multi-Ring Reactor Core */}
        <svg viewBox="0 0 200 200" className="w-full h-full transform transition-transform duration-500 group-hover:scale-105">
          <defs>
            {/* Core Gradient */}
            <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="40%" stopColor={primaryGlow} stopOpacity="0.9" />
              <stop offset="80%" stopColor={secondaryGlow} stopOpacity="0.4" />
              <stop offset="100%" stopColor={primaryGlow} stopOpacity="0" />
            </radialGradient>

            {/* Subtle Drop Shadow */}
            <filter id="glowEffect" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Outer Housing Ring */}
          <circle
            cx="100"
            cy="100"
            r="94"
            fill="none"
            stroke="rgba(0, 240, 255, 0.2)"
            strokeWidth="2"
          />

          {/* Outer Rotating Segmented Gear Ring */}
          <g className="animate-spin-slow origin-center">
            <circle
              cx="100"
              cy="100"
              r="86"
              fill="none"
              stroke={primaryGlow}
              strokeWidth="3"
              strokeDasharray="12 8 4 8"
              opacity="0.75"
              filter="url(#glowEffect)"
            />
            {/* Tactical ticks around outer rim */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <line
                key={deg}
                x1="100"
                y1="6"
                x2="100"
                y2="14"
                stroke={primaryGlow}
                strokeWidth="2"
                transform={`rotate(${deg} 100 100)`}
                opacity="0.8"
              />
            ))}
          </g>

          {/* Counter-Rotating Mid Ring with Power Segments */}
          <g className="animate-spin-reverse origin-center">
            <circle
              cx="100"
              cy="100"
              r="72"
              fill="none"
              stroke={secondaryGlow}
              strokeWidth="6"
              strokeDasharray="22 14"
              opacity="0.85"
            />
            {/* Magnetic Coils / Inductor Blocks */}
            {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg) => (
              <rect
                key={deg}
                x="94"
                y="22"
                width="12"
                height="8"
                rx="1"
                fill={isOverdrive ? '#b91c1c' : '#0369a1'}
                stroke={primaryGlow}
                strokeWidth="1.5"
                transform={`rotate(${deg} 100 100)`}
              />
            ))}
          </g>

          {/* Inner Containment Ring */}
          <circle
            cx="100"
            cy="100"
            r="54"
            fill="rgba(3, 10, 24, 0.85)"
            stroke={primaryGlow}
            strokeWidth="3"
            strokeDasharray="6 4"
          />

          {/* Pulsing Central Plasma Core */}
          <circle
            cx="100"
            cy="100"
            r="38"
            fill="url(#coreGlow)"
            className="animate-pulse origin-center"
            style={{ animationDuration: isOverdrive ? '0.8s' : '2s' }}
          />

          {/* Core Center Crystal */}
          <circle
            cx="100"
            cy="100"
            r="18"
            fill="#ffffff"
            filter="url(#glowEffect)"
            opacity="0.95"
          />

          {/* Crosshair stabilizers */}
          <line x1="100" y1="70" x2="100" y2="130" stroke={primaryGlow} strokeWidth="1.5" opacity="0.6" />
          <line x1="70" y1="100" x2="130" y2="100" stroke={primaryGlow} strokeWidth="1.5" opacity="0.6" />
        </svg>

        {/* Center Interactive Overlay Text */}
        <div className="absolute flex flex-col items-center justify-center pointer-events-none text-center">
          <span className="text-[10px] uppercase tracking-widest text-white/70 font-mono">
            {isOverdrive ? 'OVERDRIVE' : 'OUTPUT'}
          </span>
          <span
            className={`text-2xl sm:text-3xl font-black tracking-tighter font-display drop-shadow-md ${
              isOverdrive ? 'text-red-100 glow-text-red' : 'text-cyan-100 glow-text-cyan'
            }`}
          >
            {power}%
          </span>
          <span className="text-[9px] uppercase tracking-widest text-cyan-300/80 font-mono flex items-center gap-1">
            <Activity className="w-2.5 h-2.5 animate-pulse" />
            {isOverdrive ? 'WARNING: HIGH' : 'NOMINAL'}
          </span>
        </div>
      </div>

      {/* Status Panel Beneath Reactor */}
      <div className="mt-4 flex flex-col items-center gap-1.5 w-full max-w-xs text-center">
        <div className="flex items-center justify-between w-full text-xs font-mono px-4 py-1.5 rounded bg-cyan-950/40 border border-cyan-500/30">
          <span className="text-cyan-400/80">ARC REACTOR:</span>
          <span className="font-bold text-cyan-200">MARK LXXXV VIB-CORE</span>
        </div>

        <div className="flex items-center justify-between w-full text-xs font-mono px-4 py-1.5 rounded bg-cyan-950/40 border border-cyan-500/30">
          <span className="text-cyan-400/80">CONTAINMENT:</span>
          <span className={`font-bold flex items-center gap-1 ${isOverdrive ? 'text-red-400' : 'text-cyan-300'}`}>
            <span className="w-2 h-2 rounded-full animate-ping bg-current" />
            {isOverdrive ? 'PLASMA PEAK' : 'STABILIZED'}
          </span>
        </div>

        {/* Reactor Control Button */}
        <button
          onClick={handleToggle}
          className={`mt-2 w-full py-2 px-4 rounded text-xs font-bold tracking-widest uppercase font-display flex items-center justify-center gap-2 transition-all duration-300 border ${
            isOverdrive
              ? 'bg-red-950/70 border-red-500 text-red-300 hover:bg-red-900/80 shadow-[0_0_15px_rgba(239,68,68,0.4)]'
              : 'bg-cyan-950/60 border-cyan-400/60 text-cyan-300 hover:bg-cyan-900/60 shadow-[0_0_15px_rgba(0,240,255,0.25)]'
          }`}
        >
          {isOverdrive ? <Flame className="w-3.5 h-3.5 animate-bounce text-red-400" /> : <Zap className="w-3.5 h-3.5 text-cyan-400" />}
          {isOverdrive ? 'DISENGAGE OVERDRIVE' : 'ENGAGE OVERDRIVE'}
        </button>
      </div>
    </div>
  );
};
