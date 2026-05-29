// ============================================================
// Fatigue Detection Engine
// ============================================================

export type FatigueLevel = 'fresh' | 'normal' | 'tired' | 'fatigued'

export interface FatigueSignal {
  responseTimeMs: number
  correct: boolean
  usedHint: boolean
}

export interface FatigueState {
  score: number         // 0–100
  level: FatigueLevel
  shouldBreak: boolean
  shouldStop: boolean
  message: string | null
}

export function analyzeFatigue(signals: FatigueSignal[]): FatigueState {
  if (signals.length < 3) {
    return { score: 0, level: 'fresh', shouldBreak: false, shouldStop: false, message: null }
  }

  const recent = signals.slice(-6)
  const baseline = signals.slice(0, Math.min(3, signals.length))

  // Average response time
  const avgBaseline = baseline.reduce((s, x) => s + x.responseTimeMs, 0) / baseline.length
  const avgRecent = recent.reduce((s, x) => s + x.responseTimeMs, 0) / recent.length

  // Slowdown ratio
  const slowdown = avgRecent / Math.max(avgBaseline, 1000)

  // Accuracy drop in recent attempts
  const recentAcc = recent.filter(x => x.correct).length / recent.length
  const baselineAcc = baseline.filter(x => x.correct).length / baseline.length
  const accDrop = Math.max(0, baselineAcc - recentAcc)

  // Random clicking detection: very fast wrong answers
  const rapidWrong = recent.filter(x => !x.correct && x.responseTimeMs < 1500).length
  const randomScore = rapidWrong / recent.length

  // Hint spike
  const recentHints = recent.filter(x => x.usedHint).length
  const hintRate = recentHints / recent.length

  // Consecutive wrong answers
  let consec = 0
  for (let i = signals.length - 1; i >= 0; i--) {
    if (!signals[i].correct) consec++
    else break
  }

  // Composite score
  const score = Math.min(100, Math.round(
    (Math.max(0, slowdown - 1) * 25) +
    (accDrop * 30) +
    (randomScore * 25) +
    (hintRate * 10) +
    (Math.min(consec, 4) * 5)
  ))

  let level: FatigueLevel = 'fresh'
  let shouldBreak = false
  let shouldStop = false
  let message: string | null = null

  if (score >= 70) {
    level = 'fatigued'
    shouldStop = true
    message = "You've been working hard! Time for a proper break. 😴"
  } else if (score >= 45) {
    level = 'tired'
    shouldBreak = true
    message = "You're slowing down a little. A short break might help! 🌟"
  } else if (score >= 20) {
    level = 'normal'
  }

  return { score, level, shouldBreak, shouldStop, message }
}

export const FATIGUE_COLORS: Record<FatigueLevel, string> = {
  fresh:    '#10B981',
  normal:   '#6366F1',
  tired:    '#F59E0B',
  fatigued: '#EF4444',
}

export const FATIGUE_LABELS: Record<FatigueLevel, string> = {
  fresh:    'Focused',
  normal:   'Going well',
  tired:    'Slowing down',
  fatigued: 'Need a break',
}
