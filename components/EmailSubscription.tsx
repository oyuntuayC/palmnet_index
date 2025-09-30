"use client"
import React, { useState } from 'react'
import { useTranslations } from 'next-intl'

export default function EmailSubscription(): React.ReactElement {
  const t = useTranslations()
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true)
      setIsLoading(false)
      setEmail('')
    }, 1000)
  }

  if (isSubscribed) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2">Thank you for subscribing!</h3>
            <p className="text-gray-600">We'll keep you updated with the latest news and updates.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="font-inter text-3xl md:text-4xl mb-4">Stay Updated</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Subscribe to our newsletter and get the latest updates on restaurant technology solutions, industry insights, and exclusive offers.
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-4 py-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="btn px-6 py-3 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          <p className="text-xs text-gray-500 text-center mt-3">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  )
}
