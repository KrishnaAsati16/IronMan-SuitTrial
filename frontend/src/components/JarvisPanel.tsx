import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Terminal, Trash2 } from 'lucide-react';
import { HudCard } from './HudCard';
import { useJarvis } from '../context/JarvisContext';
import { useAudio } from '../context/AudioContext';

export const JarvisPanel: React.FC = () => {
  const { messages, sendMessage, isThinking, jarvisStatus, clearChat } = useJarvis();
  const { playClick } = useAudio();
  const [inputText, setInputText] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
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

  return (
    <HudCard
      title="J.A.R.V.I.S. AI CORE"
      subtitle="NEURAL TACTICAL INTERFACE"
      icon={<Bot className="w-4 h-4" />}
      badge={
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-cyan-400/80 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
            {jarvisStatus.provider}
          </span>
          <button
            onClick={clearChat}
            title="Clear Chat History"
            className="p-1 rounded text-cyan-400/60 hover:text-cyan-200 hover:bg-cyan-950"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      }
      className="flex flex-col h-[480px]"
    >
      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto pr-1.5 space-y-3 font-mono text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            {/* Header info */}
            <div className="flex items-center gap-1.5 text-[10px] text-cyan-400/60 mb-1 px-1">
              {msg.role === 'user' ? (
                <>
                  <span>STARK (USER)</span>
                  <User className="w-3 h-3 text-hud-gold" />
                </>
              ) : (
                <>
                  <Bot className="w-3 h-3 text-hud-cyan" />
                  <span>J.A.R.V.I.S.</span>
                  {msg.latencyMs && (
                    <span className="text-[9px] text-cyan-500/70">({msg.latencyMs}ms)</span>
                  )}
                </>
              )}
              <span>•</span>
              <span>{msg.timestamp}</span>
            </div>

            {/* Content Bubble */}
            <div
              className={`max-w-[85%] rounded-md p-2.5 border transition-all ${
                msg.role === 'user'
                  ? 'bg-amber-950/30 border-amber-500/40 text-amber-200 shadow-[0_0_10px_rgba(234,179,8,0.1)]'
                  : 'bg-cyan-950/40 border-cyan-500/40 text-cyan-100 shadow-[0_0_12px_rgba(0,240,255,0.12)]'
              }`}
            >
              <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>

              {/* Detected Command Tag */}
              {msg.commandDetected && (
                <div className="mt-2 pt-1.5 border-t border-cyan-500/20 flex items-center gap-1.5 text-[10px] text-hud-cyan">
                  <Terminal className="w-3 h-3 text-cyan-400" />
                  <span className="font-bold">EXEC: {msg.commandDetected.type}</span>
                  {msg.commandDetected.target && (
                    <span className="text-cyan-300/70 truncate">({msg.commandDetected.target})</span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Thinking / Neural Processing State */}
        {isThinking && (
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-1.5 text-[10px] text-cyan-400/60 mb-1 px-1">
              <Bot className="w-3 h-3 text-hud-cyan animate-spin" />
              <span>J.A.R.V.I.S. (SYNTHESIZING...)</span>
            </div>
            <div className="rounded-md p-2.5 bg-cyan-950/40 border border-cyan-500/40 text-cyan-300 flex items-center gap-2">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-[11px] italic text-cyan-300/80">Processing neural instructions...</span>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Quick Tactical Command Chips */}
      <div className="pt-2 pb-1 border-t border-cyan-500/20 flex items-center gap-1.5 overflow-x-auto text-[10px] font-mono no-scrollbar">
        <span className="text-cyan-400/50 uppercase whitespace-nowrap">PRESETS:</span>
        <button
          onClick={() => handleQuickCommand('What is my CPU and RAM usage?')}
          className="px-2 py-0.5 rounded bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/30 text-cyan-300 whitespace-nowrap transition-colors"
        >
          System status
        </button>
        <button
          onClick={() => handleQuickCommand('What is the weather in Malibu?')}
          className="px-2 py-0.5 rounded bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/30 text-cyan-300 whitespace-nowrap transition-colors"
        >
          Weather
        </button>
        <button
          onClick={() => handleQuickCommand('Open YouTube')}
          className="px-2 py-0.5 rounded bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/30 text-cyan-300 whitespace-nowrap transition-colors"
        >
          Open YouTube
        </button>
        <button
          onClick={() => handleQuickCommand('Enter helmet mode')}
          className="px-2 py-0.5 rounded bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/30 text-cyan-300 whitespace-nowrap transition-colors"
        >
          Helmet HUD
        </button>
        <button
          onClick={() => handleQuickCommand('Toggle arc reactor overdrive')}
          className="px-2 py-0.5 rounded bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/30 text-cyan-300 whitespace-nowrap transition-colors"
        >
          Overdrive
        </button>
      </div>

      {/* Chat Text Input Form */}
      <form onSubmit={handleSubmit} className="mt-2 flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type directive for JARVIS (e.g. 'Open GitHub', 'Check CPU')..."
            className="w-full rounded bg-cyan-950/40 border border-cyan-500/40 py-2 pl-3 pr-8 text-xs font-mono text-cyan-100 placeholder-cyan-500/50 focus:outline-none focus:border-cyan-300 focus:ring-1 focus:ring-cyan-300 transition-all"
          />
          <Terminal className="w-3.5 h-3.5 text-cyan-500/60 absolute right-2.5 top-1/2 -translate-y-1/2" />
        </div>

        <button
          type="submit"
          disabled={!inputText.trim() || isThinking}
          className="p-2 rounded bg-cyan-950 border border-cyan-400/60 text-cyan-300 hover:bg-cyan-900 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_10px_rgba(0,240,255,0.2)]"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </HudCard>
  );
};
