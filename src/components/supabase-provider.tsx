'use client';

import { createContext, useContext, useState } from 'react';
import { createClient } from '@/lib/supabaseClient';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() => createClient());

  return (
    <SessionContextProvider supabaseClient={supabase}>
      {children}
    </SessionContextProvider>
  );
}
