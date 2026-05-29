'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'

export default function LoginPage() {
  const router = useRouter()
  const { signIn, user, loading, error, clearError, initialize } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => { initialize() }, [initialize])
  useEffect(() => { if (user) router.push('/dashboard') }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    await signIn(email, password)
    setSubmitting(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #EEF2FF 0%, #fff 50%, #F5F3FF 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem', fontFamily: 'Nunito, sans-serif',
    }}>
      <div style={{
        background: 'white', borderRadius: 24, padding: '2.5rem 2rem',
        width: '100%', maxWidth: 400,
        boxShadow: '0 4px 24px rgba(99,102,241,0.1)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🧮</div>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: '#6366F1', margin: '8px 0 4px' }}>MathQuest</h1>
          <p style={{ color: '#9CA3AF', fontSize: 14, margin: 0 }}>Welcome back! Ready to learn?</p>
        </div>

        {error && (
          <div style={{
            background: '#FEE2E2', borderRadius: 12, padding: '12px 16px',
            color: '#DC2626', fontSize: 14, marginBottom: 20,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span>{error}</span>
            <button onClick={clearError} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#DC2626', fontSize: 18 }}>x</button>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 700, color: '#374151', marginBottom: 6 }}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com" required
              style={{ width: '100%', padding: '12px 16px', borderRadius: 12, boxSizing: 'border-box', border: '1.5px solid #E5E7EB', fontSize: 16, outline: 'none', fontFamily: 'Nunito, sans-serif' }}
              onFocus={(e) => e.target.style.borderColor = '#6366F1'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 700, color: '#374151', marginBottom: 6 }}>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="..." required
              style={{ width: '100%', padding: '12px 16px', borderRadius: 12, boxSizing: 'border-box', border: '1.5px solid #E5E7EB', fontSize: 16, outline: 'none', fontFamily: 'Nunito, sans-serif' }}
              onFocus={(e) => e.target.style.borderColor = '#6366F1'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
            />
          </div>
          <button type="submit" disabled={submitting}
            style={{
              background: submitting ? '#A5B4FC' : '#6366F1', color: 'white',
              border: 'none', borderRadius: 14, padding: '14px', fontSize: 16, fontWeight: 800,
              cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: 'Nunito, sans-serif',
              boxShadow: '0 4px 12px rgba(99,102,241,0.35)', marginTop: 4,
            }}>
            {submitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: '#6B7280' }}>
          New to MathQuest?{' '}
          <a href="/mathquest/register/" style={{ color: '#6366F1', fontWeight: 700, textDecoration: 'none' }}>Create account</a>
        </p>
      </div>
    </div>
  )
}
