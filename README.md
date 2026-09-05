# ⚡ IRON MAN SUIT — J.A.R.V.I.S. AI & HUD SYSTEM (MARK LXXXV)

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/react-19.0.0-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Security: Air-Gapped Whitelist](https://img.shields.io/badge/security-whitelist--enforced-red.svg)](#security--safety)

> A futuristic, full-stack Iron Man-inspired command center and artificial intelligence voice assistant. Built with **React 19**, **TypeScript**, **Tailwind CSS**, **Node.js**, **Socket.IO**, and pluggable **AI architectures** with zero-configuration demo simulation out of the box.

---

## 🌟 System Highlights

- 🗣️ **J.A.R.V.I.S. AI Assistant**: Intelligent voice and text assistant with speech recognition (Web Speech API), speech synthesis (custom British AI voice), intent extraction, and conversational memory.
- ⚛️ **Animated Arc Reactor**: Multi-ring SVG canvas visualization with synchronized orbital rotation, pulsing plasma core, harmonic power fluctuations, and interactive Overdrive mode.
- 🪖 **Full-Screen Helmet Mode**: Cinematic tactical helmet visor view featuring parallax gyroscopic motion, synthetic horizon reticle, voice telemetry HUD, and system diagnostics.
- 🖥️ **Real-Time PC & System Monitoring**: Live streaming CPU usage, RAM utilization, storage status, network interface, hostname, and OS uptime via WebSockets.
- 🛡️ **Air-Gapped Safe Command Whitelist**: Guaranteed security protection. Strictly forbids arbitrary shell injection (`exec(userInput)`); executes only verified safe commands (`OPEN_WEBSITE`, `GET_TIME`, `GET_WEATHER`, `GET_SYSTEM_STATUS`, `TOGGLE_REACTOR`, `SWITCH_HUD_MODE`, `LAUNCH_APP`).
- 📡 **Hardware IoT Integration (ESP32 / Arduino)**: Dedicated firmware sketches for ESP32 (WiFi WebSockets) and Arduino (USB Serial) streaming battery, internal suit temperatures, visor hall-effect limit switches, and repulsor charging.
- 🎵 **Futuristic Procedural Web Audio**: Zero-dependency Web Audio API synthesizer for reactor spin-up hums, diagnostic chimes, bootloader tones, and alert pulses.
- 🚀 **Zero-Config Demo Mode**: Clone and run immediately! No OpenAI or external API keys required to experience full interactive functionality.

---

## 🏛️ System Architecture

```
                                  ┌─────────────────────────────────────────┐
                                  │       IRON MAN TACTICAL HUD (Client)    │
                                  │      React 19 + TypeScript + Vite       │
                                  │   Tailwind CSS + Framer Motion + WebAudio│
                                  └────────────────────┬────────────────────┘
                                                       │ HTTP & WebSockets (Socket.IO)
                                                       ▼
                                  ┌─────────────────────────────────────────┐
                                  │        JARVIS BACKEND MAINFRAME         │
                                  │         Node.js + Express + TS          │
                                  │      Socket.IO + SystemInformation      │
                                  └───────────────┬─────────────────────────┘
                                                  │
                 ┌────────────────────────────────┼────────────────────────────────┐
                 ▼                                ▼                                ▼
    ┌─────────────────────────┐      ┌─────────────────────────┐      ┌─────────────────────────┐
    │       AI LAYER          │      │   SAFE COMMAND ENGINE   │      │     HARDWARE / IOT      │
    │  - Provider Abstraction │      │  - Strict Whitelist     │      │  - ESP32 WiFi WebSocket │
    │  - OpenAI GPT Engine    │      │  - Sanitized Launchers  │      │  - Arduino Serial Bridge│
    │  - Local Demo Provider  │      │  - Browser Automation   │      │  - Telemetry Simulator  │
    └─────────────────────────┘      └─────────────────────────┘      └─────────────────────────┘
```

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend HUD** | React 19, TypeScript, Vite, Tailwind CSS, Lucide React, Web Speech API, Web Audio API |
| **Backend Core** | Node.js, Express, TypeScript, Socket.IO, SystemInformation, dotenv, CORS |
| **AI Architecture** | Pluggable Provider Pattern (`AIProvider`, `OpenAIProvider`, `DemoAIProvider`), Context Memory |
| **Microcontroller / IoT**| ESP32 (C++ / Arduino IDE / PlatformIO), Arduino Uno / Nano / Mega |

---

## 📂 Project Structure

```
ironman-suit/
├── frontend/                     # React + Vite Tactical HUD Dashboard
│   ├── src/
│   │   ├── components/           # ArcReactor, JarvisPanel, HelmetMode, SystemMonitor, etc.
│   │   ├── context/              # JarvisContext, TelemetryContext, SettingsContext, AudioContext
│   │   ├── hooks/                # useVoiceAssistant, useSpeechSynthesis, useSoundEffects
│   │   ├── services/             # HTTP API client & Socket.IO singleton
│   │   ├── types/                # Strict TypeScript interfaces
│   │   ├── utils/                # Procedural Web Audio synthesizer & formatters
│   │   ├── App.tsx               # Main Command Center Layout
│   │   └── main.tsx              # React Root & Context Providers
│   ├── index.html                # HUD Typography & Metadata
│   ├── package.json
│   └── vite.config.ts            # Reverse Proxy to backend port 5000
│
├── backend/                      # Node.js + Express + Socket.IO Server
│   ├── src/
│   │   ├── controllers/          # System, Jarvis, Weather, Telemetry, Command controllers
│   │   ├── services/             # SystemMonitor, Weather, CommandExecutor, HardwareTelemetry
│   │   ├── websocket/            # Real-time WebSocket emitter & IoT packet receiver
│   │   ├── middleware/           # Strict payload validator & Error handler
│   │   ├── config/               # Environment variable loader
│   │   └── server.ts             # Express & Socket.IO server entrypoint
│   ├── package.json
│   └── tsconfig.json
│
├── ai/                           # Pluggable AI Assistant Engine
│   ├── assistant/                # JarvisAssistant, CommandParser, Prompts
│   ├── providers/                # AIProvider interface, OpenAIProvider, DemoAIProvider
│   └── memory/                   # ConversationMemory sliding window
│
├── hardware/                     # Microcontroller Firmware & Schematics
│   ├── esp32/                    # ESP32 WiFi WebSocket Telemetry Sketch (C++)
│   ├── arduino/                  # Arduino Serial JSON Telemetry Sketch (C++)
│   ├── sensors/                  # Sensor specifications and pinout tables
│   └── README.md
│
├── docs/                         # In-Depth Documentation
│   ├── architecture.md           # Deep dive into system topology & security
│   ├── setup.md                  # Comprehensive setup & configuration
│   ├── api.md                    # REST and WebSocket API contracts
│   └── hardware.md               # Circuit diagrams & microcontroller wiring
│
├── .env.example                  # Environment template
├── .gitignore                    # GitHub ignore configuration
├── LICENSE                       # MIT License
└── package.json                  # Root orchestration scripts
```

---

## 🚀 Quickstart & Installation

### 1. Clone & Install Dependencies

```bash
# Clone repository
git clone YOUR_GITHUB_REPOSITORY_URL
cd IronMAn

# Install root, backend, and frontend dependencies
npm run install:all
```

*(Alternatively: `npm install && npm --prefix backend install && npm --prefix frontend install`)*

### 2. Launch Development Environment

Run both the backend server (port 5000) and the frontend HUD (port 5173) simultaneously:

```bash
npm run dev
```

Open your browser at **`http://localhost:5173`**.

---

## ⚙️ Environment Variables (`.env.example`)

Copy `.env.example` to `backend/.env` (optional; defaults to zero-config Demo mode if omitted):

```env
# Server Configuration
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# AI Provider: 'demo' (offline intelligent JARVIS) | 'openai'
AI_PROVIDER=demo
OPENAI_API_KEY=your_openai_key_here
OPENAI_MODEL=gpt-4o-mini

# Weather API (Optional - uses simulated radar if omitted)
OPENWEATHER_API_KEY=
DEFAULT_CITY=Malibu

# Hardware Simulation
ENABLE_HARDWARE_SIMULATION=true
TELEMETRY_INTERVAL_MS=1500
```

---

## 🔒 Security & Safety Protocols

> [!IMPORTANT]
> **Zero Arbitrary Execution Policy**: This application will **NEVER** execute arbitrary shell commands or user strings.
>
> All actions pass through the `CommandParser` and `CommandExecutorService` against an explicit whitelist:
> - `OPEN_WEBSITE`: Validates HTTPS URL schemes.
> - `GET_TIME`: Reads system chronometer.
> - `GET_WEATHER`: Queries weather APIs or tactical atmospheric simulator.
> - `GET_SYSTEM_STATUS`: Reads read-only OS telemetry (`systeminformation`).
> - `TOGGLE_REACTOR`: Toggles local state machine overdrive.
> - `SWITCH_HUD_MODE`: Toggles HUD viewport.
> - `LAUNCH_APP`: Strictly maps only to safe, hardcoded desktop binaries (`calculator`, `notepad`, `terminal`).

---

## 📡 Hardware & Microcontroller Integration

Connect real microcontrollers using the provided firmware sketches:

- **ESP32 Firmware**: Located at [`hardware/esp32/telemetry.example.cpp`](hardware/esp32/telemetry.example.cpp). Connects via WiFi to the backend Socket.IO endpoint and streams IMU, battery, and helmet reed-switch telemetry.
- **Arduino Firmware**: Located at [`hardware/arduino/telemetry.example.cpp`](hardware/arduino/telemetry.example.cpp). Emits JSON packets over USB Serial at `115200` baud.

---

## 🗺️ Future Roadmap

- [x] **v1.0**: Core J.A.R.V.I.S. AI + Arc Reactor HUD + Safe Command Whitelist
- [x] **v1.1**: Real-time OS System Monitoring & Diagnostics
- [x] **v1.2**: Web Speech API Voice Control + SpeechSynthesis Audio
- [x] **v1.3**: ESP32 & Arduino Hardware Telemetry Architecture
- [x] **v1.4**: Fullscreen Parallax Helmet Mode & Procedural Web Audio
- [ ] **v2.0**: WebCam Computer Vision Face & Pose Tracking (OpenCV / MediaPipe)
- [ ] **v2.1**: Leap Motion / Hand Gesture Controls for Arc Reactor & Visor
- [ ] **v2.2**: Multi-Suit Armor Armory Customizer (Mark I to Mark LXXXV)
- [ ] **v3.0**: Physical Iron Man Wearable Gauntlet Prototype with BLE

---

## 📤 Push to GitHub

To push this codebase to your own GitHub repository:

```bash
git init
git add .
git commit -m "feat: initial Iron Man suit system"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

*Crafted with precision at Stark Industries.*
