export default function HomePage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #EEF2FF 0%, #ffffff 50%, #F5F3FF 100%)',
      fontFamily: 'Nunito, sans-serif', padding: '1rem',
    }}>
      <div style={{ fontSize: 64 }}>🧮</div>
      <h1 style={{ fontSize: 36, fontWeight: 900, color: '#6366F1', margin: '16px 0 8px' }}>
        MathQuest
      </h1>
      <p style={{ color: '#6B7280', fontSize: 16, marginBottom: 12, textAlign: 'center' }}>
        Adaptive math learning for kids aged 5–18
      </p>
      <p style={{ color: '#9CA3AF', fontSize: 13, marginBottom: 40, textAlign: 'center' }}>
        Duolingo × Prodigy Math × RPG Game × AI Tutor
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 300 }}>
        <a href='./placement-test/' style={{
          background: '#6366F1', color: 'white', textAlign: 'center',
          padding: '16px', borderRadius: 16, fontWeight: 800, fontSize: 16,
          textDecoration: 'none', boxShadow: '0 4px 16px rgba(99,102,241,0.4)',
        }}>
          🗺️ Take Placement Test
        </a>
        <a href='./login/' style={{
          background: 'white', color: '#6366F1', textAlign: 'center',
          padding: '16px', borderRadius: 16, fontWeight: 800, fontSize: 16,
          textDecoration: 'none', border: '2px solid #6366F1',
        }}>
          Sign In
        </a>
        <a href='./register/' style={{
          background: '#F5F3FF', color: '#8B5CF6', textAlign: 'center',
          padding: '14px', borderRadius: 16, fontWeight: 700, fontSize: 15,
          textDecoration: 'none',
        }}>
          Create Account
        </a>
      </div>
    </div>
  )
}
