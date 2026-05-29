'use client'

import { useEffect } from 'react'
import { useGameStore, levelFromXp, xpProgressPercent, xpForLevel } from '@/store/gameStore'
import { SKILL_CONFIG } from '@/features/quiz/engine'
import type { SkillTag } from '@/features/placement-test/questions'

export default function DashboardPage() {
  const {
    displayName, totalXp, level, currentStreak,
    skills, missions, sessionQuestionsAnswered, sessionCorrect,
    placementDone, resetMissionsIfNewDay, checkStreak, claimMission,
  } = useGameStore()

  useEffect(() => { resetMissionsIfNewDay(); checkStreak() }, [resetMissionsIfNewDay, checkStreak])

  const xpPercent = xpProgressPercent(totalXp)
  const nextLevelXp = xpForLevel(level + 1)
  const currentLevelXp = xpForLevel(level)
  const xpInLevel = totalXp - currentLevelXp
  const xpNeeded = nextLevelXp - currentLevelXp
  const skillList = Object.entries(SKILL_CONFIG) as [SkillTag, typeof SKILL_CONFIG[SkillTag]][]

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', fontFamily: 'Nunito, sans-serif' }}>
      <header style={{
        background: 'white', borderBottom: '1px solid #F3F4F6',
        padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 22 }}>🧮</span>
          <span style={{ fontWeight: 900, color: '#6366F1', fontSize: 17 }}>MathQuest</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {currentStreak > 0 && (
            <span style={{ background: '#FEF3C7', color: '#92400E', padding: '4px 10px', borderRadius: 999, fontSize: 12, fontWeight: 800 }}>
              🔥 {currentStreak}
            </span>
          )}
          <span style={{ background: '#EEF2FF', color: '#6366F1', padding: '4px 10px', borderRadius: 999, fontSize: 12, fontWeight: 800 }}>
            ⭐ {totalXp} XP
          </span>
        </div>
      </header>

      <main style={{ maxWidth: 480, margin: '0 auto', padding: '20px 16px 100px' }}>

        <div style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', borderRadius: 22, padding: '20px', marginBottom: 16, color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontSize: 13, opacity: 0.75, margin: '0 0 2px' }}>Welcome back!</p>
              <h1 style={{ fontSize: 22, fontWeight: 900, margin: '0 0 12px' }}>{displayName} 👋</h1>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 14, padding: '8px 14px', textAlign: 'center' }}>
              <div style={{ fontSize: 11, opacity: 0.8 }}>LEVEL</div>
              <div style={{ fontSize: 26, fontWeight: 900, lineHeight: 1 }}>{level}</div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 12, opacity: 0.8 }}>{xpInLevel} / {xpNeeded} XP to Lv.{level + 1}</span>
            <span style={{ fontSize: 12, opacity: 0.8 }}>{xpPercent}%</span>
          </div>
          <div style={{ height: 8, background: 'rgba(255,255,255,0.25)', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{ height: '100%', background: 'white', width: `${xpPercent}%`, borderRadius: 999, transition: 'width 0.6s ease' }} />
          </div>
        </div>

        {!placementDone && (
          <a href="/mathquest/placement-test/" style={{
            display: 'flex', alignItems: 'center', gap: 12,
            background: '#FEF3C7', borderRadius: 18, padding: '16px', marginBottom: 16,
            textDecoration: 'none', border: '1.5px solid #FCD34D',
          }}>
            <span style={{ fontSize: 28 }}>🗺️</span>
            <div>
              <p style={{ fontWeight: 800, color: '#78350F', margin: '0 0 2px', fontSize: 14 }}>Take Placement Test</p>
              <p style={{ fontSize: 12, color: '#92400E', margin: 0 }}>Find your true level and unlock your path!</p>
            </div>
            <span style={{ marginLeft: 'auto', color: '#92400E', fontSize: 18 }}>→</span>
          </a>
        )}

        {sessionQuestionsAnswered > 0 && (
          <div style={{ background: 'white', borderRadius: 18, padding: '16px', marginBottom: 16, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            {[
              { label: "Today's Q", value: sessionQuestionsAnswered, color: '#6366F1', bg: '#EEF2FF' },
              { label: 'Correct',   value: sessionCorrect,           color: '#059669', bg: '#D1FAE5' },
              { label: 'Streak',    value: `🔥${currentStreak}`,     color: '#D97706', bg: '#FEF3C7' },
            ].map((s) => (
              <div key={s.label} style={{ background: s.bg, borderRadius: 14, padding: '10px 8px', textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 900, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 10, color: '#6B7280', fontWeight: 700 }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}

        <a href="/mathquest/quiz/" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          background: '#6366F1', color: 'white', borderRadius: 18, padding: '18px',
          marginBottom: 20, textDecoration: 'none', fontWeight: 900, fontSize: 17,
          boxShadow: '0 4px 16px rgba(99,102,241,0.4)',
        }}>
          🎮 Start Practice
        </a>

        <section style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 15, fontWeight: 900, color: '#374151', margin: '0 0 12px' }}>Daily Missions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {missions.map((m) => {
              const pct = Math.min(100, Math.round((m.currentProgress / m.targetValue) * 100))
              return (
                <div key={m.id} style={{ background: 'white', borderRadius: 16, padding: '14px 16px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', opacity: m.completed ? 0.75 : 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 26 }}>{m.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 800, fontSize: 13, color: '#1F2937' }}>{m.completed ? 'Done! ' : ''}{m.title}</span>
                        <span style={{ background: '#FEF3C7', color: '#92400E', padding: '2px 8px', borderRadius: 999, fontSize: 11, fontWeight: 700 }}>+{m.rewardXp} XP</span>
                      </div>
                      <p style={{ fontSize: 11, color: '#9CA3AF', margin: '2px 0 6px' }}>{m.description}</p>
                      <div style={{ height: 5, background: '#F3F4F6', borderRadius: 999, overflow: 'hidden' }}>
                        <div style={{ height: '100%', background: m.completed ? '#10B981' : '#6366F1', width: `${pct}%`, borderRadius: 999, transition: 'width 0.4s ease' }} />
                      </div>
                      <span style={{ fontSize: 10, color: '#9CA3AF', marginTop: 3, display: 'block' }}>{m.currentProgress}/{m.targetValue}</span>
                    </div>
                    {m.completed && (
                      <button onClick={() => claimMission(m.id)} style={{
                        background: '#10B981', color: 'white', border: 'none', borderRadius: 10,
                        padding: '6px 12px', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'Nunito, sans-serif',
                      }}>Claim!</button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: 15, fontWeight: 900, color: '#374151', margin: '0 0 12px' }}>Your Skills</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {skillList.map(([id, cfg]) => {
              const prog = skills[id]
              const accuracy = prog.totalAttempts > 0 ? Math.round((prog.totalCorrect / prog.totalAttempts) * 100) : 0
              const labels = ['Locked','Beginner','Developing','Stable','Confident','Mastered']
              return (
                <a key={id} href="/mathquest/quiz/" style={{
                  background: cfg.color, borderRadius: 18, padding: '16px', textDecoration: 'none', display: 'block',
                  border: `1.5px solid ${prog.masteryLevel > 0 ? cfg.accent + '40' : 'transparent'}`,
                }}>
                  <div style={{ fontSize: 28, marginBottom: 6 }}>{cfg.emoji}</div>
                  <p style={{ fontWeight: 900, fontSize: 13, color: cfg.accent, margin: '0 0 2px' }}>{cfg.label}</p>
                  <p style={{ fontSize: 11, color: '#6B7280', margin: '0 0 8px' }}>
                    {labels[prog.masteryLevel]}{prog.totalAttempts > 0 ? ` · ${accuracy}%` : ''}
                  </p>
                  <div style={{ height: 5, background: 'rgba(255,255,255,0.6)', borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: cfg.accent, width: `${(prog.masteryLevel / 5) * 100}%`, borderRadius: 999 }} />
                  </div>
                </a>
              )
            })}
          </div>
        </section>
      </main>

      <nav style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, background: 'white',
        borderTop: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-around',
        padding: '8px 0 20px', zIndex: 50,
      }}>
        {[
          { icon: '🏠', label: 'Home',  href: '/mathquest/dashboard/' },
          { icon: '🎮', label: 'Play',  href: '/mathquest/quiz/' },
          { icon: '🗺️', label: 'Test',  href: '/mathquest/placement-test/' },
          { icon: '👤', label: 'Profile', href: '#' },
        ].map((item) => (
          <a key={item.label} href={item.href} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 2, textDecoration: 'none', color: '#9CA3AF', minWidth: 48,
          }}>
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            <span style={{ fontSize: 10, fontWeight: 700 }}>{item.label}</span>
          </a>
        ))}
      </nav>
    </div>
  )
}
