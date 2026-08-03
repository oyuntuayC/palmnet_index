import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import type { Locale } from '@/lib/locales'

export type LegalDocSlug = 'privacy' | 'terms' | 'cookies'

export type LegalFrontmatter = {
  title: string
  description: string
  lastUpdated: string
}

export type LegalDocument = {
  slug: LegalDocSlug
  locale: Locale
  content: string
  data: LegalFrontmatter
}

const CONTENT_DIR = path.join(process.cwd(), 'content', 'legal')
const FALLBACK_LOCALE: Locale = 'en'

function readLegalFile(slug: LegalDocSlug, locale: Locale): LegalDocument | null {
  const filePath = path.join(CONTENT_DIR, slug, `${locale}.md`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)

  return {
    slug,
    locale,
    content,
    data: data as LegalFrontmatter,
  }
}

export function getLegalDocument(locale: Locale, slug: LegalDocSlug): LegalDocument | null {
  return readLegalFile(slug, locale) ?? readLegalFile(slug, FALLBACK_LOCALE)
}
