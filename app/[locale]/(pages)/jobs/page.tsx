// server component wrapper to support generateStaticParams
import Link from 'next/link'
import JobsFilter from './parts/JobsFilter'
import { getTranslations } from 'next-intl/server'

type Job = {
  id: string
  title: string
  location: string
  postedAt: string
  type: string
  summary: string
}

const ALL_JOBS: Job[] = [
  { id: 'se-berlin', title: 'Software Engineer', location: 'Berlin, DE', postedAt: '2025-08-01', type: 'Full-time', summary: 'Build reliable POS and ordering systems used by restaurants across Europe.' },
  { id: 'pm-madrid', title: 'Product Manager', location: 'Madrid, ES', postedAt: '2025-07-20', type: 'Full-time', summary: 'Own end-to-end product outcomes for online ordering and kitchen management.' },
  { id: 'ae-paris', title: 'Account Executive', location: 'Paris, FR', postedAt: '2025-07-10', type: 'Full-time', summary: 'Drive growth with restaurants, from demo to close and onboarding.' },
]

export default async function JobsPage({ params }: { params: { locale: 'zh' | 'en' | 'es' } }) {
  const locale = params.locale
  const t = await getTranslations('jobs')
  const locations = Array.from(new Set(ALL_JOBS.map(j => j.location)))

  return (
    <main className="container mx-auto py-12">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-inter">{t('title')}</h1>
      </div>
      <JobsFilter locale={locale} locations={locations} jobs={ALL_JOBS} />
    </main>
  )
}

// 为静态导出提供 locale 取值
export function generateStaticParams() {
  return [{ locale: 'zh' }, { locale: 'en' }, { locale: 'es' }]
}


