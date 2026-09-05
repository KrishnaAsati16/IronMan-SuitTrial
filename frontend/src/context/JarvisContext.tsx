import React, { createContext, useContext, useState, useCallback } from 'react';
import { JarvisMessage, JarvisStatus, VoiceState } from '../types/jarvis';
import { CommandRecord } from '../types/commands';
import { sendJarvisChat } from '../services/api';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { useVoiceAssistant } from '../hooks/useVoiceAssistant';
import { useAudio } from './AudioContext';
import { useSettings } from './SettingsContext';

interface JarvisContextType {
  messages: JarvisMessage[];
  isThinking: boolean;
  jarvisStatus: JarvisStatus;
  voiceState: VoiceState;
  commandHistory: CommandRecord[];
  sendMessage: (text: string, source?: 'USER_VOICE' | 'USER_TEXT') => Promise<void>;
  startVoiceInput: () => void;
  stopVoiceInput: () => void;
  clearChat: () => void;
}

const JarvisContext = createContext<JarvisContextType | undefined>(undefined);

export const JarvisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setHudMode, settings, updateSettings } = useSettings();
  const { playCommandAccepted, playClick, playWarning } = useAudio();
  const { speak, isSpeaking } = useSpeechSynthesis();

  const [messages, setMessages] = useState<JarvisMessage[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content: 'Good day, sir. Mark LXXXV systems are fully initialized. Arc Reactor containment is steady. How may I assist you?',
      timestamp: new Date().toLocaleTimeString(),
      provider: 'JARVIS Core'
    }
  ]);

  const [commandHistory, setCommandHistory] = useState<CommandRecord[]>([
    {
      id: 'cmd-init',
      timestamp: new Date().toLocaleTimeString(),
      source: 'SYSTEM',
      commandText: 'DIAGNOSTICS_BOOT',
      response: 'All systems operating within nominal tolerances.',
      status: 'SUCCESS'
    }
  ]);

  const [isThinking, setIsThinking] = useState(false);
  const [jarvisStatus, setJarvisStatus] = useState<JarvisStatus>({
    status: 'ONLINE',
    mode: 'ASSISTANT',
    provider: 'Demo/Simulated JARVIS Core',
    latencyMs: 35,
    voiceEnabled: true,
    aiConnected: true
  });

  const handleCommandExecution = useCallback(
    async (command: { type: string; target?: string; payload?: any }) => {
      // Execute frontend-level effects of safe commands
      if (command.type === 'OPEN_WEBSITE' && command.target) {
        window.open(command.target, '_blank', 'noopener,noreferrer');
      } else if (command.type === 'SWITCH_HUD_MODE') {
        const mode = command.target === 'helmet' || command.payload?.mode === 'helmet' ? 'helmet' : 'normal';
        setHudMode(mode);
      } else if (command.type === 'TOGGLE_VOICE') {
        updateSettings({ voiceEnabled: !settings.voiceEnabled });
      }
    },
    [setHudMode, settings.voiceEnabled, updateSettings]
  );

  const sendMessage = useCallback(
    async (text: string, source: 'USER_VOICE' | 'USER_TEXT' = 'USER_TEXT') => {
      if (!text.trim()) return;

      const userMsgId = 'msg-' + Date.now();
      const userMessage: JarvisMessage = {
        id: userMsgId,
        role: 'user',
        content: text,
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsThinking(true);
      playClick();

      try {
        const data = await sendJarvisChat(text);
        const assistantText = data.response || 'Understood, sir.';

        const assistantMsgId = 'msg-ast-' + Date.now();
        const assistantMessage: JarvisMessage = {
          id: assistantMsgId,
          role: 'assistant',
          content: assistantText,
          timestamp: new Date().toLocaleTimeString(),
          commandDetected: data.commandDetected || undefined,
          provider: data.provider || 'JARVIS Core',
          latencyMs: data.latencyMs || 40
        };

        setMessages((prev) => [...prev, assistantMessage]);
        setJarvisStatus((prev) => ({
          ...prev,
          latencyMs: data.latencyMs || 42,
          provider: data.provider || prev.provider
        }));

        // Log to Command History
        setCommandHistory((prev) => [
          {
            id: 'rec-' + Date.now(),
            timestamp: new Date().toLocaleTimeString(),
            source,
            commandText: text,
            commandType: data.commandDetected?.type,
            response: assistantText,
            status: data.status === 'SUCCESS' ? 'SUCCESS' : 'FAILED'
          },
          ...prev.slice(0, 40)
        ]);

        if (data.commandDetected) {
          playCommandAccepted();
          await handleCommandExecution(data.commandDetected);
        }

        // Voice output
        speak(assistantText);
      } catch (err: any) {
        playWarning();
        const errorMsg: JarvisMessage = {
          id: 'msg-err-' + Date.now(),
          role: 'assistant',
          content: 'My apologies, sir. An uplink disruption occurred with the neural core.',
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages((prev) => [...prev, errorMsg]);
      } finally {
        setIsThinking(false);
      }
    },
    [handleCommandExecution, playClick, playCommandAccepted, playWarning, speak]
  );

  // Voice assistant hook
  const { startListening, stopListening, isListening, transcript, error, supported } = useVoiceAssistant({
    onCommand: (spokenText) => {
      sendMessage(spokenText, 'USER_VOICE');
    }
  });

  const voiceState: VoiceState = {
    isListening,
    transcript,
    isSpeaking,
    supported,
    error
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <JarvisContext.Provider
      value={{
        messages,
        isThinking,
        jarvisStatus,
        voiceState,
        commandHistory,
        sendMessage,
        startVoiceInput: startListening,
        stopVoiceInput: stopListening,
        clearChat
      }}
    >
      {children}
    </JarvisContext.Provider>
  );
};

export const useJarvis = (): JarvisContextType => {
  const context = useContext(JarvisContext);
  if (!context) throw new Error('useJarvis must be used within JarvisProvider');
  return context;
};
