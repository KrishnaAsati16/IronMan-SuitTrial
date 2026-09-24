import React from 'react';
import { Mic, MicOff } from 'lucide-react';
import { useJarvis } from '../context/JarvisContext';
import { useAudio } from '../context/AudioContext';

export const VoiceCommandBar: React.FC = () => {
  const { voiceState, startVoiceInput, stopVoiceInput } = useJarvis();
  const { playClick, playCommandAccepted } = useAudio();

  const handleMicToggle = () => {
    playClick();
    if (voiceState.isListening) {
      stopVoiceInput();
    } else {
      playCommandAccepted();
      startVoiceInput();
    }
  };

  return (
    <div className="w-full rounded-2xl bg-[#030915]/90 border border-cyan-500/30 px-5 py-3 backdrop-blur-xl shadow-[0_0_25px_rgba(0,180,255,0.12)] flex items-center justify-between">
      {/* Left: Interactive Mic & Command Title */}
      <div className="flex items-center gap-4">
        {/* Glowing Circular Mic Button */}
        <button
          onClick={handleMicToggle}
          disabled={!voiceState.supported}
          className={`relative w-11 h-11 rounded-full border transition-all duration-300 flex items-center justify-center cursor-pointer shadow-[0_0_20px_rgba(0,140,255,0.4)] ${
            voiceState.isListening
              ? 'bg-red-600/80 border-red-400 text-white shadow-[0_0_25px_rgba(239,68,68,0.8)]'
              : 'bg-gradient-to-br from-blue-600 to-cyan-500 border-cyan-300/80 text-white hover:scale-105'
          } ${!voiceState.supported ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {voiceState.isListening && (
            <span className="absolute inset-0 rounded-full animate-ping border-2 border-red-400 opacity-75" />
          )}
          {voiceState.isListening ? (
            <Mic className="w-5 h-5 animate-pulse" />
          ) : voiceState.supported ? (
            <Mic className="w-5 h-5" />
          ) : (
            <MicOff className="w-5 h-5" />
          )}
        </button>

        <div>
          <div className="text-xs font-black tracking-widest uppercase font-display text-white drop-shadow-[0_0_6px_rgba(0,240,255,0.6)]">
            J.A.R.V.I.S. — VOICE COMMAND
          </div>
          <div className="text-[11px] font-mono text-cyan-400/70 mt-0.5">
            {voiceState.isListening ? (
              <span className="text-red-400 font-bold animate-pulse">
                Listening... "{voiceState.transcript || 'Speak now'}"
              </span>
            ) : (
              <span>Press mic to activate voice input...</span>
            )}
          </div>
        </div>
      </div>

      {/* Right: Audio Waveform Equalizer & J.A.R.V.I.S. Status */}
      <div className="flex items-center gap-4">
        {/* Animated Multi-Bar Audio Equalizer Spectrum */}
        <div className="hidden sm:flex items-center gap-1 h-7 px-3 py-1 rounded-xl bg-black/40 border border-cyan-500/20">
          {[40, 70, 30, 95, 60, 45, 85, 25, 75, 55, 90, 35, 65, 80, 40].map((h, i) => (
            <div
              key={i}
              className={`w-1 rounded-full transition-all duration-150 ${
                voiceState.isListening
                  ? 'bg-cyan-400 shadow-[0_0_8px_#00f0ff]'
                  : voiceState.isSpeaking
                  ? 'bg-purple-400 shadow-[0_0_8px_#c084fc]'
                  : 'bg-gradient-to-t from-blue-600 to-cyan-400 opacity-60'
              }`}
              style={{
                height: voiceState.isListening || voiceState.isSpeaking ? `${h}%` : `${20 + (i % 4) * 15}%`,
                animationDelay: `${i * 60}ms`
              }}
            />
          ))}
        </div>

        {/* J.A.R.V.I.S. Dot Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-400/40 text-xs font-mono font-bold text-cyan-200">
          <span>J.A.R.V.I.S.</span>
          <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] animate-pulse" />
        </div>
      </div>
    </div>
  );
};
