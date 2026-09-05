import React from 'react';

interface HudCardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'gold' | 'red';
}

export const HudCard: React.FC<HudCardProps> = ({
  title,
  subtitle,
  icon,
  badge,
  children,
  className = '',
  glowColor = 'cyan'
}) => {
  const borderColors = {
    cyan: 'border-cyan-500/30 hover:border-cyan-400/60 shadow-[0_0_15px_rgba(0,240,255,0.07)]',
    gold: 'border-yellow-500/30 hover:border-yellow-400/60 shadow-[0_0_15px_rgba(234,179,8,0.07)]',
    red: 'border-red-500/30 hover:border-red-400/60 shadow-[0_0_15px_rgba(239,68,68,0.07)]'
  };

  const cornerColors = {
    cyan: 'border-hud-cyan',
    gold: 'border-hud-gold',
    red: 'border-hud-red'
  };

  return (
    <div
      className={`relative rounded-md bg-[#050505]/90 backdrop-blur-md border p-4 transition-all duration-300 ${borderColors[glowColor]} ${className}`}
    >
      {/* Sci-Fi Decorative Corner Accents */}
      <div className={`absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 ${cornerColors[glowColor]}`} />
      <div className={`absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 ${cornerColors[glowColor]}`} />
      <div className={`absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 ${cornerColors[glowColor]}`} />
      <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 ${cornerColors[glowColor]}`} />

      {/* Card Header */}
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          {icon && <span className="text-hud-cyan drop-shadow-[0_0_8px_#00f0ff]">{icon}</span>}
          <div>
            <h3 className="text-sm font-bold tracking-widest uppercase font-display text-cyan-200">
              {title}
            </h3>
            {subtitle && (
              <p className="text-[10px] text-cyan-400/60 tracking-wider uppercase font-mono">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        {badge && <div>{badge}</div>}
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
