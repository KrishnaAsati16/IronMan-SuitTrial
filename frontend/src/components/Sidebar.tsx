import React from 'react';
import { Home, Activity, Radio, Cpu, Terminal, Settings } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export type NavTab = 'home' | 'diagnostics' | 'telemetry' | 'systems' | 'command-log' | 'settings';

interface SidebarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onOpenSettings: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, onOpenSettings }) => {
  const { playClick } = useAudio();

  const navItems = [
    { id: 'home' as NavTab, label: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'diagnostics' as NavTab, label: 'Diagnostics', icon: <Activity className="w-5 h-5" /> },
    { id: 'telemetry' as NavTab, label: 'Telemetry', icon: <Radio className="w-5 h-5" /> },
    { id: 'systems' as NavTab, label: 'Systems', icon: <Cpu className="w-5 h-5" /> },
    { id: 'command-log' as NavTab, label: 'Command Log', icon: <Terminal className="w-5 h-5" /> },
    { id: 'settings' as NavTab, label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const handleNav = (id: NavTab) => {
    playClick();
    if (id === 'settings') {
      onOpenSettings();
    } else {
      onTabChange(id);
    }
  };

  return (
    <aside className="w-48 xl:w-56 shrink-0 flex flex-col justify-between p-3.5 bg-[#030a16]/95 border-r border-cyan-500/20 backdrop-blur-xl select-none z-20 min-h-screen">
      {/* Top Navigation Items */}
      <div className="space-y-1.5 pt-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl font-mono text-xs font-semibold tracking-wider transition-all duration-300 relative group ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600/90 to-cyan-500/80 text-white shadow-[0_0_20px_rgba(0,140,255,0.5)] border border-cyan-300/40'
                  : 'text-cyan-400/70 hover:text-cyan-200 hover:bg-cyan-950/40 border border-transparent'
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-cyan-300 rounded-r-full shadow-[0_0_8px_#00f0ff]" />
              )}
              <span className={`transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-white drop-shadow-[0_0_8px_#ffffff]' : 'text-cyan-400'}`}>
                {item.icon}
              </span>
              <span className="tracking-wide">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Bottom Stark Industries Emblem & Mission */}
      <div className="pt-6 pb-2 border-t border-cyan-500/20 flex flex-col items-center text-center">
        {/* Glowing Avengers 'A' Logo SVG */}
        <div className="relative w-12 h-12 flex items-center justify-center mb-2 group cursor-pointer">
          <div className="absolute inset-0 rounded-full bg-cyan-500/10 blur-md group-hover:bg-cyan-400/20 transition-all" />
          <svg viewBox="0 0 100 100" className="w-10 h-10 text-cyan-400 drop-shadow-[0_0_8px_#00f0ff]">
            {/* Outer Ring */}
            <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.4" />
            <circle cx="50" cy="50" r="36" fill="none" stroke="currentColor" strokeWidth="3" />
            {/* Avengers 'A' */}
            <path
              d="M 50 16 L 30 76 L 42 76 L 47 62 L 68 62 L 62 76 L 74 76 Z M 51 32 L 65 52 L 44 52 Z"
              fill="currentColor"
            />
            {/* Arrow Strike */}
            <polygon points="68,52 88,52 82,46 94,52 82,58 88,52" fill="currentColor" />
          </svg>
        </div>

        <h4 className="text-xs font-black tracking-widest uppercase font-display text-cyan-200">
          STARK INDUSTRIES
        </h4>
        <p className="text-[9px] text-cyan-400/60 font-mono tracking-wider mt-0.5 leading-tight">
          Advanced Technology for a Better Tomorrow
        </p>
      </div>
    </aside>
  );
};
