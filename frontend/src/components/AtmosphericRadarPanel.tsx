import React, { useState, useEffect } from 'react';
import { Compass, Search, Sun, Droplets, Wind, Gauge } from 'lucide-react';
import { fetchWeather } from '../services/api';
import { WeatherData } from '../types/weather';
import { useAudio } from '../context/AudioContext';

export const AtmosphericRadarPanel: React.FC = () => {
  const { playClick, playCommandAccepted } = useAudio();
  const [cityInput, setCityInput] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>({
    city: 'MALIBU',
    temperatureC: 25,
    temperatureF: 77,
    condition: 'Sunny',
    description: 'Optimal visibility for sub-orbital flight protocols',
    humidity: 42,
    windSpeedKmh: 14,
    windDirection: 'NW (315°)',
    pressureHpa: 1014,
    visibilityKm: 12,
    isSimulated: true,
    timestamp: new Date().toISOString()
  });

  const loadWeather = async (targetCity?: string) => {
    try {
      const data = await fetchWeather(targetCity);
      if (data) setWeather(data);
    } catch (e) {
      console.warn('Weather fetch error', e);
    }
  };

  useEffect(() => {
    loadWeather('Malibu');
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cityInput.trim()) return;
    playClick();
    loadWeather(cityInput.trim());
    playCommandAccepted();
  };

  return (
    <div className="rounded-2xl bg-[#030915]/90 border border-cyan-500/30 p-4 backdrop-blur-xl shadow-[0_0_30px_rgba(0,180,255,0.12)] flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2.5 mb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-cyan-950/80 border border-cyan-400/50 shadow-[0_0_10px_rgba(0,240,255,0.3)]">
            <Compass className="w-4 h-4 text-cyan-300" />
          </div>
          <div>
            <h3 className="text-xs font-black tracking-widest uppercase font-display text-white">
              ATMOSPHERIC RADAR
            </h3>
            <p className="text-[10px] text-cyan-400/70 font-mono">
              METEOROLOGICAL TELEMETRY
            </p>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
          TACTICAL : ON
        </span>
      </div>

      {/* City Query Search Box */}
      <form onSubmit={handleSearch} className="flex gap-1.5 my-1">
        <div className="relative flex-1">
          <input
            type="text"
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            placeholder="Query city atmospheric data (e.g. London, Tokyo)..."
            className="w-full rounded-xl bg-black/60 border border-cyan-500/30 py-2 pl-3.5 pr-9 text-xs font-mono text-cyan-100 placeholder-cyan-500/40 focus:outline-none focus:border-cyan-300 transition-all"
          />
          <button
            type="submit"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-cyan-400 hover:text-white"
          >
            <Search className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>

      {/* Malibu Scenic Weather Backdrop Box */}
      <div className="relative rounded-xl overflow-hidden border border-cyan-500/30 p-3.5 my-2 bg-gradient-to-r from-[#031b2e] via-[#093554] to-[#1a2d42] flex items-center justify-between shadow-inner">
        {/* Subtle Horizon Mountain Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(245,158,11,0.2)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 font-mono">
          <span className="text-[9px] uppercase tracking-wider text-cyan-400/70 block">
            LOCATION
          </span>
          <h4 className="text-base font-black font-display text-white tracking-wider">
            {weather?.city.toUpperCase() || 'MALIBU'}
          </h4>
          <span className="text-xs text-amber-300 font-semibold">{weather?.condition || 'Sunny'}</span>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <Sun className="w-10 h-10 text-amber-400 animate-spin-slow drop-shadow-[0_0_12px_#f59e0b]" />
          <div className="text-right font-mono">
            <div className="text-2xl font-black font-display text-white glow-text-cyan leading-none">
              {weather?.temperatureC ?? 25}°C
            </div>
            <div className="text-[10px] text-cyan-400/70 mt-1">{weather?.temperatureF ?? 77}°F</div>
          </div>
        </div>
      </div>

      {/* Bottom 3 Atmospheric Metrics */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-cyan-500/20 font-mono text-[11px]">
        <div className="bg-black/50 p-2 rounded-xl border border-cyan-500/20 flex flex-col items-center text-center">
          <Droplets className="w-4 h-4 text-cyan-400 mb-1" />
          <span className="text-[9px] uppercase text-cyan-400/60">HUMIDITY</span>
          <span className="font-bold text-cyan-100">{weather?.humidity ?? 42}%</span>
        </div>

        <div className="bg-black/50 p-2 rounded-xl border border-cyan-500/20 flex flex-col items-center text-center">
          <Wind className="w-4 h-4 text-cyan-400 mb-1" />
          <span className="text-[9px] uppercase text-cyan-400/60">WIND VECTOR</span>
          <span className="font-bold text-cyan-100">{weather?.windSpeedKmh ?? 14} km/h</span>
        </div>

        <div className="bg-black/50 p-2 rounded-xl border border-cyan-500/20 flex flex-col items-center text-center">
          <Gauge className="w-4 h-4 text-cyan-400 mb-1" />
          <span className="text-[9px] uppercase text-cyan-400/60">PRESSURE</span>
          <span className="font-bold text-cyan-100">{weather?.pressureHpa ?? 1014} hPa</span>
        </div>
      </div>
    </div>
  );
};
