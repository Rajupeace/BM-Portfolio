import type { MetadataRoute } from 'next'
import { CONTENT_UPDATED, SITE_URL } from '@/lib/site'
import { projects } from '@/content/projects'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(CONTENT_UPDATED)
  return [
    { url: SITE_URL, lastModified, changeFrequency: 'monthly', priority: 1 },
    ...projects.map((p) => ({ url: `${SITE_URL}/projects/${p.slug}`, lastModified, changeFrequency: 'monthly' as const, priority: 0.7 })),
  ]
}
