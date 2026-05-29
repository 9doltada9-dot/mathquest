import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
}

/**
 * Dashboard home — Phase 1 placeholder.
 * Full implementation in BUILD_MODE Phase 1.
 */
export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <section>
        <h1 className="text-2xl font-extrabold text-neutral-800">
          Welcome back! 👋
        </h1>
        <p className="text-neutral-500 text-sm mt-1">Ready to continue your adventure?</p>
      </section>

      {/* Continue learning card placeholder */}
      <div className="card bg-gradient-to-br from-primary-500 to-violet-500 text-white">
        <p className="font-bold text-lg">Continue Learning</p>
        <p className="text-primary-100 text-sm mt-1">Pick up where you left off</p>
        <div className="progress-track mt-4 bg-white/20">
          <div className="progress-fill bg-white/80 w-3/5" />
        </div>
        <p className="text-xs text-primary-100 mt-2">60% complete</p>
      </div>

      {/* Daily missions placeholder */}
      <section className="space-y-3">
        <h2 className="font-extrabold text-neutral-700">Daily Missions</h2>
        {[1, 2].map((i) => (
          <div key={i} className="skeleton h-16 w-full" />
        ))}
      </section>

      {/* Skills grid placeholder */}
      <section className="space-y-3">
        <h2 className="font-extrabold text-neutral-700">Your Skills</h2>
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton h-24 w-full" />
          ))}
        </div>
      </section>

      <p className="text-xs text-neutral-400 text-center">
        Full dashboard UI → BUILD_MODE Phase 1
      </p>
    </div>
  )
}
