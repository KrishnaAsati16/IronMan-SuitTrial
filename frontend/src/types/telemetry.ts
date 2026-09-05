export interface SystemStats {
  cpuUsage: number;
  cpuCores: number;
  cpuModel: string;
  ramTotalMb: number;
  ramUsedMb: number;
  ramFreeMb: number;
  ramUsagePercent: number;
  diskTotalGb: number;
  diskUsedGb: number;
  diskUsagePercent: number;
  hostname: string;
  platform: string;
  uptimeSeconds: number;
  network: {
    online: boolean;
    interface: string;
    ip4: string;
  };
  timestamp: string;
}

export interface SuitTelemetry {
  source: 'SIMULATED' | 'ESP32_HARDWARE' | 'ARDUINO_SERIAL';
  battery: number;
  temperature: number;
  corePower: number;
  helmet: boolean;
  comms: boolean;
  repulsorCharge: number;
  thrusterOutput: number;
  armorIntegrity: number;
  sensorsOnline: number;
  sensorsTotal: number;
  overdriveActive: boolean;
  statusText: string;
  timestamp: string;
}
