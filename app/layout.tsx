import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { SITE_URL } from '@/lib/site'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })

const TITLE = 'Badisa Srikanth (Srikanth Badisa) Portfolio | AI Engineer & Founder of SriVoraTech'
const DESCRIPTION =
  'Portfolio of Badisa Srikanth (Srikanth Badisa): AI Engineer, Full Stack Developer and Founder & CEO of SriVoraTech. Projects, AI work, DevOps & MLOps journey, resume and contact.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: '%s | Badisa Srikanth' },
  description: DESCRIPTION,
  keywords: ['Badisa Srikanth', 'Srikanth Badisa', 'SriVoraTech', 'Founder', 'AI Engineer', 'Full Stack Developer', 'React', 'Next.js', 'Node.js', 'Python', 'Portfolio', 'Srikanth Badisa portfolio', 'Badisa Srikanth portfolio', 'Srikanth portfolio', 'SriVoraTech founder'],
  authors: [{ name: 'Badisa Srikanth', url: SITE_URL }],
  creator: 'Badisa Srikanth',
  alternates: { canonical: '/' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } : undefined,
  },
  openGraph: {
    type: 'profile',
    locale: 'en_US',
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: 'Badisa Srikanth',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Badisa Srikanth: AI Engineer, Full Stack Developer and Founder & CEO at SriVoraTech' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og.png'],
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0b0d' },
  ],
}

const person = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Badisa Srikanth',
  alternateName: ['Srikanth Badisa', 'Srikanth'],
  url: SITE_URL,
  image: `${SITE_URL}/profile-circle.jpg`,
  address: { '@type': 'PostalAddress', addressRegion: 'Telangana', addressCountry: 'IN' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Vignan University' },
  jobTitle: 'AI Engineer; Full Stack Developer; Founder & CEO, SriVoraTech',
  worksFor: { '@type': 'Organization', name: 'SriVoraTech', url: 'https://www.srivoratech.in/' },
  sameAs: [
    'https://github.com/Rajupeace',
    'https://www.linkedin.com/in/srikanth-b-1b6b452a5/',
    'https://leetcode.com/u/Srikanthsathya/',
    'https://www.hackerrank.com/profile/rajubhaibhai576',
    'https://www.srivoratech.in/',
  ],
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: 'Badisa Srikanth Portfolio', alternateName: 'Srikanth Badisa Portfolio', inLanguage: 'en' },
    { '@type': 'ProfilePage', '@id': `${SITE_URL}/#profile`, url: SITE_URL, name: TITLE, isPartOf: { '@id': `${SITE_URL}/#website` }, mainEntity: { '@id': `${SITE_URL}/#person` } },
    person,
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
