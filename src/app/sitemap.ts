import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://icube-emu.com'
  const now = new Date()
  return [
    { url: `${base}/`,            lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/downloads/`,  lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/testflight/`, lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/features/`,   lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/about/`,      lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/support/`,    lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/donate/`,     lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/links/`,      lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
  ]
}
