"use client"
import React, { useRef, useEffect, useState } from 'react'
import createGlobe from 'cobe'
import { motion } from 'framer-motion'

interface Office {
  id: string
  name: string
  city: string
  country: string
  coordinates: [number, number] // [lat, lng]
  address: string
  phone: string
  email: string
  description: string
  timezone: string
}

const offices: Office[] = [
  {
    id: 'qingdao',
    name: 'Qingdao Office',
    city: 'Qingdao',
    country: 'China',
    coordinates: [36.0662, 120.3552],
    address: 'No. 88 Hong Kong Middle Road, Shinan District, Qingdao, China',
    phone: '+86 532 1234 5678',
    email: 'qingdao@palmnet.com',
    description: 'Our headquarters and main development center, where we develop cutting-edge restaurant technology solutions.',
    timezone: 'CST (UTC+8)'
  },
  {
    id: 'hangzhou',
    name: 'Hangzhou Office',
    city: 'Hangzhou',
    country: 'China',
    coordinates: [30.2741, 120.1551],
    address: 'No. 1 Wulin Square, Xiacheng District, Hangzhou, China',
    phone: '+86 571 8765 4321',
    email: 'hangzhou@palmnet.com',
    description: 'Our innovation lab focused on AI and machine learning applications for restaurant operations.',
    timezone: 'CST (UTC+8)'
  },
  {
    id: 'barcelona',
    name: 'Barcelona Office',
    city: 'Barcelona',
    country: 'Spain',
    coordinates: [41.3851, 2.1734],
    address: 'Passeig de Gràcia, 92, 08008 Barcelona, Spain',
    phone: '+34 93 123 4567',
    email: 'barcelona@palmnet.com',
    description: 'Our European headquarters, serving customers across Europe with localized solutions.',
    timezone: 'CET (UTC+1)'
  },
  {
    id: 'paris',
    name: 'Paris Office',
    city: 'Paris',
    country: 'France',
    coordinates: [48.8566, 2.3522],
    address: '123 Avenue des Champs-Élysées, 75008 Paris, France',
    phone: '+33 1 23 45 67 89',
    email: 'paris@palmnet.com',
    description: 'Our French operations center, specializing in fine dining and luxury restaurant solutions.',
    timezone: 'CET (UTC+1)'
  }
]

interface CobeGlobeProps {
  activeOffice: Office | null
  onOfficeClick: (office: Office) => void
}

