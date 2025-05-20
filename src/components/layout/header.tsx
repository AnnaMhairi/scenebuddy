'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@/components/ui/button'

export function Header() {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const [session, setSession] = useState(null)

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session)
    }

    getSession()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [supabase])

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Logout error:', error.message)
    } else {
      router.push('/login')
    }
  }

  return (
    <header className="w-full h-16 bg-white border-b shadow-sm flex items-center justify-between px-6">
      <h1 className="text-xl font-bold">SceneBuddy</h1>
      {session && (
        <Button variant="outline" onClick={handleLogout}>
          Log Out
        </Button>
      )}
    </header>
  )
}
