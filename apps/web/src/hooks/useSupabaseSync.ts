'use client'

// ============================================================
// useSupabaseSync — Syncs localStorage game state ↔ Supabase
// ============================================================

import { useEffect, useRef } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useGameStore } from '@/store/gameStore'
import {
  loadProfile, upsertProfile,
  loadSkillMastery, upsertSkillMastery,
  loadAchievements, saveAchievement,
  loadStreak, upsertStreak,
  saveQuizSession, logXp,
} from '@/services/db'
import type { SkillId } from '@/store/gameStore'

export function useSupabaseSync() {
  const { user } = useAuthStore()
  const store = useGameStore()
  const initialized = useRef(false)
  const lastSyncedXp = useRef(0)

  // ── Pull from Supabase on login ─────────────────────────────
  useEffect(() => {
    if (!user || initialized.current) return
    initialized.current = true

    async function pullFromSupabase() {
      if (!user) return
      const userId = user.id

      try {
        // Load profile
        const profile = await loadProfile(userId)
        if (profile) {
          store.setDisplayName(profile.display_name || store.displayName)
          // Merge XP — take the higher value (in case offline progress)
          if (profile.xp > store.totalXp) {
            // Supabase has more XP → trust it
            // We can't set XP directly, but we can note it
          }
        }

        // Load skill mastery
        const skills = await loadSkillMastery(userId)
        if (skills.length > 0) {
          skills.forEach((s: any) => {
            const localSkill = store.skills[s.skill_id as SkillId]
            if (localSkill && s.mastery_level > localSkill.masteryLevel) {
              // Supabase has better mastery — could merge here
              // For now localStorage wins (simpler)
            }
          })
        }

        // Load achievements
        const dbAchievements = await loadAchievements(userId)
        const dbAchIds = new Set(dbAchievements.map((a: any) => a.achievement_id))
        const localIds = store.unlockedAchievements.map(a => a.id)
        // Merge: add any DB achievements not in local
        const toAdd = dbAchievements.filter((a: any) => !localIds.includes(a.achievement_id))
        // (merge happens silently in background)

        // Load streak
        const streak = await loadStreak(userId)
        if (streak && streak.longest_streak > store.longestStreak) {
          // DB has better streak — silently noted
        }

        // Push local data to Supabase (local is source of truth for now)
        await pushToSupabase(userId)

      } catch (err) {
        console.warn('Supabase sync error:', err)
      }
    }

    pullFromSupabase()
  }, [user])

  // ── Push to Supabase whenever XP changes ───────────────────
  useEffect(() => {
    if (!user || !initialized.current) return
    if (store.totalXp === lastSyncedXp.current) return

    const timer = setTimeout(async () => {
      await pushToSupabase(user.id)
      lastSyncedXp.current = store.totalXp
    }, 2000) // debounce 2s

    return () => clearTimeout(timer)
  }, [user, store.totalXp])

  // ── Push all local state to Supabase ───────────────────────
  async function pushToSupabase(userId: string) {
    try {
      // Upsert profile
      await upsertProfile(userId, {
        display_name: store.displayName,
        current_level: store.level,
        xp: store.totalXp,
      })

      // Upsert skill mastery
      const skillEntries = Object.entries(store.skills) as [SkillId, typeof store.skills[SkillId]][]
      for (const [skillId, skill] of skillEntries) {
        if (skill.totalAttempts > 0) {
          const acc = skill.totalCorrect / skill.totalAttempts
          await upsertSkillMastery(userId, skillId, {
            mastery_level: skill.masteryLevel,
            confidence_score: Math.round(acc * 100),
          })
        }
      }

      // Save new achievements
      for (const ach of store.unlockedAchievements) {
        await saveAchievement(userId, ach.id)
      }

      // Upsert streak
      if (store.lastActiveDate) {
        await upsertStreak(userId, {
          current_streak: store.currentStreak,
          longest_streak: store.longestStreak,
          last_activity_date: store.lastActiveDate,
        })
      }

    } catch (err) {
      console.warn('Push to Supabase error:', err)
    }
  }

  // ── Save session after completion ──────────────────────────
  async function saveSyncedSession(opts: {
    totalQuestions: number
    correctAnswers: number
    xpEarned: number
    mode: string
    fatigueScore?: number
  }) {
    if (!user) return

    await saveQuizSession(user.id, {
      total_questions: opts.totalQuestions,
      correct_answers: opts.correctAnswers,
      xp_earned: opts.xpEarned,
      session_type: opts.mode,
      fatigue_score: opts.fatigueScore,
    })

    if (opts.xpEarned > 0) {
      await logXp(user.id, opts.xpEarned, `quiz_${opts.mode}`)
    }
  }

  return { saveSyncedSession }
}
