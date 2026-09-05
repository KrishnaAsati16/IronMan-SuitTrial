import { WeatherData } from '../types/weather';
import { SystemStats, SuitTelemetry } from '../types/telemetry';

const API_BASE = '/api';

export async function fetchHealth() {
  const res = await fetch(`${API_BASE}/health`);
  return res.json();
}

export async function fetchSystemStats(): Promise<SystemStats> {
  const res = await fetch(`${API_BASE}/system`);
  const json = await res.json();
  return json.data;
}

export async function fetchSuitTelemetry(): Promise<SuitTelemetry> {
  const res = await fetch(`${API_BASE}/suit/status`);
  const json = await res.json();
  return json.data;
}

export async function fetchWeather(city?: string): Promise<WeatherData> {
  const url = city ? `${API_BASE}/weather?city=${encodeURIComponent(city)}` : `${API_BASE}/weather`;
  const res = await fetch(url);
  const json = await res.json();
  return json.data;
}

export async function sendJarvisChat(message: string) {
  const res = await fetch(`${API_BASE}/jarvis/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });
  return res.json();
}

export async function executeSafeCommand(type: string, target?: string, payload?: any) {
  const res = await fetch(`${API_BASE}/commands`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, target, payload })
  });
  return res.json();
}

export async function toggleReactorApi() {
  const res = await fetch(`${API_BASE}/suit/reactor/toggle`, { method: 'POST' });
  return res.json();
}

export async function toggleHelmetApi() {
  const res = await fetch(`${API_BASE}/suit/helmet/toggle`, { method: 'POST' });
  return res.json();
}
