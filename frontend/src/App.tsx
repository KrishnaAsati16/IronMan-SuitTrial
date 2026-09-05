import React, { useState } from 'react';
import { HudHeader } from './components/HudHeader';
import { ArcReactor } from './components/ArcReactor';
import { SystemMonitor } from './components/SystemMonitor';
import { JarvisPanel } from './components/JarvisPanel';
import { VoiceControl } from './components/VoiceControl';
import { TelemetryPanel } from './components/TelemetryPanel';
import { WeatherPanel } from './components/WeatherPanel';
import { CommandHistory } from './components/CommandHistory';
import { SettingsPanel } from './components/SettingsPanel';
import { HelmetMode } from './components/HelmetMode';
import { StartupSequence } from './components/StartupSequence';
import { NotificationSystem } from './components/NotificationSystem';
import { useSettings } from './context/SettingsContext';
import { NotificationItem } from './types/hud';

export const App: React.FC = () => {
  const { hudMode, settings } = useSettings();
  const [hasBooted, setHasBooted] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'ARC REACTOR STABILIZED',
      message: 'Zero point energy containment field operating at 100% harmonic resonance.',
      type: 'info',
      timestamp: Date.now()
    }
  ]);

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Show authentic bootloader sequence on initial launch
  if (!hasBooted) {
    return <StartupSequence onComplete={() => setHasBooted(true)} />;
  }

  // If user engaged tactical helmet mode
  if (hudMode === 'helmet') {
    return <HelmetMode />;
  }

  return (
    <div className={`min-h-screen theme-${settings.colorTheme} text-cyan-400 flex flex-col relative selection:bg-cyan-500 selection:text-black`}>
      {/* Top HUD Header */}
      <HudHeader onOpenSettings={() => setIsSettingsOpen(true)} />

      {/* Main Command Center HUD */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Top Section: System Monitor | Arc Reactor | Suit Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* Left: System Diagnostics */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <SystemMonitor />
          </div>

          {/* Center: Arc Reactor */}
          <div className="lg:col-span-4 order-1 lg:order-2 flex justify-center">
            <div className="w-full max-w-md rounded-md bg-black/85 border border-cyan-500/30 p-2 backdrop-blur-md">
              <ArcReactor />
            </div>
          </div>

          {/* Right: Suit Telemetry */}
          <div className="lg:col-span-4 order-3 lg:order-3">
            <TelemetryPanel />
          </div>
        </div>

        {/* Middle Voice Control Bar */}
        <div className="w-full">
          <VoiceControl />
        </div>

        {/* Bottom Section: Weather & Logs | JARVIS AI Assistant */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* Left Column: Atmospheric Radar + Command History */}
          <div className="lg:col-span-5 space-y-4">
            <WeatherPanel />
            <CommandHistory />
          </div>

          {/* Right Column: J.A.R.V.I.S. AI Chat & Directive Center */}
          <div className="lg:col-span-7">
            <JarvisPanel />
          </div>
        </div>
      </main>

      {/* Floating System Notifications */}
      <NotificationSystem
        notifications={notifications}
        onDismiss={dismissNotification}
      />

      {/* Settings Modal */}
      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      {/* Subtle Footer Telemetry */}
      <footer className="border-t border-cyan-500/20 py-2.5 px-4 text-center font-mono text-[10px] text-cyan-500/60 bg-black/95">
        STARK INDUSTRIES // MARK LXXXV AUTONOMOUS COMBAT & AVIONICS FIRMWARE // AIR-GAPPED SAFE WHITELIST ENABLED
      </footer>
    </div>
  );
};
