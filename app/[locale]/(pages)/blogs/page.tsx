import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { getAllPosts } from '../../../../lib/blog'
import BlogCard from '../../../../components/blog/BlogCard'

export const dynamic = 'force-static'

export default async function BlogsPage({ params }: { params: { locale: 'zh' | 'en' | 'es' } }) {
  const { locale } = params
  const t = await getTranslations('blogs')
  const posts = getAllPosts(locale)

  return (
    <main>
      <section className="relative">
        <div className="min-h-[40vh] bg-cover bg-center" style={{ backgroundImage: 'url(/images/slide-bg-2.jpg)' }} />
        <div className="container">
          <div className="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2 text-center text-white">
            <h1 className="font-inter text-4xl md:text-5xl mb-3">{t('title')}</h1>
            <p className="font-montserrat text-base md:text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
          </div>
        </div>
      </section>

      <section className="container py-10">
        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((p) => (
              <BlogCard
                key={p.slug}
                href={`/${locale}/blogs/${p.slug}`}
                title={p.data.title}
                subtitle={p.data.subtitle}
                banner={p.data.banner}
                date={p.data.date}
                tags={p.data.tags}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export function generateStaticParams() {
  return [{ locale: 'zh' }, { locale: 'en' }, { locale: 'es' }]
}


