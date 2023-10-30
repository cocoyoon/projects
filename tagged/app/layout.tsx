import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TAGGED',
  description: 'The Fashionpedia which finds the styles',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
