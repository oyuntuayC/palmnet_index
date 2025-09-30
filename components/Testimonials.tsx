"use client"
import React from 'react'

const testimonials = [
  {
    id: 1,
    name: "Maria Rodriguez",
    company: "Café Barcelona",
    role: "Owner",
    content: "PalmPOS has revolutionized our café operations. The system is intuitive and our staff learned it in minutes. Sales have increased by 30% since implementation.",
    avatar: "/images/avatar-1.jpg"
  },
  {
    id: 2,
    name: "James Chen",
    company: "Dragon Wok",
    role: "Manager",
    content: "The kiosk system has reduced our wait times significantly. Customers love the self-service option and our kitchen efficiency has improved dramatically.",
    avatar: "/images/avatar-2.jpg"
  },
  {
    id: 3,
    name: "Sophie Laurent",
    company: "Bistro Paris",
    role: "Operations Director",
    content: "PalmADS has helped us understand our customers better. The analytics are comprehensive and easy to understand. Highly recommended!",
    avatar: "/images/avatar-3.jpg"
  }
]

export default function Testimonials(): React.ReactElement {
  return (
    <section className="white-bg padding-top-60 padding-bottom-60">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="font-inter text-3xl md:text-4xl lg:text-5xl mb-4">
            What Our Satisfying Client Are Saying
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Discover how our solutions are transforming restaurants across Europe
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 relative"
            >
              {/* Quote icon */}
              <div className="absolute -top-4 left-8">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-lg font-bold">"</span>
                </div>
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author info */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4 overflow-hidden">
                  {testimonial.avatar ? (
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500 font-semibold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-sm text-primary font-medium">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-6">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
            <div className="text-gray-600">Happy Clients</div>
          </div>
          <div className="p-6">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">99%</div>
            <div className="text-gray-600">Satisfaction Rate</div>
          </div>
          <div className="p-6">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">24/7</div>
            <div className="text-gray-600">Support</div>
          </div>
          <div className="p-6">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">15+</div>
            <div className="text-gray-600">Countries</div>
          </div>
        </div>
      </div>
    </section>
  )
}
