import React from 'react';

export const FooterStatusBar: React.FC = () => {
  return (
    <footer className="w-full bg-[#020714]/95 border-t border-cyan-500/25 px-5 py-2 flex items-center justify-between font-mono text-[10px] text-cyan-400/70 select-none z-20">
      {/* Left OS & Version */}
      <div className="flex items-center gap-2">
        <span className="font-bold text-cyan-200">STARK INDUSTRIES</span>
        <span>|</span>
        <span>J.A.R.V.I.S. QUANTUM OS</span>
        <span className="px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-[9px]">
          v3.8.5
        </span>
      </div>

      {/* Right Systems Online & Cyber Slits */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
          <span>SYSTEMS ONLINE</span>
        </div>

        {/* Futuristic Status Bars */}
        <div className="flex items-center gap-1 text-cyan-400">
          <span className="inline-block w-1 h-3 bg-cyan-400/80 -skew-x-12" />
          <span className="inline-block w-1 h-3 bg-cyan-400/80 -skew-x-12" />
          <span className="inline-block w-1 h-3 bg-cyan-400/80 -skew-x-12" />
          <span className="inline-block w-1 h-3 bg-cyan-400/80 -skew-x-12" />
        </div>
      </div>
    </footer>
  );
};
