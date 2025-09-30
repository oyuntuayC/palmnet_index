import Link from 'next/link'

type Props = {
  href: string
  title: string
  subtitle?: string
  banner?: string
  date: string
  tags?: string[]
}

export default function BlogCard({ href, title, subtitle, banner, date, tags }: Props) {
  return (
    <Link href={href} className="block">
      <article className="rounded overflow-hidden light-gray-bg flex flex-col hover:shadow-lg transition-shadow duration-200 cursor-pointer">
        {banner ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={banner} alt="" className="w-full h-48 object-cover" />
        ) : null}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-inter text-xl mb-1">{title}</h3>
          {subtitle ? <p className="text-sm text-muted mb-3">{subtitle}</p> : null}
          <div className="text-xs text-gray-500 mb-4">{new Date(date).toLocaleDateString()}</div>
          {tags && tags.length ? (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((t) => (
                <span key={t} className="text-xs bg-black/5 px-2 py-1 rounded">#{t}</span>
              ))}
            </div>
          ) : null}
        </div>
      </article>
    </Link>
  )
}


