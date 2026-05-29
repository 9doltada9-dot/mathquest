'use client'

import { useEffect } from 'react'
import { useGameStore, xpProgressPercent, xpForLevel } from '@/store/gameStore'
import { ACHIEVEMENTS } from '@/features/gamification/achievements'
import { SKILL_CONFIG } from '@/features/quiz/engine'
import type { SkillTag } from '@/features/placement-test/questions'

export default function ProfilePage() {
  const {
    displayName, totalXp, level, currentStreak, longestStreak,
    skills, unlockedAchievements, sessionsCompleted,
    checkStreak, resetMissionsIfNewDay,
  } = useGameStore()

  useEffect(() => { checkStreak(); resetMissionsIfNewDay() }, [checkStreak, resetMissionsIfNewDay])

  const xpPercent = xpProgressPercent(totalXp)
  const nextLevelXp = xpForLevel(level + 1)
  const currentLevelXp = xpForLevel(level)
  const xpInLevel = totalXp - currentLevelXp
  const xpNeeded = nextLevelXp - currentLevelXp

  const totalAttempts = Object.values(skills).reduce((s, x) => s + x.totalAttempts, 0)
  const totalCorrect = Object.values(skills).reduce((s, x) => s + x.totalCorrect, 0)
  const accuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0

  const unlockedSet = new Set(unlockedAchievements.map(a => a.id))
  const skillList = Object.entries(SKILL_CONFIG) as [SkillTag, typeof SKILL_CONFIG[SkillTag]][]

  const avatarEmojis = ['🧑‍🚀', '🦸', '🧙', '🐉', '🦁', '🐯', '🦊', '🐼']
  const avatar = avatarEmojis[level % avatarEmojis.length]

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', fontFamily: 'Nunito, sans-serif' }}>
      {/* Header */}
      <header style={{
        background: 'white', borderBottom: '1px solid #F3F4F6',
        padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 12,
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <a href="/mathquest/dashboard/" style={{ color: '#6B7280', textDecoration: 'none', fontWeight: 700, fontSize: 18 }}>←</a>
        <span style={{ fontWeight: 900, color: '#1F2937', fontSize: 17 }}>Profile</span>
      </header>

      <main style={{ maxWidth: 480, margin: '0 auto', padding: '20px 16px 100px' }}>

        {/* Avatar + name */}
        <div style={{
          background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
          borderRadius: 24, padding: '28px 24px', textAlign: 'center',
          marginBottom: 16, color: 'white',
        }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 40, margin: '0 auto 12px',
          }}>
            {avatar}
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 900, margin: '0 0 4px' }}>{displayName}</h1>
          <p style={{ fontSize: 13, opacity: 0.8, margin: '0 0 16px' }}>
            Level {level} Math Adventurer
          </p>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
            {unlockedAchievements.slice(-3).map(a => {
              const ach = ACHIEVEMENTS.find(x => x.id === a.id)
              return ach ? (
                <span key={a.id} style={{
                  background: 'rgba(255,255,255,0.2)', borderRadius: 10,
                  padding: '4px 10px', fontSize: 16,
                }}>{ach.icon}</span>
              ) : null
            })}
          </div>
        </div>

        {/* Level progress */}
        <div style={{ background: 'white', borderRadius: 20, padding: '18px', marginBottom: 14, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontWeight: 800, fontSize: 15, color: '#1F2937' }}>Level {level}</span>
            <span style={{ fontSize: 13, color: '#6B7280' }}>{xpInLevel} / {xpNeeded} XP</span>
          </div>
          <div style={{ height: 10, background: '#F3F4F6', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{ height: '100%', background: 'linear-gradient(90deg, #6366F1, #8B5CF6)', width: `${xpPercent}%`, borderRadius: 999, transition: 'width 0.6s ease' }} />
          </div>
          <p style={{ fontSize: 12, color: '#9CA3AF', margin: '6px 0 0', textAlign: 'right' }}>
            {xpPercent}% to Level {level + 1}
          </p>
        </div>

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
          {[
            { label: 'Total XP',   value: totalXp.toLocaleString(), icon: '⭐', color: '#FEF3C7', accent: '#D97706' },
            { label: 'Accuracy',   value: `${accuracy}%`,           icon: '🎯', color: '#D1FAE5', accent: '#059669' },
            { label: 'Best Streak',value: `${longestStreak} days`,  icon: '🔥', color: '#FFE4E6', accent: '#DC2626' },
            { label: 'Sessions',   value: sessionsCompleted,         icon: '📚', color: '#EDE9FE', accent: '#7C3AED' },
          ].map((s) => (
            <div key={s.label} style={{ background: s.color, borderRadius: 16, padding: '14px' }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: s.accent }}>{s.value}</div>
              <div style={{ fontSize: 11, color: '#6B7280', fontWeight: 700 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Skill progress */}
        <div style={{ background: 'white', borderRadius: 20, padding: '18px', marginBottom: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 900, color: '#374151', margin: '0 0 14px' }}>Skill Progress</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {skillList.map(([id, cfg]) => {
              const prog = skills[id]
              const acc = prog.totalAttempts > 0 ? Math.round((prog.totalCorrect / prog.totalAttempts) * 100) : 0
              const labels = ['Locked','Beginner','Developing','Stable','Confident','Mastered']
              return (
                <div key={id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#374151' }}>
                      {cfg.emoji} {cfg.label}
                    </span>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      {prog.totalAttempts > 0 && (
                        <span style={{ fontSize: 11, color: '#9CA3AF' }}>{acc}%</span>
                      )}
                      <span style={{
                        background: cfg.color, color: cfg.accent,
                        padding: '2px 8px', borderRadius: 999, fontSize: 11, fontWeight: 700,
                      }}>
                        {labels[prog.masteryLevel]}
                      </span>
                    </div>
                  </div>
                  <div style={{ height: 8, background: '#F3F4F6', borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: cfg.accent, width: `${(prog.masteryLevel / 5) * 100}%`, borderRadius: 999, transition: 'width 0.5s ease' }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Achievements */}
        <div style={{ background: 'white', borderRadius: 20, padding: '18px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h3 style={{ fontSize: 15, fontWeight: 900, color: '#374151', margin: 0 }}>Achievements</h3>
            <span style={{ fontSize: 12, color: '#9CA3AF', fontWeight: 700 }}>
              {unlockedAchievements.length}/{ACHIEVEMENTS.length}
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {ACHIEVEMENTS.map((a) => {
              const unlocked = unlockedSet.has(a.id)
              return (
                <div key={a.id} title={`${a.title}: ${a.description}`} style={{
                  background: unlocked ? a.color : '#F9FAFB',
                  borderRadius: 14, padding: '10px 6px',
                  textAlign: 'center',
                  border: unlocked ? 'none' : '1.5px dashed #E5E7EB',
                  opacity: unlocked ? 1 : 0.5,
                }}>
                  <div style={{ fontSize: 22, filter: unlocked ? 'none' : 'grayscale(1)' }}>{a.icon}</div>
                  <p style={{ fontSize: 9, fontWeight: 700, color: unlocked ? '#374151' : '#9CA3AF', margin: '4px 0 0', lineHeight: 1.2 }}>
                    {a.title}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </main>

      {/* Bottom nav */}
      <nav style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, background: 'white',
        borderTop: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-around',
        padding: '8px 0 20px', zIndex: 50,
      }}>
        {[
          { icon: '🏠', label: 'Home',   href: '/mathquest/dashboard/' },
          { icon: '🎮', label: 'Play',   href: '/mathquest/quiz/' },
          { icon: '🗺️', label: 'Test',   href: '/mathquest/placement-test/' },
          { icon: '👤', label: 'Profile',href: '/mathquest/profile/' },
        ].map((item) => (
          <a key={item.label} href={item.href} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 2, textDecoration: 'none',
            color: item.label === 'Profile' ? '#6366F1' : '#9CA3AF', minWidth: 48,
          }}>
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            <span style={{ fontSize: 10, fontWeight: 700 }}>{item.label}</span>
          </a>
        ))}
      </nav>
    </div>
  )
}
