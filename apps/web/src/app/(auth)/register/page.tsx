'use client'

import { useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useGameStore } from '@/store/gameStore'

export default function RegisterPage() {
  const { signUp, loading, error } = useAuthStore()
  const { setDisplayName } = useGameStore()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [done, setDone] = useState(false)
  const [localError, setLocalError] = useState('')

  const handleSubmit = async () => {
    setLocalError('')
    if (!name.trim()) { setLocalError('Please enter your name'); return }
    if (!email.trim()) { setLocalError('Please enter your email'); return }
    if (password.length < 6) { setLocalError('Password must be at least 6 characters'); return }

    const result = await signUp(email, password)
    if (!result.error) {
      setDisplayName(name.trim())
      setDone(true)
    }
  }

  const inputStyle = {
    width: '100%', padding: '14px 16px', borderRadius: 14,
    border: '2px solid #E5E7EB', fontSize: 15, fontFamily: 'Nunito, sans-serif',
    fontWeight: 600, color: '#1F2937', outline: 'none',
    boxSizing: 'border-box' as const, transition: 'border-color 0.2s',
  }

  if (done) return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg,#EEF2FF 0%,#fff 60%,#F5F3FF 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Nunito, sans-serif', padding: 20 }}>
      <div style={{ background: 'white', borderRadius: 28, padding: '40px 32px', textAlign: 'center', maxWidth: 360, width: '100%', boxShadow: '0 8px 32px rgba(99,102,241,0.12)' }}>
        <div style={{ fontSize: 60, marginBottom: 12 }}>🎉</div>
        <h2 style={{ fontSize: 24, fontWeight: 900, color: '#1F2937', margin: '0 0 8px' }}>Welcome, {name}!</h2>
        <p style={{ color: '#6B7280', fontSize: 14, margin: '0 0 24px', lineHeight: 1.6 }}>
          Check your email to confirm your account, then log in to start your adventure!
        </p>
        <a href="/mathquest/login/" style={{
          display: 'block', background: 'linear-gradient(135deg,#6366F1,#8B5CF6)',
          color: 'white', borderRadius: 16, padding: '16px', fontSize: 16,
          fontWeight: 900, textDecoration: 'none', textAlign: 'center',
        }}>
          Go to Login →
        </a>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg,#EEF2FF 0%,#fff 60%,#F5F3FF 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Nunito, sans-serif', padding: 20 }}>
      <div style={{ background: 'white', borderRadius: 28, padding: '40px 28px', maxWidth: 400, width: '100%', boxShadow: '0 8px 32px rgba(99,102,241,0.12)' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🚀</div>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: '#1F2937', margin: '0 0 4px' }}>Create Account</h1>
          <p style={{ color: '#9CA3AF', fontSize: 14, margin: 0 }}>Start your math adventure today!</p>
        </div>

        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Name */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 800, color: '#374151', display: 'block', marginBottom: 6 }}>
              Your Name 👤
            </label>
            <input
              type="text"
              placeholder="e.g. Alex, Mia, Tom..."
              value={name}
              onChange={e => setName(e.target.value)}
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#6366F1'}
              onBlur={e => e.target.style.borderColor = '#E5E7EB'}
            />
          </div>

          {/* Email */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 800, color: '#374151', display: 'block', marginBottom: 6 }}>
              Email 📧
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#6366F1'}
              onBlur={e => e.target.style.borderColor = '#E5E7EB'}
            />
          </div>

          {/* Password */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 800, color: '#374151', display: 'block', marginBottom: 6 }}>
              Password 🔒
            </label>
            <input
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#6366F1'}
              onBlur={e => e.target.style.borderColor = '#E5E7EB'}
            />
          </div>

          {/* Error */}
          {(localError || error) && (
            <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 12, padding: '10px 14px', fontSize: 13, color: '#DC2626', fontWeight: 600 }}>
              ⚠️ {localError || error}
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              background: loading ? '#E5E7EB' : 'linear-gradient(135deg,#6366F1,#8B5CF6)',
              color: loading ? '#9CA3AF' : 'white',
              border: 'none', borderRadius: 16, padding: '16px',
              fontSize: 16, fontWeight: 900, cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'Nunito, sans-serif', marginTop: 4,
              boxShadow: loading ? 'none' : '0 4px 16px rgba(99,102,241,0.4)',
            }}
          >
            {loading ? 'Creating account...' : "Let's Go! 🚀"}
          </button>

          {/* Login link */}
          <p style={{ textAlign: 'center', fontSize: 14, color: '#9CA3AF', margin: '4px 0 0' }}>
            Already have an account?{' '}
            <a href="/mathquest/login/" style={{ color: '#6366F1', fontWeight: 800, textDecoration: 'none' }}>
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
