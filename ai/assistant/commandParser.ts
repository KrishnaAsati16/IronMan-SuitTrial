export interface ParsedCommand {
  type: string;
  target?: string;
  payload?: Record<string, any>;
  confidence: number;
}

export const ALLOWED_COMMAND_TYPES = [
  'OPEN_WEBSITE',
  'GET_TIME',
  'GET_WEATHER',
  'GET_SYSTEM_STATUS',
  'TOGGLE_REACTOR',
  'SWITCH_HUD_MODE',
  'TOGGLE_VOICE',
  'LAUNCH_APP'
] as const;

export type AllowedCommandType = typeof ALLOWED_COMMAND_TYPES[number];

export class CommandParser {
  public parse(input: string): ParsedCommand | null {
    const trimmed = input.trim().toLowerCase();

    // 1. OPEN_WEBSITE
    const openMatch = trimmed.match(/(?:open|launch|navigate to|go to)\s+(https?:\/\/[^\s]+|youtube|google|github|twitter|x|reddit|netflix|spotify|wikipedia|stark industries)/i);
    if (openMatch) {
      let target = openMatch[1].trim();
      if (!target.startsWith('http://') && !target.startsWith('https://')) {
        const domainMap: Record<string, string> = {
          youtube: 'https://youtube.com',
          google: 'https://google.com',
          github: 'https://github.com',
          twitter: 'https://x.com',
          x: 'https://x.com',
          reddit: 'https://reddit.com',
          netflix: 'https://netflix.com',
          spotify: 'https://open.spotify.com',
          wikipedia: 'https://wikipedia.org',
          'stark industries': 'https://marvel.com'
        };
        target = domainMap[target] || `https://${target}.com`;
      }
      return {
        type: 'OPEN_WEBSITE',
        target,
        confidence: 0.95
      };
    }

    // 2. GET_TIME
    if (/^(?:what is the|tell me the|current|what's the|get)?\s*(?:time|date|current time|clock)/i.test(trimmed)) {
      return {
        type: 'GET_TIME',
        confidence: 0.95
      };
    }

    // 3. GET_WEATHER
    const weatherMatch = trimmed.match(/(?:weather|forecast|temperature|atmospheric condition)(?:\s+(?:in|for|at)\s+([a-zA-Z\s]+))?/i);
    if (weatherMatch || /how is the weather/i.test(trimmed)) {
      const city = weatherMatch && weatherMatch[1] ? weatherMatch[1].trim() : 'Malibu';
      return {
        type: 'GET_WEATHER',
        target: city,
        payload: { city },
        confidence: 0.9
      };
    }

    // 4. GET_SYSTEM_STATUS
    if (/(?:system status|cpu usage|ram usage|memory usage|computer status|diagnostics|telemetry|system health|suit status)/i.test(trimmed)) {
      return {
        type: 'GET_SYSTEM_STATUS',
        confidence: 0.95
      };
    }

    // 5. TOGGLE_REACTOR
    if (/(?:toggle|overdrive|boost|recharge|power)\s*(?:arc\s*)?reactor/i.test(trimmed)) {
      return {
        type: 'TOGGLE_REACTOR',
        confidence: 0.9
      };
    }

    // 6. SWITCH_HUD_MODE
    if (/(?:enter|exit|toggle|switch to)\s*(?:the\s*)?helmet\s*(?:mode|hud)?/i.test(trimmed)) {
      const isExit = /exit|leave|normal/i.test(trimmed);
      return {
        type: 'SWITCH_HUD_MODE',
        target: isExit ? 'normal' : 'helmet',
        payload: { mode: isExit ? 'normal' : 'helmet' },
        confidence: 0.95
      };
    }

    // 7. TOGGLE_VOICE
    if (/(?:toggle|mute|unmute|enable|disable|silence)\s*(?:jarvis\s*)?voice/i.test(trimmed)) {
      return {
        type: 'TOGGLE_VOICE',
        confidence: 0.9
      };
    }

    // 8. LAUNCH_APP (safe whitelist of predefined desktop shortcuts)
    const appMatch = trimmed.match(/(?:open|launch|run)\s+(calculator|notepad|terminal|code|vs\s*code)/i);
    if (appMatch) {
      const app = appMatch[1].replace(/\s+/g, '').toLowerCase();
      return {
        type: 'LAUNCH_APP',
        target: app,
        confidence: 0.85
      };
    }

    return null;
  }
}
