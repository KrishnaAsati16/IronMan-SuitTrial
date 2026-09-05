import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';
import { SettingsProvider } from './context/SettingsContext';
import { AudioProvider } from './context/AudioContext';
import { TelemetryProvider } from './context/TelemetryContext';
import { JarvisProvider } from './context/JarvisContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SettingsProvider>
      <AudioProvider>
        <TelemetryProvider>
          <JarvisProvider>
            <App />
          </JarvisProvider>
        </TelemetryProvider>
      </AudioProvider>
    </SettingsProvider>
  </React.StrictMode>
);
