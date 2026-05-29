'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { checkNewAchievements } from '@/features/gamification/achievements'
import type { Achievement } from '@/features/gamification/achievements'

export type SkillId = 'arithmetic' | 'fractions' | 'logic' | 'pattern' | 'algebra'

export interface SkillProgress {
  skillId: SkillId
  masteryLevel: number
  xpInSkill: number
  totalCorrect: number
  totalAttempts: number
  lastPracticed: string | null
}

export interface Mission {
  id: string
  title: string
  description: string
  icon: string
  targetValue: number
  currentProgress: number
  rewardXp: number
  completed: boolean
  claimed: boolean
}

export interface UnlockedAchievement {
  id: string
  unlockedAt: string
}

export interface GameState {
  displayName: string
  totalXp: number
  level: number
  currentStreak: number
  longestStreak: number
  lastActiveDate: string | null
  placementDone: boolean
  placementLevel: number
  skills: Record<SkillId, SkillProgress>
  missions: Mission[]
  lastMissionReset: string | null
  sessionQuestionsAnswered: number
  sessionCorrect: number
  sessionsCompleted: number
  unlockedAchievements: UnlockedAchievement[]
  newAchievements: Achievement[]   // queue for toast display
  showLevelUp: boolean
  previousLevel: number
}

export function xpForLevel(level: number) {
  return Math.floor(100 * Math.pow(level, 1.4))
}
export function levelFromXp(xp: number) {
  let lv = 1
  while (xpForLevel(lv + 1) <= xp) lv++
  return lv
}
export function xpProgressPercent(xp: number) {
  const lv = levelFromXp(xp)
  const cur = xpForLevel(lv)
  const nxt = xpForLevel(lv + 1)
  return Math.min(100, Math.floor(((xp - cur) / (nxt - cur)) * 100))
}

const DEFAULT_SKILLS: Record<SkillId, SkillProgress> = {
  arithmetic: { skillId: 'arithmetic', masteryLevel: 0, xpInSkill: 0, totalCorrect: 0, totalAttempts: 0, lastPracticed: null },
  fractions:  { skillId: 'fractions',  masteryLevel: 0, xpInSkill: 0, totalCorrect: 0, totalAttempts: 0, lastPracticed: null },
  logic:      { skillId: 'logic',      masteryLevel: 0, xpInSkill: 0, totalCorrect: 0, totalAttempts: 0, lastPracticed: null },
  pattern:    { skillId: 'pattern',    masteryLevel: 0, xpInSkill: 0, totalCorrect: 0, totalAttempts: 0, lastPracticed: null },
  algebra:    { skillId: 'algebra',    masteryLevel: 0, xpInSkill: 0, totalCorrect: 0, totalAttempts: 0, lastPracticed: null },
}

const DEFAULT_MISSIONS: Mission[] = [
  { id: 'daily-5',    title: 'Quick Start',    description: 'Answer 5 questions',        icon: '⚡', targetValue: 5, currentProgress: 0, rewardXp: 30, completed: false, claimed: false },
  { id: 'daily-acc',  title: 'Sharp Mind',     description: 'Get 3 correct in a row',    icon: '🎯', targetValue: 3, currentProgress: 0, rewardXp: 50, completed: false, claimed: false },
  { id: 'daily-skill',title: 'Skill Explorer', description: 'Practice 2 different skills',icon: '🗺️', targetValue: 2, currentProgress: 0, rewardXp: 40, completed: false, claimed: false },
]

interface GameStore extends GameState {
  setDisplayName: (name: string) => void
  recordAnswer: (skillId: SkillId, correct: boolean) => void
  completePlacement: (level: number) => void
  checkStreak: () => void
  resetSession: () => void
  completeSession: () => void
  claimMission: (missionId: string) => void
  resetMissionsIfNewDay: () => void
  dismissAchievement: () => void
  dismissLevelUp: () => void
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      displayName: 'Learner',
      totalXp: 0,
      level: 1,
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: null,
      placementDone: false,
      placementLevel: 2,
      skills: DEFAULT_SKILLS,
      missions: DEFAULT_MISSIONS,
      lastMissionReset: null,
      sessionQuestionsAnswered: 0,
      sessionCorrect: 0,
      sessionsCompleted: 0,
      unlockedAchievements: [],
      newAchievements: [],
      showLevelUp: false,
      previousLevel: 1,

      setDisplayName: (name) => set({ displayName: name }),

      completePlacement: (level) => {
        set({ placementDone: true, placementLevel: level })
        // trigger achievement check
        get().recordAnswer('arithmetic', true)
      },

