"use client"
import Link from 'next/link'
import React from 'react'
import { useTranslations } from 'next-intl'

type Job = {
  id: string
  title: string
  location: string
  postedAt: string
  type: string
  summary: string
}

export default function JobsFilter({
  locale,
  locations,
  jobs,
}: {
  locale: 'zh' | 'en' | 'es'
  locations: string[]
  jobs: Job[]
}) {
  const t = useTranslations('jobs')
  const [filter, setFilter] = React.useState<string>('all')
  const filtered = jobs.filter(j => filter === 'all' ? true : j.location === filter)

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        <button onClick={()=>setFilter('all')} className={`btn btn-small ${filter==='all' ? '' : 'btn-outline'}`}>{t('filter.all')}</button>
        {locations.map(loc => (
          <button key={loc} onClick={()=>setFilter(loc)} className={`btn btn-small ${filter===loc ? '' : 'btn-outline'}`}>{loc}</button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(job => (
          <div key={job.id} className="p-5 border border-gray-100 rounded bg-white shadow-sm flex flex-col">
            <h3 className="text-xl font-inter mb-2">{job.title}</h3>
            <div className="text-sm text-gray-600 mb-3">
              <span className="mr-3">{t('card.location')}: {job.location}</span>
              <span className="mr-3">{t('card.posted')}: {job.postedAt}</span>
              <span>{t('card.type')}: {job.type}</span>
            </div>
            <p className="text-sm text-gray-800 mb-4 flex-1">{job.summary}</p>
            <Link href={`/${locale}/jobs/${job.id}`} className="btn btn-small btn-round self-start">{t('card.apply')}</Link>
          </div>
        ))}
      </div>
    </>
  )
}


