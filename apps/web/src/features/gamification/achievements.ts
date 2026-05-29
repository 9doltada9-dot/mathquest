// ============================================================
// Achievements System
// ============================================================

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  color: string
  xpReward: number
  check: (stats: AchievementStats) => boolean
}

export interface AchievementStats {
  totalXp: number
  level: number
  currentStreak: number
  longestStreak: number
  totalCorrect: number
  totalAttempts: number
  skillsMastered: number        // skills with masteryLevel >= 3
  placementDone: boolean
  sessionCorrect: number
  sessionsCompleted: number
}

export const ACHIEVEMENTS: Achievement[] = [
  // ── First Steps ───────────────────────────────────────────
  {
    id: 'first-answer',
    title: 'First Answer',
    description: 'Answer your very first question',
    icon: '🌟',
    color: '#FEF3C7',
    xpReward: 50,
    check: (s) => s.totalAttempts >= 1,
  },
  {
    id: 'placement-done',
    title: 'Explorer',
    description: 'Complete the placement test',
    icon: '🗺️',
    color: '#DBEAFE',
    xpReward: 100,
    check: (s) => s.placementDone,
  },
  {
    id: 'first-correct',
    title: 'Correct!',
    description: 'Get your first question right',
    icon: '✅',
    color: '#D1FAE5',
    xpReward: 30,
    check: (s) => s.totalCorrect >= 1,
  },

  // ── Accuracy ──────────────────────────────────────────────
  {
    id: 'sharp-mind',
    title: 'Sharp Mind',
    description: 'Answer 10 questions correctly',
    icon: '🎯',
    color: '#D1FAE5',
    xpReward: 75,
    check: (s) => s.totalCorrect >= 10,
  },
  {
    id: 'math-warrior',
    title: 'Math Warrior',
    description: 'Answer 50 questions correctly',
    icon: '⚔️',
    color: '#EDE9FE',
    xpReward: 200,
    check: (s) => s.totalCorrect >= 50,
  },
  {
    id: 'math-legend',
    title: 'Math Legend',
    description: 'Answer 200 questions correctly',
    icon: '👑',
    color: '#FEF3C7',
    xpReward: 500,
    check: (s) => s.totalCorrect >= 200,
  },

  // ── Streaks ───────────────────────────────────────────────
  {
    id: 'streak-3',
    title: '3-Day Explorer',
    description: 'Study 3 days in a row',
    icon: '🔥',
    color: '#FEE2E2',
    xpReward: 100,
    check: (s) => s.longestStreak >= 3,
  },
  {
    id: 'streak-7',
    title: 'Week Champion',
    description: 'Study 7 days in a row',
    icon: '🏆',
    color: '#FEF3C7',
    xpReward: 300,
    check: (s) => s.longestStreak >= 7,
  },
  {
    id: 'streak-30',
    title: 'Unstoppable',
    description: 'Study 30 days in a row',
    icon: '💎',
    color: '#DBEAFE',
    xpReward: 1000,
    check: (s) => s.longestStreak >= 30,
  },

  // ── Levels ────────────────────────────────────────────────
  {
    id: 'level-5',
    title: 'Rising Star',
    description: 'Reach Level 5',
    icon: '⭐',
    color: '#FEF3C7',
    xpReward: 150,
    check: (s) => s.level >= 5,
  },
  {
    id: 'level-10',
    title: 'Math Hero',
    description: 'Reach Level 10',
    icon: '🦸',
    color: '#EDE9FE',
    xpReward: 400,
    check: (s) => s.level >= 10,
  },

  // ── Mastery ───────────────────────────────────────────────
  {
    id: 'first-mastery',
    title: 'Skill Seeker',
    description: 'Develop any skill to level 3',
    icon: '📈',
    color: '#D1FAE5',
    xpReward: 150,
    check: (s) => s.skillsMastered >= 1,
  },
  {
    id: 'multi-mastery',
    title: 'Renaissance Kid',
    description: 'Develop 3 different skills',
    icon: '🌈',
    color: '#EDE9FE',
    xpReward: 350,
    check: (s) => s.skillsMastered >= 3,
  },

  // ── XP ────────────────────────────────────────────────────
  {
    id: 'xp-500',
    title: 'XP Hunter',
    description: 'Earn 500 total XP',
    icon: '💰',
    color: '#FEF3C7',
    xpReward: 100,
    check: (s) => s.totalXp >= 500,
  },
  {
    id: 'xp-2000',
    title: 'XP Master',
    description: 'Earn 2000 total XP',
    icon: '💎',
    color: '#DBEAFE',
    xpReward: 250,
    check: (s) => s.totalXp >= 2000,
  },

  // ── Persistence ───────────────────────────────────────────
  {
    id: 'never-give-up',
    title: 'Never Give Up',
    description: 'Attempt 20 questions (even wrong ones count!)',
    icon: '💪',
    color: '#FFE4E6',
    xpReward: 80,
    check: (s) => s.totalAttempts >= 20,
  },
]

export function checkNewAchievements(
  stats: AchievementStats,
  alreadyUnlocked: string[]
): Achievement[] {
  const unlockedSet = new Set(alreadyUnlocked)
  return ACHIEVEMENTS.filter(
    (a) => !unlockedSet.has(a.id) && a.check(stats)
  )
}
