// ============================================================
// Quiz Engine — Session Logic (Extended)
// ============================================================

import { QUESTIONS } from '@/features/placement-test/questions'
import { EXTENDED_QUESTIONS } from '@/features/placement-test/extended-questions'
import type { PlacementQuestion, SkillTag } from '@/features/placement-test/questions'

export type { PlacementQuestion }

// Merge all questions
export const ALL_QUESTIONS: PlacementQuestion[] = [...QUESTIONS, ...EXTENDED_QUESTIONS]

export type SessionMode = 'practice' | 'review' | 'daily' | 'challenge'

export interface QuizConfig {
  skillId?: SkillTag
  difficulty?: number
  questionCount: number
  mode: SessionMode
  weakSkills?: SkillTag[]
}

export interface QuizSessionQuestion extends PlacementQuestion {
  index: number
}

export function buildSession(config: QuizConfig): QuizSessionQuestion[] {
  let pool: PlacementQuestion[] = []

  if (config.mode === 'daily' && config.weakSkills && config.weakSkills.length > 0) {
    // Mix: 60% weak skills, 40% other
    const weakPool = ALL_QUESTIONS.filter(q => config.weakSkills!.includes(q.skill))
    const otherPool = ALL_QUESTIONS.filter(q => !config.weakSkills!.includes(q.skill))
    const weakCount = Math.ceil(config.questionCount * 0.6)
    const otherCount = config.questionCount - weakCount
    pool = [
      ...shuffle(weakPool).slice(0, weakCount),
      ...shuffle(otherPool).slice(0, otherCount),
    ]
  } else if (config.mode === 'review' && config.skillId) {
    // Review: prefer lower difficulty, focus on skill
    pool = ALL_QUESTIONS.filter(
      q => q.skill === config.skillId && q.difficulty <= (config.difficulty ?? 3)
    )
  } else if (config.mode === 'challenge') {
    // Challenge: harder questions across all skills
    pool = ALL_QUESTIONS.filter(q => q.difficulty >= 4)
  } else {
    // Practice: filter by skill + difficulty
    const target = config.difficulty ?? 2
    pool = ALL_QUESTIONS.filter(
      q =>
        (!config.skillId || q.skill === config.skillId) &&
        Math.abs(q.difficulty - target) <= 1
    )
    if (pool.length < config.questionCount) {
      pool = ALL_QUESTIONS.filter(q => !config.skillId || q.skill === config.skillId)
    }
  }

  if (pool.length === 0) pool = ALL_QUESTIONS

  return shuffle(pool)
    .slice(0, config.questionCount)
    .map((q, i) => ({ ...q, index: i }))
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

export function calcXpGain(correct: boolean, difficulty: number, streak: number, timeMs: number): number {
  if (!correct) return 3
  const base = difficulty * 10
  const streakBonus = Math.min(streak, 5) * 3
  const speedBonus = timeMs < 5000 ? 5 : timeMs < 10000 ? 2 : 0
  return base + streakBonus + speedBonus
}

export const SKILL_CONFIG: Record<SkillTag, {
  label: string; emoji: string; color: string; accent: string
  worldName: string; worldEmoji: string
}> = {
  arithmetic: { label: 'Arithmetic', emoji: '🔢', color: '#DBEAFE', accent: '#3B82F6', worldName: 'Number Island',   worldEmoji: '🏝️' },
  fractions:  { label: 'Fractions',  emoji: '🍕', color: '#FEF3C7', accent: '#F59E0B', worldName: 'Fraction Forest', worldEmoji: '🌲' },
  logic:      { label: 'Logic',      emoji: '🧠', color: '#EDE9FE', accent: '#8B5CF6', worldName: 'Logic Cave',      worldEmoji: '🗿' },
  pattern:    { label: 'Patterns',   emoji: '🎨', color: '#D1FAE5', accent: '#10B981', worldName: 'Pattern Garden',  worldEmoji: '🌸' },
  algebra:    { label: 'Algebra',    emoji: '📐', color: '#FFE4E6', accent: '#F43F5E', worldName: 'Algebra City',    worldEmoji: '🏙️' },
}
