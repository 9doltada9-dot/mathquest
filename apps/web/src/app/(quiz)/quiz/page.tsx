'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useGameStore } from '@/store/gameStore'
import { buildSession, calcXpGain, SKILL_CONFIG } from '@/features/quiz/engine'
import { analyzeFatigue, FATIGUE_COLORS, FATIGUE_LABELS } from '@/features/quiz/fatigue'
import type { QuizSessionQuestion } from '@/features/quiz/engine'
import type { SkillTag } from '@/features/placement-test/questions'
import type { FatigueSignal } from '@/features/quiz/fatigue'

type Screen = 'mode-select' | 'skill-select' | 'question' | 'feedback' | 'break' | 'summary'
type Mode = 'daily' | 'practice' | 'review' | 'challenge'

const S = {
  page: { minHeight: '100vh', background: 'linear-gradient(160deg,#EEF2FF 0%,#fff 55%,#F5F3FF 100%)', fontFamily: 'Nunito, sans-serif', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', padding: '16px 16px 40px' },
  card: { background: 'white', borderRadius: 24, padding: '24px 20px', width: '100%', maxWidth: 440, boxShadow: '0 4px 20px rgba(99,102,241,0.09)' },
}

// ── Mode Select ───────────────────────────────────────────────
function ModeSelect({ onSelect }: { onSelect: (mode: Mode) => void }) {
  const modes = [
    { id: 'daily' as Mode,     icon: '☀️', title: 'Daily Practice',  desc: 'Smart mix based on your weak spots',  color: '#FEF3C7', accent: '#D97706' },
    { id: 'practice' as Mode,  icon: '📚', title: 'Skill Practice',  desc: 'Focus on one skill at a time',         color: '#DBEAFE', accent: '#3B82F6' },
    { id: 'review' as Mode,    icon: '🔄', title: 'Review Mode',     desc: 'Revisit skills you\'re learning',     color: '#D1FAE5', accent: '#059669' },
    { id: 'challenge' as Mode, icon: '🏆', title: 'Challenge Mode',  desc: 'Hard questions for the brave!',        color: '#EDE9FE', accent: '#7C3AED' },
  ]

  return (
    <div style={S.page}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        <a href="/mathquest/dashboard/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#6B7280', fontSize: 14, fontWeight: 700, textDecoration: 'none', marginBottom: 20 }}>← Back</a>
        <h1 style={{ fontSize: 22, fontWeight: 900, color: '#1F2937', margin: '0 0 4px' }}>Choose Mode 🎮</h1>
        <p style={{ color: '#9CA3AF', fontSize: 14, margin: '0 0 20px' }}>How do you want to practice today?</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {modes.map((m) => (
            <button key={m.id} onClick={() => onSelect(m.id)} style={{
              background: m.color, border: 'none', borderRadius: 18,
              padding: '18px 20px', cursor: 'pointer', textAlign: 'left',
              display: 'flex', alignItems: 'center', gap: 16, width: '100%',
              fontFamily: 'Nunito, sans-serif', transition: 'transform 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.02)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
              <span style={{ fontSize: 32 }}>{m.icon}</span>
              <div>
                <p style={{ fontWeight: 900, fontSize: 16, color: m.accent, margin: '0 0 2px' }}>{m.title}</p>
                <p style={{ fontSize: 13, color: '#6B7280', margin: 0 }}>{m.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Skill Select ──────────────────────────────────────────────
function SkillSelect({ onSelect, onBack }: { onSelect: (skill: SkillTag) => void; onBack: () => void }) {
  const { skills } = useGameStore()
  return (
    <div style={S.page}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', fontSize: 14, fontWeight: 700, marginBottom: 20, padding: 0, fontFamily: 'Nunito, sans-serif' }}>← Back</button>
        <h1 style={{ fontSize: 22, fontWeight: 900, color: '#1F2937', margin: '0 0 20px' }}>Choose Skill 📚</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {(Object.entries(SKILL_CONFIG) as [SkillTag, typeof SKILL_CONFIG[SkillTag]][]).map(([id, cfg]) => {
            const prog = skills[id]
            const acc = prog.totalAttempts > 0 ? Math.round((prog.totalCorrect / prog.totalAttempts) * 100) : 0
            return (
              <button key={id} onClick={() => onSelect(id)} style={{
                background: 'white', border: '1.5px solid #F3F4F6', borderRadius: 18,
                padding: '16px', cursor: 'pointer', textAlign: 'left', width: '100%',
                fontFamily: 'Nunito, sans-serif', boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 46, height: 46, borderRadius: 14, background: cfg.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{cfg.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 800, fontSize: 15, color: '#1F2937' }}>{cfg.label}</span>
                      {prog.totalAttempts > 0 && <span style={{ fontSize: 12, color: '#9CA3AF' }}>{acc}% accuracy</span>}
                    </div>
                    <div style={{ height: 5, background: '#F3F4F6', borderRadius: 999, marginTop: 6, overflow: 'hidden' }}>
                      <div style={{ height: '100%', background: cfg.accent, width: `${(prog.masteryLevel / 5) * 100}%`, borderRadius: 999 }} />
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ── Break Screen ──────────────────────────────────────────────
function BreakScreen({ onContinue, onStop }: { onContinue: () => void; onStop: () => void }) {
  const [secs, setSecs] = useState(30)
  useEffect(() => {
    if (secs <= 0) return
    const t = setInterval(() => setSecs(s => s - 1), 1000)
    return () => clearInterval(t)
  }, [secs])

  return (
    <div style={{ ...S.page, justifyContent: 'center' }}>
      <div style={{ ...S.card, textAlign: 'center' }}>
        <div style={{ fontSize: 56, marginBottom: 12 }}>😴</div>
        <h2 style={{ fontSize: 22, fontWeight: 900, color: '#F59E0B', margin: '0 0 8px' }}>Time for a break!</h2>
        <p style={{ color: '#6B7280', fontSize: 14, margin: '0 0 20px', lineHeight: 1.5 }}>
          You've been working hard.<br />Rest your brain for 30 seconds!
        </p>
        <div style={{ fontSize: 48, fontWeight: 900, color: '#6366F1', margin: '0 0 20px' }}>{secs}s</div>
        <div style={{ height: 8, background: '#E5E7EB', borderRadius: 999, overflow: 'hidden', marginBottom: 20 }}>
          <div style={{ height: '100%', background: '#6366F1', width: `${(secs / 30) * 100}%`, borderRadius: 999, transition: 'width 1s linear' }} />
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={onContinue} style={{ flex: 1, background: '#6366F1', color: 'white', border: 'none', borderRadius: 14, padding: '14px', fontWeight: 800, fontSize: 15, cursor: 'pointer', fontFamily: 'Nunito, sans-serif' }}>
            Continue ✊
          </button>
          <button onClick={onStop} style={{ flex: 1, background: '#F3F4F6', color: '#6B7280', border: 'none', borderRadius: 14, padding: '14px', fontWeight: 700, fontSize: 15, cursor: 'pointer', fontFamily: 'Nunito, sans-serif' }}>
            Stop for now
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Question Screen ───────────────────────────────────────────
function QuestionScreen({ question, total, streak, fatigueScore, onAnswer }: {
  question: QuizSessionQuestion; total: number; streak: number; fatigueScore: number
  onAnswer: (idx: number, timeMs: number, hint: boolean) => void
}) {
  const [selected, setSelected] = useState<number | null>(null)
  const [showHint, setShowHint] = useState(false)
  const [hintUsed, setHintUsed] = useState(false)
  const [startTime] = useState(Date.now())
  const cfg = SKILL_CONFIG[question.skill as SkillTag]
  const progress = Math.round((question.index / total) * 100)
  const fatigueColor = fatigueScore >= 70 ? '#EF4444' : fatigueScore >= 45 ? '#F59E0B' : '#10B981'

  const pick = (idx: number) => {
    if (selected !== null) return
    setSelected(idx)
    setTimeout(() => onAnswer(idx, Date.now() - startTime, hintUsed), 500)
  }

  return (
    <div style={S.page}>
      <div style={{ width: '100%', maxWidth: 440, marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <span style={{ background: cfg.color, color: cfg.accent, padding: '3px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>{cfg.emoji} {cfg.label}</span>
            {streak >= 2 && <span style={{ background: '#FEF3C7', color: '#92400E', padding: '3px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>🔥 {streak}x</span>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: fatigueColor }} title="Focus level" />
            <span style={{ fontSize: 12, color: '#9CA3AF', fontWeight: 700 }}>{question.index + 1}/{total}</span>
          </div>
        </div>
        <div style={{ height: 8, background: '#E5E7EB', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ height: '100%', background: cfg.accent, width: `${progress}%`, borderRadius: 999, transition: 'width 0.4s ease' }} />
        </div>
      </div>

      <div style={S.card}>
        <div style={{ display: 'flex', gap: 4, marginBottom: 14 }}>
          {[1,2,3,4,5].map(d => <div key={d} style={{ width: 7, height: 7, borderRadius: '50%', background: d <= question.difficulty ? cfg.accent : '#E5E7EB' }} />)}
          <span style={{ fontSize: 11, color: '#9CA3AF', marginLeft: 4 }}>Lv.{question.difficulty}</span>
        </div>
        <h2 style={{ fontSize: 19, fontWeight: 800, color: '#1F2937', margin: '0 0 22px', lineHeight: 1.4 }}>{question.question}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
          {question.choices.map((c, i) => {
            const picked = selected === i
            return (
              <button key={i} onClick={() => pick(i)} disabled={selected !== null} style={{
                background: picked ? cfg.color : 'white', border: `2px solid ${picked ? cfg.accent : '#E5E7EB'}`,
                borderRadius: 14, padding: '13px 16px', textAlign: 'left', fontSize: 15, fontWeight: 700,
                color: picked ? cfg.accent : '#374151', cursor: selected !== null ? 'default' : 'pointer',
                fontFamily: 'Nunito, sans-serif', transition: 'all 0.15s',
                transform: picked ? 'scale(1.01)' : 'scale(1)',
              }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26, borderRadius: '50%', marginRight: 10, background: picked ? cfg.accent : '#F3F4F6', color: picked ? 'white' : '#9CA3AF', fontSize: 12, fontWeight: 800 }}>
                  {String.fromCharCode(65 + i)}
                </span>
                {c}
              </button>
            )
          })}
        </div>
        {!showHint ? (
          <button onClick={() => { setHintUsed(true); setShowHint(true) }} style={{ width: '100%', background: 'none', border: '1.5px dashed #D1D5DB', borderRadius: 12, padding: '10px', fontSize: 13, fontWeight: 700, color: '#9CA3AF', cursor: 'pointer', fontFamily: 'Nunito, sans-serif' }}>💡 Need a hint?</button>
        ) : (
          <div style={{ background: '#FFFBEB', border: '1.5px solid #FCD34D', borderRadius: 12, padding: '10px 14px', fontSize: 13, color: '#78350F', fontWeight: 600 }}>💡 {question.hint}</div>
        )}
      </div>
    </div>
  )
}

// ── Feedback Screen ───────────────────────────────────────────
function FeedbackScreen({ question, correct, xpGained, streak, onNext }: {
  question: QuizSessionQuestion; correct: boolean; xpGained: number; streak: number; onNext: () => void
}) {
  useEffect(() => { const t = setTimeout(onNext, 2000); return () => clearTimeout(t) }, [onNext])
  return (
    <div style={{ ...S.page, justifyContent: 'center' }}>
      <div style={{ ...S.card, textAlign: 'center' }}>
        <div style={{ fontSize: 54, marginBottom: 10 }}>{correct ? '🎉' : '💪'}</div>
        <h2 style={{ fontSize: 22, fontWeight: 900, margin: '0 0 6px', color: correct ? '#059669' : '#6366F1' }}>{correct ? 'Correct!' : 'Not quite!'}</h2>
        {correct && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#FEF3C7', borderRadius: 999, padding: '4px 14px', marginBottom: 12, fontSize: 14, fontWeight: 800, color: '#92400E' }}>
            +{xpGained} XP {streak >= 2 ? `🔥 ${streak}x!` : ''}
          </div>
        )}
        <p style={{ background: correct ? '#D1FAE5' : '#EEF2FF', borderRadius: 12, padding: '12px 16px', fontSize: 14, color: '#374151', margin: '8px 0 16px', lineHeight: 1.5, textAlign: 'left' }}>{question.explanation}</p>
        <div style={{ height: 4, background: '#E5E7EB', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ height: '100%', background: correct ? '#10B981' : '#6366F1', animation: 'drain 2s linear forwards', borderRadius: 999 }} />
        </div>
        <style>{`@keyframes drain{from{width:100%}to{width:0%}}`}</style>
      </div>
    </div>
  )
}

// ── Session Summary ───────────────────────────────────────────
function SessionSummary({ correct, total, xpGained, mode, onContinue }: {
  correct: number; total: number; xpGained: number; mode: Mode; onContinue: () => void
}) {
  const accuracy = Math.round((correct / total) * 100)
  const stars = accuracy >= 90 ? 3 : accuracy >= 60 ? 2 : 1
  return (
    <div style={{ ...S.page, justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        <div style={{ background: 'linear-gradient(135deg,#6366F1,#8B5CF6)', borderRadius: 24, padding: '28px 24px', textAlign: 'center', marginBottom: 16, color: 'white' }}>
          <div style={{ fontSize: 40, marginBottom: 6 }}>{'⭐'.repeat(stars)}{'☆'.repeat(3 - stars)}</div>
          <h2 style={{ fontSize: 24, fontWeight: 900, margin: '0 0 4px' }}>{accuracy >= 90 ? 'Amazing!' : accuracy >= 60 ? 'Great Job!' : 'Keep Going!'}</h2>
          <p style={{ fontSize: 14, opacity: 0.85, margin: 0 }}>Session complete</p>
        </div>
        <div style={{ background: 'white', borderRadius: 18, padding: '16px', marginBottom: 14, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          {[
            { label: 'Correct', value: `${correct}/${total}`, color: '#059669', bg: '#D1FAE5' },
            { label: 'Accuracy', value: `${accuracy}%`,       color: '#6366F1', bg: '#EEF2FF' },
            { label: 'XP Earned',value: `+${xpGained}`,       color: '#92400E', bg: '#FEF3C7' },
          ].map(s => (
            <div key={s.label} style={{ background: s.bg, borderRadius: 14, padding: '12px 8px' }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 11, color: '#6B7280', fontWeight: 700 }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button onClick={onContinue} style={{ background: '#6366F1', color: 'white', border: 'none', borderRadius: 16, padding: '16px', fontSize: 16, fontWeight: 900, cursor: 'pointer', fontFamily: 'Nunito, sans-serif', boxShadow: '0 4px 16px rgba(99,102,241,0.4)' }}>
            Play Again 🔄
          </button>
          <a href="/mathquest/dashboard/" style={{ display: 'block', textAlign: 'center', background: 'white', border: '1.5px solid #E5E7EB', borderRadius: 16, padding: '14px', fontSize: 15, fontWeight: 700, color: '#6B7280', textDecoration: 'none' }}>
            Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────
export default function QuizPage() {
  const { recordAnswer, checkStreak, resetSession, completeSession, totalXp, currentStreak, placementLevel, skills } = useGameStore()
  const [screen, setScreen] = useState<Screen>('mode-select')
  const [mode, setMode] = useState<Mode>('daily')
  const [selectedSkill, setSelectedSkill] = useState<SkillTag>('arithmetic')
  const [questions, setQuestions] = useState<QuizSessionQuestion[]>([])
  const [qIndex, setQIndex] = useState(0)
  const [sessionCorrect, setSessionCorrect] = useState(0)
  const [sessionXp, setSessionXp] = useState(0)
  const [streak, setStreak] = useState(0)
  const [lastCorrect, setLastCorrect] = useState(false)
  const [lastXp, setLastXp] = useState(0)
  const fatigueSignals = useRef<FatigueSignal[]>([])

  useEffect(() => { checkStreak() }, [checkStreak])

  const weakSkills = Object.entries(skills)
    .sort(([,a],[,b]) => (a.totalAttempts > 0 ? a.totalCorrect/a.totalAttempts : 1) - (b.totalAttempts > 0 ? b.totalCorrect/b.totalAttempts : 1))
    .slice(0, 2)
    .map(([id]) => id as SkillTag)

  const startQuiz = useCallback((m: Mode, skill?: SkillTag) => {
    const qs = buildSession({
      skillId: skill,
      difficulty: placementLevel,
      questionCount: m === 'challenge' ? 10 : 8,
      mode: m,
      weakSkills,
    })
    if (skill) setSelectedSkill(skill)
    setMode(m)
    setQuestions(qs)
    setQIndex(0)
    setSessionCorrect(0)
    setSessionXp(0)
    setStreak(0)
    fatigueSignals.current = []
    resetSession()
    setScreen('question')
  }, [placementLevel, weakSkills, resetSession])

  const handleModeSelect = (m: Mode) => {
    setMode(m)
    if (m === 'practice' || m === 'review') {
      setScreen('skill-select')
    } else {
      startQuiz(m)
    }
  }

  const handleAnswer = useCallback((choiceIdx: number, timeMs: number, hintUsed: boolean) => {
    const q = questions[qIndex]
    if (!q) return
    const correct = choiceIdx === q.correct
    const newStreak = correct ? streak + 1 : 0
    const xpGained = calcXpGain(correct, q.difficulty, newStreak, timeMs)

    fatigueSignals.current.push({ responseTimeMs: timeMs, correct, usedHint: hintUsed })
    setLastCorrect(correct)
    setLastXp(xpGained)
    setStreak(newStreak)
    setSessionCorrect(p => p + (correct ? 1 : 0))
    setSessionXp(p => p + xpGained)
    recordAnswer(q.skill as SkillTag, correct)
    setScreen('feedback')
  }, [questions, qIndex, streak, recordAnswer])

  const handleNext = useCallback(() => {
    const fatigue = analyzeFatigue(fatigueSignals.current)
    if (fatigue.shouldStop && qIndex + 1 < questions.length) {
      setScreen('break')
      return
    }
    if (qIndex + 1 >= questions.length) {
      completeSession()
      setScreen('summary')
    } else {
      setQIndex(i => i + 1)
      setScreen('question')
    }
  }, [qIndex, questions.length, completeSession])

  const fatigue = analyzeFatigue(fatigueSignals.current)

  if (screen === 'mode-select') return <ModeSelect onSelect={handleModeSelect} />
  if (screen === 'skill-select') return <SkillSelect onSelect={(s) => startQuiz(mode, s)} onBack={() => setScreen('mode-select')} />
  if (screen === 'break') return <BreakScreen onContinue={() => { fatigueSignals.current = []; setQIndex(i => i + 1); setScreen('question') }} onStop={() => { completeSession(); setScreen('summary') }} />
  if (screen === 'question' && questions[qIndex]) return <QuestionScreen question={questions[qIndex]} total={questions.length} streak={streak} fatigueScore={fatigue.score} onAnswer={handleAnswer} />
  if (screen === 'feedback' && questions[qIndex]) return <FeedbackScreen question={questions[qIndex]} correct={lastCorrect} xpGained={lastXp} streak={streak} onNext={handleNext} />
  if (screen === 'summary') return <SessionSummary correct={sessionCorrect} total={questions.length} xpGained={sessionXp} mode={mode} onContinue={() => setScreen('mode-select')} />
  return null
}
