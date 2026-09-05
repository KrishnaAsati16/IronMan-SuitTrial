/*
 * =========================================================================
 * IRON MAN SUIT — ESP32 REAL-TIME TELEMETRY TRANSMITTER
 * Board: ESP32 Dev Module / NodeMCU-32S
 * Communication: WebSocket Client over 2.4GHz 802.11 b/g/n WiFi
 * Description: Reads environmental & IMU sensors and broadcasts suit
 *              telemetry packets to JARVIS Node.js backend.
 * =========================================================================
 */

#include <WiFi.h>
#include <WebSocketsClient.h>
#include <ArduinoJson.h>

// --- Network Configuration ---
const char* WIFI_SSID     = "STARK_SECURE_WIFI";
const char* WIFI_PASS     = "ArcReactor3000!";
const char* BACKEND_HOST  = "192.168.1.100"; // Host running Iron Man HUD Backend
const int   BACKEND_PORT  = 5000;
const char* WS_ENDPOINT   = "/socket.io/?EIO=4&transport=websocket";

// --- Hardware Pins ---
const int PIN_HELMET_SWITCH  = 18; // Visor Hall effect magnetic sensor
const int PIN_BATTERY_ADC    = 34; // Voltage divider for LiPo battery
const int PIN_CORE_LEDS      = 23; // Arc Reactor PWM brightness indicator

WebSocketsClient webSocket;
unsigned long lastTelemetrySent = 0;
const unsigned long TELEMETRY_INTERVAL = 1000; // 1000ms (1 Hz update rate)

// Simulated or Sensor-derived values
float batteryPercent = 94.0;
float suitTemp = 31.8;
float corePower = 98.2;
bool helmetClosed = true;

void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {
  switch(type) {
    case WStype_DISCONNECTED:
      Serial.println("[WS] Disconnected from JARVIS Core!");
      break;
    case WStype_CONNECTED:
      Serial.printf("[WS] Connected to JARVIS Core at: %s\n", payload);
      // Send handshake identifying as Suit Hardware
      webSocket.sendTXT("42[\"hardware:identify\", {\"client\": \"ESP32_SUIT_MK85\"}]");
      break;
    case WStype_TEXT:
      Serial.printf("[WS] JARVIS Command Received: %s\n", payload);
      // Process suit feedback (e.g. repulsor pulse, HUD alert LED)
      break;
    default:
      break;
  }
}

void setup() {
  Serial.begin(115200);
  pinMode(PIN_HELMET_SWITCH, INPUT_PULLUP);
  pinMode(PIN_BATTERY_ADC, INPUT);
  pinMode(PIN_CORE_LEDS, OUTPUT);
  analogWrite(PIN_CORE_LEDS, 200);

  Serial.println("\n[STARK HARDWARE] Booting Suit Microcontroller...");
  WiFi.begin(WIFI_SSID, WIFI_PASS);

  int retries = 0;
  while (WiFi.status() != WL_CONNECTED && retries < 20) {
    delay(500);
    Serial.print(".");
    retries++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\n[STARK HARDWARE] WiFi Connected. IP: " + WiFi.localIP().toString());
    webSocket.begin(BACKEND_HOST, BACKEND_PORT, WS_ENDPOINT);
    webSocket.onEvent(webSocketEvent);
    webSocket.setReconnectInterval(5000);
  } else {
    Serial.println("\n[STARK HARDWARE] WiFi connection timed out. Running in standalone fallback mode.");
  }
}

void loop() {
  webSocket.loop();

  // Read sensors
  helmetClosed = (digitalRead(PIN_HELMET_SWITCH) == LOW);

  unsigned long currentMillis = millis();
  if (currentMillis - lastTelemetrySent >= TELEMETRY_INTERVAL) {
    lastTelemetrySent = currentMillis;

    // Build JSON packet
    StaticJsonDocument<256> doc;
    doc["source"] = "ESP32_SUIT_MK85";
    doc["battery"] = batteryPercent;
    doc["temperature"] = suitTemp;
    doc["corePower"] = corePower;
    doc["helmet"] = helmetClosed;
    doc["comms"] = (WiFi.status() == WL_CONNECTED);
    doc["repulsorCharge"] = 98.5;
    doc["thrusterOutput"] = 0.0;
    doc["sensorsOnline"] = 8;
    doc["sensorsTotal"] = 8;
    doc["timestamp"] = currentMillis;

    String jsonString;
    serializeJson(doc, jsonString);

    if (webSocket.isConnected()) {
      // Format as Socket.IO v4 message: 42["hardware:telemetry", {...}]
      String socketMessage = "42[\"hardware:telemetry\"," + jsonString + "]";
      webSocket.sendTXT(socketMessage);
    }
  }
}
