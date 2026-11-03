import path from 'path'
import { fileURLToPath } from 'url'

/** @type {import('next').NextConfig} */
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      { source: '/Srikanthsathya_Resume.pdf', destination: '/Badisa_Srikanth_Resume.pdf', permanent: true },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'bm-portfolio-xi.vercel.app' }],
        destination: 'https://srikanth.portfolio.srivoratech.in/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
