import React from 'react';

interface ProgressRingProps {
  radius?: number;
  stroke?: number;
  progress: number;
  color?: string;
  glowColor?: string;
  label?: string;
  valueDisplay?: string;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  radius = 45,
  stroke = 6,
  progress,
  color = '#00f0ff',
  glowColor = 'rgba(0, 240, 255, 0.5)',
  label,
  valueDisplay
}) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, progress)) / 100) * circumference;

  return (
    <div className="relative inline-flex flex-col items-center justify-center">
      <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
        {/* Track */}
        <circle
          stroke="rgba(0, 240, 255, 0.15)"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Progress Arc */}
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.8s ease-in-out' }}
          strokeLinecap="round"
          filter={`drop-shadow(0 0 6px ${glowColor})`}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-sm font-bold tracking-wider font-mono text-cyan-200">
          {valueDisplay || `${Math.round(progress)}%`}
        </span>
        {label && <span className="text-[10px] text-cyan-400/60 uppercase">{label}</span>}
      </div>
    </div>
  );
};
