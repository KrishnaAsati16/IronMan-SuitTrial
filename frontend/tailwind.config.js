/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hud: {
          cyan: '#00f0ff',
          'cyan-dim': 'rgba(0, 240, 255, 0.25)',
          'cyan-glow': 'rgba(0, 240, 255, 0.6)',
          gold: '#eab308',
          'gold-glow': 'rgba(234, 179, 8, 0.5)',
          red: '#ef4444',
          'red-glow': 'rgba(239, 68, 68, 0.5)',
          dark: '#030811',
          panel: 'rgba(6, 18, 36, 0.75)',
          border: 'rgba(0, 240, 255, 0.35)',
        }
      },
      fontFamily: {
        mono: ['"Share Tech Mono"', 'Consolas', 'Menlo', 'monospace'],
        display: ['"Orbitron"', '"Rajdhani"', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 16s linear infinite',
        'spin-reverse': 'spin-rev 20s linear infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'scanline': 'scanline 6s linear infinite',
      },
      keyframes: {
        'spin-rev': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' }
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.8', filter: 'drop-shadow(0 0 15px rgba(0, 240, 255, 0.7))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 35px rgba(0, 240, 255, 0.95))' }
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' }
        }
      },
      boxShadow: {
        'hud-glow': '0 0 20px rgba(0, 240, 255, 0.25), inset 0 0 20px rgba(0, 240, 255, 0.1)',
        'hud-glow-active': '0 0 30px rgba(0, 240, 255, 0.5), inset 0 0 30px rgba(0, 240, 255, 0.2)',
        'hud-red': '0 0 25px rgba(239, 68, 68, 0.4), inset 0 0 25px rgba(239, 68, 68, 0.15)',
      }
    },
  },
  plugins: [],
}
