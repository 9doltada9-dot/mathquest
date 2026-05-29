import { redirect } from 'next/navigation'

/**
 * Root page redirects to the dashboard if authenticated,
 * or to login if not. For now we redirect to login as placeholder.
 */
export default function HomePage() {
  redirect('/login')
}
