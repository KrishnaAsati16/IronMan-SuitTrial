import React from 'react';
import { Shield, Laptop, Monitor, Clock, Wifi, HardDrive, Cpu, Server } from 'lucide-react';
import { ProgressRing } from './ProgressRing';
import { useTelemetry } from '../context/TelemetryContext';
import { formatUptime } from '../utils/formatters';

export const SystemDiagnosticsPanel: React.FC = () => {
  const { systemStats } = useTelemetry();

  const cpuUsage = systemStats?.cpuUsage ?? 42;
  const ramUsage = systemStats?.ramUsagePercent ?? 78;
  const diskUsage = systemStats?.diskUsagePercent ?? 56;
  const hostname = systemStats?.hostname || 'LAPTOP-6TCROSVP';
  const platform = systemStats?.platform || 'Windows 11 x64';
  const uptime = formatUptime(systemStats?.uptimeSeconds ?? 574092);
  const ip = systemStats?.network?.ip4 || '192.168.43.166';

  const ramUsedGb = systemStats?.ramUsedMb ? (systemStats.ramUsedMb / 1024).toFixed(1) : '12.4';
  const ramTotalGb = systemStats?.ramTotalMb ? (systemStats.ramTotalMb / 1024).toFixed(1) : '15.8';

  const diskUsedGb = systemStats?.diskUsedGb ?? 268;
  const diskTotalGb = systemStats?.diskTotalGb ?? 475;

  return (
    <div className="rounded-2xl bg-[#030915]/90 border border-cyan-500/30 p-4 backdrop-blur-xl shadow-[0_0_30px_rgba(0,180,255,0.12)] flex flex-col justify-between h-full">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2.5 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-cyan-950/80 border border-cyan-400/50 shadow-[0_0_10px_rgba(0,240,255,0.3)]">
            <Shield className="w-4 h-4 text-cyan-300" />
          </div>
          <div>
            <h3 className="text-xs font-black tracking-widest uppercase font-display text-white">
              SYSTEM DIAGNOSTICS
            </h3>
            <p className="text-[10px] text-cyan-400/70 font-mono flex items-center gap-1">
              <span>HOST: J.A.R.V.I.S.</span>
              <span>•</span>
              <span className="text-emerald-400 font-bold">ONLINE</span>
            </p>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase bg-emerald-950/60 text-emerald-300 border border-emerald-500/40">
          ALL SYSTEMS NOMINAL
        </span>
      </div>

      {/* 3 Glowing Circular Progress Rings */}
      <div className="grid grid-cols-3 gap-2 py-1 bg-black/40 rounded-xl border border-cyan-500/10 text-center my-1">
        <div>
          <ProgressRing
            progress={cpuUsage}
            radius={36}
            stroke={4.5}
            color="#00f0ff"
            glowColor="rgba(0,240,255,0.7)"
            label="CPU"
          />
        </div>

        <div>
          <ProgressRing
            progress={ramUsage}
            radius={36}
            stroke={4.5}
            color="#ec4899"
            glowColor="rgba(236,72,153,0.7)"
            label="RAM"
          />
        </div>

        <div>
          <ProgressRing
            progress={diskUsage}
            radius={36}
            stroke={4.5}
            color="#f59e0b"
            glowColor="rgba(245,158,11,0.7)"
            label="STORAGE"
          />
        </div>
      </div>

      {/* 3 Horizontal Progress Bars */}
      <div className="space-y-2.5 my-2 font-mono text-xs">
        {/* CPU Bar */}
        <div>
          <div className="flex justify-between text-cyan-300/80 text-[11px] mb-1">
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" /> CPU UTILIZATION
            </span>
            <span className="font-bold text-cyan-100">{cpuUsage}%</span>
          </div>
          <div className="w-full bg-cyan-950/60 h-2 rounded-full overflow-hidden border border-cyan-500/20">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 transition-all duration-500 shadow-[0_0_8px_#00f0ff]"
              style={{ width: `${cpuUsage}%` }}
            />
          </div>
        </div>

        {/* RAM Bar */}
        <div>
          <div className="flex justify-between text-cyan-300/80 text-[11px] mb-1">
            <span className="flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-pink-400" /> RAM ({ramUsedGb} / {ramTotalGb} GB)
            </span>
            <span className="font-bold text-pink-200">{ramUsage}%</span>
          </div>
          <div className="w-full bg-cyan-950/60 h-2 rounded-full overflow-hidden border border-pink-500/20">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 shadow-[0_0_8px_rgba(236,72,153,0.6)]"
              style={{ width: `${ramUsage}%` }}
            />
          </div>
        </div>

        {/* Disk Bar */}
        <div>
          <div className="flex justify-between text-cyan-300/80 text-[11px] mb-1">
            <span className="flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-amber-400" /> DISK CAPACITY ({diskUsedGb} GB / {diskTotalGb} GB)
            </span>
            <span className="font-bold text-amber-200">{diskUsage}%</span>
          </div>
          <div className="w-full bg-cyan-950/60 h-2 rounded-full overflow-hidden border border-amber-500/20">
            <div
              className="h-full bg-gradient-to-r from-amber-600 to-yellow-400 transition-all duration-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]"
              style={{ width: `${diskUsage}%` }}
            />
          </div>
        </div>
      </div>

      {/* 4 Metadata Grid Cards */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-cyan-500/20 font-mono text-[11px]">
        <div className="bg-black/50 p-2 rounded-xl border border-cyan-500/20 flex items-center gap-2">
          <Laptop className="w-4 h-4 text-cyan-400 shrink-0" />
          <div className="truncate">
            <span className="text-cyan-400/60 block text-[9px] uppercase">HOSTNAME</span>
            <span className="text-cyan-100 font-bold truncate block">{hostname}</span>
          </div>
        </div>

        <div className="bg-black/50 p-2 rounded-xl border border-cyan-500/20 flex items-center gap-2">
          <Monitor className="w-4 h-4 text-cyan-400 shrink-0" />
          <div className="truncate">
            <span className="text-cyan-400/60 block text-[9px] uppercase">OS</span>
            <span className="text-cyan-100 font-bold truncate block">{platform}</span>
          </div>
        </div>

        <div className="bg-black/50 p-2 rounded-xl border border-cyan-500/20 flex items-center gap-2">
          <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
          <div className="truncate">
            <span className="text-cyan-400/60 block text-[9px] uppercase">UPTIME</span>
            <span className="text-cyan-100 font-bold truncate block">{uptime}</span>
          </div>
        </div>

        <div className="bg-black/50 p-2 rounded-xl border border-cyan-500/20 flex items-center gap-2">
          <Wifi className="w-4 h-4 text-cyan-400 shrink-0" />
          <div className="truncate">
            <span className="text-cyan-400/60 block text-[9px] uppercase">IP ADDRESS</span>
            <span className="text-cyan-100 font-bold truncate block">{ip}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
