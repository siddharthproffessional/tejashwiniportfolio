'use client'

import { motion } from 'framer-motion'
import { useReduced } from './motion'

const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="figure absolute bottom-3 left-3 z-10 border border-border bg-background/85 px-2 py-1 text-[0.65rem] text-muted">{children}</span>
)

/** Returns distribution with a VaR cut-off and a projection-vs-actual backtest — illustrative shapes. */
export function RiskVisual() {
  const reduce = useReduced()
  const bars = Array.from({ length: 23 }, (_, i) => {
    const x = (i - 11) / 4.2
    return Math.exp(-x * x) * (1 + (i < 6 ? 0.25 : 0))
  })
  const proj = 'M20 140 C 70 120, 110 110, 150 92 S 230 70, 280 52'
  const act = 'M20 140 C 60 128, 100 132, 150 104 S 220 96, 280 78'
  return (
    <div className="relative h-full w-full bg-surface">
      <svg viewBox="0 0 600 340" className="absolute inset-0 h-full w-full" aria-hidden>
        <g transform="translate(30 40)">
          {bars.map((h, i) => (
            <motion.rect
              key={i}
              x={i * 12}
              width="9"
              y={200 - h * 170}
              height={h * 170}
              fill={i < 4 ? 'hsl(var(--danger) / .75)' : 'hsl(var(--emerald) / .75)'}
              initial={reduce ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              style={{ transformOrigin: `${i * 12}px 200px` }}
              transition={{ duration: 0.7, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
          <line x1="46" x2="46" y1="10" y2="206" stroke="hsl(var(--gold))" strokeDasharray="4 4" />
          <text x="52" y="22" fill="hsl(var(--gold))" fontSize="12" fontFamily="var(--font-mono)">
            VaR (95%)
          </text>
          <line x1="0" x2="276" y1="206" y2="206" stroke="hsl(var(--border))" />
          <text x="0" y="228" fill="hsl(var(--muted))" fontSize="11" fontFamily="var(--font-mono)">
            Return distribution
          </text>
        </g>
        <g transform="translate(300 40)">
          <rect x="0" y="0" width="290" height="206" fill="none" stroke="hsl(var(--border))" />
          {[proj, act].map((d, i) => (
            <motion.path
              key={i}
              d={d}
              fill="none"
              stroke={i === 0 ? 'hsl(var(--gold))' : 'hsl(var(--foreground) / .75)'}
              strokeWidth="2"
              strokeDasharray={i === 1 ? '5 4' : undefined}
              initial={reduce ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, delay: 0.3 + i * 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
          <text x="0" y="228" fill="hsl(var(--muted))" fontSize="11" fontFamily="var(--font-mono)">
            Projection vs actual (backtest)
          </text>
          <text x="196" y="40" fill="hsl(var(--gold))" fontSize="11" fontFamily="var(--font-mono)">
            projected
          </text>
          <text x="210" y="106" fill="hsl(var(--foreground) / .75)" fontSize="11" fontFamily="var(--font-mono)">
            actual
          </text>
        </g>
      </svg>
      <Tag>Illustrative chart — not project output</Tag>
    </div>
  )
}

/** Flow from Generative AI through data-centre load to renewable demand and green-asset volatility. */
export function NexusVisual() {
  const reduce = useReduced()
  const nodes = [
    { x: 80, y: 170, t: 'Generative AI' },
    { x: 230, y: 90, t: 'Hyperscale data centres' },
    { x: 230, y: 250, t: 'AI-driven capex' },
    { x: 390, y: 170, t: 'Renewable energy demand' },
    { x: 530, y: 100, t: 'Green-asset volatility' },
    { x: 530, y: 240, t: 'ESG disclosures' },
  ]
  const edges: [number, number][] = [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5]]
  return (
    <div className="relative h-full w-full bg-surface">
      <svg viewBox="0 0 620 340" className="absolute inset-0 h-full w-full" aria-hidden>
        {edges.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="hsl(var(--gold) / .7)"
            strokeWidth="1.4"
            strokeDasharray="5 6"
            animate={reduce ? undefined : { strokeDashoffset: [0, -44] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
          />
        ))}
        {nodes.map((n, i) => (
          <g key={n.t}>
            <motion.circle
              cx={n.x}
              cy={n.y}
              r={i === 3 ? 13 : 9}
              fill="hsl(var(--background))"
              stroke={i === 3 ? 'hsl(var(--gold))' : 'hsl(var(--emerald))'}
              strokeWidth="2"
              initial={reduce ? false : { scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            />
            <text x={n.x} y={n.y + 32} textAnchor="middle" fill="hsl(var(--foreground) / .85)" fontSize="12.5" fontFamily="var(--font-sans)">
              {n.t}
            </text>
          </g>
        ))}
      </svg>
      <Tag>Research scope diagram</Tag>
    </div>
  )
}

/** Flight path over a skyline with the telemetry readouts described in the project. */
export function FlightVisual() {
  const reduce = useReduced()
  const towers = [40, 70, 55, 110, 85, 140, 95, 60, 120, 75, 50, 90]
  const path = 'M30 230 C 160 120, 300 80, 420 120 S 560 170, 600 110'
  return (
    <div className="relative h-full w-full overflow-hidden bg-surface">
      <svg viewBox="0 0 620 340" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="hsl(var(--emerald) / .18)" />
            <stop offset="1" stopColor="transparent" />
          </linearGradient>
        </defs>
        <rect width="620" height="340" fill="url(#sky)" />
        {towers.map((h, i) => (
          <rect key={i} x={20 + i * 50} y={320 - h} width="34" height={h} fill="hsl(var(--raised))" stroke="hsl(var(--border))" />
        ))}
        <path id="route" d={path} fill="none" stroke="hsl(var(--gold) / .55)" strokeWidth="1.5" strokeDasharray="4 6" />
        {reduce ? (
          <circle cx="420" cy="120" r="6" fill="hsl(var(--gold))" />
        ) : (
          <circle r="6" fill="hsl(var(--gold))">
            <animateMotion dur="7s" repeatCount="indefinite" rotate="auto" path={path} />
          </circle>
        )}
      </svg>
      <div className="panel figure absolute left-4 top-4 w-56 p-3 text-[0.7rem] leading-relaxed text-foreground/85">
        <p className="mb-1 text-gold">Fly-Air Ambulance HUD</p>
        <p className="flex justify-between gap-4">
          <span className="text-muted">Velocity</span>55.7 km/h
        </p>
        <p className="flex justify-between gap-4">
          <span className="text-muted">Battery SoC</span>94.83%
        </p>
        <p className="flex justify-between gap-4">
          <span className="text-muted">Attitude</span>pitch / roll
        </p>
        <p className="flex justify-between gap-4">
          <span className="text-muted">Clearance</span>min. building
        </p>
      </div>
      <Tag>Illustration of the readouts described — not a screenshot</Tag>
    </div>
  )
}
