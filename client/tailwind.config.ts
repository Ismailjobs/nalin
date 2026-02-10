import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: '#E65100',
          light: '#FF6D00',
          dark: '#BF360C',
          muted: 'rgba(230, 81, 0, 0.15)',
        },
        cream: {
          DEFAULT: '#FAF9F6',
          bright: '#FDFDFD',
        },
        charcoal: {
          DEFAULT: '#1A1A1A',
          muted: '#4A4A4A',
        },
        /* legacy aliases for gradual migration */
        gold: { DEFAULT: '#E65100', light: '#FF6D00', dark: '#BF360C', muted: 'rgba(230, 81, 0, 0.15)' },
        luxury: { black: '#1A1A1A', charcoal: '#2A2A2A', card: '#FAF9F6' },
        text: { DEFAULT: '#1A1A1A', muted: '#4A4A4A' },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sharp: '0',
      },
      backdropBlur: {
        navbar: '12px',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.4s ease-out forwards',
      },
    },
  },
  plugins: [],
};

export default config;
