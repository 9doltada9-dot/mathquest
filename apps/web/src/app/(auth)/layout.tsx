/**
 * Auth layout — minimal wrapper for login/register pages.
 * Centers content, shows background illustration.
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-violet-50 flex items-center justify-center p-4">
      {/* Background decorative circles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-100 rounded-full opacity-50" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-100 rounded-full opacity-50" />
      </div>

      <main className="relative z-10 w-full max-w-md">
        {children}
      </main>
    </div>
  )
}
