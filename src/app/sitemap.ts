import { MetadataRoute } from 'next'
import { execSync } from 'child_process'

export const dynamic = 'force-static'

const FALLBACK_DATE = new Date().toISOString().split('T')[0]

function lastModifiedFor(filePath: string): string {
  try {
    const output = execSync(`git log -1 --format=%cI -- ${filePath}`, {
      cwd: process.cwd(),
      encoding: 'utf-8',
    }).trim()
    if (!output) return FALLBACK_DATE
    return output
  } catch {
    return FALLBACK_DATE
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://icube-emu.com'

  const routes: { path: string; file: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[] = [
    { path: '/', file: 'src/app/page.tsx', changeFrequency: 'weekly', priority: 1.0 },
    { path: '/downloads/', file: 'src/app/downloads/page.tsx', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/sources/', file: 'src/app/sources/page.tsx', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/features/', file: 'src/app/features/page.tsx', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/about/', file: 'src/app/about/page.tsx', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/support/', file: 'src/app/support/page.tsx', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/guide/', file: 'src/app/guide/page.tsx', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/guide/importing/', file: 'src/app/guide/importing/page.tsx', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/guide/formats/', file: 'src/app/guide/formats/page.tsx', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/guide/bios/', file: 'src/app/guide/bios/page.tsx', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/guide/faq/', file: 'src/app/guide/faq/page.tsx', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/controllers/', file: 'src/app/controllers/page.tsx', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/compare/', file: 'src/app/compare/page.tsx', changeFrequency: 'monthly', priority: 0.5 },
    { path: '/compare/icube-vs-dolphin/', file: 'src/app/compare/icube-vs-dolphin/page.tsx', changeFrequency: 'monthly', priority: 0.5 },
    { path: '/compare/icube-vs-provenance/', file: 'src/app/compare/icube-vs-provenance/page.tsx', changeFrequency: 'monthly', priority: 0.5 },
    { path: '/donate/', file: 'src/app/donate/page.tsx', changeFrequency: 'monthly', priority: 0.5 },
    { path: '/links/', file: 'src/app/links/page.tsx', changeFrequency: 'monthly', priority: 0.4 },
    { path: '/privacy/', file: 'src/app/privacy/page.tsx', changeFrequency: 'yearly', priority: 0.2 },
    { path: '/licenses/', file: 'src/app/licenses/page.tsx', changeFrequency: 'yearly', priority: 0.2 },
  ]

  return routes.map(({ path, file, changeFrequency, priority }) => ({
    url: `${base}${path}`,
    lastModified: lastModifiedFor(file),
    changeFrequency,
    priority,
  }))
}
