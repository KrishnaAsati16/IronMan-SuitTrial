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
