'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // for Next.js 13 app router
import { createClient } from '@/lib/supabaseClient';

export default function LoginForm() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.status === 429) {
        setError('Too many login attempts — please wait and try again.');
      } else {
        setError(error.message || 'Failed to log in.');
      }
    } else {
      // Redirect on successful login
      router.push('/dashboard');
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 max-w-sm mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="p-2 border rounded text-gray-900 placeholder-gray-500 bg-white"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="p-2 border rounded text-gray-900 placeholder-gray-500 bg-white"
        required
      />
      <button type="submit" className="bg-black text-white p-2 rounded">
        Log In
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
}
