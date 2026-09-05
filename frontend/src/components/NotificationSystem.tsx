import React from 'react';
import { ShieldAlert, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { NotificationItem } from '../types/hud';

interface NotificationSystemProps {
  notifications: NotificationItem[];
  onDismiss: (id: string) => void;
}

export const NotificationSystem: React.FC<NotificationSystemProps> = ({ notifications, onDismiss }) => {
  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {notifications.map((n) => {
        const icons = {
          info: <Info className="w-4 h-4 text-cyan-400" />,
          success: <CheckCircle className="w-4 h-4 text-emerald-400" />,
          warning: <AlertTriangle className="w-4 h-4 text-amber-400" />,
          error: <ShieldAlert className="w-4 h-4 text-red-400" />
        };

        const borderStyles = {
          info: 'border-cyan-500/40 bg-[#040e1c]/90 text-cyan-200',
          success: 'border-emerald-500/40 bg-[#041c10]/90 text-emerald-200',
          warning: 'border-amber-500/40 bg-[#1c1604]/90 text-amber-200',
          error: 'border-red-500/40 bg-[#1c0404]/90 text-red-200'
        };

        return (
          <div
            key={n.id}
            onClick={() => onDismiss(n.id)}
            className={`pointer-events-auto p-3 rounded-md border shadow-lg backdrop-blur-md font-mono text-xs cursor-pointer flex items-start gap-2.5 transition-all animate-slideUp ${borderStyles[n.type]}`}
          >
            <div className="mt-0.5">{icons[n.type]}</div>
            <div className="flex-1">
              <h5 className="font-bold uppercase tracking-wider text-[11px]">{n.title}</h5>
              <p className="text-[11px] opacity-90 leading-normal">{n.message}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
