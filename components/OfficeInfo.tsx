"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

const officeStats = [
  {
    title: 'Total Offices',
    value: '4',
    description: 'Across 3 continents'
  },
  {
    title: 'Team Members',
    value: '200+',
    description: 'Global workforce'
  },
  {
    title: 'Countries Served',
    value: '25+',
    description: 'Worldwide presence'
  },
  {
    title: 'Years of Experience',
    value: '8+',
    description: 'Industry expertise'
  }
]

const officeFeatures = [
  {
    icon: (
      <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
      </svg>
    ),
    title: '24/7 Support',
    description: 'Round-the-clock technical support across all time zones'
  },
  {
    icon: (
      <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
      </svg>
    ),
    title: 'Local Expertise',
    description: 'Native teams with deep understanding of local markets'
  },
  {
    icon: (
      <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Fast Implementation',
    description: 'Quick deployment with minimal disruption to operations'
  },
  {
    icon: (
      <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Proven Solutions',
    description: 'Battle-tested technology trusted by thousands of restaurants'
  }
]

export default function OfficeInfo() {
  const t = useTranslations('about')
  
  return (
    <div className="max-w-6xl mx-auto">
      {/* Stats Section */}
      <div className="text-center mb-16">
        <h2 className="font-inter text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {t('stats.title')}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
          {t('stats.subtitle')}
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { key: 'totalOffices', value: '4', descKey: 'acrossContinents' },
            { key: 'teamMembers', value: '200+', descKey: 'globalWorkforce' },
            { key: 'countriesServed', value: '25+', descKey: 'worldwidePresence' },
            { key: 'yearsExperience', value: '8+', descKey: 'industryExpertise' }
          ].map((stat, index) => (
            <motion.div
              key={stat.key}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-1">
                {t(`stats.${stat.key}`)}
              </div>
              <div className="text-sm text-gray-600">
                {t(`stats.${stat.descKey}`)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { key: 'support24', icon: officeFeatures[0].icon },
          { key: 'localExpertise', icon: officeFeatures[1].icon },
          { key: 'fastImplementation', icon: officeFeatures[2].icon },
          { key: 'provenSolutions', icon: officeFeatures[3].icon }
        ].map((feature, index) => (
          <motion.div
            key={feature.key}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {t(`features.${feature.key}`)}
            </h3>
            <p className="text-gray-600">
              {t(`features.${feature.key}Desc`)}
            </p>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <motion.div
        className="mt-16 bg-gray-900 rounded-2xl p-8 md:p-12 text-center text-white"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          {t('cta.title')}
        </h3>
        <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
          {t('cta.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            {t('cta.contactUs')}
          </button>
          <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors">
            {t('cta.viewCareers')}
          </button>
        </div>
      </motion.div>
    </div>
  )
}
