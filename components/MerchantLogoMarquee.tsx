import React from 'react'

const brandLogos = [
  { name: 'Shoo Loong Kan', image: '/images/home/logos/shoo-loong-kan.svg' },
  { name: 'ChaPanda', image: '/images/home/logos/cha-panda.svg' },
  { name: 'Planet', image: '/images/home/logos/planet.svg' },
  { name: 'Umaiemon', image: '/images/home/logos/umaiemon.svg' },
  { name: 'Takoshu', image: '/images/home/logos/takoshu.svg' },
  { name: 'Ramen Kagura', image: '/images/home/logos/ramen-kagura.svg' },
  { name: 'Fuga', image: '/images/home/logos/fuga-orange.svg' },
  { name: 'Maymoon', image: '/images/home/logos/maymoon.svg' },
  { name: 'China Hotpot', image: '/images/home/logos/china-hotpot.svg' },
  { name: 'Koishii', image: '/images/home/logos/koishii.svg' },
  { name: 'Ottoyami', image: '/images/home/logos/ottoyami.svg' },
  { name: 'Qilin', image: '/images/home/logos/qilin.svg' },
  { name: 'Manmi', image: '/images/home/logos/manmi.svg' },
  { name: 'Amazonia Acai', image: '/images/home/logos/amazonia.svg' },
  { name: 'My Wok', image: '/images/home/logos/mywok.svg' },
  { name: 'Barcelona Chicken', image: '/images/home/logos/barcelona-chicken.svg' },
  { name: 'Youcha', image: '/images/home/logos/youcha.svg' },
  { name: 'OnSushi', image: '/images/home/logos/onsushi.svg' },
  { name: 'WO Restaurant Group', image: '/images/home/logos/wo-restaurant.svg' },
  { name: 'Jian Cha', image: '/images/home/logos/jiancha.svg' }
]

const brandLogoRows = [
  brandLogos.slice(0, 7),
  brandLogos.slice(7, 14),
  brandLogos.slice(14)
] as const

type MerchantLogoMarqueeProps = {
  title: string
  sectionClassName?: string
  titleClassName?: string
}

export function MerchantLogoMarquee({
  title,
  sectionClassName = 'section-space overflow-hidden bg-white',
  titleClassName = 'type-display-md text-black'
}: MerchantLogoMarqueeProps): React.ReactElement {
  return (
    <section className={sectionClassName}>
      <div className="layout-page text-center">
        <h2 className={titleClassName}>{title}</h2>
        <div className="stack-title-action space-y-[var(--space-xl)] md:space-y-[var(--space-xxl)]">
          {brandLogoRows.map((row, rowIndex) => (
            <div key={rowIndex} className="home-logo-marquee" aria-label={rowIndex === 0 ? title : undefined}>
              <div
                className="home-logo-marquee-track"
                style={{ ['--duration' as string]: `${34 + rowIndex * 4}s` }}
                data-direction={rowIndex === 1 ? 'right' : 'left'}
              >
                <LogoMarqueeGroup logos={row} />
                <LogoMarqueeGroup logos={row} ariaHidden />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function LogoMarqueeGroup({
  logos,
  ariaHidden = false
}: {
  logos: typeof brandLogos
  ariaHidden?: boolean
}): React.ReactElement {
  return (
    <div className="home-logo-marquee-group" aria-hidden={ariaHidden}>
      {logos.map((logo) => (
        <div key={`${ariaHidden ? 'duplicate-' : ''}${logo.name}`} className="home-logo-marquee-item">
          <img src={logo.image} alt={ariaHidden ? '' : `${logo.name} logo`} className="h-auto max-h-28 w-auto max-w-[230px] object-contain md:max-h-32 md:max-w-[260px]" />
        </div>
      ))}
    </div>
  )
}
