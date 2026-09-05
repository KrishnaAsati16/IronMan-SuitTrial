import { exec } from 'child_process';
import { logger } from '../utils/logger';
import { systemMonitorService } from './systemMonitorService';
import { weatherService } from './weatherService';
import { hardwareTelemetryService } from './hardwareTelemetryService';

export interface CommandRequest {
  type: string;
  target?: string;
  payload?: Record<string, any>;
}

export interface CommandExecutionResult {
  success: boolean;
  type: string;
  message: string;
  actionTaken: string;
  data?: any;
  timestamp: string;
}

// Strict whitelist of permitted operations
export const ALLOWED_COMMANDS = [
  'OPEN_WEBSITE',
  'GET_TIME',
  'GET_WEATHER',
  'GET_SYSTEM_STATUS',
  'TOGGLE_REACTOR',
  'SWITCH_HUD_MODE',
  'TOGGLE_VOICE',
  'LAUNCH_APP'
] as const;

export class CommandExecutorService {
  public async executeCommand(command: CommandRequest): Promise<CommandExecutionResult> {
    const { type, target, payload } = command;

    if (!ALLOWED_COMMANDS.includes(type as any)) {
      logger.warn(`Security violation attempt: Command "${type}" is not on the whitelist.`);
      return {
        success: false,
        type,
        message: `Command "${type}" rejected. Security protocols prevent unverified command execution.`,
        actionTaken: 'REJECTED_BY_SECURITY_WHITELIST',
        timestamp: new Date().toISOString()
      };
    }

    logger.info(`Executing safe command [${type}] with target "${target || 'N/A'}"`);

    switch (type) {
      case 'OPEN_WEBSITE': {
        if (!target) {
          return {
            success: false,
            type,
            message: 'No website URL specified.',
            actionTaken: 'ABORTED',
            timestamp: new Date().toISOString()
          };
        }

        // Validate URL protocol
        try {
          const parsed = new URL(target.startsWith('http') ? target : `https://${target}`);
          if (!['http:', 'https:'].includes(parsed.protocol)) {
            throw new Error('Invalid URL protocol');
          }

          // Return instruction for frontend HUD to open tab safely in browser
          return {
            success: true,
            type,
            message: `Opening ${parsed.href} in browser viewport.`,
            actionTaken: 'BROWSER_NAVIGATION',
            data: { url: parsed.href },
            timestamp: new Date().toISOString()
          };
        } catch (e: any) {
          return {
            success: false,
            type,
            message: `Invalid URL format: ${target}`,
            actionTaken: 'ABORTED',
            timestamp: new Date().toISOString()
          };
        }
      }

      case 'GET_TIME': {
        const now = new Date();
        return {
          success: true,
          type,
          message: `Current local time is ${now.toLocaleTimeString()}`,
          actionTaken: 'TIME_SYNCHRONIZED',
          data: {
            iso: now.toISOString(),
            time: now.toLocaleTimeString(),
            date: now.toLocaleDateString()
          },
          timestamp: now.toISOString()
        };
      }

      case 'GET_WEATHER': {
        const city = target || payload?.city || 'Malibu';
        const weather = await weatherService.getWeather(city);
        return {
          success: true,
          type,
          message: `Atmospheric telemetry for ${weather.city}: ${weather.temperatureC}°C (${weather.condition}).`,
          actionTaken: 'WEATHER_FETCHED',
          data: weather,
          timestamp: new Date().toISOString()
        };
      }

      case 'GET_SYSTEM_STATUS': {
        const stats = await systemMonitorService.getSystemStats();
        return {
          success: true,
          type,
          message: `System status: CPU ${stats.cpuUsage}%, RAM ${stats.ramUsagePercent}%. All systems nominal.`,
          actionTaken: 'SYSTEM_STATS_RETRIEVED',
          data: stats,
          timestamp: new Date().toISOString()
        };
      }

      case 'TOGGLE_REACTOR': {
        const isOverdrive = hardwareTelemetryService.toggleOverdrive();
        return {
          success: true,
          type,
          message: isOverdrive ? 'Arc Reactor overdrive engaged!' : 'Arc Reactor returned to nominal mode.',
          actionTaken: isOverdrive ? 'OVERDRIVE_ACTIVATED' : 'OVERDRIVE_DEACTIVATED',
          data: { overdrive: isOverdrive },
          timestamp: new Date().toISOString()
        };
      }

      case 'SWITCH_HUD_MODE': {
        const targetMode = target === 'helmet' || payload?.mode === 'helmet' ? 'helmet' : 'normal';
        return {
          success: true,
          type,
          message: `Display mode set to ${targetMode.toUpperCase()}.`,
          actionTaken: 'HUD_MODE_CHANGED',
          data: { mode: targetMode },
          timestamp: new Date().toISOString()
        };
      }

      case 'TOGGLE_VOICE': {
        return {
          success: true,
          type,
          message: 'Voice feedback status toggled.',
          actionTaken: 'VOICE_TOGGLED',
          timestamp: new Date().toISOString()
        };
      }

      case 'LAUNCH_APP': {
        // Safe whitelist of apps (strictly hardcoded binary names)
        const SAFE_APP_MAP: Record<string, string> = {
          calculator: process.platform === 'win32' ? 'calc.exe' : 'gnome-calculator',
          notepad: process.platform === 'win32' ? 'notepad.exe' : 'gedit',
          terminal: process.platform === 'win32' ? 'wt.exe' : 'x-terminal-emulator'
        };

        const appKey = (target || '').toLowerCase().trim();
        const binary = SAFE_APP_MAP[appKey];

        if (!binary) {
          return {
            success: false,
            type,
            message: `Application "${target}" is not in the safe whitelist. Supported shortcuts: calculator, notepad, terminal.`,
            actionTaken: 'BLOCKED_BY_WHITELIST',
            timestamp: new Date().toISOString()
          };
        }

        try {
          // Launch binary from hardcoded whitelist only, NEVER arbitrary user input
          exec(binary, (err) => {
            if (err) logger.warn(`Safe app launch returned notification: ${err.message}`);
          });
          return {
            success: true,
            type,
            message: `Launched safe application shortcut: ${target}`,
            actionTaken: 'APP_LAUNCHED',
            data: { app: appKey },
            timestamp: new Date().toISOString()
          };
        } catch (e: any) {
          return {
            success: false,
            type,
            message: `Could not launch shortcut: ${e.message}`,
            actionTaken: 'LAUNCH_FAILED',
            timestamp: new Date().toISOString()
          };
        }
      }

      default:
        return {
          success: false,
          type,
          message: 'Command not recognized.',
          actionTaken: 'UNHANDLED',
          timestamp: new Date().toISOString()
        };
    }
  }
}

export const commandExecutorService = new CommandExecutorService();
