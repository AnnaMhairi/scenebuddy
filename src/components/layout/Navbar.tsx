'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@/components/ui/button' // adjust import based on your setup

export default function Navbar() {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session)
      setLoading(false)
    }
    getSession()

    // Optional: listen for auth changes (sign-in/sign-out)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      listener?.subscription.unsubscribe()
    }
  }, [supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) return null

  return (
    <nav className="flex justify-between items-center p-4 border-b">
      <div className="text-xl font-bold cursor-pointer" onClick={() => router.push('/')}>
        SceneBuddy
      </div>

      {session && (
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      )}
    </nav>
  )
}
