import React, { useState, useEffect } from 'react';
import { Sun } from 'lucide-react';
import { formatTime24 } from '../utils/formatters';

interface HudHeaderProps {
  onOpenSettings: () => void;
}

export const HudHeader: React.FC<HudHeaderProps> = ({ onOpenSettings }) => {
  const [time, setTime] = useState<string>(formatTime24());
  const [dateString, setDateString] = useState<string>('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTime(formatTime24(now));
      setDateString(
        now.toLocaleDateString('en-US', {
          weekday: 'short',
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }).toUpperCase()
      );
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="w-full bg-[#020714]/95 border-b border-cyan-500/25 px-5 py-2.5 flex items-center justify-between z-30 select-none">
      {/* Left: Suit Title & OS Status */}
      <div className="flex items-center gap-3.5">
        {/* Animated Arc Reactor Circular Badge */}
        <div className="relative w-10 h-10 rounded-full bg-cyan-950/70 border border-cyan-400/60 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.4)]">
          <svg viewBox="0 0 100 100" className="w-7 h-7 text-cyan-400 animate-spin-slow">
            <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="14 8" />
            <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="4" />
            <polygon points="50,22 74,64 26,64" fill="none" stroke="currentColor" strokeWidth="3" />
            <circle cx="50" cy="50" r="10" fill="#00f0ff" filter="drop-shadow(0 0 6px #00f0ff)" />
          </svg>
        </div>

        <div>
          <h1 className="text-base font-black tracking-widest uppercase font-display text-white drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]">
            IRON MAN SUIT
          </h1>
          <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-300/80">
            <span>J.A.R.V.I.S. QUANTUM OS</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              ONLINE
            </span>
          </div>
        </div>
      </div>

      {/* Center: Stark Industries Motto */}
      <div className="hidden lg:flex flex-col items-center justify-center text-center">
        <h2 className="text-sm font-black tracking-[0.35em] uppercase font-display text-cyan-100 text-shadow-sm">
          S T A R K &nbsp; I N D U S T R I E S
        </h2>
        <p className="text-[10px] font-mono tracking-[0.25em] text-cyan-400/70 uppercase mt-0.5">
          TOMORROW &nbsp; • &nbsp; TOGETHER
        </p>
      </div>

      {/* Right: Clock, Weather, Profile Avatar */}
      <div className="flex items-center gap-5">
        {/* Clock & Date */}
        <div className="text-right font-mono pr-1">
          <div className="text-base xl:text-lg font-bold tracking-widest text-cyan-100 glow-text-cyan">
            {time}
          </div>
          <div className="text-[10px] text-cyan-400/70 font-semibold tracking-wider">
            {dateString || 'TUE, 24 SEP 2026'}
          </div>
        </div>

        {/* Header Weather Pill */}
        <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono">
          <Sun className="w-4 h-4 text-amber-400 animate-pulse drop-shadow-[0_0_6px_#f59e0b]" />
          <div>
            <div className="text-[9px] text-cyan-400/60 uppercase">MALIBU, CA</div>
            <div className="text-cyan-100 font-bold text-xs flex items-center gap-1.5">
              <span>25°C</span>
              <span className="text-cyan-400/70 text-[10px] font-normal">Sunny</span>
            </div>
          </div>
        </div>

        {/* User Profile Avatar with Iron Man Helmet */}
        <button
          onClick={onOpenSettings}
          className="flex items-center gap-2.5 pl-2 pr-3 py-1 rounded-full bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-400/40 transition-all cursor-pointer group shadow-[0_0_15px_rgba(0,240,255,0.2)]"
        >
          {/* Circular Helmet Avatar */}
          <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.7)] bg-[#1a0000] flex items-center justify-center">
            {/* Vector Iron Man Helmet Face */}
            <svg viewBox="0 0 100 100" className="w-7 h-7">
              {/* Outer Helmet Dome (Crimson Red) */}
              <path
                d="M 50 10 C 26 10 18 30 18 55 C 18 78 35 92 50 92 C 65 92 82 78 82 55 C 82 30 74 10 50 10 Z"
                fill="#880808"
                stroke="#d4af37"
                strokeWidth="2"
              />
              {/* Gold Faceplate */}
              <path
                d="M 50 24 C 36 24 30 36 30 52 C 30 68 38 84 50 86 C 62 84 70 68 70 52 C 70 36 64 24 50 24 Z"
                fill="#d4af37"
              />
              {/* Glowing Eyes */}
              <polygon points="34,48 44,51 44,48 34,45" fill="#00f0ff" filter="drop-shadow(0 0 3px #00f0ff)" />
              <polygon points="66,48 56,51 56,48 66,45" fill="#00f0ff" filter="drop-shadow(0 0 3px #00f0ff)" />
              {/* Mouth slit */}
              <line x1="42" y1="74" x2="58" y2="74" stroke="#550000" strokeWidth="2" />
            </svg>
          </div>

          <div className="text-left font-mono leading-tight">
            <span className="block text-xs font-black uppercase text-cyan-200 tracking-wider">
              MARK LXXXV
            </span>
            <span className="block text-[9px] text-cyan-400/60 uppercase">
              SUIT ID: MK85-001
            </span>
          </div>
        </button>
      </div>
    </header>
  );
};
