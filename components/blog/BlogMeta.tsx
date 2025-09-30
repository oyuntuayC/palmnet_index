import React from 'react'

type Props = {
  author: { name: string; avatar?: string; affiliation?: string }
  date: string
  tags?: string[]
  category?: string
}

export default function BlogMeta({ author, date, tags, category }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
      <div className="flex items-center gap-2">
        {author.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={author.avatar} alt={author.name} className="w-8 h-8 rounded-full object-cover" />
        ) : (
          <div className="w-8 h-8 rounded-full bg-black/10" />
        )}
        <div>
          <div className="font-medium">{author.name}</div>
          {author.affiliation ? <div className="text-xs text-gray-500">{author.affiliation}</div> : null}
        </div>
      </div>
      <span className="text-gray-400">·</span>
      <time dateTime={date}>{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</time>
      {category ? (
        <>
          <span className="text-gray-400">·</span>
          <span className="text-xs bg-black/5 px-2 py-1 rounded">{category}</span>
        </>
      ) : null}
      {tags && tags.length ? (
        <>
          <span className="text-gray-400">·</span>
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <span key={t} className="text-xs bg-black/5 px-2 py-1 rounded">#{t}</span>
            ))}
          </div>
        </>
      ) : null}
    </div>
  )
}


