import Image from 'next/image'
import { ReactElement } from 'react'

type FeatureCard = {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
}

interface FeatureCardsProps {
  cards: ReadonlyArray<FeatureCard>
}

// Standard feature card component for first two cards (desktop: upper half, mobile: right side)
function StandardFeatureCard({ card }: { card: FeatureCard }): ReactElement {
  return (
    <li className="flex-1 md:h-[600px] h-[367px] relative overflow-hidden">
      <article className="bg-gray-200/50 flex flex-col items-start p-0 rounded-md h-full">
        {/* Text content */}
        <div className="flex flex-col gap-2 items-start p-8 relative shrink-0 w-full z-10">
          <div className="flex flex-col font-semibold justify-center relative shrink-0 text-2xl md:text-2xl text-xl text-gray-900 tracking-tight w-full">
            <h3 className="block leading-tight">{card.title}</h3>
          </div>
          <div className="flex flex-col font-medium justify-center relative shrink-0 text-lg text-gray-600 tracking-tight w-full">
            <p className="leading-relaxed">{card.description}</p>
          </div>
        </div>
        
        {/* Image positioned in upper half (desktop) or right side (mobile) */}
        <div className="!relative h-[544px] left-1/2 -translate-x-1/2 w-[326px] md:block hidden">
          <Image
            src={card.imageSrc}
            alt={card.imageAlt}
            fill
            className="object-contain object-center absolute bottom-[-97px] "
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        
        {/* Mobile image positioning */}
        <div className="!relative h-[480px] right-[22px] w-[288px] md:hidden block">
          <Image
            src={card.imageSrc}
            alt={card.imageAlt}
            fill
            className="object-contain object-center absolute bottom-[-145px] "
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </article>
    </li>
  )
}

// Special feature card component for the third card (desktop: bottom right, mobile: bottom left with right-aligned text)
function SpecialFeatureCard({ card }: { card: FeatureCard }): ReactElement {
  return (
    <li className="flex-1 md:h-[600px] h-[367px] relative overflow-hidden ">
      <article className="bg-gray-200/50 flex flex-col items-start justify-end p-0 rounded-md h-full">
        {/* Desktop: Image positioned in bottom right corner */}
        <div className="absolute bottom-[171px] h-[1080px] left-1/5 -translate-x-1/2 w-[648px] md:block hidden">
          <Image
            src={card.imageSrc}
            alt={card.imageAlt}
            fill
            className="object-contain object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        
        {/* Mobile: Image positioned in bottom left */}
        <div className="absolute h-[1315px] -left-[280px] -top-[1040px] w-[789px] md:hidden block">
          <Image
            src={card.imageSrc}
            alt={card.imageAlt}
            fill
            className="object-contain object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        
        {/* Text content - left aligned on desktop, right aligned on mobile */}
        <div className="flex flex-col gap-2 items-start md:items-start items-end p-8 relative shrink-0 w-full z-10">
          <div className="flex flex-col font-semibold justify-center relative shrink-0 text-2xl md:text-2xl text-xl text-gray-900 tracking-tight w-full">
            <h3 className="block leading-tight">{card.title}</h3>
          </div>
          <div className="flex flex-col font-medium justify-center relative shrink-0 text-lg text-gray-600 tracking-tight w-full">
            <p className="leading-relaxed">{card.description}</p>
          </div>
        </div>
      </article>
    </li>
  )
}

export function FeatureCards({ cards }: FeatureCardsProps): ReactElement {
  return (
    <section className="py-16">
      <div className="container px-4">
        {/* Desktop layout: horizontal flex */}
        <ul className="mx-auto hidden md:flex gap-8 items-center justify-center xl:px-16 max-w-[1280px]">
          {cards.map((card, index) => {
            // Use special styling for the third card (index 2)
            if (index === 2) {
              return <SpecialFeatureCard key={index} card={card} />
            }
            return <StandardFeatureCard key={index} card={card} />
          })}
        </ul>
        
        {/* Mobile layout: vertical stack */}
        <ul className="flex md:hidden flex-col gap-8 items-center justify-center">
          {cards.map((card, index) => {
            // Use special styling for the third card (index 2)
            if (index === 2) {
              return <SpecialFeatureCard key={index} card={card} />
            }
            return <StandardFeatureCard key={index} card={card} />
          })}
        </ul>
      </div>
    </section>
  )
}
