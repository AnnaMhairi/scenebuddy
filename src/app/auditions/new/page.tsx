'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/types/supabase'

export default function NewAuditionPage() {
  const [role, setRole] = useState('')
  const [project, setProject] = useState('')
  const [notes, setNotes] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [agent, setAgent] = useState('')
  const [castingOffice, setCastingOffice] = useState('')
  const [loading, setLoading] = useState(false)
  const supabase = createClientComponentClient<Database>()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      router.push('/login')
      return
    }

    const { error } = await supabase.from('auditions').insert({
      user_id: session.user.id,
      role,
      project,
      notes,
      due_date: dueDate,
      agent,
      casting_office: castingOffice
    })

    if (error) {
      console.error('Insert error:', error)
      alert('Failed to save audition.')
    } else {
      router.push('/dashboard')
    }

    setLoading(false)
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Audition</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border px-4 py-2 rounded text-black"
          required
        />
        <input
          type="text"
          placeholder="Project"
          value={project}
          onChange={(e) => setProject(e.target.value)}
          className="w-full border px-4 py-2 rounded text-black"
          required
        />
        <textarea
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full border px-4 py-2 rounded text-black"
          rows={4}
        />
        <input
          placeholder="agent"
          value={agent}
          onChange={(e) => setAgent(e.target.value)}
          className="w-full border px-4 py-2 rounded text-black"
          required
        />
        <input
          placeholder="Casting Office"
          value={castingOffice}
          onChange={(e) => setCastingOffice(e.target.value)}
          className="w-full border px-4 py-2 rounded text-black"
          required
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full border px-4 py-2 rounded text-black"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Audition'}
        </button>
      </form>
    </div>
  )
}
