// src/app/dashboard/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '../../types/supabase'
import { useRouter } from 'next/navigation'

type Audition = Database['public']['Tables']['auditions']['Row']

export default function DashboardPage() {
  const [auditions, setAuditions] = useState<Audition[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient<Database>()
  const router = useRouter()

  useEffect(() => {
    const fetchAuditions = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push('/login')
        return
      }

      const { data, error } = await supabase
        .from('auditions')
        .select('*')
        .eq('user_id', session.user.id)
        .order('due_date', { ascending: true })

      if (error) {
        console.error('Error fetching auditions:', error)
      } else {
        setAuditions(data || [])
      }

      setLoading(false)
    }

    fetchAuditions()
  }, [supabase, router])

  if (loading) return <p>Loading...</p>

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this audition?')) {
      return
    }
  
    const { error } = await supabase.from('auditions').delete().eq('id', id)
  
    if (error) {
      console.error('Error deleting audition:', error)
      alert('Failed to delete audition, please try again.')
      return
    }
  
    // Remove deleted audition from state to update UI
    setAuditions((prev) => prev.filter((a) => a.id !== id))
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Auditions</h1>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
        onClick={() => router.push('/auditions/new')}
      >
        + Add New Audition
      </button>

      <ul className="space-y-4">
        {auditions.map((audition) => (
          <li
            key={audition.id}
            className="border p-4 rounded shadow hover:bg-gray-50"
          >
            <h2 className="text-lg text-gray-600 font-semibold">{audition.role} - {audition.project}</h2>
            <p className="text-sm text-gray-600">Casting Director: {audition.casting_office}</p>
            <p className="text-sm text-gray-600">Agent: {audition.agent}</p>
            <p className="text-sm text-gray-600">Due: {audition.due_date}</p>
            <p className="text-sm mt-2 text-gray-600">Notes:{audition.notes}</p>
            <button
              onClick={() => router.push(`/auditions/${audition.id}/edit`)}
                className="text-blue-600 underline"
            >
                Edit
            </button>
            <button
                className="text-red-600 underline"
                onClick={() => handleDelete(audition.id)}
            >
                Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
