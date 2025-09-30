"use client"
import React, { useState } from 'react'
import { useTranslations } from 'next-intl'

export default function ContactForm(): React.ReactElement {
  const t = useTranslations()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({ name: '', email: '', company: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="contact" className="white-bg padding-top-60 padding-bottom-60">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-inter text-3xl md:text-4xl mb-4">Contact Us</h2>
          <p className="text-muted max-w-2xl mx-auto">
            Get in touch with our team to learn more about our solutions and how we can help your business grow.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="your.email@company.com"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="company" className="block text-sm font-medium mb-2">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Your company name"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
                placeholder="Tell us about your project or how we can help you..."
              />
            </div>
            
            <div className="text-center">
              <button
                type="submit"
                className="btn px-8 py-3 text-lg"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
