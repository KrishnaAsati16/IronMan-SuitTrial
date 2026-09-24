import React from 'react';
import { Shield, Settings, Battery, Zap, Thermometer, Crosshair, Eye, Radio } from 'lucide-react';
import { useTelemetry } from '../context/TelemetryContext';

export const SuitTelemetryPanel: React.FC = () => {
  const { suitTelemetry } = useTelemetry();

  const battery = Math.round(suitTelemetry.battery || 88);
  const corePower = Math.round(suitTelemetry.corePower || 98);
  const temp = (suitTelemetry.temperature || 32.7).toFixed(1);
  const repulsor = Math.round(suitTelemetry.repulsorCharge || 100);
  const armor = Math.round(suitTelemetry.armorIntegrity || 100);

  return (
    <div className="rounded-2xl bg-[#030915]/90 border border-cyan-500/30 p-4 backdrop-blur-xl shadow-[0_0_30px_rgba(0,180,255,0.12)] flex flex-col justify-between h-full">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2.5 mb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-cyan-950/80 border border-cyan-400/50 shadow-[0_0_10px_rgba(0,240,255,0.3)]">
            <Shield className="w-4 h-4 text-cyan-300" />
          </div>
          <div>
            <h3 className="text-xs font-black tracking-widest uppercase font-display text-white">
              SUIT TELEMETRY
            </h3>
            <p className="text-[10px] text-cyan-400/70 font-mono">
              REAL TIME SENSOR NETWORK
            </p>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded-md text-[9px] font-mono uppercase bg-black/60 text-cyan-400/80 border border-cyan-500/30">
          SOURCE: {suitTelemetry.source || 'SIMULATED'}
        </span>
      </div>

      {/* Sub-Header: System Monitoring Pill */}
      <div className="flex items-center justify-between p-2 rounded-xl bg-cyan-950/30 border border-cyan-500/20 my-1 font-mono text-xs">
        <div className="flex items-center gap-2 text-cyan-200">
          <Settings className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
          <span className="font-bold text-[11px]">SYSTEM MONITORING</span>
        </div>
        <span className="flex items-center gap-1.5 text-[9px] px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          NORMAL
        </span>
      </div>

      {/* Telemetry Gauge Bars Grid (2x2) */}
      <div className="grid grid-cols-2 gap-2.5 my-1.5 font-mono text-xs">
        {/* Battery */}
        <div className="p-2.5 rounded-xl bg-black/50 border border-cyan-500/20">
          <div className="flex items-center justify-between text-[11px] mb-1.5">
            <span className="text-cyan-400/70 flex items-center gap-1.5">
              <Battery className="w-3.5 h-3.5 text-emerald-400" /> BATTERY
            </span>
            <span className="font-bold text-emerald-300">{battery}%</span>
          </div>
          <div className="w-full bg-cyan-950/60 h-2 rounded-full overflow-hidden border border-emerald-500/30">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-500 shadow-[0_0_8px_rgba(52,211,153,0.6)]"
              style={{ width: `${battery}%` }}
            />
          </div>
        </div>

        {/* Core Power */}
        <div className="p-2.5 rounded-xl bg-black/50 border border-cyan-500/20">
          <div className="flex items-center justify-between text-[11px] mb-1.5">
            <span className="text-cyan-400/70 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" /> CORE POWER
            </span>
            <span className="font-bold text-cyan-100">{corePower}%</span>
          </div>
          <div className="w-full bg-cyan-950/60 h-2 rounded-full overflow-hidden border border-cyan-500/30">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-300 transition-all duration-500 shadow-[0_0_8px_#00f0ff]"
              style={{ width: `${corePower}%` }}
            />
          </div>
        </div>

        {/* Suit Internal Temp */}
        <div className="p-2.5 rounded-xl bg-black/50 border border-cyan-500/20">
          <div className="flex items-center justify-between text-[11px] mb-1.5">
            <span className="text-cyan-400/70 flex items-center gap-1.5">
              <Thermometer className="w-3.5 h-3.5 text-amber-400" /> SUIT INTEGRAL
            </span>
            <span className="font-bold text-amber-300">{temp}°C</span>
          </div>
          <div className="w-full bg-cyan-950/60 h-2 rounded-full overflow-hidden border border-amber-500/30">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 transition-all duration-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]"
              style={{ width: `${Math.min(100, (parseFloat(temp) / 50) * 100)}%` }}
            />
          </div>
        </div>

        {/* Repulsor */}
        <div className="p-2.5 rounded-xl bg-black/50 border border-cyan-500/20">
          <div className="flex items-center justify-between text-[11px] mb-1.5">
            <span className="text-cyan-400/70 flex items-center gap-1.5">
              <Crosshair className="w-3.5 h-3.5 text-cyan-400" /> REPULSOR
            </span>
            <span className="font-bold text-cyan-100">{repulsor}%</span>
          </div>
          <div className="w-full bg-cyan-950/60 h-2 rounded-full overflow-hidden border border-cyan-500/30">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 transition-all duration-500 shadow-[0_0_8px_#00f0ff]"
              style={{ width: `${repulsor}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2 Subsystem Status Tiles */}
      <div className="grid grid-cols-2 gap-2 my-1 font-mono text-[11px]">
        <div className="p-2.5 rounded-xl bg-black/50 border border-cyan-500/20 flex items-center justify-between">
          <div>
            <span className="text-[9px] uppercase text-cyan-400/60 block">HELMET VISION</span>
            <span className="font-bold text-cyan-100">
              {suitTelemetry.helmet ? 'LOCKED / ACTIVE' : 'OPEN / RETRACTED'}
            </span>
          </div>
          <Eye className="w-4 h-4 text-cyan-400 shrink-0" />
        </div>

        <div className="p-2.5 rounded-xl bg-black/50 border border-cyan-500/20 flex items-center justify-between">
          <div>
            <span className="text-[9px] uppercase text-cyan-400/60 block">CORE REACTOR STATUS</span>
            <span className="font-bold text-emerald-400">ONLINE (AES-ECM)</span>
          </div>
          <Radio className="w-4 h-4 text-emerald-400 animate-pulse shrink-0" />
        </div>
      </div>

      {/* Nanotech Armor Integrity Full Bar */}
      <div className="pt-2 border-t border-cyan-500/20 font-mono text-xs">
        <div className="flex justify-between text-cyan-300/80 text-[11px] mb-1">
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-cyan-400" /> NANOTECH ARMOR INTEGRITY
          </span>
          <span className="font-bold text-cyan-100">{armor}%</span>
        </div>
        <div className="w-full bg-cyan-950/60 h-2.5 rounded-full overflow-hidden border border-cyan-500/30">
          <div
            className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-cyan-200 transition-all duration-500 shadow-[0_0_10px_#00f0ff]"
            style={{ width: `${armor}%` }}
          />
        </div>
      </div>
    </div>
  );
};
