import React from 'react'
import Image from 'next/image'

interface FeatureCard {
  title: string
  description: string
  backgroundImage: string
  deviceImage: string
  backgroundOverlay?: string
}

interface FeatureBentoProps {
  features: ReadonlyArray<FeatureCard>
}

export function FeatureBento({ features }: FeatureBentoProps): React.ReactElement {
  return (
    <section className="section-space bg-white">
      <div className="layout-page">
        <div className="flex flex-col gap-[var(--space-xl)] lg:flex-row">
          {/* Desktop Layout: 2+1 layout on md+ */}
          <div className="hidden md:block w-full">
            {/* First two cards side by side */}
            <div className="mb-[var(--space-xl)] grid gap-[var(--space-xl)] md:grid-cols-3">
              {/* First card - narrow (1 column) */}
              <div className="flex flex-col gap-[var(--space-lg)]">
                {/* Image Container */}
                <div className="relative h-[208px] w-full overflow-hidden rounded-2xl">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={features[0].backgroundImage}
                      alt=""
                      fill
                      className="object-cover rounded-2xl"
                    />
                    {/* Overlay */}
                    <div className={`absolute inset-0 rounded-2xl ${
                      features[0].backgroundOverlay === 'dark' 
                        ? 'bg-black/80' 
                        : features[0].backgroundOverlay === 'light'
                        ? 'bg-black/60'
                        : 'bg-gradient-to-t from-gray-100/80 to-gray-900/80'
                    }`} />
                  </div>
                  
                  {/* Device Image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={features[0].deviceImage}
                        alt=""
                        width={400}
                        height={300}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Text Content */}
                <div className="flex flex-col gap-[var(--space-xs)]">
                  <h3 className="type-tagline text-gray-900">{features[0].title}</h3>
                  <p className="type-body text-gray-600">{features[0].description}</p>
                </div>
              </div>

              {/* Second card - wide (2 columns) */}
              <div className="flex flex-col gap-[var(--space-lg)] md:col-span-2">
                {/* Image Container */}
                <div className="relative h-[208px] w-full overflow-hidden rounded-2xl">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={features[1].backgroundImage}
                      alt=""
                      fill
                      className="object-cover rounded-2xl"
                    />
                    {/* Overlay */}
                    <div className={`absolute inset-0 rounded-2xl ${
                      features[1].backgroundOverlay === 'dark' 
                        ? 'bg-black/80' 
                        : features[1].backgroundOverlay === 'light'
                        ? 'bg-black/60'
                        : 'bg-gradient-to-t from-gray-100/80 to-gray-900/80'
                    }`} />
                  </div>
                  
                  {/* Device Image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={features[1].deviceImage}
                        alt=""
                        width={400}
                        height={300}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Text Content */}
                <div className="flex flex-col gap-[var(--space-xs)]">
                  <h3 className="type-tagline text-gray-900">{features[1].title}</h3>
                  <p className="type-body text-gray-600">{features[1].description}</p>
                </div>
              </div>
            </div>

            {/* Third card - full width below */}
            <div className="flex flex-col gap-[var(--space-lg)]">
              {/* Image Container */}
              <div className="relative h-[208px] w-full overflow-hidden rounded-2xl">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={features[2].backgroundImage}
                    alt=""
                    fill
                    className="object-cover rounded-2xl"
                  />
                  {/* Overlay */}
                  <div className={`absolute inset-0 rounded-2xl ${
                    features[2].backgroundOverlay === 'dark' 
                      ? 'bg-black/80' 
                      : features[2].backgroundOverlay === 'light'
                      ? 'bg-black/60'
                      : 'bg-gradient-to-t from-gray-100/80 to-gray-900/80'
                  }`} />
                </div>
                
                {/* Device Image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={features[2].deviceImage}
                      alt=""
                      width={400}
                      height={300}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
              
              {/* Text Content */}
              <div className="flex flex-col gap-[var(--space-xs)]">
                <h3 className="type-tagline text-gray-900">{features[2].title}</h3>
                <p className="type-body text-gray-600">{features[2].description}</p>
              </div>
            </div>
          </div>

          {/* Mobile Layout: Stacked cards on sm only */}
          <div className="flex w-full flex-col gap-[var(--space-xl)] md:hidden">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col gap-[var(--space-lg)]">
                {/* Image Container */}
                <div className="relative h-[208px] w-full overflow-hidden rounded-2xl">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={feature.backgroundImage}
                      alt=""
                      fill
                      className="object-cover rounded-2xl"
                    />
                    {/* Overlay */}
                    <div className={`absolute inset-0 rounded-2xl ${
                      feature.backgroundOverlay === 'dark' 
                        ? 'bg-black/80' 
                        : feature.backgroundOverlay === 'light'
                        ? 'bg-black/60'
                        : 'bg-gradient-to-t from-gray-100/80 to-gray-900/80'
                    }`} />
                  </div>
                  
                  {/* Device Image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={feature.deviceImage}
                        alt=""
                        width={400}
                        height={300}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Text Content */}
                <div className="flex flex-col gap-[var(--space-xs)]">
                  <h3 className="type-tagline text-gray-900">{feature.title}</h3>
                  <p className="type-body text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
