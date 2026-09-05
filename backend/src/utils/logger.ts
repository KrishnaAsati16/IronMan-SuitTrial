export const logger = {
  info: (msg: string, ...args: any[]) => {
    console.log(`[JARVIS INFO ${new Date().toISOString()}] ${msg}`, ...args);
  },
  warn: (msg: string, ...args: any[]) => {
    console.warn(`[JARVIS WARN ${new Date().toISOString()}] ${msg}`, ...args);
  },
  error: (msg: string, ...args: any[]) => {
    console.error(`[JARVIS ERROR ${new Date().toISOString()}] ${msg}`, ...args);
  },
  hud: (msg: string, ...args: any[]) => {
    console.log(`[HUD TELEMETRY] ◈ ${msg}`, ...args);
  }
};
