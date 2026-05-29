/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // ── Brand Colors ──────────────────────────────────
      colors: {
        primary: {
          50:  '#EEF2FF',
          100: '#E0E7FF',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
        },
        xp:     '#F59E0B',
        level:  '#8B5CF6',
        streak: '#EF4444',
        worlds: {
          island:  '#60A5FA',
          forest:  '#34D399',
          city:    '#A78BFA',
          cave:    '#F97316',
          temple:  '#EC4899',
        },
      },

      // ── Typography ────────────────────────────────────
      fontFamily: {
        display: ['Nunito', 'system-ui', 'sans-serif'],
        body:    ['Nunito', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        extrabold: 800,
      },

      // ── Border Radius ─────────────────────────────────
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },

      // ── Box Shadows ───────────────────────────────────
      boxShadow: {
        card:        '0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05)',
        'card-hover':'0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.05)',
        button:      '0 4px 12px rgba(99,102,241,0.35)',
        success:     '0 4px 12px rgba(16,185,129,0.35)',
        glow:        '0 0 20px rgba(99,102,241,0.4)',
      },

      // ── Animations ────────────────────────────────────
      keyframes: {
        'pop-in': {
          '0%':   { transform: 'scale(0.8)', opacity: '0' },
          '70%':  { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)',   opacity: '1' },
        },
        'xp-rise': {
          '0%':   { transform: 'translateY(0)',   opacity: '1' },
          '100%': { transform: 'translateY(-40px)', opacity: '0' },
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'pop-in':      'pop-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'xp-rise':     'xp-rise 0.8s ease-out forwards',
        'bounce-soft': 'bounce-soft 2s ease-in-out infinite',
        shimmer:       'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [],
}
