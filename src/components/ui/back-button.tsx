// src/components/ui/back-button.tsx
'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

const HIDDEN_PATHS = ['/', '/login', '/register', '/dashboard']

export function BackButton() {
    const pathname = usePathname()
    const router = useRouter()

    if (HIDDEN_PATHS.includes(pathname)) return null

  return (
    <Button
      variant="ghost"
      onClick={() => router.back()}
      className="mb-4 flex items-center gap-2 text-sm text-muted-foreground"
    >
      <ArrowLeft className="w-4 h-4" />
      Back
    </Button>
  )
}
