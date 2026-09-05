import React, { useState, useEffect } from 'react';
import { CloudRain, Wind, Droplets, Compass, Search, MapPin, Gauge } from 'lucide-react';
import { HudCard } from './HudCard';
import { fetchWeather } from '../services/api';
import { WeatherData } from '../types/weather';
import { useAudio } from '../context/AudioContext';

export const WeatherPanel: React.FC = () => {
  const { playClick, playCommandAccepted } = useAudio();
  const [cityInput, setCityInput] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadWeather = async (targetCity?: string) => {
    setIsLoading(true);
    try {
      const data = await fetchWeather(targetCity);
      setWeather(data);
    } catch (e) {
      console.warn('Weather fetch error', e);
    } finally {
      setIsLoading(false);
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
    <HudCard
      title="ATMOSPHERIC RADAR"
      subtitle="METEOROLOGICAL TELEMETRY"
      icon={<CloudRain className="w-4 h-4" />}
      badge={
        weather && (
          <span className="text-[10px] font-mono text-cyan-400/80 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
            {weather.isSimulated ? 'TACTICAL SIM' : 'SATELLITE RADAR'}
          </span>
        )
      }
    >
      <div className="space-y-3 font-mono text-xs">
        {/* City Query Input */}
        <form onSubmit={handleSearch} className="flex gap-1.5">
          <div className="relative flex-1">
            <input
              type="text"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              placeholder="Query city atmospheric scan (e.g. London, Tokyo)..."
              className="w-full rounded bg-cyan-950/40 border border-cyan-500/30 py-1.5 pl-7 pr-2 text-xs text-cyan-100 placeholder-cyan-500/40 focus:outline-none focus:border-cyan-400"
            />
            <MapPin className="w-3.5 h-3.5 text-cyan-400/60 absolute left-2 top-1/2 -translate-y-1/2" />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-2.5 py-1.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900 transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Current Weather Display */}
        {weather ? (
          <div className="space-y-2.5">
            {/* Big Temp Header */}
            <div className="flex items-center justify-between p-3 rounded bg-cyan-950/40 border border-cyan-500/30">
              <div>
                <span className="text-[10px] uppercase text-cyan-400/70 tracking-wider">
                  LOCATION
                </span>
                <h4 className="text-lg font-bold font-display text-cyan-100 tracking-wider">
                  {weather.city.toUpperCase()}
                </h4>
                <p className="text-[11px] text-cyan-300/80 italic">{weather.condition}</p>
              </div>

              <div className="text-right">
                <div className="text-3xl font-black font-display text-cyan-100 glow-text-cyan">
                  {weather.temperatureC}°C
                </div>
                <div className="text-[10px] text-cyan-400/60">{weather.temperatureF}°F</div>
              </div>
            </div>

            {/* Meteorological Breakdown Grid */}
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 rounded bg-cyan-950/30 border border-cyan-500/20 flex items-center gap-2">
                <Droplets className="w-4 h-4 text-cyan-400 shrink-0" />
                <div>
                  <span className="text-[9px] uppercase text-cyan-400/60 block">HUMIDITY</span>
                  <span className="font-bold text-cyan-200">{weather.humidity}%</span>
                </div>
              </div>

              <div className="p-2 rounded bg-cyan-950/30 border border-cyan-500/20 flex items-center gap-2">
                <Wind className="w-4 h-4 text-cyan-400 shrink-0" />
                <div>
                  <span className="text-[9px] uppercase text-cyan-400/60 block">WIND VECTOR</span>
                  <span className="font-bold text-cyan-200">{weather.windSpeedKmh} km/h</span>
                </div>
              </div>

              <div className="p-2 rounded bg-cyan-950/30 border border-cyan-500/20 flex items-center gap-2">
                <Compass className="w-4 h-4 text-cyan-400 shrink-0" />
                <div>
                  <span className="text-[9px] uppercase text-cyan-400/60 block">HEADING</span>
                  <span className="font-bold text-cyan-200">{weather.windDirection}</span>
                </div>
              </div>

              <div className="p-2 rounded bg-cyan-950/30 border border-cyan-500/20 flex items-center gap-2">
                <Gauge className="w-4 h-4 text-cyan-400 shrink-0" />
                <div>
                  <span className="text-[9px] uppercase text-cyan-400/60 block">PRESSURE</span>
                  <span className="font-bold text-cyan-200">{weather.pressureHpa} hPa</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 text-cyan-500/60 font-mono text-xs">
            Scanning atmospheric sensors...
          </div>
        )}
      </div>
    </HudCard>
  );
};
