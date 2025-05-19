'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabaseClient';

export default function SignUpForm() {
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear any existing errors

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      if (error.status === 429) {
        setError('Too many requests — please wait and try again.');
      } else {
        setError(error.message || 'Something went wrong.');
      }
    } else {
      // Optional: Redirect or show success message
    }
  };

  return (
    <form onSubmit={handleSignUp} className="flex flex-col gap-4 max-w-sm mx-auto">
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
      <button type="submit" className="bg-black text-white p-2 rounded">Sign Up</button>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
}
