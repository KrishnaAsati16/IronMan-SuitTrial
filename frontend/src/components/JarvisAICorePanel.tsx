import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Terminal } from 'lucide-react';
import { useJarvis } from '../context/JarvisContext';
import { useAudio } from '../context/AudioContext';

export const JarvisAICorePanel: React.FC = () => {
  const { messages, sendMessage, isThinking } = useJarvis();
  const { playClick } = useAudio();
  const [inputText, setInputText] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isThinking) return;
    sendMessage(inputText.trim(), 'USER_TEXT');
    setInputText('');
  };

  const handleQuickCommand = (cmd: string) => {
    playClick();
    sendMessage(cmd, 'USER_TEXT');
  };

  const presetButtons = [
    { label: 'System Status', cmd: 'What is my CPU and RAM usage?' },
    { label: 'Weather', cmd: 'What is the weather in Malibu?' },
    { label: 'Open YouTube', cmd: 'Open YouTube' },
    { label: 'Helmet HUD', cmd: 'Enter helmet mode' },
    { label: 'Override', cmd: 'Toggle arc reactor overdrive' },
  ];

  return (
    <div className="rounded-2xl bg-[#030915]/90 border border-cyan-500/30 p-4 backdrop-blur-xl shadow-[0_0_30px_rgba(0,180,255,0.12)] flex flex-col justify-between h-full">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2.5 mb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-cyan-950/80 border border-cyan-400/50 shadow-[0_0_10px_rgba(0,240,255,0.3)]">
            <Bot className="w-4 h-4 text-cyan-300" />
          </div>
          <div>
            <h3 className="text-xs font-black tracking-widest uppercase font-display text-white">
              J.A.R.V.I.S. AI CORE
            </h3>
            <p className="text-[10px] text-cyan-400/70 font-mono">
              NEURAL TACTICAL INTERFACE
            </p>
          </div>
        </div>

        <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-500/40">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          ONLINE
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 font-mono text-xs max-h-48 min-h-[140px]">
        {messages.slice(-6).map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-center gap-2 text-[10px] text-cyan-400/70 mb-1 px-1">
              {msg.role === 'user' ? (
                <>
                  <span>KRISHNA ASATI</span>
                  <User className="w-3 h-3 text-amber-400" />
                </>
              ) : (
                <>
                  <Bot className="w-3 h-3 text-cyan-400" />
                  <span>J.A.R.V.I.S. • {msg.timestamp}</span>
                </>
              )}
            </div>

            <div
              className={`rounded-xl p-3 border leading-relaxed max-w-[95%] shadow-md ${
                msg.role === 'user'
                  ? 'bg-blue-950/40 border-blue-400/40 text-blue-100'
                  : 'bg-black/60 border-cyan-500/30 text-cyan-100 flex items-start gap-2.5'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-400/60 shrink-0 flex items-center justify-center mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                </div>
              )}
              <div className="flex-1">
                <p>{msg.content}</p>
                {msg.commandDetected && (
                  <div className="mt-1.5 pt-1 border-t border-cyan-500/20 text-[10px] text-cyan-300 font-bold flex items-center gap-1.5">
                    <Terminal className="w-3 h-3" />
                    <span>COMMAND: {msg.commandDetected.type}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs italic p-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />
            <span>J.A.R.V.I.S. is synthesizing tactical directive...</span>
          </div>
        )}
        <div ref={chatBottomRef} />
      </div>

      {/* Preset Command Buttons Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-2 border-t border-cyan-500/20 text-[10px] font-mono no-scrollbar">
        {presetButtons.map((btn) => (
          <button
            key={btn.label}
            onClick={() => handleQuickCommand(btn.cmd)}
            className="px-2.5 py-1 rounded-lg bg-black/60 hover:bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 whitespace-nowrap transition-colors"
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Text Input Form */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-1">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder='Type a directive for J.A.R.V.I.S. (e.g. "Open GitHub", "Check CPU")...'
          className="flex-1 rounded-xl bg-black/60 border border-cyan-500/40 py-2 px-3.5 text-xs font-mono text-cyan-100 placeholder-cyan-500/40 focus:outline-none focus:border-cyan-300 transition-all"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isThinking}
          className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_12px_rgba(0,180,255,0.4)]"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
