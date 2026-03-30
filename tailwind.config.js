/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        journal: {
          DEFAULT: '#FDFDFB', // White Bone
          paper: '#FDFDFB',
        },
        graphite: {
          DEFAULT: '#1A1A1A',
          700: '#333333',
          400: '#666666',
        },
        emerald: {
          DEFAULT: '#0D4435',
          dark: '#082f25',
          light: '#1a5c4a',
        },
        gfp: {
          DEFAULT: '#00FF95', // GFP bioluminescent green
          glow: 'rgba(0, 255, 149, 0.4)',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Outfit"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'journal-gradient': 'linear-gradient(135deg, #FDFDFB 0%, #F5F5F0 100%)',
      }
    },
  },
  plugins: [],
}
