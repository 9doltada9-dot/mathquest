import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Welcome Back',
}

/**
 * Login page — Phase 1 placeholder.
 * Full implementation comes in BUILD_MODE Phase 1.
 */
export default function LoginPage() {
  return (
    <div className="card text-center space-y-6 p-8">
      {/* Logo */}
      <div className="space-y-2">
        <div className="text-5xl" aria-hidden>🧮</div>
        <h1 className="text-3xl font-extrabold text-gradient">MathQuest</h1>
        <p className="text-neutral-500 text-sm">Your adventure in math starts here!</p>
      </div>

      {/* Form placeholder */}
      <div className="space-y-3">
        <div className="skeleton h-12 w-full" aria-label="Loading..." />
        <div className="skeleton h-12 w-full" />
        <div className="skeleton h-12 w-full" />
      </div>

      <p className="text-xs text-neutral-400">
        Login UI will be built in Phase 1 (BUILD_MODE)
      </p>
    </div>
  )
}
