'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

export const EASE = [0.16, 1, 0.3, 1] as const

/** Reduced-motion preference that matches on server and first client render, then updates. */
export function useReduced() {
  const pref = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted && Boolean(pref)
}

type Kind = 'rise' | 'curtain' | 'fade'
const v = {
  rise: { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0 } },
  curtain: { hidden: { clipPath: 'inset(0 100% 0 0)' }, show: { clipPath: 'inset(0 0% 0 0)' } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
}

export function Reveal({ children, kind = 'rise', delay = 0, className }: { children: React.ReactNode; kind?: Kind; delay?: number; className?: string }) {
  const reduce = useReduced()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      variants={v[kind]}
      transition={{ duration: kind === 'curtain' ? 1.2 : 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/** Counts a figure up once when it scrolls into view (keeps the source's decimals). */
export function Figure({ value, suffix = '', className }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReduced()
  const decimals = (String(value).split('.')[1] || '').length
  const [n, setN] = useState(value)
  useEffect(() => {
    if (!inView || reduce) return
    let raf = 0
    const t0 = performance.now()
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / 1400)
      setN(value * (1 - Math.pow(1 - t, 3)))
      if (t < 1) raf = requestAnimationFrame(step)
    }
    setN(0)
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduce, value])
  return (
    <span ref={ref} className={className}>
      {n.toFixed(decimals)}
      {suffix}
    </span>
  )
}
