# Microcontroller & Sensor Integration Guide

## Recommended Microcontroller Hardware
1. **ESP32-WROOM-32**: Features dual-core 240MHz Xtensa LX6 CPU, integrated 2.4GHz WiFi, 520 KB SRAM, and hardware I2C/SPI interfaces.
2. **Arduino Uno R4 WiFi / Nano 33 IoT**: Alternative lightweight microcontrollers with WiFi or USB serial telemetry capability.

## Hardware Wiring Architecture

```
                       ESP32 PINOUT
                  ┌────────────────────┐
     3.3V ────────┤ 3V3            GND ├──────── GND
                  │                    │
 (I2C SDA) ───────┤ GPIO 21    GPIO 18 ├──────── Helmet Visor Reed/Hall Switch
 (I2C SCL) ───────┤ GPIO 22    GPIO 23 ├──────── WS2812B Arc Reactor Data
                  │                    │
  LiPo ADC ───────┤ GPIO 34    GPIO 25 ├──────── Repulsor Audio Tone PWM
                  └────────────────────┘
```

## Running Without Hardware (Zero Hardware Simulation)
The JARVIS HUD automatically checks for hardware packets. If no physical ESP32 connects within 3 seconds, the built-in `HardwareTelemetryService` runs a physics-based simulation of suit power draw, temperature shifts, and reactor output, keeping the HUD fully alive.
