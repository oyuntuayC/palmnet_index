"use client"
import React from 'react'
import { useTranslations } from 'next-intl'
import useEmblaCarousel from 'embla-carousel-react'

const slides = [
  { img: '/images/slide-bg-2-1.jpg' },
]

export default function Hero(): React.ReactElement {
  const t = useTranslations()
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' })

  React.useEffect(() => {
    if (!emblaApi || slides.length <= 1) return
    const id = setInterval(() => emblaApi.scrollNext(), 4000)
    return () => clearInterval(id)
  }, [emblaApi])

  const [selectedIndex, setSelectedIndex] = React.useState(0)
  React.useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    onSelect()
  }, [emblaApi])

  return (
    <section className="relative">
      <div className="relative overflow-hidden -mt-12" ref={emblaRef}>
        <div className="flex">
          {slides.map((s, i) => (
            <div className="relative flex-[0_0_100%] min-w-0" key={i}>
              <div 
                className="min-h-[90vh] bg-cover bg-center" 
                style={{ backgroundImage: `url(${s.img})` }} 
              />
              <div className="container">
                 <div className="absolute left-1/2 top-[30%] md:top-[35%] -translate-x-1/2 -translate-y-1/2 text-center text-white">
                   <h1 className="font-inter text-5xl md:text-6xl lg:text-7xl mb-4">
                     {t('hero.title2')}
                   </h1>
                   <p className="font-montserrat text-lg md:text-xl mb-6 max-w-2xl mx-auto">
                     {t('hero.text2')}
                   </p>
                 </div>
              </div>
            </div>
          ))}
        </div>
        {slides.length > 1 && (
          <>
            <div className="absolute left-0 right-0 bottom-3 text-center">
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full border-0 mx-1 ${selectedIndex === i ? 'bg-white' : 'bg-white/25'}`}
                  onClick={() => emblaApi && emblaApi.scrollTo(i)}
                  aria-label={`Go to slide ${i+1}`}
                />
              ))}
            </div>
            <button 
              className="absolute top-1/2 -translate-y-1/2 left-4 bg-white/90 border-0 w-10 h-10 rounded-full flex items-center justify-center shadow-sm"
              onClick={() => emblaApi && emblaApi.scrollPrev()} 
              aria-label="Previous"
            >‹</button>
            <button 
              className="absolute top-1/2 -translate-y-1/2 right-4 bg-white/90 border-0 w-10 h-10 rounded-full flex items-center justify-center shadow-sm"
              onClick={() => emblaApi && emblaApi.scrollNext()} 
              aria-label="Next"
            >›</button>
          </>
        )}
      </div>
    </section>
  )
}


