/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        base: '#050508',
        cyan: '#00D4FF',
        violet: '#7C3AED',
        green: '#00FF88'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      boxShadow: {
        glow: '0 0 0.75rem rgba(0, 212, 255, 0.35), 0 0 3rem rgba(124, 58, 237, 0.18)'
      }
    }
  },
  plugins: []
};