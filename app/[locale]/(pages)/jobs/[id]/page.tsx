import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

const JOBS = {
  'se-berlin': {
    title: 'Software Engineer',
    location: 'Berlin, DE',
    postedAt: '2025-08-01',
    type: 'Full-time',
    description: `You will design and build core systems across POS, online ordering, and kitchen management.

Responsibilities
- Ship reliable services and frontends with strong observability
- Collaborate with product and go-to-market for impactful outcomes
- Improve developer experience and performance

Requirements
- 3+ years building production systems
- Experience with TypeScript/React or Node/Go/Python
- Strong ownership and communication`
  },
  'pm-madrid': {
    title: 'Product Manager',
    location: 'Madrid, ES',
    postedAt: '2025-07-20',
    type: 'Full-time',
    description: `Own outcomes for online ordering and kitchen management products.

Responsibilities
- Discover problems with customers and internal teams
- Define strategy, roadmap, and success metrics
- Orchestrate delivery with engineering and design

Requirements
- 3+ years product management
- Excellent written and spoken communication`
  },
  'ae-paris': {
    title: 'Account Executive',
    location: 'Paris, FR',
    postedAt: '2025-07-10',
    type: 'Full-time',
    description: `Drive growth by owning the full sales cycle with restaurants.

Responsibilities
- Prospect, demo, negotiate, and close
- Partner with onboarding for successful activation

Requirements
- 2+ years SaaS or hospitality tech sales
- Fluent French and English`
  }
} as const

export function generateStaticParams() {
  const locales = ['zh', 'en', 'es'] as const
  const ids = Object.keys(JOBS)
  return locales.flatMap((locale) => ids.map((id) => ({ locale, id })))
}

export default async function JobDetailPage({ params }: { params: { locale: 'zh' | 'en' | 'es', id: string } }) {
  const t = await getTranslations('jobs')
  const { locale, id } = params
  const job = (JOBS as Record<string, any>)[id]

  if (!job) {
    return (
      <main className="container mx-auto py-12">
        <p>Not found.</p>
        <Link href={`/${locale}/jobs`} className="btn btn-small btn-outline mt-4">{t('detail.back')}</Link>
      </main>
    )
  }

  return (
    <main className="container mx-auto py-12">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-inter mb-2">{job.title}</h1>
        <div className="text-sm text-gray-600 mb-6">
          <span className="mr-3">{t('card.location')}: {job.location}</span>
          <span className="mr-3">{t('card.posted')}: {job.postedAt}</span>
          <span>{t('card.type')}: {job.type}</span>
        </div>
        <pre className="whitespace-pre-wrap font-sans text-gray-800 mb-8">{job.description}</pre>
        <div className="flex gap-3">
          <a href={`mailto:hr@palmnet.ai?subject=Application%20-%20${encodeURIComponent(job.title)}`} className="btn btn-round">{t('detail.apply')}</a>
          <Link href={`/${locale}/jobs`} className="btn btn-outline btn-round">{t('detail.back')}</Link>
        </div>
      </div>
    </main>
  )
}


