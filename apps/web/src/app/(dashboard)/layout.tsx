/**
 * Dashboard layout — wraps all authenticated child-facing pages.
 * Includes bottom navigation bar (mobile-first).
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Top header */}
      <header className="bg-white border-b border-neutral-100 px-4 py-3 flex items-center justify-between sticky top-0 z-50 pt-safe">
        <div className="flex items-center gap-2">
          <span className="text-2xl" aria-hidden>🧮</span>
          <span className="font-extrabold text-primary-600 text-lg">MathQuest</span>
        </div>
        {/* XP indicator placeholder */}
        <div className="xp-badge">
          <span>⭐</span>
          <span>0 XP</span>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-lg mx-auto px-4 py-6 pb-24">
        {children}
      </main>

      {/* Bottom nav bar (mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-100 pb-safe z-50">
        <div className="max-w-lg mx-auto flex items-center justify-around py-2">
          {[
            { icon: '🏠', label: 'Home',     href: '/dashboard' },
            { icon: '📚', label: 'Learn',    href: '/quiz' },
            { icon: '🗺️',  label: 'Missions', href: '/missions' },
            { icon: '👤', label: 'Profile',  href: '/profile' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex flex-col items-center gap-1 px-4 py-2 text-neutral-400 hover:text-primary-500 transition-colors"
            >
              <span className="text-xl" aria-hidden>{item.icon}</span>
              <span className="text-xs font-semibold">{item.label}</span>
            </a>
          ))}
        </div>
      </nav>
    </div>
  )
}
