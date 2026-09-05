import React from 'react';
import { Terminal, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { HudCard } from './HudCard';
import { useJarvis } from '../context/JarvisContext';

export const CommandHistory: React.FC = () => {
  const { commandHistory } = useJarvis();

  return (
    <HudCard
      title="COMMAND LOG TERMINAL"
      subtitle="AUDIT & EXECUTION REGISTRY"
      icon={<Terminal className="w-4 h-4" />}
      badge={
        <div className="flex items-center gap-1 text-[10px] font-mono text-cyan-400/80 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
          <Clock className="w-3 h-3 text-cyan-400" />
          <span>{commandHistory.length} EVENTS</span>
        </div>
      }
    >
      <div className="max-h-60 overflow-y-auto space-y-2 font-mono text-xs pr-1">
        {commandHistory.length === 0 ? (
          <div className="text-center py-6 text-cyan-500/50 italic">
            No commands executed yet. Issue a voice or text directive.
          </div>
        ) : (
          commandHistory.map((item) => (
            <div
              key={item.id}
              className="p-2 rounded bg-cyan-950/30 border border-cyan-500/20 space-y-1 hover:border-cyan-500/40 transition-colors"
            >
              {/* Header */}
              <div className="flex items-center justify-between text-[10px] text-cyan-400/60">
                <span className="text-cyan-300 font-bold">[{item.timestamp}]</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-900/60 text-cyan-300">
                    {item.source}
                  </span>
                  {item.status === 'SUCCESS' ? (
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <XCircle className="w-3 h-3 text-red-400" />
                  )}
                </div>
              </div>

              {/* User Command */}
              <div className="flex items-start gap-1.5 text-cyan-200">
                <span className="text-amber-400 font-bold">USER:</span>
                <span className="truncate">{item.commandText}</span>
              </div>

              {/* JARVIS Execution Feedback */}
              <div className="flex items-start gap-1.5 text-cyan-300/80 text-[11px] pl-2 border-l border-cyan-500/30">
                <span className="text-hud-cyan font-bold">JARVIS:</span>
                <span className="truncate">{item.response}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </HudCard>
  );
};
