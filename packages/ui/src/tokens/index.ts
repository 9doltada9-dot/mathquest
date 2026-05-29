// ============================================================
// @mathquest/ui — Design Tokens
// Single source of truth for visual constants
// ============================================================

export const colors = {
  // ── Primary Brand ──────────────────────────────────────
  primary: {
    50: '#EEF2FF',
    100: '#E0E7FF',
    400: '#818CF8',
    500: '#6366F1',   // Main brand color
    600: '#4F46E5',
    700: '#4338CA',
  },

  // ── Gamification ───────────────────────────────────────
  xp: '#F59E0B',          // Gold/amber for XP
  level: '#8B5CF6',       // Purple for levels
  streak: '#EF4444',      // Red for streaks

  // ── Feedback States ────────────────────────────────────
  success: {
    light: '#D1FAE5',
    DEFAULT: '#10B981',
    dark: '#059669',
  },
  warning: {
    light: '#FEF3C7',
    DEFAULT: '#F59E0B',
    dark: '#D97706',
  },
  error: {
    light: '#FEE2E2',
    DEFAULT: '#F87171',   // Soft red — never harsh
    dark: '#EF4444',
  },

  // ── Game Worlds ────────────────────────────────────────
  worlds: {
    numberIsland:  '#60A5FA',  // Blue
    fractionForest: '#34D399', // Green
    algebraCity:   '#A78BFA',  // Purple
    logicCave:     '#F97316',  // Orange
    geometryTemple: '#EC4899', // Pink
  },

  // ── Neutral ────────────────────────────────────────────
  neutral: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
} as const

export const spacing = {
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
} as const

export const borderRadius = {
  sm: '8px',
  DEFAULT: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  full: '9999px',
} as const

export const typography = {
  fonts: {
    display: '"Nunito", "Fredoka One", system-ui, sans-serif',
    body: '"Nunito", system-ui, sans-serif',
    mono: '"JetBrains Mono", monospace',
  },
  sizes: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
  },
  weights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
} as const

export const shadows = {
  card: '0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05)',
  cardHover: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.05)',
  button: '0 4px 12px rgba(99,102,241,0.35)',
  success: '0 4px 12px rgba(16,185,129,0.35)',
} as const

export const animation = {
  duration: {
    fast: '150ms',
    normal: '250ms',
    slow: '400ms',
  },
  easing: {
    bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
} as const
