'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    async function checkSession() {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.replace('/login');
      } else {
        setSession(session);
        setLoading(false);
      }
    }

    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.replace('/login');
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [router, supabase]);

  if (loading) {
    return <p>Loading your dashboard...</p>;
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Welcome to your dashboard!</h1>
      <p>Your email: {session.user.email}</p>
    </main>
  );
}
