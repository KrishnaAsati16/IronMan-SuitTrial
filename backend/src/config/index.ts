import dotenv from 'dotenv';
import path from 'path';

// Load .env from backend or root directory
dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  ai: {
    provider: (process.env.AI_PROVIDER || 'demo').toLowerCase(),
    openaiApiKey: process.env.OPENAI_API_KEY || '',
    openaiModel: process.env.OPENAI_MODEL || 'gpt-4o-mini'
  },
  weather: {
    apiKey: process.env.OPENWEATHER_API_KEY || '',
    defaultCity: process.env.DEFAULT_CITY || 'Malibu'
  },
  telemetry: {
    enableSimulation: process.env.ENABLE_HARDWARE_SIMULATION !== 'false',
    intervalMs: parseInt(process.env.TELEMETRY_INTERVAL_MS || '1500', 10)
  }
};
