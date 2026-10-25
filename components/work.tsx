'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { projects, type Project } from '@/lib/content'
import { cn } from '@/lib/utils'
import { FlightVisual, NexusVisual, RiskVisual } from './visuals'
import { useReduced } from './motion'

const VISUAL = { risk: RiskVisual, nexus: NexusVisual, flight: FlightVisual }
const useIso = typeof window === 'undefined' ? useEffect : useLayoutEffect

/**
 * Selected work. On large screens the section pins and vertical scrolling moves the
 * project track sideways; on smaller screens or with reduced motion it is a simple stack.
 * Each project opens a full case study in a modal dialog.
 */
export function Work() {
  const reduce = useReduced()
  const [wide, setWide] = useState(false)
  const [openId, setOpenId] = useState<string | null>(null)
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)

  useIso(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => {
      setWide(mq.matches)
      if (track.current) setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth + 96))
    }
    update()
    mq.addEventListener('change', update)
    window.addEventListener('resize', update)
    return () => {
      mq.removeEventListener('change', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const pinned = wide && !reduce
  // Re-measure once the track switches to its horizontal layout
  useIso(() => {
    if (pinned && track.current) setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth + 96))
  }, [pinned])
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -distance])

  return (
    <section ref={section} id="work" aria-labelledby="work-title" className="relative" style={pinned ? { height: `calc(100vh + ${distance}px)` } : undefined}>
      <div className={cn(pinned && 'sticky top-0 flex h-screen flex-col justify-center overflow-hidden')}>
        <div className="wrap pb-10 pt-24 lg:pt-16">
          <p className="eyebrow">Selected work</p>
          <h2 id="work-title" className="mt-3 text-5xl sm:text-6xl">
            Projects
          </h2>
          {pinned && <p className="mt-3 text-sm text-muted">Scroll to move through the projects · select one to read the case study</p>}
        </div>
        <motion.div ref={track} style={pinned ? { x } : undefined} className={cn('flex gap-8', pinned ? 'w-max pl-[max(3rem,calc((100vw-76rem)/2+3rem))] pr-12' : 'wrap flex-col pb-10')}>
          {projects.map((p, i) => (
            <Card key={p.id} p={p} index={i} onOpen={() => setOpenId(p.id)} pinned={pinned} />
          ))}
        </motion.div>
      </div>
      <CaseStudy project={projects.find((p) => p.id === openId) ?? null} onClose={() => setOpenId(null)} />
    </section>
  )
}

function Card({ p, index, onOpen, pinned }: { p: Project; index: number; onOpen: () => void; pinned: boolean }) {
  const Visual = VISUAL[p.visual]
  return (
    <article className={cn('group flex shrink-0 flex-col border border-border bg-surface/60 transition-colors duration-500 hover:border-gold/60', pinned ? 'w-[min(56rem,78vw)] lg:flex-row' : 'w-full')}>
      <div className={cn('relative overflow-hidden', pinned ? 'aspect-[16/11] lg:w-[58%]' : 'aspect-[4/3] sm:aspect-[16/10]')}>
        <Visual />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className="figure text-xs text-gold">
          {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')} · {p.date}
        </p>
        <h3 className="mt-3 text-3xl sm:text-4xl">{p.title}</h3>
        <p className="mt-2 text-sm text-muted">{p.context}</p>
        <p className="mt-4 text-foreground/85">{p.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {p.methods.slice(0, 5).map((m) => (
            <li key={m} className="border border-border px-2.5 py-1 text-xs text-foreground/80">
              {m}
            </li>
          ))}
        </ul>
        <button type="button" onClick={onOpen} className="btn btn-line mt-auto self-start !mt-7">
          Read the case study
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
        </button>
      </div>
    </article>
  )
}

function CaseStudy({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (project && !d.open) d.showModal()
    if (!project && d.open) d.close()
  }, [project])
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby="case-title"
      className="m-auto max-h-[90vh] w-[min(56rem,calc(100vw-2rem))] overflow-y-auto border border-border bg-background p-0 text-foreground backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      {project && (
        <div className="relative">
          <button type="button" onClick={onClose} aria-label="Close case study" className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center border border-border bg-background/80 hover:border-gold">
            <X className="h-5 w-5" />
          </button>
          <div className="relative aspect-[4/3] border-b sm:aspect-[16/8] border-border">{(() => { const V = VISUAL[project.visual]; return <V /> })()}</div>
          <div className="p-6 sm:p-10">
            <p className="figure text-xs text-gold">{project.date}</p>
            <h3 id="case-title" className="mt-3 text-4xl sm:text-5xl">
              {project.title}
            </h3>
            <p className="mt-2 text-muted">{project.context}</p>
            <div className="mt-8 space-y-4 text-[1.0625rem] leading-relaxed text-foreground/90">
              {project.body.map((b) => (
                <p key={b}>{b}</p>
              ))}
            </div>
            {project.highlights && (
              <ul className="mt-8 grid gap-px border border-border bg-border">
                {project.highlights.map((h) => (
                  <li key={h.title} className="bg-background p-5">
                    <p className="font-display text-2xl text-gold">{h.title}</p>
                    <p className="mt-2 text-foreground/85">{h.text}</p>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-8">
              <p className="eyebrow">Methods & tools</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {project.methods.map((m) => (
                  <li key={m} className="border border-border px-2.5 py-1 text-sm text-foreground/85">
                    {m}
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-8 text-sm text-muted">Demo links and files are available on request.</p>
          </div>
        </div>
      )}
    </dialog>
  )
}
