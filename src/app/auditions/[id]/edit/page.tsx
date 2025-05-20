'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '../../../../types/supabase'

type Audition = Database['public']['Tables']['auditions']['Row']
type AuditionUpdate = Database['public']['Tables']['auditions']['Update']

export default function EditAuditionPage() {
  const supabase = createClientComponentClient<Database>()
  const router = useRouter()
  const params = useParams()
  const auditionId = params.id

  const [role, setRole] = useState('')
  const [project, setProject] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [notes, setNotes] = useState('')
  const [agent, setAgent] = useState('')
  const [castingOffice, setCastingOffice] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const fetchAudition = async () => {
      const { data, error } = await supabase
        .from('auditions')
        .select('*')
        .eq('id', auditionId)
        .single()

      if (error) {
        setErrorMsg('Error loading audition.')
        setLoading(false)
        return
      }

      if (data) {
        setRole(data.role)
        setProject(data.project)
        setDueDate(data.due_date)
        setNotes(data.notes || '')
        setCastingOffice(data.casting_office)
        setAgent(data.agent)
      }
      setLoading(false)
    }

    fetchAudition()
  }, [auditionId, supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setErrorMsg('')

    const updates: AuditionUpdate = {
      role,
      project,
      due_date: dueDate,
      notes,
      casting_office: castingOffice,
      agent
    }

    const { error } = await supabase
      .from('auditions')
      .update(updates)
      .eq('id', auditionId)

    if (error) {
      setErrorMsg(error.message)
      setSaving(false)
      return
    }

    router.push('/dashboard')
  }

  if (loading) return <p>Loading audition...</p>

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Audition</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          className="w-full border rounded px-3 py-2 text-black"
        />

        <input
          type="text"
          placeholder="Project"
          value={project}
          onChange={(e) => setProject(e.target.value)}
          required
          className="w-full border rounded px-3 py-2 text-black"
        />

        <input
          type="date"
          placeholder="Due Date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          className="w-full border rounded px-3 py-2 text-black"
        />

        <input
          type="text"
          placeholder="Agent"
          value={agent}
          onChange={(e) => setAgent(e.target.value)}
          className="w-full border px-4 py-2 rounded text-black"
          required
        />
        <input
          type="text"
          placeholder="Casting Office"
          value={castingOffice}
          onChange={(e) => setCastingOffice(e.target.value)}
          className="w-full border px-4 py-2 rounded text-black"
          required
        />

        <textarea
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full border rounded px-3 py-2 text-black"
        />

        {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}

        <button
          type="submit"
          disabled={saving}
          className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}
