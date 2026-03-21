import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://icube-emu.com'
  return [
    { url: `${base}/`,           lastModified: '2025-10-05', changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/downloads/`, lastModified: '2025-10-05', changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/features/`,  lastModified: '2025-10-05', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/about/`,     lastModified: '2025-10-05', changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/support/`,   lastModified: '2025-10-05', changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/donate/`,    lastModified: '2025-10-05', changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/links/`,     lastModified: '2025-10-05', changeFrequency: 'monthly', priority: 0.4 },
  ]
}
