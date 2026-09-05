import { config } from '../config';
import { logger } from '../utils/logger';

export interface WeatherData {
  city: string;
  temperatureC: number;
  temperatureF: number;
  condition: string;
  description: string;
  humidity: number;
  windSpeedKmh: number;
  windDirection: string;
  pressureHpa: number;
  visibilityKm: number;
  isSimulated: boolean;
  timestamp: string;
}

export class WeatherService {
  public async getWeather(cityName?: string): Promise<WeatherData> {
    const city = cityName?.trim() || config.weather.defaultCity || 'Malibu';

    if (config.weather.apiKey) {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${config.weather.apiKey}`;
        const res = await fetch(url);
        if (res.ok) {
          const data = (await res.json()) as any;
          const tempC = Math.round(data.main.temp);
          return {
            city: data.name || city,
            temperatureC: tempC,
            temperatureF: Math.round((tempC * 9) / 5 + 32),
            condition: data.weather?.[0]?.main || 'Clear',
            description: data.weather?.[0]?.description || 'Optimal atmospheric visibility',
            humidity: data.main?.humidity || 50,
            windSpeedKmh: Math.round((data.wind?.speed || 3) * 3.6),
            windDirection: this.degToCompass(data.wind?.deg || 0),
            pressureHpa: data.main?.pressure || 1013,
            visibilityKm: Math.round((data.visibility || 10000) / 1000),
            isSimulated: false,
            timestamp: new Date().toISOString()
          };
        }
        logger.warn(`OpenWeatherMap returned status ${res.status}, falling back to atmospheric simulation.`);
      } catch (err: any) {
        logger.warn(`Failed to contact OpenWeatherMap API: ${err.message}. Using simulated atmosphere.`);
      }
    }

    return this.getSimulatedWeather(city);
  }

  private getSimulatedWeather(city: string): WeatherData {
    const cityLower = city.toLowerCase();
    let tempC = 23;
    let condition = 'Clear';
    let humidity = 45;
    let wind = 12;

    if (cityLower.includes('malibu') || cityLower.includes('los angeles') || cityLower.includes('california')) {
      tempC = 25;
      condition = 'Sunny';
      humidity = 42;
      wind = 14;
    } else if (cityLower.includes('london')) {
      tempC = 16;
      condition = 'Drizzle';
      humidity = 82;
      wind = 18;
    } else if (cityLower.includes('tokyo')) {
      tempC = 21;
      condition = 'Partly Cloudy';
      humidity = 60;
      wind = 9;
    } else if (cityLower.includes('new york')) {
      tempC = 20;
      condition = 'Breezy';
      humidity = 55;
      wind = 22;
    } else {
      // Deterministic pseudo-random based on string hash
      let hash = 0;
      for (let i = 0; i < city.length; i++) hash = city.charCodeAt(i) + ((hash << 5) - hash);
      tempC = 18 + Math.abs(hash % 16);
      const conditions = ['Clear', 'Partly Cloudy', 'Scattered Clouds', 'High Winds', 'Clear Skies'];
      condition = conditions[Math.abs(hash % conditions.length)];
      humidity = 40 + Math.abs((hash >> 2) % 45);
      wind = 8 + Math.abs((hash >> 4) % 25);
    }

    return {
      city: city.charAt(0).toUpperCase() + city.slice(1),
      temperatureC: tempC,
      temperatureF: Math.round((tempC * 9) / 5 + 32),
      condition,
      description: `Tactical scan: ${condition.toLowerCase()} with standard atmospheric barometric density.`,
      humidity,
      windSpeedKmh: wind,
      windDirection: 'NW (315°)',
      pressureHpa: 1014,
      visibilityKm: 12,
      isSimulated: true,
      timestamp: new Date().toISOString()
    };
  }

  private degToCompass(num: number): string {
    const val = Math.floor(num / 22.5 + 0.5);
    const arr = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return `${arr[val % 16]} (${num}°)`;
  }
}

export const weatherService = new WeatherService();
