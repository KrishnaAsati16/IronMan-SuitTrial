import React, { useState } from 'react';
import { Sidebar, NavTab } from './components/Sidebar';
import { HudHeader } from './components/HudHeader';
import { SuitCenterStage } from './components/SuitCenterStage';
import { SystemDiagnosticsPanel } from './components/SystemDiagnosticsPanel';
import { SuitTelemetryPanel } from './components/SuitTelemetryPanel';
import { VoiceCommandBar } from './components/VoiceCommandBar';
import { AtmosphericRadarPanel } from './components/AtmosphericRadarPanel';
import { JarvisAICorePanel } from './components/JarvisAICorePanel';
import { CommandLogTerminal } from './components/CommandLogTerminal';
import { JarvisAvatarCard } from './components/JarvisAvatarCard';
import { FooterStatusBar } from './components/FooterStatusBar';
import { SettingsPanel } from './components/SettingsPanel';
import { HelmetMode } from './components/HelmetMode';
import { StartupSequence } from './components/StartupSequence';
import { NotificationSystem } from './components/NotificationSystem';
import { useSettings } from './context/SettingsContext';
import { NotificationItem } from './types/hud';

export const App: React.FC = () => {
  const { hudMode, settings } = useSettings();
  const [hasBooted, setHasBooted] = useState(false);
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'MARK LXXXV SYSTEM ONLINE',
      message: 'Nanotech armor matrices calibrated and synchronized with J.A.R.V.I.S. mainframe.',
      type: 'info',
      timestamp: Date.now()
    }
  ]);

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Authentic Stark boot sequence on first launch
  if (!hasBooted) {
    return <StartupSequence onComplete={() => setHasBooted(true)} />;
  }

  // Full-screen Tactical Helmet Mode
  if (hudMode === 'helmet') {
    return <HelmetMode />;
  }

  return (
    <div className={`min-h-screen theme-${settings.colorTheme || 'stark-white'} bg-[#02050e] text-cyan-400 flex flex-col relative selection:bg-cyan-500 selection:text-black overflow-x-hidden`}>
      {/* Upper Navigation Header */}
      <HudHeader onOpenSettings={() => setIsSettingsOpen(true)} />

      {/* Main Body Grid with Sidebar & Content */}
      <div className="flex-1 flex flex-row w-full overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        {/* Dashboard Main Workspace */}
        <main className="flex-1 p-3 xl:p-4 space-y-3 xl:space-y-4 overflow-y-auto max-w-[1720px] mx-auto w-full">
          {/* Top Row: System Diagnostics | Center Suit Hologram | Suit Telemetry */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 xl:gap-4 items-stretch">
            {/* Left 4 Cols: System Diagnostics */}
            <div className="lg:col-span-4 flex flex-col">
              <SystemDiagnosticsPanel />
            </div>

            {/* Center 4 Cols: Mark LXXXV Suit Center Stage */}
            <div className="lg:col-span-4 flex flex-col">
              <SuitCenterStage />
            </div>

            {/* Right 4 Cols: Suit Telemetry Sensor Network */}
            <div className="lg:col-span-4 flex flex-col">
              <SuitTelemetryPanel />
            </div>
          </div>

          {/* Middle Row: Full-Width J.A.R.V.I.S. Voice Command Matrix Bar */}
          <div className="w-full">
            <VoiceCommandBar />
          </div>

          {/* Bottom Row: Atmospheric Radar | J.A.R.V.I.S. AI Core | Command Log & Avatar */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 xl:gap-4 items-stretch">
            {/* Left 3.5 Cols: Atmospheric Radar */}
            <div className="lg:col-span-4 flex flex-col">
              <AtmosphericRadarPanel />
            </div>

            {/* Center 4.5 Cols: J.A.R.V.I.S. AI Neural Core */}
            <div className="lg:col-span-4 flex flex-col">
              <JarvisAICorePanel />
            </div>

            {/* Right 4 Cols: Split Command Log & Holographic Avatar Card */}
            <div className="lg:col-span-4 flex flex-col gap-3 xl:gap-4">
              <div className="flex-1">
                <CommandLogTerminal />
              </div>
              <div className="h-32">
                <JarvisAvatarCard />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Bottom Footer Status Bar */}
      <FooterStatusBar />

      {/* Floating Notifications */}
      <NotificationSystem
        notifications={notifications}
        onDismiss={dismissNotification}
      />

      {/* System Settings Modal */}
      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
};
