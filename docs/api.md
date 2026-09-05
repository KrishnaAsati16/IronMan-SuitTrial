# REST & WebSocket API Reference

## Base URL
`http://localhost:5000/api`

---

## REST Endpoints

### 1. Health Check
- **Endpoint**: `GET /api/health`
- **Response**:
```json
{
  "status": "ONLINE",
  "version": "Mark-LXXXV",
  "aiProvider": "Demo/Simulated JARVIS Core",
  "timestamp": "2026-09-05T10:00:00.000Z"
}
```

### 2. System Monitoring
- **Endpoint**: `GET /api/system`
- **Response**:
```json
{
  "cpuUsage": 34.2,
  "cpuCores": 8,
  "ramTotal": 16384,
  "ramUsed": 9216,
  "ramUsage": 56.2,
  "hostname": "STARK-MAINFRAME",
  "platform": "win32",
  "uptime": 45203,
  "network": { "online": true, "ip": "192.168.1.50" }
}
```

### 3. Suit Telemetry
- **Endpoint**: `GET /api/suit/status`
- **Response**:
```json
{
  "battery": 92.5,
  "temperature": 31.8,
  "corePower": 98.4,
  "helmet": true,
  "comms": true,
  "repulsorCharge": 100.0,
  "thrusterOutput": 0.0,
  "sensorsOnline": 8,
  "sensorsTotal": 8,
  "armorIntegrity": 100
}
```

### 4. JARVIS AI Chat
- **Endpoint**: `POST /api/jarvis/chat`
- **Body**:
```json
{
  "message": "Jarvis, report suit status"
}
```
- **Response**:
```json
{
  "response": "Suit diagnostics nominal, sir. All defense barriers active.",
  "commandDetected": { "type": "GET_SYSTEM_STATUS" },
  "provider": "Demo/Simulated JARVIS Core",
  "latencyMs": 42
}
```

### 5. Weather Diagnostics
- **Endpoint**: `GET /api/weather?city=Malibu`
- **Response**:
```json
{
  "city": "Malibu",
  "temperature": 24,
  "condition": "Clear",
  "humidity": 48,
  "windSpeed": 11,
  "isSimulated": true
}
```

### 6. Safe Command Execution
- **Endpoint**: `POST /api/commands`
- **Body**:
```json
{
  "type": "OPEN_WEBSITE",
  "target": "https://youtube.com"
}
```

---

## WebSocket Events

- **Client Listening**:
  - `system:update`: Periodic host system stats
  - `suit:telemetry`: Periodic suit IoT telemetry
  - `jarvis:status`: Status changes or speech broadcasts
- **Client Emitting**:
  - `hardware:telemetry`: Allows simulated or real IoT nodes to broadcast telemetry
