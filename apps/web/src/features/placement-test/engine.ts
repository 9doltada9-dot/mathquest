// ============================================================
// Placement Test Engine — Adaptive Logic
// ============================================================

import {
  QUESTIONS,
  type PlacementQuestion,
  type QuestionAttempt,
  type PlacementResult,
  type SkillScore,
  type SkillTag,
  type LearningPersonality,
  SKILL_INFO,
} from './questions'

// ── Question Selection ─────────────────────────────────────────

export function selectNextQuestion(
  attempts: QuestionAttempt[],
  currentDifficulty: number
): PlacementQuestion | null {
  const usedIds = new Set(attempts.map((a) => a.questionId))

  // Get questions not yet used, near current difficulty
  const candidates = QUESTIONS.filter(
    (q) => !usedIds.has(q.id) && Math.abs(q.difficulty - currentDifficulty) <= 1
  )

  if (candidates.length === 0) {
    // Broaden search if no candidates
    const broader = QUESTIONS.filter((q) => !usedIds.has(q.id))
    if (broader.length === 0) return null
    return broader[Math.floor(Math.random() * broader.length)]
  }

  // Prioritize skills with fewer attempts
  const skillCounts = attempts.reduce<Record<string, number>>((acc, a) => {
    acc[a.skill] = (acc[a.skill] || 0) + 1
    return acc
  }, {})

  // Sort candidates: prefer under-tested skills
  const sorted = candidates.sort((a, b) => {
    const aCount = skillCounts[a.skill] || 0
    const bCount = skillCounts[b.skill] || 0
    return aCount - bCount
  })

  return sorted[0]
}

// ── Difficulty Adjustment ─────────────────────────────────────

export function adjustDifficulty(
  currentDifficulty: number,
  wasCorrect: boolean,
  streak: number
): number {
  if (wasCorrect) {
    // Increase after 2 correct in a row
    if (streak >= 2) return Math.min(5, currentDifficulty + 1)
    return currentDifficulty
  } else {
    // Decrease immediately on wrong
    return Math.max(1, currentDifficulty - 1)
  }
}

// ── Result Calculation ─────────────────────────────────────────

export function calculateResult(attempts: QuestionAttempt[]): PlacementResult {
  const skills: SkillTag[] = ['arithmetic', 'fractions', 'logic', 'pattern', 'algebra']

  const skillScores: SkillScore[] = skills.map((skill) => {
    const skillAttempts = attempts.filter((a) => a.skill === skill)
    const correct = skillAttempts.filter((a) => a.correct).length
    const total = skillAttempts.length

    // Calculate level based on accuracy and difficulty of correct answers
    let level = 1
    if (total > 0) {
      const accuracy = correct / total
      const avgDifficulty =
        skillAttempts.filter((a) => a.correct).reduce((sum, a) => sum + a.difficulty, 0) /
        Math.max(correct, 1)

      level = Math.round(accuracy * avgDifficulty)
      level = Math.max(1, Math.min(5, level))
    }

    const info = SKILL_INFO[skill]
    return {
      skill,
      level,
      label: info.label,
      emoji: info.emoji,
      correct,
      total,
    }
  })

  // Overall level = average of all skill levels
  const overallLevel = Math.round(
    skillScores.reduce((sum, s) => sum + s.level, 0) / skillScores.length
  )

  // Determine personality
  const personality = detectPersonality(attempts)

  // Find strengths and focus areas
  const sorted = [...skillScores].sort((a, b) => b.level - a.level)
  const strengths = sorted.slice(0, 2).map((s) => `${s.emoji} ${s.label}`)
  const focusAreas = sorted.slice(-2).map((s) => `${s.emoji} ${s.label}`)

  // Recommended starting point
  const recommendedStart = getRecommendedStart(overallLevel)

  return { overallLevel, skills: skillScores, personality, recommendedStart, strengths, focusAreas }
}

function detectPersonality(attempts: QuestionAttempt[]): LearningPersonality {
  if (attempts.length === 0) return 'explorer'

  const avgTime = attempts.reduce((sum, a) => sum + a.responseTimeMs, 0) / attempts.length
  const accuracy = attempts.filter((a) => a.correct).length / attempts.length
  const hintUsage = attempts.filter((a) => a.usedHint).length / attempts.length
  const patternAttempts = attempts.filter((a) => a.skill === 'pattern').length

  if (avgTime < 5000 && accuracy > 0.7) return 'speed_learner'
  if (avgTime > 12000 && accuracy > 0.6) return 'deep_thinker'
  if (patternAttempts >= 2 && accuracy > 0.5) return 'visual_learner'
  if (hintUsage < 0.1 && accuracy > 0.5) return 'competitive'
  return 'explorer'
}

function getRecommendedStart(level: number): string {
  if (level <= 1) return 'Basic Addition & Subtraction'
  if (level <= 2) return 'Multiplication Tables'
  if (level <= 3) return 'Fractions & Introduction to Algebra'
  if (level <= 4) return 'Advanced Algebra & Logic'
  return 'Challenge Mode — Advanced Problems'
}

// ── Progress ──────────────────────────────────────────────────

export const TOTAL_QUESTIONS = 12  // How many questions in the test

export function getProgress(count: number): number {
  return Math.round((count / TOTAL_QUESTIONS) * 100)
}
