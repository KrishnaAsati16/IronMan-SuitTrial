import React from 'react';

interface StatusIndicatorProps {
  status: 'online' | 'offline' | 'warning' | 'active';
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, label, size = 'sm' }) => {
  const colorMap = {
    online: 'bg-hud-cyan shadow-[0_0_8px_#00f0ff]',
    active: 'bg-emerald-400 shadow-[0_0_8px_#34d399]',
    warning: 'bg-hud-gold shadow-[0_0_8px_#eab308]',
    offline: 'bg-hud-red shadow-[0_0_8px_#ef4444]'
  };

  const sizeMap = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  return (
    <div className="inline-flex items-center gap-2">
      <span className="relative flex h-3 w-3 items-center justify-center">
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${colorMap[status]}`}
        />
        <span className={`relative inline-flex rounded-full ${sizeMap[size]} ${colorMap[status]}`} />
      </span>
      {label && <span className="text-xs uppercase tracking-wider text-cyan-300/80 font-mono">{label}</span>}
    </div>
  );
};
