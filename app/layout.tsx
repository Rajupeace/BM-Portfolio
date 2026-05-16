import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })

export const metadata: Metadata = {
  title: 'Srikanth | Full Stack Developer',
  description: 'Portfolio of Srikanth, a Computer Science Engineer and Full Stack Developer crafting intelligent, high-performance digital ecosystems.',
  keywords: ['Full Stack Developer', 'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'AI', 'Portfolio'],
  authors: [{ name: 'Srikanth' }],
  creator: 'Srikanth',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bm-portfolio-xi.vercel.app/',
    title: 'Srikanth | Full Stack Developer',
    description: 'Portfolio of Srikanth, a Computer Science Engineer and Full Stack Developer.',
    siteName: 'Srikanth Portfolio',
    images: [
      {
        url: 'https://bm-portfolio-xi.vercel.app/bm-portfolio.png',
        width: 1200,
        height: 630,
        alt: 'Srikanth Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Srikanth | Full Stack Developer',
    description: 'Portfolio of Srikanth, a Computer Science Engineer and Full Stack Developer.',
    images: ['https://bm-portfolio-xi.vercel.app/bm-portfolio.png'],
  },
}

import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from 'sonner'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="bottom-right" theme="system" />
        </ThemeProvider>
      </body>
    </html>
  )
}
