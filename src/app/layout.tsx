// src/app/layout.tsx
import '../styles/globals.css'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import Navbar from '@/components/layout/Navbar'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
          {children}
      </body>
    </html>
  )
}
