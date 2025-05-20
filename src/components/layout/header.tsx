'use client'

import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="w-full h-16 bg-white border-b shadow-sm flex items-center justify-between px-6">
      <h1 className="text-xl font-bold">SceneBuddy</h1>
      <Button variant="outline">Log Out</Button>
    </header>
  )
}
