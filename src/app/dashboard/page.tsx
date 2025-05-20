'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '../../types/supabase'
import { useRouter } from 'next/navigation'
import MainLayout from '@/components/layout/main-layout' 

type Audition = Database['public']['Tables']['auditions']['Row']

export default function DashboardPage() {
  const [auditions, setAuditions] = useState<Audition[]>([])
  const [filteredAuditions, setFilteredAuditions] = useState<Audition[]>([])
  const [loading, setLoading] = useState(true)

  const [agentFilter, setAgentFilter] = useState('')
  const [castingOfficeFilter, setCastingOfficeFilter] = useState('')

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
        setFilteredAuditions(data || [])
      }

      setLoading(false)
    }

    fetchAuditions()
  }, [supabase, router])

  useEffect(() => {
    let filtered = auditions

    if (agentFilter) {
      filtered = filtered.filter((a) => a.agent === agentFilter)
    }
    if (castingOfficeFilter) {
      filtered = filtered.filter((a) => a.casting_office === castingOfficeFilter)
    }

    setFilteredAuditions(filtered)
  }, [agentFilter, castingOfficeFilter, auditions])

  const agents = Array.from(new Set(auditions.map((a) => a.agent).filter(Boolean)))
  const castingOffices = Array.from(new Set(auditions.map((a) => a.casting_office).filter(Boolean)))

  if (loading) return <MainLayout><p>Loading...</p></MainLayout>

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-4">My Auditions</h1>

      <div className="mb-4 flex gap-4">
        <select
          value={agentFilter}
          onChange={(e) => setAgentFilter(e.target.value)}
          className="border text-gray-600 rounded px-3 py-1"
        >
          <option value="">All Agents</option>
          {agents.map((agent) => (
            <option key={agent} value={agent}>{agent}</option>
          ))}
        </select>

        <select
          value={castingOfficeFilter}
          onChange={(e) => setCastingOfficeFilter(e.target.value)}
          className="border text-gray-600 rounded px-3 py-1"
        >
          <option value="">All Casting Offices</option>
          {castingOffices.map((office) => (
            <option key={office} value={office}>{office}</option>
          ))}
        </select>
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
        onClick={() => router.push('/auditions/new')}
      >
        + Add New Audition
      </button>

      <ul className="space-y-4">
        {filteredAuditions.map((audition) => (
          <li key={audition.id} className="border p-4 rounded shadow hover:bg-gray-50">
            <h2 className="text-lg font-semibold">{audition.role} - {audition.project}</h2>
            <p className="text-sm text-gray-600">Due: {audition.due_date}</p>
            <p className="text-sm">Agent: {audition.agent || 'N/A'}</p>
            <p className="text-sm">Casting Office: {audition.casting_office || 'N/A'}</p>
            <p className="text-sm mt-2">{audition.notes}</p>
          </li>
        ))}
      </ul>
    </MainLayout>
  )
}
