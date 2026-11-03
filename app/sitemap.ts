import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'
import { projects } from '@/content/projects'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: 'monthly', priority: 1 },
    ...projects.map((p) => ({ url: `${SITE_URL}/projects/${p.slug}`, changeFrequency: 'monthly' as const, priority: 0.7 })),
  ]
}
