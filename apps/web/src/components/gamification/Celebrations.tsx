'use client'

import { useEffect, useState } from 'react'
import { useGameStore } from '@/store/gameStore'

// ── Level Up Modal ─────────────────────────────────────────────
export function LevelUpModal() {
  const { showLevelUp, level, previousLevel, dismissLevelUp } = useGameStore()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (showLevelUp) {
      setVisible(true)
      const t = setTimeout(() => { setVisible(false); dismissLevelUp() }, 4000)
      return () => clearTimeout(t)
    }
  }, [showLevelUp, dismissLevelUp])

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.5)',
      animation: 'fadeIn 0.3s ease',
    }} onClick={() => { setVisible(false); dismissLevelUp() }}>
      <div style={{
        background: 'white', borderRadius: 28, padding: '36px 32px',
        textAlign: 'center', maxWidth: 320, width: '90%',
        animation: 'popIn 0.4s cubic-bezier(0.34,1.56,0.64,1)',
        boxShadow: '0 20px 60px rgba(99,102,241,0.3)',
      }}>
        <div style={{ fontSize: 64, marginBottom: 8 }}>🎉</div>
        <p style={{ fontSize: 13, color: '#9CA3AF', margin: '0 0 4px', fontFamily: 'Nunito, sans-serif' }}>
          LEVEL UP!
        </p>
        <h2 style={{
          fontSize: 48, fontWeight: 900, fontFamily: 'Nunito, sans-serif',
          background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          margin: '0 0 8px',
        }}>
          {previousLevel} → {level}
        </h2>
        <p style={{ fontSize: 15, color: '#6B7280', fontFamily: 'Nunito, sans-serif', margin: 0 }}>
          You reached Level {level}!<br />Keep going! 🚀
        </p>
        <div style={{
          marginTop: 20, height: 4, background: '#E5E7EB',
          borderRadius: 999, overflow: 'hidden',
        }}>
          <div style={{
            height: '100%', background: 'linear-gradient(90deg, #6366F1, #8B5CF6)',
            animation: 'drain 4s linear forwards', borderRadius: 999,
          }} />
        </div>
      </div>
      <style>{`
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes popIn { from{transform:scale(0.7);opacity:0} to{transform:scale(1);opacity:1} }
        @keyframes drain { from{width:100%} to{width:0%} }
      `}</style>
    </div>
  )
}

// ── Achievement Toast ──────────────────────────────────────────
export function AchievementToast() {
  const { newAchievements, dismissAchievement } = useGameStore()
  const [show, setShow] = useState(false)

  const current = newAchievements[0]

  useEffect(() => {
    if (current) {
      setShow(true)
      const t = setTimeout(() => { setShow(false); setTimeout(dismissAchievement, 300) }, 3500)
      return () => clearTimeout(t)
    }
  }, [current, dismissAchievement])

  if (!current || !show) return null

  return (
    <div style={{
      position: 'fixed', bottom: 90, left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 199, maxWidth: 340, width: '90%',
      animation: show ? 'slideUp 0.4s cubic-bezier(0.34,1.56,0.64,1)' : 'slideDown 0.3s ease',
    }}>
      <div style={{
        background: current.color, borderRadius: 18,
        padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14,
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
        border: '1px solid rgba(255,255,255,0.6)',
      }}>
        <div style={{
          fontSize: 32, width: 52, height: 52,
          background: 'rgba(255,255,255,0.6)', borderRadius: 14,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          {current.icon}
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#6B7280', margin: '0 0 2px', fontFamily: 'Nunito, sans-serif' }}>
            ACHIEVEMENT UNLOCKED
          </p>
          <p style={{ fontSize: 15, fontWeight: 900, color: '#1F2937', margin: '0 0 1px', fontFamily: 'Nunito, sans-serif' }}>
            {current.icon} {current.title}
          </p>
          <p style={{ fontSize: 12, color: '#6B7280', margin: '0 0 3px', fontFamily: 'Nunito, sans-serif' }}>
            {current.description}
          </p>
          <span style={{
            background: '#FEF3C7', color: '#92400E',
            padding: '2px 8px', borderRadius: 999,
            fontSize: 11, fontWeight: 800, fontFamily: 'Nunito, sans-serif',
          }}>
            +{current.xpReward} XP
          </span>
        </div>
      </div>
      <style>{`
        @keyframes slideUp { from{transform:translateX(-50%) translateY(80px);opacity:0} to{transform:translateX(-50%) translateY(0);opacity:1} }
        @keyframes slideDown { from{transform:translateX(-50%) translateY(0);opacity:1} to{transform:translateX(-50%) translateY(80px);opacity:0} }
      `}</style>
    </div>
  )
}
