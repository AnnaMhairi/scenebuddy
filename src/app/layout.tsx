// src/app/layout.tsx
import '../styles/globals.css';
import { ReactNode } from 'react';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = createPagesServerClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // You can optionally pass session to context or props here

  return (
    <html lang="en">
      <body>
        {/* You could conditionally render nav/header here */}
        {children}
      </body>
    </html>
  );
}
