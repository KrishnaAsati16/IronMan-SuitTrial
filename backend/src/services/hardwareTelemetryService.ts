import { EventEmitter } from 'events';
import { logger } from '../utils/logger';

export interface SuitTelemetryData {
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

export class HardwareTelemetryService extends EventEmitter {
  private currentTelemetry: SuitTelemetryData;
  private lastHardwareUpdate: number = 0;
  private simulationInterval: NodeJS.Timeout | null = null;
  private isSimulationEnabled: boolean = true;

  constructor() {
    super();
    this.currentTelemetry = {
      source: 'SIMULATED',
      battery: 88.4,
      temperature: 32.1,
      corePower: 96.5,
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
  }

  public startSimulation(intervalMs: number = 1500): void {
    if (this.simulationInterval) clearInterval(this.simulationInterval);

    this.simulationInterval = setInterval(() => {
      // If no hardware message in the last 4 seconds, tick the simulation
      if (Date.now() - this.lastHardwareUpdate > 4000 && this.isSimulationEnabled) {
        this.tickSimulation();
        this.emit('telemetry', this.getTelemetry());
      }
    }, intervalMs);
    logger.info('Hardware Telemetry Engine started (Simulation + Physical IoT listener).');
  }

  public stopSimulation(): void {
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
      this.simulationInterval = null;
    }
  }

  public setSimulationEnabled(enabled: boolean): void {
    this.isSimulationEnabled = enabled;
  }

  public toggleOverdrive(): boolean {
    this.currentTelemetry.overdriveActive = !this.currentTelemetry.overdriveActive;
    if (this.currentTelemetry.overdriveActive) {
      this.currentTelemetry.corePower = 115.0;
      this.currentTelemetry.temperature = 38.5;
      this.currentTelemetry.statusText = 'OVERDRIVE ENGAGED';
    } else {
      this.currentTelemetry.corePower = 96.5;
      this.currentTelemetry.temperature = 32.1;
      this.currentTelemetry.statusText = 'SYSTEM NOMINAL';
    }
    this.emit('telemetry', this.getTelemetry());
    return this.currentTelemetry.overdriveActive;
  }

  public toggleHelmet(): boolean {
    this.currentTelemetry.helmet = !this.currentTelemetry.helmet;
    this.emit('telemetry', this.getTelemetry());
    return this.currentTelemetry.helmet;
  }

  public ingestHardwarePacket(data: Partial<SuitTelemetryData>): void {
    this.lastHardwareUpdate = Date.now();
    this.currentTelemetry = {
      ...this.currentTelemetry,
      ...data,
      source: data.source || 'ESP32_HARDWARE',
      timestamp: new Date().toISOString()
    };
    this.emit('telemetry', this.getTelemetry());
  }

  private tickSimulation(): void {
    const isOverdrive = this.currentTelemetry.overdriveActive;
    // Micro-fluctuations for high fidelity sci-fi HUD display
    const powerJitter = (Math.random() - 0.5) * 0.8;
    const tempJitter = (Math.random() - 0.5) * 0.3;

    if (isOverdrive) {
      this.currentTelemetry.corePower = Math.min(125, Math.max(105, +(this.currentTelemetry.corePower + powerJitter).toFixed(1)));
      this.currentTelemetry.temperature = Math.min(45, Math.max(36, +(this.currentTelemetry.temperature + tempJitter).toFixed(1)));
      // Battery slowly drops in overdrive
      this.currentTelemetry.battery = Math.max(15, +(this.currentTelemetry.battery - 0.05).toFixed(1));
    } else {
      this.currentTelemetry.corePower = Math.min(100, Math.max(92, +(this.currentTelemetry.corePower + powerJitter).toFixed(1)));
      this.currentTelemetry.temperature = Math.min(34.5, Math.max(30.5, +(this.currentTelemetry.temperature + tempJitter).toFixed(1)));
      // Battery stable
      this.currentTelemetry.battery = Math.max(20, +(this.currentTelemetry.battery - 0.005).toFixed(1));
    }

    this.currentTelemetry.timestamp = new Date().toISOString();
  }

  public getTelemetry(): SuitTelemetryData {
    return { ...this.currentTelemetry };
  }
}

export const hardwareTelemetryService = new HardwareTelemetryService();
