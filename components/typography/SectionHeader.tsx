import React from 'react'

type SectionHeaderProps = {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
  titleClassName?: string
  subtitleClassName?: string
}

export function SectionHeader({
  title,
  subtitle,
  align = 'left',
  className = '',
  titleClassName = '',
  subtitleClassName = ''
}: SectionHeaderProps): React.ReactElement {
  const alignmentClass = align === 'center' ? 'mx-auto text-center' : 'text-left'

  return (
    <div className={`section-head-gap max-w-5xl ${alignmentClass} ${className}`}>
      <h2 className={`type-display-md text-black ${titleClassName}`}>{title}</h2>
      {subtitle ? (
        <p className={`type-body stack-title-body text-[#666] ${subtitleClassName}`}>{subtitle}</p>
      ) : null}
    </div>
  )
}
