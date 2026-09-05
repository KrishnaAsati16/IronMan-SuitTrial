# Hardware Sensors & Wiring Specifications

## Suit Sensor Topology

| Sensor | Type | Interface | Metric Measured | Typical Value |
| :--- | :--- | :--- | :--- | :--- |
| **BME280** | Environmental | I2C (0x76) | Ambient Temp & Pressure | 32.0 °C, 1013 hPa |
| **MPU6050** | 6-Axis IMU | I2C (0x68) | Pitch, Roll, Yaw & G-Force | (0°, 0°, 0°), 1.0G |
| **Hall Effect Switch** | Magnetic | Digital GPIO | Visor / Helmet Lock | HIGH (Open) / LOW (Locked) |
| **LiPo Fuel Gauge** | MAX17043 | I2C (0x36) | Suit Battery Voltage & % | 4.18V, 95% |
| **ACS712** | Current Hall | Analog ADC | Arc Reactor Output Amperage | 12.4 A |
| **WS2812B Ring** | Addressable LED | Data Pin | Arc Reactor Visualizer | 24 NeoPixels |
