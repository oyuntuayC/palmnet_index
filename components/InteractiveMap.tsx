"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { offices } from './CobeGlobe'

// 动态导入3D地球组件以避免SSR问题
const CobeGlobe = dynamic(() => import('./CobeGlobe'), { ssr: false })

interface Office {
  id: string
  name: string
  city: string
  country: string
  coordinates: [number, number]
  address: string
  phone: string
  email: string
  description: string
  timezone: string
}

export default function InteractiveMap() {
  const [activeOffice, setActiveOffice] = useState<Office | null>(() => offices[0] ?? null)

  const handleOfficeClick = (office: Office) => {
    setActiveOffice(office)
  }

  const handleOfficeHover = (officeId: string | null) => {
    if (officeId) {
      const office = offices.find(o => o.id === officeId)
      if (office) {
        setActiveOffice(office)
      }
    }
  }

  return (
    <div className="space-y-8">
      {/* Desktop: Left list, Right globe; Mobile: stacked */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left: Office list (single column on desktop) */}
        <div className="order-2 lg:order-1 lg:pr-2 hidden lg:block">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6">
            {offices.map((office, index) => (
              <motion.div
                key={office.id}
                className={`
                  rounded-xl p-4 md:p-6 cursor-pointer transition-all duration-300
                  ${activeOffice?.id === office.id 
                    ? 'bg-gray-100 scale-101' 
                    : 'bg-white hover:scale-101'
                  }
                `}
                onClick={() => handleOfficeClick(office)}
                onMouseEnter={() => handleOfficeHover(office.id)}
                onMouseLeave={() => handleOfficeHover(null)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-2">
                  <h3 className="text-base md:text-lg font-semibold text-gray-900">
                    {office.city}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 ml-2">
                  {office.country}
                  </p>
                </div>
                
                <div className="space-y-0.5 text-xs md:text-sm text-gray-500">
                  <div className="flex items-start">
                    <svg className="w-3 h-3 md:w-4 md:h-4 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span className="truncate text-xs md:text-sm">{office.address}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <svg className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="truncate">{office.phone}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <svg className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="truncate">{office.timezone}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: 3D Globe */}
        <div className="order-1 lg:order-2">
          {/* Mobile: City buttons above the globe */}
          <div className="mb-4 lg:hidden">
            <div className="flex flex-wrap gap-2 justify-center">
              {offices.map((office) => (
                <button
                  key={office.id}
                  className={`px-3 py-1.5 text-sm font-medium rounded-full border transition-colors duration-200 ${
                    activeOffice?.id === office.id
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-700 border-gray-300'
                  }`}
                  onClick={() => handleOfficeClick(office)}
                  aria-pressed={activeOffice?.id === office.id}
                >
                  {office.city}
                </button>
              ))}
            </div>
          </div>
          <CobeGlobe 
            activeOffice={activeOffice} 
            onOfficeClick={handleOfficeClick}
          />
          {activeOffice && (
            <div className="mt-4 p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900">{activeOffice.name}</h3>
              <p className="text-sm text-gray-600 mt-1 lg:hidden">{activeOffice.city}, {activeOffice.country}</p>
              <p className="text-sm md:text-base text-gray-700 mt-3">{activeOffice.description}</p>
              {/* Mobile-only details under description */}
              <div className="mt-4 space-y-2 text-xs md:text-sm text-gray-500 lg:hidden">
                <div className="flex items-start">
                  <svg className="w-3 h-3 md:w-4 md:h-4 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span className="truncate">{activeOffice.address}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="truncate">{activeOffice.phone}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="truncate">{activeOffice.timezone}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
    </div>
  )
}