export default function CobeGlobe({ activeOffice, onOfficeClick }: CobeGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const globeRef = useRef<any>(null)
  const [isGlobeReady, setIsGlobeReady] = useState(false)
  // Interaction & animation refs
  const phiRef = useRef(0)
  const thetaRef = useRef(0)
  const scaleRef = useRef(0.75)
  const isDraggingRef = useRef(false)
  const isAnimatingRef = useRef(false)
  const pointerStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const anglesStartRef = useRef<{ phi: number; theta: number }>({ phi: 0, theta: 0 })
  const scaleAnimTokenRef = useRef(0)

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    let width = 0
    let height = 0
    let size = 0
    const onResize = () => {
      if (!containerRef.current || !canvasRef.current) return
      width = containerRef.current.clientWidth
      height = containerRef.current.clientHeight
      size = Math.min(width, height)
      // Center the canvas and use a square size to keep the globe fully visible
      canvasRef.current.style.width = `${size}px`
      canvasRef.current.style.height = `${size}px`
      canvasRef.current.style.position = 'absolute'
      canvasRef.current.style.left = '50%'
      canvasRef.current.style.top = '50%'
      canvasRef.current.style.transform = 'translate(-50%, -50%)'
    }
    window.addEventListener('resize', onResize)
    onResize()

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: (size || 1) * 2,
      height: (size || 1) * 2,
      phi: phiRef.current,
      theta: thetaRef.current,
      // 缩小地球比例，避免超出容器
      scale: 0.75,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.9, 0.9, 0.9],
      markerColor: [1, 0.5, 0.5],
      glowColor: [0.9, 0.9, 0.9],
      markers: offices.map((office) => ({
        location: [office.coordinates[0], office.coordinates[1]],
        size: 0.03,
      })),
      onRender: (state) => {
        // 使用当前角度，不做任何自动旋转
        state.phi = phiRef.current
        state.theta = thetaRef.current
        state.scale = scaleRef.current
      },
    })

    globeRef.current = globe
    setIsGlobeReady(true)

    // Pointer controls (drag to rotate)
    const el = canvasRef.current
    const onPointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true
      el.setPointerCapture(e.pointerId)
      pointerStartRef.current = { x: e.clientX, y: e.clientY }
      anglesStartRef.current = { phi: phiRef.current, theta: thetaRef.current }
    }
    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return
      const dx = e.clientX - pointerStartRef.current.x
      const dy = e.clientY - pointerStartRef.current.y
      const ROTATE_SENSITIVITY = 0.005
      phiRef.current = anglesStartRef.current.phi + dx * ROTATE_SENSITIVITY
      // Clamp theta to avoid flipping over the poles
      const nextTheta = anglesStartRef.current.theta + dy * ROTATE_SENSITIVITY
      const limit = Math.PI / 2 - 0.05
      thetaRef.current = Math.max(-limit, Math.min(limit, nextTheta))
    }
    const endDrag = (e: PointerEvent) => {
      if (!isDraggingRef.current) return
      isDraggingRef.current = false
      try { el.releasePointerCapture(e.pointerId) } catch {}
    }
    el.addEventListener('pointerdown', onPointerDown)
    el.addEventListener('pointermove', onPointerMove)
    el.addEventListener('pointerup', endDrag)
    el.addEventListener('pointerleave', endDrag)

    return () => {
      globe.destroy()
      window.removeEventListener('resize', onResize)
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerup', endDrag)
      el.removeEventListener('pointerleave', endDrag)
    }
  }, [])

  // 当选择办公室时，旋转到对应位置
  useEffect(() => {
    if (activeOffice && globeRef.current) {
      const lonRad = (activeOffice.coordinates[1] * Math.PI) / 180
      const latRad = (activeOffice.coordinates[0] * Math.PI) / 180
      const targetPhi = -lonRad - Math.PI/2
      const targetTheta = latRad
      isAnimatingRef.current = true

      // 平滑过渡到目标位置
      const startTime = Date.now()
      const duration = 1600
      const startPhi = phiRef.current
      const startTheta = thetaRef.current
      // 计算根据旋转距离的缩放深度
      const targetScale = 0.95
      const startScale = scaleRef.current
      const shortestAngle = (a: number, b: number) => Math.atan2(Math.sin(a - b), Math.cos(a - b))
      const deltaPhi = shortestAngle(targetPhi, startPhi)
      const deltaTheta = targetTheta - startTheta
      const angleMagnitude = Math.hypot(deltaPhi, deltaTheta)
      const normalizedDistance = Math.min(1, Math.max(0, angleMagnitude / Math.PI))
      const maxShrink = 0.25 // 最大缩小幅度
      const minScale = Math.max(0.6, targetScale - maxShrink * normalizedDistance)
      
      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        // easeInOutCubic，避免末尾过慢
        const easeProgress = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2
        
        const currentPhi = startPhi + (targetPhi - startPhi) * easeProgress
        const currentTheta = startTheta + (targetTheta - startTheta) * easeProgress
        
        phiRef.current = currentPhi
        thetaRef.current = currentTheta
        // 缩放：前半段从 startScale -> minScale，后半段从 minScale -> targetScale
        const localEase = (x: number) => (x < 0.5
          ? 2 * x * x
          : 1 - Math.pow(-2 * x + 2, 2) / 2)
        if (progress <= 0.5) {
          const p = localEase(progress / 0.5)
          scaleRef.current = startScale + (minScale - startScale) * p
        } else {
          const p = localEase((progress - 0.5) / 0.5)
          scaleRef.current = minScale + (targetScale - minScale) * p
        }
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          isAnimatingRef.current = false
          scaleRef.current = targetScale
        }
      }
      
      animate()
    } else if (!activeOffice && globeRef.current) {
      // 重置到默认位置
      isAnimatingRef.current = true
      const startTime = Date.now()
      const duration = 1500
      const startPhi = phiRef.current
      const startTheta = thetaRef.current
      // 回到默认时恢复默认缩放
      animateScaleTo(0.75, 300)
      
      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easeProgress = 1 - Math.pow(1 - progress, 3)
        
        phiRef.current = startPhi * (1 - easeProgress)
        thetaRef.current = startTheta + (0.3 - startTheta) * easeProgress
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          isAnimatingRef.current = false
        }
      }
      
      animate()
    }
  }, [activeOffice])

  // 缩放动画：以最新 token 防止并发冲突
  const animateScaleTo = (targetScale: number, duration: number) => {
    const token = ++scaleAnimTokenRef.current
    const startTime = Date.now()
    const startScale = scaleRef.current

    const step = () => {
      // 如果有新的动画开始，终止旧动画
      if (token !== scaleAnimTokenRef.current) return
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      scaleRef.current = startScale + (targetScale - startScale) * ease
      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }

    requestAnimationFrame(step)
  }

  return (
    <div ref={containerRef} className="relative w-full h-96 md:h-[500px] bg-gradient-to-br rounded-2xl overflow-hidden">
      <canvas
        ref={canvasRef}
        className="cursor-grab active:cursor-grabbing"
      />
      
      {/* 办公室标签覆盖层 - 简化版本，只显示选中的办公室 */}
      {isGlobeReady && activeOffice && (
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/2 left-1/2 pointer-events-auto cursor-pointer z-20"
            style={{
              transform: 'translate(calc(-50% + 12px), calc(-50% + 12px))',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={() => onOfficeClick(activeOffice)}
            whileHover={{ scale: 1.05 }}
          >
            <div className="bg-white px-4 py-2 rounded-full shadow-lg text-sm font-medium text-black whitespace-nowrap">
              {activeOffice.name}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export { offices }
