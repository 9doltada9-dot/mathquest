export default function HomePage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #EEF2FF 0%, #ffffff 50%, #F5F3FF 100%)',
      fontFamily: 'Nunito, sans-serif',
    }}>
      <div style={{ fontSize: 64 }}>🧮</div>
      <h1 style={{ fontSize: 36, fontWeight: 900, color: '#6366F1', margin: '16px 0 8px' }}>
        MathQuest
      </h1>
      <p style={{ color: '#6B7280', fontSize: 16, marginBottom: 40 }}>
        Adaptive math learning for kids aged 5-18
      </p>
      <div style={{ display: 'flex', gap: 12 }}>
        <a href='./login/' style={{
          background: '#6366F1', color: 'white',
          padding: '14px 32px', borderRadius: 16,
          fontWeight: 700, fontSize: 16, textDecoration: 'none',
        }}>Get Started</a>
        <a href='./dashboard/' style={{
          border: '2px solid #6366F1', color: '#6366F1',
          padding: '14px 32px', borderRadius: 16,
          fontWeight: 700, fontSize: 16, textDecoration: 'none',
        }}>Dashboard</a>
      </div>
    </div>
  )
}