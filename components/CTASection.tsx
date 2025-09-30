"use client"
import React from 'react'

export default function CTASection(): React.ReactElement {
  return (
    <section 
      className="py-32 md:py-64 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url('/images/cta-bg.jpg')` }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="container relative z-10">
        <div className="text-center text-white">
          <h2 className="font-inter text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight">
            欧洲餐饮数字化<br />
            一站式解决方案
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            与时代同步，与消费同行
          </p>
          <a 
            href="./contact" 
            className="btn bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
          >
            Contact Sales
          </a>
        </div>
      </div>
    </section>
  )
}
