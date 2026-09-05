import React from 'react';
import { Cpu, Server, HardDrive, Wifi, Clock } from 'lucide-react';
import { HudCard } from './HudCard';
import { ProgressRing } from './ProgressRing';
import { useTelemetry } from '../context/TelemetryContext';
import { formatUptime } from '../utils/formatters';

export const SystemMonitor: React.FC = () => {
  const { systemStats } = useTelemetry();

  const cpuUsage = systemStats?.cpuUsage ?? 28;
  const ramUsage = systemStats?.ramUsagePercent ?? 54;
  const diskUsage = systemStats?.diskUsagePercent ?? 42;
  const hostname = systemStats?.hostname || 'STARK-MAINFRAME';
  const platform = systemStats?.platform || 'Quantum OS x64';
  const uptime = formatUptime(systemStats?.uptimeSeconds ?? 36000);
  const ip = systemStats?.network?.ip4 || '192.168.1.100';

  return (
    <HudCard
      title="SYSTEM DIAGNOSTICS"
      subtitle="HOST HARDWARE TELEMETRY"
      icon={<Server className="w-4 h-4" />}
      badge={
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          ONLINE
        </div>
      }
    >
      <div className="space-y-4">
        {/* Progress Rings Overview */}
        <div className="grid grid-cols-3 gap-2 text-center py-2 bg-cyan-950/20 rounded border border-cyan-500/10">
          <div>
            <ProgressRing
              progress={cpuUsage}
              radius={38}
              stroke={5}
              color={cpuUsage > 80 ? '#ef4444' : '#00f0ff'}
              glowColor={cpuUsage > 80 ? 'rgba(239, 68, 68, 0.6)' : 'rgba(0, 240, 255, 0.5)'}
              label="CPU"
            />
          </div>

          <div>
            <ProgressRing
              progress={ramUsage}
              radius={38}
              stroke={5}
              color={ramUsage > 85 ? '#eab308' : '#38bdf8'}
              glowColor={ramUsage > 85 ? 'rgba(234, 179, 8, 0.6)' : 'rgba(56, 189, 248, 0.5)'}
              label="RAM"
            />
          </div>

          <div>
            <ProgressRing
              progress={diskUsage}
              radius={38}
              stroke={5}
              color="#a855f7"
              glowColor="rgba(168, 85, 247, 0.5)"
              label="STORAGE"
            />
          </div>
        </div>

        {/* Detailed Horizontal Bars */}
        <div className="space-y-2.5 font-mono text-xs">
          {/* CPU Bar */}
          <div>
            <div className="flex justify-between text-cyan-300/80 mb-1">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-hud-cyan" /> CPU UTILIZATION
              </span>
              <span className="font-bold text-cyan-100">{cpuUsage}%</span>
            </div>
            <div className="w-full bg-cyan-950/60 h-2 rounded overflow-hidden border border-cyan-500/20">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 transition-all duration-500 shadow-[0_0_8px_#00f0ff]"
                style={{ width: `${Math.min(100, Math.max(0, cpuUsage))}%` }}
              />
            </div>
          </div>

          {/* RAM Bar */}
          <div>
            <div className="flex justify-between text-cyan-300/80 mb-1">
              <span className="flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-cyan-400" /> RAM ({systemStats?.ramUsedMb ?? 8192} MB / {systemStats?.ramTotalMb ?? 16384} MB)
              </span>
              <span className="font-bold text-cyan-100">{ramUsage}%</span>
            </div>
            <div className="w-full bg-cyan-950/60 h-2 rounded overflow-hidden border border-cyan-500/20">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(0, ramUsage))}%` }}
              />
            </div>
          </div>

          {/* DISK Bar */}
          <div>
            <div className="flex justify-between text-cyan-300/80 mb-1">
              <span className="flex items-center gap-1.5">
                <HardDrive className="w-3.5 h-3.5 text-purple-400" /> DISK CAPACITY ({systemStats?.diskUsedGb ?? 210} GB / {systemStats?.diskTotalGb ?? 512} GB)
              </span>
              <span className="font-bold text-cyan-100">{diskUsage}%</span>
            </div>
            <div className="w-full bg-cyan-950/60 h-2 rounded overflow-hidden border border-cyan-500/20">
              <div
                className="h-full bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(0, diskUsage))}%` }}
              />
            </div>
          </div>
        </div>

        {/* Machine Metadata Grid */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-cyan-500/20 font-mono text-[11px]">
          <div className="bg-cyan-950/40 p-2 rounded border border-cyan-500/20">
            <span className="text-cyan-400/60 block text-[9px] uppercase">HOSTNAME</span>
            <span className="text-cyan-200 font-bold truncate block">{hostname}</span>
          </div>

          <div className="bg-cyan-950/40 p-2 rounded border border-cyan-500/20">
            <span className="text-cyan-400/60 block text-[9px] uppercase">OPERATING OS</span>
            <span className="text-cyan-200 font-bold truncate block">{platform}</span>
          </div>

          <div className="bg-cyan-950/40 p-2 rounded border border-cyan-500/20">
            <span className="text-cyan-400/60 block text-[9px] uppercase flex items-center gap-1">
              <Clock className="w-2.5 h-2.5" /> UPTIME
            </span>
            <span className="text-cyan-200 font-bold truncate block">{uptime}</span>
          </div>

          <div className="bg-cyan-950/40 p-2 rounded border border-cyan-500/20">
            <span className="text-cyan-400/60 block text-[9px] uppercase flex items-center gap-1">
              <Wifi className="w-2.5 h-2.5" /> PRIMARY IP
            </span>
            <span className="text-cyan-200 font-bold truncate block">{ip}</span>
          </div>
        </div>
      </div>
    </HudCard>
  );
};
