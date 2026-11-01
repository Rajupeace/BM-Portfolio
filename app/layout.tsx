import type { Metadata, Viewport } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from 'sonner'

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })

const SITE_URL = 'https://bm-portfolio-xi.vercel.app'
const TITLE = 'Badisa Srikanth | Full Stack Developer & Founder of SriVoraTech'
const DESCRIPTION =
  'Portfolio of Badisa Srikanth (Srikanth Badisa), a Full Stack Developer and the Founder & CEO of SriVoraTech. Projects, skills & learning tracker, resume and contact details.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: ['Badisa Srikanth', 'Srikanth Badisa', 'SriVoraTech', 'Founder', 'Full Stack Developer', 'React', 'Next.js', 'Node.js', 'Python', 'Portfolio'],
  authors: [{ name: 'Badisa Srikanth', url: SITE_URL }],
  creator: 'Badisa Srikanth',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    locale: 'en_US',
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: 'Badisa Srikanth',
    images: [{ url: '/bm-portfolio.png', width: 1200, height: 630, alt: 'Badisa Srikanth portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/bm-portfolio.png'],
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#030712' },
  ],
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Badisa Srikanth',
  alternateName: 'Srikanth Badisa',
  url: SITE_URL,
  jobTitle: 'Full Stack Developer; Founder & CEO, SriVoraTech',
  worksFor: { '@type': 'Organization', name: 'SriVoraTech', url: 'https://www.srivoratech.in/' },
  sameAs: ['https://github.com/Rajupeace', 'https://www.linkedin.com/in/srikanth-b-1b6b452a5/', 'https://www.srivoratech.in/'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
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
