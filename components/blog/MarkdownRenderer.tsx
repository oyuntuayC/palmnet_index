import React from 'react'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'

export default async function MarkdownRenderer({ markdown }: { markdown: string }) {
  const processed = await remark().use(remarkGfm).use(remarkHtml).process(markdown)
  const html = processed.toString()
  return (
    <div className="markdown-body" dangerouslySetInnerHTML={{ __html: html }} />
  )
}


