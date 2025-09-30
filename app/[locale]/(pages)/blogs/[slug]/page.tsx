import { getPost, getAllSlugs, getRelatedPosts } from '../../../../../lib/blog'
import { getTranslations } from 'next-intl/server'
import BlogMeta from '../../../../../components/blog/BlogMeta'
import SocialShare from '../../../../../components/blog/SocialShare'
import MarkdownRenderer from '../../../../../components/blog/MarkdownRenderer'

export const dynamic = 'force-static'

export function generateStaticParams() {
  const locales: Array<'zh' | 'en' | 'es'> = ['zh', 'en', 'es']
  return locales.flatMap((locale) => getAllSlugs(locale).map((slug) => ({ locale, slug })))
}

export default async function BlogDetailPage({ params }: { params: { locale: 'zh' | 'en' | 'es'; slug: string } }) {
  const { locale, slug } = params
  const t = await getTranslations('blogs')
  const post = getPost(locale, slug)

  if (!post) {
    return <main className="container py-12">Not found</main>
  }

  const related = getRelatedPosts(post)
  const canonical = `https://palmnet.ai/${locale}/blogs/${slug}`

  return (
    <main>
      {/* Banner */}
      <section className="relative">
        <div
          className="min-h-[40vh] bg-cover bg-center"
          style={{ backgroundImage: `url(${post.data.banner || '/images/blog-banner.png'})` }}
        />
      </section>

      {/* Meta + Content */}
      <section className="container py-10">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-inter text-3xl md:text-4xl font-bold mb-3">{post.data.title}</h1>
          {post.data.subtitle ? (
            <p className="font-montserrat text-base md:text-lg text-muted mb-6">{post.data.subtitle}</p>
          ) : null}
          <BlogMeta author={post.data.author} date={post.data.date} tags={post.data.tags} category={post.data.category} />
          <div className="my-8" />
          <hr className="border-gray-200 mb-8" />
          <MarkdownRenderer markdown={post.content} />
          <div className="my-8" />
          <SocialShare url={canonical} title={post.data.title} />
        </div>
      </section>

      {/* Related */}
      {related.length ? (
        <section className="container py-10">
          <h2 className="font-inter text-2xl mb-6">{t('related')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p) => (
              <a key={p.slug} className="block p-5 light-gray-bg rounded" href={`/${locale}/blogs/${p.slug}`}>
                <div className="font-medium mb-2">{p.data.title}</div>
                <div className="text-sm text-muted">{p.data.subtitle}</div>
              </a>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  )
}


