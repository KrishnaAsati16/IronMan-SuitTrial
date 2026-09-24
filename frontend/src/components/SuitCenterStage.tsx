import React, { useState } from 'react';
import { Plane, ShieldAlert, Shield, Cpu, Zap } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export const SuitCenterStage: React.FC = () => {
  const { playClick, playCommandAccepted } = useAudio();
  const [activeMode, setActiveMode] = useState<'FLIGHT' | 'WEAPONS' | 'DEFENSE' | 'AI ASSIST' | 'POWER'>('FLIGHT');

  const modes = [
    { id: 'FLIGHT' as const, label: 'FLIGHT', icon: <Plane className="w-3.5 h-3.5" /> },
    { id: 'WEAPONS' as const, label: 'WEAPONS', icon: <ShieldAlert className="w-3.5 h-3.5" /> },
    { id: 'DEFENSE' as const, label: 'DEFENSE', icon: <Shield className="w-3.5 h-3.5" /> },
    { id: 'AI ASSIST' as const, label: 'AI ASSIST', icon: <Cpu className="w-3.5 h-3.5" /> },
    { id: 'POWER' as const, label: 'POWER', icon: <Zap className="w-3.5 h-3.5" /> },
  ];

  const handleModeChange = (mode: typeof activeMode) => {
    playClick();
    setActiveMode(mode);
    if (mode === 'POWER' || mode === 'WEAPONS') {
      playCommandAccepted();
    }
  };

  return (
    <div className="relative rounded-2xl bg-[#030915]/90 border border-cyan-500/30 p-4 backdrop-blur-xl shadow-[0_0_30px_rgba(0,180,255,0.12)] flex flex-col justify-between overflow-hidden min-h-[360px] h-full">
      {/* Background Radial Light Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,200,255,0.12)_0%,transparent_70%)] pointer-events-none" />

      {/* Top Section: Header & Mode Action Buttons */}
      <div className="relative z-10 flex items-start justify-between">
        {/* Left Title */}
        <div>
          <h3 className="text-base font-black tracking-widest uppercase font-display text-white drop-shadow-[0_0_8px_rgba(0,240,255,0.7)]">
            MARK LXXXV
          </h3>
          <span className="text-[10px] text-cyan-400/70 font-mono tracking-widest uppercase">
            SUIT
          </span>
        </div>

        {/* Right Tactical Action Buttons */}
        <div className="flex flex-col gap-1.5">
          {modes.map((m) => {
            const isActive = activeMode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => handleModeChange(m.id)}
                className={`flex items-center gap-2 px-3 py-1 rounded-full font-mono text-[10px] font-bold tracking-wider transition-all duration-300 border ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-200 border-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                    : 'bg-black/40 text-cyan-400/60 border-cyan-500/20 hover:text-cyan-200 hover:border-cyan-400/50'
                }`}
              >
                <span className={isActive ? 'text-cyan-300 animate-pulse' : 'text-cyan-500'}>
                  {m.icon}
                </span>
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Center 3D Holographic Iron Man Suit Graphic on Glowing Radial Platform */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center my-1 pointer-events-none">
        {/* Holographic Arc Platform Base Beneath Armor */}
        <div className="relative w-48 h-12 flex items-center justify-center translate-y-24">
          <div className="absolute inset-0 rounded-[100%] border-2 border-cyan-400/80 shadow-[0_0_25px_#00f0ff] animate-pulse" />
          <div className="absolute inset-2 rounded-[100%] border border-dashed border-cyan-300/60 animate-spin-slow" />
          <div className="absolute inset-4 rounded-[100%] bg-cyan-400/30 blur-sm" />
        </div>

        {/* High Quality Iron Man Mark LXXXV Armor Hologram Rendering */}
        <div className="relative w-48 h-64 sm:h-72 flex items-center justify-center -translate-y-4">
          <svg
            viewBox="0 0 200 320"
            className="w-full h-full drop-shadow-[0_0_25px_rgba(0,240,255,0.5)] transition-transform duration-500 hover:scale-105"
          >
            <defs>
              <linearGradient id="armorRed" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e52d27" />
                <stop offset="50%" stopColor="#b31217" />
                <stop offset="100%" stopColor="#780206" />
              </linearGradient>
              <linearGradient id="armorGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffe259" />
                <stop offset="100%" stopColor="#ffa751" />
              </linearGradient>
              <linearGradient id="armorSilver" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e0e0e0" />
                <stop offset="100%" stopColor="#8e9eab" />
              </linearGradient>
              <radialGradient id="chestArc" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="40%" stopColor="#00f0ff" />
                <stop offset="100%" stopColor="rgba(0,240,255,0)" />
              </radialGradient>
            </defs>

            {/* Suit Holographic Cyber Grid Overlay Lines */}
            <circle cx="100" cy="160" r="95" fill="none" stroke="rgba(0,240,255,0.15)" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="100" cy="160" r="75" fill="none" stroke="rgba(0,240,255,0.12)" strokeWidth="1" />

            {/* Head / Helmet */}
            <path
              d="M 100 24 C 88 24 82 34 82 48 C 82 62 90 74 100 75 C 110 74 118 62 118 48 C 118 34 112 24 100 24 Z"
              fill="url(#armorRed)"
              stroke="#00f0ff"
              strokeWidth="1"
            />
            {/* Gold Faceplate */}
            <path
              d="M 100 32 C 92 32 88 40 88 50 C 88 60 93 68 100 70 C 107 68 112 60 112 50 C 112 40 108 32 100 32 Z"
              fill="url(#armorGold)"
            />
            {/* Glowing Visor Eyes */}
            <polygon points="90,48 96,50 96,48 90,46" fill="#00f0ff" filter="drop-shadow(0 0 3px #00f0ff)" />
            <polygon points="110,48 104,50 104,48 110,46" fill="#00f0ff" filter="drop-shadow(0 0 3px #00f0ff)" />

            {/* Neck & Trapezius Collar */}
            <path d="M 88 70 L 112 70 L 122 84 L 78 84 Z" fill="url(#armorSilver)" />

            {/* Torso & Chest Plates */}
            <path
              d="M 72 84 L 128 84 L 136 128 L 122 152 L 78 152 L 64 128 Z"
              fill="url(#armorRed)"
              stroke="#00f0ff"
              strokeWidth="0.8"
            />
            {/* Gold Chest Accent Inlays */}
            <path d="M 80 88 L 94 88 L 90 120 L 76 116 Z" fill="url(#armorGold)" />
            <path d="M 120 88 L 106 88 L 110 120 L 124 116 Z" fill="url(#armorGold)" />

            {/* Arc Reactor Triangle Core */}
            <circle cx="100" cy="110" r="16" fill="url(#chestArc)" className="animate-pulse" />
            <polygon points="100,98 112,118 88,118" fill="#ffffff" stroke="#00f0ff" strokeWidth="1.5" filter="drop-shadow(0 0 6px #00f0ff)" />

            {/* Abdomen & Spine Segments */}
            <path d="M 82 152 L 118 152 L 114 180 L 86 180 Z" fill="url(#armorSilver)" />
            <path d="M 84 156 L 116 156 L 114 164 L 86 164 Z" fill="url(#armorGold)" />
            <path d="M 86 168 L 114 168 L 112 176 L 88 176 Z" fill="url(#armorGold)" />

            {/* Shoulder Pauldrons */}
            <path d="M 68 84 C 54 84 48 94 52 108 L 74 100 Z" fill="url(#armorRed)" stroke="#00f0ff" strokeWidth="0.5" />
            <path d="M 132 84 C 146 84 152 94 148 108 L 126 100 Z" fill="url(#armorRed)" stroke="#00f0ff" strokeWidth="0.5" />

            {/* Arms & Biceps */}
            <path d="M 52 108 L 44 146 L 56 148 L 68 114 Z" fill="url(#armorGold)" />
            <path d="M 148 108 L 156 146 L 144 148 L 132 114 Z" fill="url(#armorGold)" />

            {/* Forearms & Gauntlets */}
            <path d="M 44 146 L 38 188 L 48 190 L 56 148 Z" fill="url(#armorRed)" />
            <path d="M 156 146 L 162 188 L 152 190 L 144 148 Z" fill="url(#armorRed)" />
            {/* Repulsor Hand Nodes */}
            <circle cx="43" cy="189" r="4" fill="#00f0ff" filter="drop-shadow(0 0 4px #00f0ff)" />
            <circle cx="157" cy="189" r="4" fill="#00f0ff" filter="drop-shadow(0 0 4px #00f0ff)" />

            {/* Pelvis & Hip Armor */}
            <path d="M 82 180 L 118 180 L 126 200 L 74 200 Z" fill="url(#armorRed)" />
            <polygon points="100,182 108,198 92,198" fill="url(#armorGold)" />

            {/* Thighs (Upper Legs) */}
            <path d="M 76 200 L 94 200 L 90 250 L 70 250 Z" fill="url(#armorGold)" />
            <path d="M 124 200 L 106 200 L 110 250 L 130 250 Z" fill="url(#armorGold)" />

            {/* Knees */}
            <rect x="70" y="248" width="20" height="10" rx="3" fill="url(#armorSilver)" />
            <rect x="110" y="248" width="20" height="10" rx="3" fill="url(#armorSilver)" />

            {/* Calves & Shin Guards */}
            <path d="M 70 258 L 90 258 L 86 300 L 66 300 Z" fill="url(#armorRed)" />
            <path d="M 130 258 L 110 258 L 114 300 L 134 300 Z" fill="url(#armorRed)" />

            {/* Boots / Flight Thrusters */}
            <path d="M 64 300 L 88 300 L 84 312 L 60 312 Z" fill="url(#armorGold)" />
            <path d="M 136 300 L 112 300 L 116 312 L 140 312 Z" fill="url(#armorGold)" />

            {/* Flight Thruster Plasma Fire */}
            <polygon points="62,312 82,312 72,320" fill="#00f0ff" filter="drop-shadow(0 0 5px #00f0ff)" opacity="0.8" />
            <polygon points="118,312 138,312 128,320" fill="#00f0ff" filter="drop-shadow(0 0 5px #00f0ff)" opacity="0.8" />
          </svg>
        </div>
      </div>

      {/* Bottom Section: Telemetry Line & Stark Industries Tag */}
      <div className="relative z-10 flex items-end justify-between border-t border-cyan-500/20 pt-2 font-mono">
        {/* Left: Suit Integrity & Heartbeat */}
        <div>
          <div className="text-sm font-black text-cyan-100 font-display">100%</div>
          <div className="text-[9px] text-cyan-400/70 tracking-wider uppercase">SUIT INTEGRITY</div>
          {/* ECG Pulse Wave SVG */}
          <div className="w-24 h-4 mt-0.5">
            <svg viewBox="0 0 100 20" className="w-full h-full text-cyan-400">
              <path
                d="M 0 10 L 25 10 L 32 2 L 40 18 L 48 4 L 56 12 L 64 10 L 100 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="animate-pulse"
              />
            </svg>
          </div>
        </div>

        {/* Right: Stark Industries MK85 Badge */}
        <div className="text-right">
          <span className="text-[10px] font-black uppercase text-cyan-200 tracking-wider font-display block">
            STARK INDUSTRIES
          </span>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 inline-block mt-0.5">
            MK85
          </span>
        </div>
      </div>
    </div>
  );
};
