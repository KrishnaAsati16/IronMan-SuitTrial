import React, { useState, useEffect } from 'react';
import { Shield, FastForward } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

interface StartupSequenceProps {
  onComplete: () => void;
}

const BOOT_LINES = [
  { text: 'INITIALIZING IRON MAN SUIT OS...', delay: 400 },
  { text: 'QUANTUM NEURAL CORE ......... ONLINE', delay: 900 },
  { text: 'ARC REACTOR CONTAINMENT ..... STABILIZED (100%)', delay: 1500 },
  { text: 'AVIONICS & STABILIZERS ...... CALIBRATED', delay: 2000 },
  { text: 'DEFENSE SENSORS ............. ALL 8 CHANNELS ACTIVE', delay: 2500 },
  { text: 'ENCRYPTED COMMS ............. AES-256 GCM LINKED', delay: 2900 },
  { text: 'J.A.R.V.I.S. AI CORE ........ INITIALIZED', delay: 3300 },
  { text: 'HUD PROJECTION .............. ENGAGED', delay: 3700 },
  { text: 'MARK LXXXV SYSTEM STATUS .... ALL SUBSYSTEMS NOMINAL', delay: 4200 }
];

export const StartupSequence: React.FC<StartupSequenceProps> = ({ onComplete }) => {
  const { playStartupSound, playSystemOnline } = useAudio();
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    // Trigger boot sound
    playStartupSound();

    // Line printing timeouts
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    BOOT_LINES.forEach((item, index) => {
      const t = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, item.text]);
        setPercent(Math.round(((index + 1) / BOOT_LINES.length) * 100));

        if (index === BOOT_LINES.length - 1) {
          playSystemOnline();
          setTimeout(() => {
            onComplete();
          }, 1000);
        }
      }, item.delay);
      timeouts.push(t);
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [onComplete, playStartupSound, playSystemOnline]);

  return (
    <div className="fixed inset-0 z-50 bg-[#010611] flex flex-col items-center justify-center p-6 text-cyan-400 font-mono select-none">
      {/* Background Matrix Grid */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #00f0ff 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}
      />

      <div className="relative w-full max-w-xl p-8 rounded-lg bg-cyan-950/30 border border-cyan-500/40 shadow-[0_0_50px_rgba(0,240,255,0.2)]">
        {/* Glowing Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative p-4 rounded-full bg-cyan-950/60 border border-cyan-400/60 mb-3 shadow-[0_0_25px_rgba(0,240,255,0.5)]">
            <Shield className="w-12 h-12 text-cyan-300 animate-pulse" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-widest uppercase font-display text-cyan-100 glow-text-cyan">
            STARK INDUSTRIES
          </h1>
          <p className="text-xs tracking-widest text-cyan-400/70 uppercase">
            MARK LXXXV AUTOMATION SYSTEM
          </p>
        </div>

        {/* Diagnostic Terminal Output */}
        <div className="space-y-1.5 min-h-[220px] bg-black/60 p-4 rounded border border-cyan-500/30 text-xs text-cyan-300">
          {displayedLines.map((line, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-hud-gold">&gt;</span>
              <span>{line}</span>
            </div>
          ))}
          <div className="inline-block w-2 h-4 bg-cyan-400 animate-pulse ml-4" />
        </div>

        {/* Progress Bar */}
        <div className="mt-5 space-y-1.5">
          <div className="flex justify-between text-xs font-bold text-cyan-300">
            <span>SYNCHRONIZING SENSORS</span>
            <span>{percent}%</span>
          </div>
          <div className="w-full bg-cyan-950/80 h-2 rounded overflow-hidden border border-cyan-500/40">
            <div
              className="h-full bg-gradient-to-r from-cyan-600 via-cyan-400 to-white transition-all duration-300 shadow-[0_0_10px_#00f0ff]"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Skip Sequence Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onComplete}
            className="flex items-center gap-2 px-3 py-1.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-xs text-cyan-300 hover:text-white hover:border-cyan-300 transition-colors"
          >
            <span>BYPASS BOOTLOADER</span>
            <FastForward className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
