"use client"
import React from 'react'
import Hero from './Hero'
import Solutions from './Solutions'
import Features from './Features'
import Testimonials from './Testimonials'
import CTASection from './CTASection'
import BlogsSection from './BlogsSection'
import EmailSubscription from './EmailSubscription'
import Partners from './Partners'
import { BlogPost } from '../lib/blog'

type Props = {
  posts: BlogPost[]
}

export default function HomePage({ posts }: Props): React.ReactElement {
  return (
    <>
      <Hero />
      <Solutions />
      <Features />
      <Testimonials />
      <CTASection />
      <BlogsSection posts={posts} />
      <EmailSubscription />
      <Partners />
      <BackToTop />
    </>
  )
}

function BackToTop(): React.ReactElement | null {
  const [show, setShow] = React.useState(false)
  React.useEffect(()=>{
    const onScroll = () => setShow(window.scrollY > 200)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return show ? (
    <a href="#wrap" className="go-up" aria-label="Back to top">↑</a>
  ) : null
}

