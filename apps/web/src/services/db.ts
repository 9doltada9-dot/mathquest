'use client'

// ============================================================
// Supabase DB Service — Read/Write game data
// ============================================================

import { supabase } from './supabase'
import type { SkillId } from '@/store/gameStore'

const SCHEMA = 'mathquest'
const t = (table: string) => `${SCHEMA}.${table}`

// ── Profile ───────────────────────────────────────────────────
export async function loadProfile(userId: string) {
  const { data } = await supabase
    .from(t('child_profiles'))
    .select('*')
    .eq('user_id', userId)
    .single()
  return data
}

export async function upsertProfile(userId: string, profile: {
  display_name: string
  current_level: number
  xp: number
}) {
  const { error } = await supabase
    .from(t('child_profiles'))
    .upsert({ user_id: userId, ...profile }, { onConflict: 'user_id' })
  if (error) console.warn('upsertProfile:', error.message)
}

// ── Skill Mastery ─────────────────────────────────────────────
export async function loadSkillMastery(userId: string) {
  const { data } = await supabase
    .from(t('skill_mastery'))
    .select('*')
    .eq('child_id', userId)
  return data ?? []
}

export async function upsertSkillMastery(userId: string, skillId: SkillId, mastery: {
  mastery_level: number
  confidence_score: number
}) {
  const { error } = await supabase
    .from(t('skill_mastery'))
    .upsert({
      child_id: userId,
      skill_id: skillId,
      ...mastery,
      last_reviewed_at: new Date().toISOString(),
    }, { onConflict: 'child_id,skill_id' })
  if (error) console.warn('upsertSkillMastery:', error.message)
}

// ── Achievements ──────────────────────────────────────────────
export async function loadAchievements(userId: string) {
  const { data } = await supabase
    .from(t('student_achievements'))
    .select('achievement_id, unlocked_at')
    .eq('child_id', userId)
  return data ?? []
}

export async function saveAchievement(userId: string, achievementId: string) {
  const { error } = await supabase
    .from(t('student_achievements'))
    .upsert({
      child_id: userId,
      achievement_id: achievementId,
      unlocked_at: new Date().toISOString(),
    }, { onConflict: 'child_id,achievement_id' })
  if (error) console.warn('saveAchievement:', error.message)
}

// ── Streaks ───────────────────────────────────────────────────
export async function loadStreak(userId: string) {
  const { data } = await supabase
    .from(t('streaks'))
    .select('*')
    .eq('child_id', userId)
    .single()
  return data
}

export async function upsertStreak(userId: string, streak: {
  current_streak: number
  longest_streak: number
  last_activity_date: string
}) {
  const { error } = await supabase
    .from(t('streaks'))
    .upsert({ child_id: userId, ...streak }, { onConflict: 'child_id' })
  if (error) console.warn('upsertStreak:', error.message)
}

// ── Quiz Session ──────────────────────────────────────────────
export async function saveQuizSession(userId: string, session: {
  total_questions: number
  correct_answers: number
  xp_earned: number
  session_type: string
  fatigue_score?: number
}) {
  const { data, error } = await supabase
    .from(t('quiz_sessions'))
    .insert({
      child_id: userId,
      started_at: new Date().toISOString(),
      ended_at: new Date().toISOString(),
      total_xp: session.xp_earned,
      fatigue_score: session.fatigue_score ?? 0,
      session_type: session.session_type,
    })
    .select('id')
    .single()
  if (error) console.warn('saveQuizSession:', error.message)
  return data?.id ?? null
}

// ── XP Log ───────────────────────────────────────────────────
export async function logXp(userId: string, amount: number, source: string) {
  const { error } = await supabase
    .from(t('xp_logs'))
    .insert({ child_id: userId, amount, source })
  if (error) console.warn('logXp:', error.message)
}
