import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ow: {
          orange: '#f99e1a',
          blue: '#218ffe',
          dark: '#0b0f17',
          panel: '#131a26',
          border: '#1f2a3d',
          muted: '#6b7a93',
          buff: '#22c55e',
          nerf: '#ef4444',
          rework: '#a855f7',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
