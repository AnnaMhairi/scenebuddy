'use client'

import Link from 'next/link'

export function Sidebar() {
  return (
    <aside className="w-64 bg-gray-100 h-screen p-4 border-r">
      <nav className="space-y-4">
        <Link href="/dashboard" className="block font-medium hover:underline">Dashboard</Link>
        <Link href="/auditions/new" className="block font-medium hover:underline">New Audition</Link>
        <Link href="/profile" className="block font-medium hover:underline">Profile</Link>
      </nav>
    </aside>
  )
}
