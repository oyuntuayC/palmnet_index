import React from 'react'

type Props = { url: string; title: string }

export default function SocialShare({ url, title }: Props) {
  const share = [
    { name: 'X', href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}` },
    { name: 'LinkedIn', href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}` },
    { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
  ]
  return (
    <div className="flex items-center gap-3">
      {share.map((s) => (
        <a key={s.name} className="btn btn-small btn-round" href={s.href} target="_blank" rel="noopener noreferrer">{s.name}</a>
      ))}
    </div>
  )
}