      recordAnswer: (skillId, correct) => {
        const state = get()
        const skill = state.skills[skillId]
        const newAttempts = skill.totalAttempts + 1
        const newCorrect = skill.totalCorrect + (correct ? 1 : 0)

        const accuracy = newCorrect / newAttempts
        const masteryLevel = Math.min(5, Math.floor(accuracy * 5 * Math.min(1, newAttempts / 5)))

        const sessionCorrect = state.sessionCorrect + (correct ? 1 : 0)
        const sessionAnswered = state.sessionQuestionsAnswered + 1

        // XP
        const xpGain = correct ? 15 : 3
        const newTotalXp = state.totalXp + xpGain
        const newLevel = levelFromXp(newTotalXp)
        const leveledUp = newLevel > state.level

        // Missions
        const missions = state.missions.map((m) => {
          if (m.claimed) return m
          let progress = m.currentProgress
          if (m.id === 'daily-5') progress = Math.min(m.targetValue, sessionAnswered)
          if (m.id === 'daily-acc') progress = correct ? Math.min(m.targetValue, progress + 1) : 0
          if (m.id === 'daily-skill') {
            const practiced = new Set(Object.values(state.skills).filter(s => s.totalAttempts > 0).map(s => s.skillId))
            if (correct) practiced.add(skillId)
            progress = Math.min(m.targetValue, practiced.size)
          }
          return { ...m, currentProgress: progress, completed: progress >= m.targetValue }
        })

        // Updated skills
        const updatedSkills = {
          ...state.skills,
          [skillId]: { ...skill, totalAttempts: newAttempts, totalCorrect: newCorrect, masteryLevel, xpInSkill: skill.xpInSkill + xpGain, lastPracticed: new Date().toISOString() },
        }

        // Achievement check
        const skillsMastered = Object.values(updatedSkills).filter(s => s.masteryLevel >= 3).length
        const stats = {
          totalXp: newTotalXp, level: newLevel,
          currentStreak: state.currentStreak, longestStreak: state.longestStreak,
          totalCorrect: Object.values(updatedSkills).reduce((s, x) => s + x.totalCorrect, 0),
          totalAttempts: Object.values(updatedSkills).reduce((s, x) => s + x.totalAttempts, 0),
          skillsMastered, placementDone: state.placementDone,
          sessionCorrect, sessionsCompleted: state.sessionsCompleted,
        }
        const newlyUnlocked = checkNewAchievements(stats, state.unlockedAchievements.map(a => a.id))

        set({
          totalXp: newTotalXp, level: newLevel,
          sessionCorrect, sessionQuestionsAnswered: sessionAnswered,
          missions, skills: updatedSkills,
          showLevelUp: leveledUp,
          previousLevel: leveledUp ? state.level : state.previousLevel,
          unlockedAchievements: [
            ...state.unlockedAchievements,
            ...newlyUnlocked.map(a => ({ id: a.id, unlockedAt: new Date().toISOString() })),
          ],
          newAchievements: [...state.newAchievements, ...newlyUnlocked],
        })
      },

      checkStreak: () => {
        const { lastActiveDate, currentStreak, longestStreak } = get()
        const today = new Date().toDateString()
        if (lastActiveDate === today) return
        const yesterday = new Date(Date.now() - 86400000).toDateString()
        const newStreak = lastActiveDate === yesterday ? currentStreak + 1 : 1
        set({ currentStreak: newStreak, longestStreak: Math.max(longestStreak, newStreak), lastActiveDate: today })
      },

      resetSession: () => set({ sessionQuestionsAnswered: 0, sessionCorrect: 0 }),

      completeSession: () => set((s) => ({ sessionsCompleted: s.sessionsCompleted + 1 })),

      claimMission: (missionId) => {
        const { missions, totalXp } = get()
        const mission = missions.find(m => m.id === missionId)
        if (!mission || !mission.completed || mission.claimed) return
        const newXp = totalXp + mission.rewardXp
        set({
          totalXp: newXp, level: levelFromXp(newXp),
          missions: missions.map(m => m.id === missionId ? { ...m, claimed: true } : m),
        })
      },

      resetMissionsIfNewDay: () => {
        const { lastMissionReset } = get()
        const today = new Date().toDateString()
        if (lastMissionReset === today) return
        set({ missions: DEFAULT_MISSIONS.map(m => ({ ...m, currentProgress: 0, completed: false, claimed: false })), lastMissionReset: today, sessionQuestionsAnswered: 0, sessionCorrect: 0 })
      },

      dismissAchievement: () => set(s => ({ newAchievements: s.newAchievements.slice(1) })),

      dismissLevelUp: () => set({ showLevelUp: false }),
    }),
    { name: 'mathquest-game-v2' }
  )
)
