'use client'

import { useState, useEffect, useRef } from 'react'
import {
  selectNextQuestion,
  adjustDifficulty,
  calculateResult,
  getProgress,
  TOTAL_QUESTIONS,
} from '@/features/placement-test/engine'
import {
  SKILL_INFO,
  PERSONALITY_INFO,
  type PlacementQuestion,
  type QuestionAttempt,
  type PlacementResult,
} from '@/features/placement-test/questions'

type Screen = 'welcome' | 'question' | 'feedback' | 'result'

const S: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #EEF2FF 0%, #fff 60%, #F5F3FF 100%)',
    fontFamily: 'Nunito, sans-serif',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    padding: '16px',
  },
  card: {
    background: 'white', borderRadius: 24,
    padding: '28px 24px', width: '100%', maxWidth: 440,
    boxShadow: '0 4px 24px rgba(99,102,241,0.10)',
  },
}

// ── WELCOME SCREEN ────────────────────────────────────────────
function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <div style={{ ...S.page, justifyContent: 'center' }}>
      <div style={S.card}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 60, marginBottom: 8 }}>🗺️</div>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: '#6366F1', margin: '0 0 8px' }}>
            Skill Discovery
          </h1>
          <p style={{ color: '#6B7280', fontSize: 15, margin: 0, lineHeight: 1.5 }}>
            Let's find your true math level!<br />
            Answer a few questions and we'll build<br />
            your perfect learning adventure.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
          {[
            { icon: '⚡', text: 'Only 10–12 quick questions' },
            { icon: '🎮', text: 'Feels like a game, not an exam' },
            { icon: '🤖', text: 'AI builds your personal path' },
            { icon: '💡', text: 'Hints available anytime' },
          ].map((item) => (
            <div key={item.text} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              background: '#F9FAFB', borderRadius: 12, padding: '10px 14px',
            }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>{item.text}</span>
            </div>
          ))}
        </div>

        <button onClick={onStart} style={{
          width: '100%', background: '#6366F1', color: 'white',
          border: 'none', borderRadius: 16, padding: '16px',
          fontSize: 17, fontWeight: 900, cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(99,102,241,0.4)',
          fontFamily: 'Nunito, sans-serif',
        }}>
          Start My Adventure! 🚀
        </button>

        <p style={{ textAlign: 'center', fontSize: 12, color: '#9CA3AF', marginTop: 14, marginBottom: 0 }}>
          Takes about 3–5 minutes
        </p>
      </div>
    </div>
  )
}

