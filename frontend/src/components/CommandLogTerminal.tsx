import React from 'react';
import { Terminal } from 'lucide-react';
import { useJarvis } from '../context/JarvisContext';

export const CommandLogTerminal: React.FC = () => {
  const { commandHistory } = useJarvis();

  const defaultLogs = [
    { time: '15:24:35', tag: 'J.A.R.V.I.S.', msg: 'System check complete.' },
    { time: '15:24:36', tag: 'CORE', msg: 'Reactor stable.' },
    { time: '15:24:37', tag: 'SENSORS', msg: '8/8 online.' },
    { time: '15:24:38', tag: 'NETWORK', msg: 'Connected.' },
    { time: '15:24:39', tag: 'USER', msg: 'Krishna Asati logged in.' },
    { time: '15:24:42', tag: 'J.A.R.V.I.S.', msg: 'Awaiting command...' },
  ];

  return (
    <div className="rounded-2xl bg-[#030915]/90 border border-cyan-500/30 p-4 backdrop-blur-xl shadow-[0_0_30px_rgba(0,180,255,0.12)] flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2.5 mb-2">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-black tracking-widest uppercase font-display text-white">
            COMMAND LOG TERMINAL
          </h3>
        </div>

        <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-500/40">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          LIVE
        </span>
      </div>

      {/* Terminal Feed Scroll */}
      <div className="space-y-1.5 font-mono text-[11px] overflow-y-auto max-h-36 pr-1 my-1">
        {commandHistory.length > 1 ? (
          commandHistory.slice(0, 8).map((item) => (
            <div key={item.id} className="text-cyan-300 flex items-start gap-1.5 leading-tight">
              <span className="text-cyan-500">[{item.timestamp}]</span>
              <span className="text-amber-400 font-bold">{item.source}:</span>
              <span className="text-cyan-100 truncate">{item.commandText}</span>
            </div>
          ))
        ) : (
          defaultLogs.map((log, i) => (
            <div key={i} className="text-cyan-300 flex items-start gap-1.5 leading-tight">
              <span className="text-cyan-500">[{log.time}]</span>
              <span className="text-cyan-400 font-bold min-w-[70px]">{log.tag} :</span>
              <span className="text-cyan-100">{log.msg}</span>
            </div>
          ))
        )}
      </div>

      {/* Active Modules Tag Bar */}
      <div className="pt-2.5 border-t border-cyan-500/20">
        <div className="text-[9px] uppercase tracking-wider text-cyan-400/60 font-mono mb-1.5">
          ACTIVE MODULES
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/40">
            ⚙ Diagnostics
          </span>
          <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
            📡 Telemetry
          </span>
          <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-purple-950/80 text-purple-300 border border-purple-500/40">
            🧠 AI Core
          </span>
          <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-red-950/80 text-red-300 border border-red-500/40">
            🛡 Security
          </span>
        </div>
      </div>
    </div>
  );
};
