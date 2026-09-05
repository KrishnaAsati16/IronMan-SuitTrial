# ESP32 Telemetry Firmware (Arduino IDE / PlatformIO)

## Required Libraries
- `WiFi.h` (Built-in)
- `WebSocketsClient` by Markus Sattler
- `ArduinoJson` (v6 or v7) by Benoit Blanchon
- `Adafruit_BME280` (Temperature, Humidity, Pressure)
- `Adafruit_MPU6050` (6-axis Gyroscope & Accelerometer)

## Flashing Instructions
1. Open `telemetry.example.cpp` in PlatformIO or Arduino IDE (as `.ino`).
2. Update `WIFI_SSID`, `WIFI_PASS`, and `BACKEND_IP`.
3. Select board: `ESP32 Dev Module`.
4. Upload firmware at `115200` baud.
