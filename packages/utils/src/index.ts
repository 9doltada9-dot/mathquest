// ============================================================
// @mathquest/utils — Shared utility functions
// ============================================================

import type { MasteryLevel } from '@mathquest/types'

// ── XP & Level Calculations ──────────────────────────────────

/**
 * Calculate total XP required to reach a given level.
 * Uses a gentle curve so early levels feel achievable.
 */
export function xpRequiredForLevel(level: number): number {
  return Math.floor(100 * Math.pow(level, 1.4))
}

/**
 * Calculate the current level from total accumulated XP.
 */
export function levelFromXp(totalXp: number): number {
  let level = 1
  while (xpRequiredForLevel(level + 1) <= totalXp) {
    level++
  }
  return level
}

/**
 * Calculate progress percentage within current level (0–100).
 */
export function xpProgressInLevel(totalXp: number): number {
  const level = levelFromXp(totalXp)
  const currentLevelXp = xpRequiredForLevel(level)
  const nextLevelXp = xpRequiredForLevel(level + 1)
  const range = nextLevelXp - currentLevelXp
  const progress = totalXp - currentLevelXp
  return Math.min(100, Math.floor((progress / range) * 100))
}

// ── Mastery ───────────────────────────────────────────────────

export const MASTERY_LABELS: Record<MasteryLevel, string> = {
  0: 'Not Started',
  1: 'Beginner',
  2: 'Developing',
  3: 'Stable',
  4: 'Confident',
  5: 'Mastered',
}

export const MASTERY_COLORS: Record<MasteryLevel, string> = {
  0: '#E5E7EB',
  1: '#FDE68A',
  2: '#FCD34D',
  3: '#86EFAC',
  4: '#4ADE80',
  5: '#16A34A',
}

// ── Response Time Analysis ────────────────────────────────────

/**
 * Determine if a response is unusually fast (possible guessing).
 */
export function isLikelyGuessing(responseTimeMs: number): boolean {
  return responseTimeMs < 800
}

/**
 * Detect significant slowdown compared to a baseline average.
 */
export function detectSlowdown(currentMs: number, averageMs: number): boolean {
  return currentMs > averageMs * 2.0
}

// ── Fatigue Scoring ───────────────────────────────────────────

interface FatigueSignals {
  accuracyDrop: number      // percentage points dropped vs session average
  responseSlowdown: number  // multiplier vs baseline (1.0 = normal, 2.0 = 2x slower)
  randomClickScore: number  // 0–1 probability of random clicking
  repeatedErrors: number    // number of consecutive wrong answers
}

/**
 * Calculate a composite fatigue score from behavioral signals.
 * Returns 0–100 (higher = more fatigued).
 */
export function calculateFatigueScore(signals: FatigueSignals): number {
  const accuracyWeight = 30
  const slowdownWeight = 30
  const randomClickWeight = 25
  const repeatedErrorWeight = 15

  const accuracyScore = Math.min(100, signals.accuracyDrop * 2.5)
  const slowdownScore = Math.min(100, Math.max(0, (signals.responseSlowdown - 1) * 60))
  const randomClickScore = signals.randomClickScore * 100
  const repeatedErrorScore = Math.min(100, signals.repeatedErrors * 20)

  return Math.floor(
    (accuracyScore * accuracyWeight +
      slowdownScore * slowdownWeight +
      randomClickScore * randomClickWeight +
      repeatedErrorScore * repeatedErrorWeight) / 100
  )
}

// ── Dates & Time ──────────────────────────────────────────────

/**
 * Format session duration into human-readable string.
 */
export function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  if (minutes === 0) return `${seconds}s`
  return `${minutes}m ${seconds}s`
}

/**
 * Calculate days since a given date.
 */
export function daysSince(date: Date): number {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}

/**
 * Check if a date is today.
 */
export function isToday(date: Date): boolean {
  const today = new Date()
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

// ── Spaced Repetition ────────────────────────────────────────

/**
 * Calculate next review date using SM-2 inspired algorithm.
 * confidenceScore: 0–100 (higher = longer interval)
 */
export function calculateNextReviewDate(confidenceScore: number, reviewCount: number): Date {
  const baseIntervalDays = confidenceScore < 40 ? 1 : confidenceScore < 70 ? 3 : 7
  const multiplier = Math.pow(1.8, Math.max(0, reviewCount - 1))
  const intervalDays = Math.min(60, Math.floor(baseIntervalDays * multiplier))

  const nextDate = new Date()
  nextDate.setDate(nextDate.getDate() + intervalDays)
  return nextDate
}

// ── Encouraging Messages ─────────────────────────────────────

const CORRECT_MESSAGES = [
  'Great job! 🎉',
  'You got it! ⭐',
  'Amazing! Keep going! 🚀',
  'Brilliant! 🌟',
  'Perfect! You're on fire! 🔥',
  'Excellent work! 💪',
]

const WRONG_MESSAGES = [
  'Almost there! Try again! 💪',
  'Good try! Let's figure it out! 🤔',
  'Nearly! One more shot! 🎯',
  'Keep going — you're learning! 🌱',
  "That's okay! Let's see why! 🔍",
]

export function getCorrectFeedback(): string {
  return CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]
}

export function getWrongFeedback(): string {
  return WRONG_MESSAGES[Math.floor(Math.random() * WRONG_MESSAGES.length)]
}