// ── QUESTION SCREEN ───────────────────────────────────────────
function QuestionScreen({
  question,
  questionNumber,
  total,
  onAnswer,
}: {
  question: PlacementQuestion
  questionNumber: number
  total: number
  onAnswer: (choiceIndex: number, timeMs: number, usedHint: boolean) => void
}) {
  const [selected, setSelected] = useState<number | null>(null)
  const [showHint, setShowHint] = useState(false)
  const [startTime] = useState(Date.now())
  const usedHint = useRef(false)

  const skillInfo = SKILL_INFO[question.skill]
  const progress = getProgress(questionNumber - 1)

  const handleChoice = (idx: number) => {
    if (selected !== null) return
    setSelected(idx)
    const elapsed = Date.now() - startTime
    setTimeout(() => onAnswer(idx, elapsed, usedHint.current), 600)
  }

  const handleHint = () => {
    usedHint.current = true
    setShowHint(true)
  }

  return (
    <div style={S.page}>
      {/* Header */}
      <div style={{ width: '100%', maxWidth: 440, marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{
            background: skillInfo.color, color: skillInfo.accent,
            padding: '4px 12px', borderRadius: 999, fontSize: 13, fontWeight: 700,
          }}>
            {skillInfo.emoji} {skillInfo.label}
          </span>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#9CA3AF' }}>
            {questionNumber} / {total}
          </span>
        </div>
        {/* Progress bar */}
        <div style={{ height: 8, background: '#E5E7EB', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{
            height: '100%', background: '#6366F1', borderRadius: 999,
            width: `${progress}%`, transition: 'width 0.4s ease',
          }} />
        </div>
      </div>

      {/* Question card */}
      <div style={S.card}>
        {/* Difficulty dots */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
          {[1,2,3,4,5].map((d) => (
            <div key={d} style={{
              width: 8, height: 8, borderRadius: '50%',
              background: d <= question.difficulty ? skillInfo.accent : '#E5E7EB',
            }} />
          ))}
          <span style={{ fontSize: 11, color: '#9CA3AF', marginLeft: 4 }}>
            Level {question.difficulty}
          </span>
        </div>

        {/* Question text */}
        <h2 style={{
          fontSize: 20, fontWeight: 800, color: '#1F2937',
          margin: '0 0 24px', lineHeight: 1.4,
        }}>
          {question.question}
        </h2>

        {/* Choices */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          {question.choices.map((choice, idx) => {
            let bg = 'white'
            let border = '1.5px solid #E5E7EB'
            let color = '#1F2937'

            if (selected === idx) {
              bg = skillInfo.color
              border = `2px solid ${skillInfo.accent}`
              color = skillInfo.accent
            }

            return (
              <button
                key={idx}
                onClick={() => handleChoice(idx)}
                disabled={selected !== null}
                style={{
                  background: bg, border, borderRadius: 14,
                  padding: '14px 18px', textAlign: 'left',
                  fontSize: 16, fontWeight: 700, color,
                  cursor: selected !== null ? 'default' : 'pointer',
                  fontFamily: 'Nunito, sans-serif',
                  transition: 'all 0.15s',
                  transform: selected === idx ? 'scale(1.01)' : 'scale(1)',
                }}
              >
                <span style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 28, height: 28, borderRadius: '50%',
                  background: selected === idx ? skillInfo.accent : '#F3F4F6',
                  color: selected === idx ? 'white' : '#6B7280',
                  fontSize: 12, fontWeight: 800, marginRight: 12,
                }}>
                  {String.fromCharCode(65 + idx)}
                </span>
                {choice}
              </button>
            )
          })}
        </div>

        {/* Hint */}
        {!showHint ? (
          <button
            onClick={handleHint}
            style={{
              background: 'none', border: '1.5px dashed #D1D5DB',
              borderRadius: 12, padding: '10px 16px',
              fontSize: 13, fontWeight: 700, color: '#9CA3AF',
              cursor: 'pointer', width: '100%',
              fontFamily: 'Nunito, sans-serif',
            }}
          >
            💡 Show hint
          </button>
        ) : (
          <div style={{
            background: '#FFFBEB', border: '1.5px solid #FCD34D',
            borderRadius: 12, padding: '12px 16px',
            fontSize: 13, color: '#92400E', fontWeight: 600,
          }}>
            💡 {question.hint}
          </div>
        )}
      </div>
    </div>
  )
}

// ── FEEDBACK SCREEN ───────────────────────────────────────────
function FeedbackScreen({
  question,
  wasCorrect,
  onNext,
}: {
  question: PlacementQuestion
  wasCorrect: boolean
  onNext: () => void
}) {
  useEffect(() => {
    const t = setTimeout(onNext, 2200)
    return () => clearTimeout(t)
  }, [onNext])

  return (
    <div style={{ ...S.page, justifyContent: 'center' }}>
      <div style={{ ...S.card, textAlign: 'center' }}>
        <div style={{ fontSize: 56, marginBottom: 12 }}>
          {wasCorrect ? '🎉' : '💪'}
        </div>
        <h2 style={{
          fontSize: 22, fontWeight: 900,
          color: wasCorrect ? '#059669' : '#6366F1',
          margin: '0 0 8px',
        }}>
          {wasCorrect ? 'Correct!' : 'Almost!'}
        </h2>
        <p style={{
          background: wasCorrect ? '#D1FAE5' : '#EEF2FF',
          borderRadius: 12, padding: '12px 16px',
          fontSize: 14, color: '#374151', margin: '0 0 20px', lineHeight: 1.5,
        }}>
          {question.explanation}
        </p>
        <div style={{
          height: 4, background: '#E5E7EB', borderRadius: 999, overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            background: wasCorrect ? '#10B981' : '#6366F1',
            animation: 'progress-drain 2.2s linear forwards',
            borderRadius: 999,
          }} />
        </div>
        <style>{`
          @keyframes progress-drain {
            from { width: 100%; }
            to { width: 0%; }
          }
        `}</style>
      </div>
    </div>
  )
}

// ── RESULT SCREEN ─────────────────────────────────────────────
function ResultScreen({ result, onRestart }: { result: PlacementResult; onRestart: () => void }) {
  const personality = PERSONALITY_INFO[result.personality]

  return (
    <div style={{ ...S.page, paddingBottom: 40 }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        {/* Hero */}
        <div style={{
          background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
          borderRadius: 24, padding: '28px 24px', textAlign: 'center',
          marginBottom: 16, color: 'white',
        }}>
          <div style={{ fontSize: 52, marginBottom: 8 }}>{personality.emoji}</div>
          <h1 style={{ fontSize: 24, fontWeight: 900, margin: '0 0 6px' }}>
            You are a {personality.label}!
          </h1>
          <p style={{ fontSize: 14, opacity: 0.85, margin: '0 0 20px' }}>
            {personality.desc}
          </p>
          <div style={{
            background: 'rgba(255,255,255,0.2)', borderRadius: 16,
            padding: '12px 20px', display: 'inline-block',
          }}>
            <span style={{ fontSize: 13, fontWeight: 700 }}>Overall Level</span>
            <div style={{ fontSize: 40, fontWeight: 900, lineHeight: 1.1 }}>
              {'⭐'.repeat(result.overallLevel)}
            </div>
          </div>
        </div>

        {/* Skill breakdown */}
        <div style={{ ...S.card, marginBottom: 16 }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: '#374151', margin: '0 0 16px' }}>
            Your Skill Map
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {result.skills.filter((s) => s.total > 0).map((s) => {
              const info = SKILL_INFO[s.skill]
              return (
                <div key={s.skill}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#374151' }}>
                      {s.emoji} {s.label}
                    </span>
                    <span style={{ fontSize: 12, color: '#6B7280' }}>
                      Level {s.level}/5
                    </span>
                  </div>
                  <div style={{ height: 10, background: '#F3F4F6', borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', background: info.accent,
                      width: `${(s.level / 5) * 100}%`,
                      borderRadius: 999, transition: 'width 0.8s ease',
                    }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Strengths & Focus */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          <div style={{ background: '#D1FAE5', borderRadius: 16, padding: '16px' }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#065F46', margin: '0 0 8px' }}>
              💪 Strengths
            </p>
            {result.strengths.map((s) => (
              <p key={s} style={{ fontSize: 13, color: '#047857', margin: '0 0 4px', fontWeight: 600 }}>{s}</p>
            ))}
          </div>
          <div style={{ background: '#EEF2FF', borderRadius: 16, padding: '16px' }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#3730A3', margin: '0 0 8px' }}>
              🎯 Focus on
            </p>
            {result.focusAreas.map((s) => (
              <p key={s} style={{ fontSize: 13, color: '#4338CA', margin: '0 0 4px', fontWeight: 600 }}>{s}</p>
            ))}
          </div>
        </div>

        {/* Recommended start */}
        <div style={{
          background: '#FEF3C7', borderRadius: 16, padding: '16px 20px', marginBottom: 20,
        }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#92400E', margin: '0 0 4px' }}>
            🚀 Recommended starting point
          </p>
          <p style={{ fontSize: 15, fontWeight: 800, color: '#78350F', margin: 0 }}>
            {result.recommendedStart}
          </p>
        </div>

        {/* CTA buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <a href="/mathquest/dashboard/" style={{
            display: 'block', textAlign: 'center',
            background: '#6366F1', color: 'white',
            borderRadius: 16, padding: '16px',
            fontSize: 16, fontWeight: 900, textDecoration: 'none',
            boxShadow: '0 4px 16px rgba(99,102,241,0.4)',
          }}>
            Start Learning! 🎮
          </a>
          <button onClick={onRestart} style={{
            background: 'white', border: '1.5px solid #E5E7EB',
            borderRadius: 16, padding: '14px',
            fontSize: 14, fontWeight: 700, cursor: 'pointer',
            color: '#6B7280', fontFamily: 'Nunito, sans-serif',
          }}>
            Retake Test
          </button>
        </div>
      </div>
    </div>
  )
}

// ── MAIN PAGE COMPONENT ───────────────────────────────────────

export default function PlacementTestPage() {
  const [screen, setScreen] = useState<Screen>('welcome')
  const [attempts, setAttempts] = useState<QuestionAttempt[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<PlacementQuestion | null>(null)
  const [currentDifficulty, setCurrentDifficulty] = useState(2)
  const [streak, setStreak] = useState(0)
  const [lastCorrect, setLastCorrect] = useState(false)
  const [result, setResult] = useState<PlacementResult | null>(null)

  const startTest = () => {
    setAttempts([])
    setCurrentDifficulty(2)
    setStreak(0)
    const first = selectNextQuestion([], 2)
    setCurrentQuestion(first)
    setScreen('question')
  }

  const handleAnswer = (choiceIndex: number, timeMs: number, usedHint: boolean) => {
    if (!currentQuestion) return

    const correct = choiceIndex === currentQuestion.correct
    const attempt: QuestionAttempt = {
      questionId: currentQuestion.id,
      skill: currentQuestion.skill,
      difficulty: currentQuestion.difficulty,
      correct,
      responseTimeMs: timeMs,
      usedHint,
    }

    const newAttempts = [...attempts, attempt]
    setAttempts(newAttempts)
    setLastCorrect(correct)

    const newStreak = correct ? streak + 1 : 0
    setStreak(newStreak)

    const newDifficulty = adjustDifficulty(currentDifficulty, correct, newStreak)
    setCurrentDifficulty(newDifficulty)

    setScreen('feedback')

    // Check if test is complete
    if (newAttempts.length >= TOTAL_QUESTIONS) {
      setTimeout(() => {
        setResult(calculateResult(newAttempts))
        setScreen('result')
      }, 2400)
    } else {
      setTimeout(() => {
        const next = selectNextQuestion(newAttempts, newDifficulty)
        setCurrentQuestion(next)
        setScreen('question')
      }, 2200)
    }
  }

  if (screen === 'welcome') return <WelcomeScreen onStart={startTest} />

  if (screen === 'question' && currentQuestion) {
    return (
      <QuestionScreen
        question={currentQuestion}
        questionNumber={attempts.length + 1}
        total={TOTAL_QUESTIONS}
        onAnswer={handleAnswer}
      />
    )
  }

  if (screen === 'feedback' && currentQuestion) {
    return (
      <FeedbackScreen
        question={currentQuestion}
        wasCorrect={lastCorrect}
        onNext={() => {}} // auto-advance via timeout
      />
    )
  }

  if (screen === 'result' && result) {
    return <ResultScreen result={result} onRestart={startTest} />
  }

  return (
    <div style={{ ...S.page, justifyContent: 'center' }}>
      <div style={{ fontSize: 48 }}>🧮</div>
      <p style={{ color: '#6B7280' }}>Loading...</p>
    </div>
  )
}
