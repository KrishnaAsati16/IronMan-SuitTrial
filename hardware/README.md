# Iron Man Suit — Hardware & IoT Telemetry Layer

This directory houses the hardware specifications, firmware sketches, sensor pinouts, and communication protocols for interfacing microcontrollers (ESP32 / Arduino) with the JARVIS HUD backend.

## Overview

The JARVIS HUD accepts real-time telemetry packets via:
1. **WebSocket Client (ESP32)**: Direct 2.4GHz WiFi connection to the Node.js backend port `5000` via `/socket.io/`.
2. **Serial USB Bridge (Arduino Uno / Nano / Mega)**: Emits structured JSON over UART serial (`115200` baud) forwarded by a host serial bridge or backend serial service.
3. **Simulated Telemetry Mode**: Activated automatically when no physical hardware is detected, continuously streaming realistic Arc Reactor power oscillations, battery drain/charge cycles, internal suit temperatures, and helmet visor limit-switch state.

## Telemetry Packet Schema

Both physical microcontrollers and the software simulator broadcast the following JSON payload at 1 Hz – 5 Hz:

```json
{
  "source": "ESP32_MARK_LXXXV",
  "battery": 87.5,
  "temperature": 32.4,
  "corePower": 95.8,
  "helmet": true,
  "comms": true,
  "repulsorCharge": 99.0,
  "thrusterOutput": 42.0,
  "sensorsOnline": 8,
  "sensorsTotal": 8,
  "timestamp": 1772704800000
}
```

## Directory Structure

- `esp32/`: Native C++ ESP32 Arduino-framework sketch connecting over WiFi & WebSockets with BME280/MPU6050.
- `arduino/`: Native C++ sketch for Arduino with Serial JSON telemetry.
- `sensors/`: Pinouts, calibration data, and sensor schematics.
