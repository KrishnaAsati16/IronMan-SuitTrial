import React from 'react';
import { Mic, MicOff, AlertCircle, Radio } from 'lucide-react';
import { useJarvis } from '../context/JarvisContext';
import { useAudio } from '../context/AudioContext';

export const VoiceControl: React.FC = () => {
  const { voiceState, startVoiceInput, stopVoiceInput } = useJarvis();
  const { playClick, playCommandAccepted } = useAudio();

  const handleMicClick = () => {
    playClick();
    if (voiceState.isListening) {
      stopVoiceInput();
    } else {
      playCommandAccepted();
      startVoiceInput();
    }
  };

  return (
    <div className="relative rounded-md bg-black/90 border border-cyan-500/30 p-3 backdrop-blur-md">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left: Interactive Mic & Status */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handleMicClick}
            disabled={!voiceState.supported}
            className={`relative p-3 rounded-full border transition-all duration-300 flex items-center justify-center ${
              voiceState.isListening
                ? 'bg-red-500/20 border-red-500 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.7)]'
                : 'bg-cyan-950/60 border-cyan-400/50 text-cyan-300 hover:bg-cyan-900/60 hover:border-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.25)]'
            } ${!voiceState.supported ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            title={voiceState.isListening ? 'Click to stop listening' : 'Click to speak to JARVIS'}
          >
            {/* Animated audio ripple ring when listening */}
            {voiceState.isListening && (
              <span className="absolute inset-0 rounded-full animate-ping border border-red-400 opacity-75" />
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
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase font-display text-cyan-200">
                VOICE COMMAND MATRIX
              </span>
              {voiceState.isListening && (
                <span className="flex items-center gap-1 text-[10px] text-red-400 font-mono animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  LISTENING
                </span>
              )}
            </div>
            <p className="text-[11px] font-mono text-cyan-400/70">
              {voiceState.isListening
                ? 'Speak tactical directive (e.g. "Open YouTube", "System status")...'
                : voiceState.supported
                ? 'Press mic to activate voice input'
                : 'Web Speech recognition unavailable in this browser (Text mode active)'}
            </p>
          </div>
        </div>

        {/* Right: Audio Waveform Visualizer simulation */}
        <div className="flex items-center gap-1 h-6">
          {[40, 75, 30, 90, 60, 45, 80, 25, 70, 50, 85, 35].map((height, i) => (
            <div
              key={i}
              className={`w-1 rounded-full transition-all duration-150 ${
                voiceState.isListening
                  ? 'bg-hud-cyan animate-pulse shadow-[0_0_6px_#00f0ff]'
                  : voiceState.isSpeaking
                  ? 'bg-hud-gold animate-pulse'
                  : 'bg-cyan-900/40'
              }`}
              style={{
                height: voiceState.isListening || voiceState.isSpeaking ? `${height}%` : '20%',
                animationDelay: `${i * 70}ms`
              }}
            />
          ))}
        </div>
      </div>

      {/* Live Speech Recognition Transcript Box */}
      {(voiceState.transcript || voiceState.isListening) && (
        <div className="mt-2.5 p-2 rounded bg-cyan-950/40 border border-cyan-500/20 font-mono text-xs flex items-center gap-2">
          <Radio className="w-3.5 h-3.5 text-hud-cyan animate-spin" />
          <span className="text-cyan-400/60 uppercase text-[10px]">TRANSCRIPT:</span>
          <span className="text-cyan-100 font-semibold italic">
            "{voiceState.transcript || 'Listening for speech...'}"
          </span>
        </div>
      )}

      {/* Error display */}
      {voiceState.error && (
        <div className="mt-2 p-1.5 rounded bg-red-950/50 border border-red-500/30 text-red-300 font-mono text-[11px] flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{voiceState.error}</span>
        </div>
      )}
    </div>
  );
};
