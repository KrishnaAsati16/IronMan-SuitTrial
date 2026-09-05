import React from 'react';
import { Battery, Thermometer, ShieldCheck, Radio, Sparkles, Crosshair, Cpu } from 'lucide-react';
import { HudCard } from './HudCard';
import { useTelemetry } from '../context/TelemetryContext';
import { toggleHelmetApi } from '../services/api';
import { useAudio } from '../context/AudioContext';

export const TelemetryPanel: React.FC = () => {
  const { suitTelemetry } = useTelemetry();
  const { playClick, playCommandAccepted } = useAudio();

  const handleHelmetToggle = async () => {
    playClick();
    try {
      await toggleHelmetApi();
      playCommandAccepted();
    } catch (e) {
      console.warn('Failed to toggle helmet', e);
    }
  };

  const battery = Math.round(suitTelemetry.battery);
  const temp = suitTelemetry.temperature.toFixed(1);
  const core = Math.round(suitTelemetry.corePower);
  const repulsor = Math.round(suitTelemetry.repulsorCharge);
  const armor = Math.round(suitTelemetry.armorIntegrity);

  return (
    <HudCard
      title="SUIT TELEMETRY"
      subtitle="MARK LXXXV SENSOR NETWORK"
      icon={<ShieldCheck className="w-4 h-4" />}
      badge={
        <div className="flex items-center gap-1 text-[10px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          SOURCE: {suitTelemetry.source}
        </div>
      }
    >
      <div className="space-y-3 font-mono text-xs">
        {/* Core Status Banner */}
        <div className="flex items-center justify-between p-2 rounded bg-cyan-950/40 border border-cyan-500/30">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-cyan-200 font-bold uppercase tracking-wider">
              {suitTelemetry.statusText}
            </span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-900/60 text-cyan-300 border border-cyan-400/40">
            SENSORS {suitTelemetry.sensorsOnline}/{suitTelemetry.sensorsTotal} NOMINAL
          </span>
        </div>

        {/* Telemetry Gauge Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Battery Meter */}
          <div className="p-2 rounded bg-cyan-950/30 border border-cyan-500/20">
            <div className="flex items-center justify-between mb-1">
              <span className="text-cyan-400/70 text-[10px] uppercase flex items-center gap-1">
                <Battery className="w-3 h-3 text-cyan-300" /> BATTERY
              </span>
              <span className="font-bold text-cyan-100">{battery}%</span>
            </div>
            <div className="w-full bg-cyan-950/80 h-1.5 rounded overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  battery < 20 ? 'bg-red-500' : battery < 50 ? 'bg-amber-400' : 'bg-cyan-400'
                }`}
                style={{ width: `${battery}%` }}
              />
            </div>
          </div>

          {/* Core Power Meter */}
          <div className="p-2 rounded bg-cyan-950/30 border border-cyan-500/20">
            <div className="flex items-center justify-between mb-1">
              <span className="text-cyan-400/70 text-[10px] uppercase flex items-center gap-1">
                <Cpu className="w-3 h-3 text-cyan-300" /> CORE POWER
              </span>
              <span className="font-bold text-cyan-100">{core}%</span>
            </div>
            <div className="w-full bg-cyan-950/80 h-1.5 rounded overflow-hidden">
              <div
                className="h-full bg-cyan-400 transition-all duration-500 shadow-[0_0_8px_#00f0ff]"
                style={{ width: `${Math.min(100, core)}%` }}
              />
            </div>
          </div>

          {/* Temperature */}
          <div className="p-2 rounded bg-cyan-950/30 border border-cyan-500/20">
            <div className="flex items-center justify-between mb-1">
              <span className="text-cyan-400/70 text-[10px] uppercase flex items-center gap-1">
                <Thermometer className="w-3 h-3 text-amber-400" /> SUIT INTERNAL
              </span>
              <span className="font-bold text-amber-300">{temp}°C</span>
            </div>
            <div className="w-full bg-cyan-950/80 h-1.5 rounded overflow-hidden">
              <div
                className="h-full bg-amber-400 transition-all duration-500"
                style={{ width: `${Math.min(100, (suitTelemetry.temperature / 50) * 100)}%` }}
              />
            </div>
          </div>

          {/* Repulsor Charge */}
          <div className="p-2 rounded bg-cyan-950/30 border border-cyan-500/20">
            <div className="flex items-center justify-between mb-1">
              <span className="text-cyan-400/70 text-[10px] uppercase flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-300" /> REPULSOR
              </span>
              <span className="font-bold text-cyan-100">{repulsor}%</span>
            </div>
            <div className="w-full bg-cyan-950/80 h-1.5 rounded overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
                style={{ width: `${repulsor}%` }}
              />
            </div>
          </div>
        </div>

        {/* Subsystem State Switches */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          {/* Helmet Visor Toggle */}
          <button
            onClick={handleHelmetToggle}
            className={`p-2 rounded border text-left transition-all flex items-center justify-between ${
              suitTelemetry.helmet
                ? 'bg-cyan-950/50 border-cyan-400/40 text-cyan-200'
                : 'bg-red-950/40 border-red-500/40 text-red-300'
            }`}
          >
            <div>
              <span className="text-[9px] uppercase text-cyan-400/60 block">HELMET VISOR</span>
              <span className="font-bold text-xs">{suitTelemetry.helmet ? 'LOCKED / ACTIVE' : 'OPEN / RETRACTED'}</span>
            </div>
            <Crosshair className="w-4 h-4 text-cyan-400" />
          </button>

          {/* Comms Uplink */}
          <div className="p-2 rounded bg-cyan-950/40 border border-cyan-500/20 flex items-center justify-between">
            <div>
              <span className="text-[9px] uppercase text-cyan-400/60 block">COMMS ENCRYPTION</span>
              <span className="font-bold text-xs text-emerald-400">ONLINE (AES-GCM)</span>
            </div>
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
          </div>
        </div>

        {/* Armor Integrity Bar */}
        <div className="p-2 rounded bg-cyan-950/20 border border-cyan-500/20">
          <div className="flex justify-between text-cyan-400/80 text-[10px] uppercase mb-1">
            <span>NANOTECH ARMOR INTEGRITY</span>
            <span className="font-bold text-cyan-100">{armor}%</span>
          </div>
          <div className="w-full bg-cyan-950 h-1 rounded overflow-hidden">
            <div className="h-full bg-cyan-400" style={{ width: `${armor}%` }} />
          </div>
        </div>
      </div>
    </HudCard>
  );
};
