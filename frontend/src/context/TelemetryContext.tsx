import React, { createContext, useContext, useState, useEffect } from 'react';
import { SystemStats, SuitTelemetry } from '../types/telemetry';
import { getSocket } from '../services/socket';
import { fetchSystemStats, fetchSuitTelemetry } from '../services/api';

interface TelemetryContextType {
  systemStats: SystemStats | null;
  suitTelemetry: SuitTelemetry;
  isConnected: boolean;
  latencyMs: number;
}

const DEFAULT_SUIT_TELEMETRY: SuitTelemetry = {
  source: 'SIMULATED',
  battery: 88.5,
  temperature: 32.0,
  corePower: 96.0,
  helmet: true,
  comms: true,
  repulsorCharge: 100.0,
  thrusterOutput: 0.0,
  armorIntegrity: 100.0,
  sensorsOnline: 8,
  sensorsTotal: 8,
  overdriveActive: false,
  statusText: 'SYSTEM NOMINAL',
  timestamp: new Date().toISOString()
};

const TelemetryContext = createContext<TelemetryContextType | undefined>(undefined);

export const TelemetryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [systemStats, setSystemStats] = useState<SystemStats | null>(null);
  const [suitTelemetry, setSuitTelemetry] = useState<SuitTelemetry>(DEFAULT_SUIT_TELEMETRY);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [latencyMs, setLatencyMs] = useState<number>(38);

  useEffect(() => {
    const socket = getSocket();

    const onConnect = () => {
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    const onSystemUpdate = (stats: SystemStats) => {
      setSystemStats(stats);
    };

    const onSuitTelemetry = (telemetry: SuitTelemetry) => {
      setSuitTelemetry(telemetry);
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('system:update', onSystemUpdate);
    socket.on('suit:telemetry', onSuitTelemetry);

    // Initial fetch in case WS takes a moment to connect
    fetchSystemStats().then((s) => setSystemStats(s)).catch(() => {});
    fetchSuitTelemetry().then((t) => setSuitTelemetry(t)).catch(() => {});

    // Ping check for HUD latency indicator
    const pingInterval = setInterval(() => {
      const start = Date.now();
      socket.volatile.emit('ping', () => {
        setLatencyMs(Date.now() - start);
      });
      // If socket not connected, provide a reasonable mock latency
      if (!socket.connected) {
        setLatencyMs(42 + Math.floor(Math.random() * 8));
      }
    }, 4000);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('system:update', onSystemUpdate);
      socket.off('suit:telemetry', onSuitTelemetry);
      clearInterval(pingInterval);
    };
  }, []);

  return (
    <TelemetryContext.Provider value={{ systemStats, suitTelemetry, isConnected, latencyMs }}>
      {children}
    </TelemetryContext.Provider>
  );
};

export const useTelemetry = (): TelemetryContextType => {
  const context = useContext(TelemetryContext);
  if (!context) throw new Error('useTelemetry must be used within TelemetryProvider');
  return context;
};
