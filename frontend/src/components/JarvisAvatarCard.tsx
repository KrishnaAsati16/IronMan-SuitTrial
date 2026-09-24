import React from 'react';

export const JarvisAvatarCard: React.FC = () => {
  return (
    <div className="rounded-2xl bg-[#030915]/90 border border-cyan-500/30 p-4 backdrop-blur-xl shadow-[0_0_30px_rgba(0,180,255,0.12)] flex items-center gap-4 h-full">
      {/* Glowing Holographic Blue Helmet Side-Profile SVG */}
      <div className="relative w-20 h-24 shrink-0 rounded-xl bg-black/60 border border-cyan-400/40 p-1 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.3)]">
        <svg viewBox="0 0 100 120" className="w-full h-full text-cyan-400 drop-shadow-[0_0_6px_#00f0ff]">
          {/* Holographic Wireframe Profile */}
          <path
            d="M 25 35 C 25 18 45 10 70 18 C 88 24 92 45 88 65 C 85 80 75 95 60 105 L 45 110 L 40 98 C 25 90 20 70 20 50 Z"
            fill="none"
            stroke="#00f0ff"
            strokeWidth="2"
          />
          {/* Visor Eye Glow */}
          <polygon points="50,42 75,44 72,48 48,46" fill="#00f0ff" filter="drop-shadow(0 0 4px #00f0ff)" />
          {/* Inner Circuit Details */}
          <line x1="30" y1="35" x2="65" y2="35" stroke="#00f0ff" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="35" y1="65" x2="70" y2="65" stroke="#00f0ff" strokeWidth="1" strokeDasharray="4 2" />
          <line x1="45" y1="85" x2="65" y2="85" stroke="#00f0ff" strokeWidth="1" />
        </svg>
      </div>

      {/* J.A.R.V.I.S. Info & Tony Stark Quote */}
      <div className="flex-1 flex flex-col justify-between font-mono">
        <div>
          <h4 className="text-sm font-black tracking-widest uppercase font-display text-white drop-shadow-[0_0_8px_rgba(0,240,255,0.7)]">
            J.A.R.V.I.S.
          </h4>
          <p className="text-[10px] text-cyan-400/80 leading-tight mt-0.5">
            Your personal AI assistant and tactical interface.
          </p>
        </div>

        <div className="my-2 border-l-2 border-cyan-400/60 pl-2 italic text-[10px] text-cyan-200/90 leading-tight">
          "Sir, the future is not something we predict, it's something we build."
        </div>

        <div className="flex justify-end">
          <span className="text-[8px] font-black uppercase text-cyan-400/70 tracking-widest font-display px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30">
            STARK INDUSTRIES
          </span>
        </div>
      </div>
    </div>
  );
};
