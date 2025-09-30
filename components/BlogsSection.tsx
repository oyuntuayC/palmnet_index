"use client"
import React from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { BlogPost } from '../lib/blog'
import BlogCard from './blog/BlogCard'

type Props = {
  posts: BlogPost[]
}

export default function BlogsSection({ posts }: Props): React.ReactElement | null {
  const t = useTranslations('blogs')
  const locale = useLocale() as 'zh' | 'en' | 'es'
  const displayPosts = posts.slice(0, 3) // Show only latest 3 posts

  if (posts.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-inter text-3xl md:text-4xl mb-4">{t('title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">{t('subtitle')}</p>
          <Link 
            href={`/${locale}/blogs`} 
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
          >
            View All Posts
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayPosts.map((post) => (
            <BlogCard
              key={post.slug}
              href={`/${locale}/blogs/${post.slug}`}
              title={post.data.title}
              subtitle={post.data.subtitle}
              banner={post.data.banner}
              date={post.data.date}
              tags={post.data.tags}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
