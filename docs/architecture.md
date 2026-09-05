# Architecture & Design Specifications

## 1. System High-Level Topology

```
┌─────────────────────────────────────────────────────────────┐
│                   BROWSER CLIENT (HUD)                      │
│                                                             │
│  ┌───────────────────────┐       ┌───────────────────────┐  │
│  │   Arc Reactor Canvas  │       │  Tactical Helmet Mode │  │
│  └───────────────────────┘       └───────────────────────┘  │
│  ┌───────────────────────┐       ┌───────────────────────┐  │
│  │  Voice Assistant HUD  │       │  Real-Time Telemetry  │  │
│  │  (Web Speech API)     │       │  (Socket.IO Sub)      │  │
│  └───────────────────────┘       └───────────────────────┘  │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP / WebSocket (Port 5000)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    NODE.JS / EXPRESS CORE                   │
│                                                             │
│  ┌───────────────────────┐       ┌───────────────────────┐  │
│  │   System Monitor      │       │  Hardware Telemetry   │  │
│  │   (os / sysinfo)      │       │  Service (Sim + Real) │  │
│  └───────────────────────┘       └───────────────────────┘  │
│  ┌───────────────────────┐       ┌───────────────────────┐  │
│  │  AI Assistant Layer   │       │  Safe Command Engine  │  │
│  │  (OpenAI / Demo Mode) │       │  (Strict Whitelist)   │  │
│  └───────────────────────┘       └───────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 2. Safe Execution Whitelist Architecture

To guarantee the user's computer security, arbitrary shell commands (`exec`, `spawn`, `child_process.exec(userInput)`) are strictly forbidden.

Instead, the `CommandExecutorService` accepts only strongly typed parsed commands:
- `OPEN_WEBSITE`: Validates that URL matches HTTP/HTTPS protocols and standard browser opening mechanisms.
- `GET_TIME`: Generates accurate local and UTC timestamps.
- `GET_WEATHER`: Retrieves verified meteorological data for designated coordinates or cities.
- `GET_SYSTEM_STATUS`: Queries read-only operating system telemetry.
- `TOGGLE_REACTOR` & `SWITCH_HUD_MODE`: Updates stateful HUD presentation layers.

## 3. Real-Time Telemetry Loop

The backend emits three real-time streams over Socket.IO:
- `system:update` (every 2000ms): CPU load, RAM usage, storage availability, active network interface, uptime.
- `suit:telemetry` (every 1500ms): Arc Reactor core output, battery reserves, internal suit climate, repulsor charge status, helmet visor state.
- `jarvis:status` (event-driven): Connection status, AI provider latency, active voice mode.
