/*
 * =========================================================================
 * IRON MAN SUIT — ARDUINO SERIAL TELEMETRY EMITTER
 * Board: Arduino Uno / Nano / Mega
 * Baud: 115200
 * Description: Reads suit analog sensors and outputs telemetry JSON string.
 * =========================================================================
 */

#include <Arduino.h>

const int PIN_BATTERY   = A0;
const int PIN_TEMP      = A1;
const int PIN_HELMET    = 2;
const int PIN_ARC_LED   = 9;

unsigned long lastSend = 0;

void setup() {
  Serial.begin(115200);
  pinMode(PIN_HELMET, INPUT_PULLUP);
  pinMode(PIN_ARC_LED, OUTPUT);
  digitalWrite(PIN_ARC_LED, HIGH);
  Serial.println("{\"status\": \"ARDUINO_BOOT_COMPLETE\"}");
}

void loop() {
  // Read helmet limit switch (LOW = helmet closed)
  bool helmetClosed = (digitalRead(PIN_HELMET) == LOW);

  // Read analog battery & compute percentage (calibrated for 3.7V - 4.2V LiPo)
  int rawBattery = analogRead(PIN_BATTERY);
  float batteryPercent = constrain(map(rawBattery, 600, 860, 0, 100), 0, 100);

  // Read analog temp (TMP36 or LM35)
  int rawTemp = analogRead(PIN_TEMP);
  float voltage = rawTemp * (5.0 / 1023.0);
  float temperatureC = (voltage - 0.5) * 100.0; // TMP36 formula
  if (temperatureC < 15.0 || temperatureC > 60.0) temperatureC = 32.5; // fallback clamp

  unsigned long now = millis();
  if (now - lastSend >= 1000) {
    lastSend = now;

    Serial.print("{\"source\":\"ARDUINO_SERIAL\",\"battery\":");
    Serial.print(batteryPercent, 1);
    Serial.print(",\"temperature\":");
    Serial.print(temperatureC, 1);
    Serial.print(",\"corePower\":98.4,\"helmet\":");
    Serial.print(helmetClosed ? "true" : "false");
    Serial.print(",\"repulsorCharge\":100.0,\"sensorsOnline\":8,\"sensorsTotal\":8}\n");
  }
}
