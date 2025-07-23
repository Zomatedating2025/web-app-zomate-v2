/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        galactic: {
          purple: '#5B2C6F',
          dark: '#1B1F3B',
          gold: '#FFD700',
          lavender: '#C8A2C8',
          teal: '#57F0D0',
          white: '#F5F3FF',
        },
        cosmic: {
          bg: '#0A0A0F',
          card: '#1A1A2E',
          accent: '#16213E',
        }
      },
      fontFamily: {
        'heading': ['DM Sans', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'constellation': 'constellation 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0', transform: 'scale(0)' },
          '50%': { opacity: '1', transform: 'scale(1)' },
        },
        constellation: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(91, 44, 111, 0.5)' },
          '100%': { boxShadow: '0 0 40px rgba(91, 44, 111, 0.8)' },
        },
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, #0A0A0F 0%, #1B1F3B 50%, #5B2C6F 100%)',
        'card-gradient': 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
      }
    },
  },
  plugins: [],
}
