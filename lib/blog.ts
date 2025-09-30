import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type BlogFrontmatter = {
  title: string
  subtitle?: string
  banner?: string
  tags?: string[]
  category?: string
  author: {
    name: string
    avatar?: string
    affiliation?: string
  }
  date: string // ISO date
}

export type BlogPost = {
  slug: string
  locale: 'zh' | 'en' | 'es'
  content: string
  data: BlogFrontmatter
}

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blogs')

export function getAllSlugs(locale: 'zh' | 'en' | 'es'): string[] {
  const dir = path.join(CONTENT_DIR, locale)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
}

export function getPost(locale: 'zh' | 'en' | 'es', slug: string): BlogPost | null {
  const filePath = path.join(CONTENT_DIR, locale, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  return {
    slug,
    locale,
    content,
    data: data as BlogFrontmatter,
  }
}

export function getAllPosts(locale: 'zh' | 'en' | 'es'): BlogPost[] {
  return getAllSlugs(locale)
    .map((slug) => getPost(locale, slug))
    .filter(Boolean)
    .map((p) => p as BlogPost)
    .sort((a, b) => (a.data.date < b.data.date ? 1 : -1))
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const tags = new Set(post.data.tags || [])
  return getAllPosts(post.locale)
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      post: p,
      score: (p.data.tags || []).reduce((acc, t) => acc + (tags.has(t) ? 1 : 0), 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.post)
}


