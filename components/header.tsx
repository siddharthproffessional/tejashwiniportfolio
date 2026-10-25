'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { person } from '@/lib/content'
import { cn } from '@/lib/utils'

const links = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export function Header() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive('#' + e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' },
    )
    links.forEach((l) => {
      const el = document.querySelector(l.href)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className={cn('transition-colors duration-500', solid || open ? 'border-b border-border bg-background/80 backdrop-blur-xl' : 'border-b border-transparent')}>
        <nav aria-label="Main" className="wrap flex h-16 items-center justify-between">
          <a href="#top" className="flex items-baseline gap-3" onClick={() => setOpen(false)}>
            <span className="gold-text font-display text-3xl font-semibold leading-none">TV</span>
            <span className="hidden text-sm tracking-wide text-foreground/80 sm:inline">{person.name}</span>
          </a>
          <ul className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} aria-current={active === l.href ? 'true' : undefined} className={cn('group relative py-2 text-sm transition-colors', active === l.href ? 'text-gold' : 'text-muted hover:text-foreground')}>
                  {l.label}
                  <span className={cn('absolute inset-x-0 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-500 ease-lux', active === l.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100')} />
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <a href={person.resume} target="_blank" rel="noopener noreferrer" className="btn btn-line hidden !px-4 !py-2 sm:inline-flex">
              Resume
            </a>
            <button type="button" aria-expanded={open} aria-controls="menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)} className="inline-flex h-10 w-10 items-center justify-center border border-border md:hidden">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
        <motion.div aria-hidden style={{ scaleX: progress }} className="h-px origin-left bg-gradient-to-r from-emerald via-gold to-emerald" />
      </div>
      {open && (
        <div id="menu" className="fixed inset-x-0 bottom-0 top-16 bg-background/95 backdrop-blur-xl md:hidden">
          <ul className="wrap pt-6">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block border-b border-border py-4 font-display text-4xl">
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-6">
              <a href={person.resume} target="_blank" rel="noopener noreferrer" className="btn btn-gold w-full" onClick={() => setOpen(false)}>
                View resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
