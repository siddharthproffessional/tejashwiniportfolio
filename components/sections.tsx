import { ArrowUpRight, Download, Mail, MapPin } from 'lucide-react'
import { additional, education, engagements, experience, person, recognition, skills } from '@/lib/content'
import { Figure, Reveal } from './motion'

function Heading({ id, eyebrow, title, intro }: { id: string; eyebrow: string; title: string; intro?: string }) {
  return (
    <Reveal className="max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="mt-3 text-5xl sm:text-6xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-muted">{intro}</p>}
    </Reveal>
  )
}

export function Profile() {
  const facts = [
    ['Based in', person.location],
    ['Studying', 'MBA in Finance, Middlesex University Dubai'],
    ['Engineering', 'B.Tech, Electrical Engineering (AKTU)'],
    ['Languages', additional.languages],
  ]
  return (
    <section id="profile" aria-labelledby="profile-title" className="border-t border-border">
      <div className="wrap grid gap-14 py-24 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow">Career objective</p>
          <h2 id="profile-title" className="sr-only">
            Profile
          </h2>
          <Reveal kind="curtain">
            <p className="mt-5 font-display text-[2.1rem] leading-[1.2] text-foreground sm:text-[2.6rem]">{person.objective}</p>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="lg:col-span-5 lg:pt-12">
          <dl className="border-t border-gold/50">
            {facts.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-border py-4 text-sm">
                <dt className="figure text-muted">{k}</dt>
                <dd className="text-foreground/90">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="border-t border-border">
      <div className="wrap py-24 md:py-32">
        <Heading id="experience-title" eyebrow="Professional experience & leadership" title="Experience" />
        <ol className="mt-14 border-t border-border">
          {experience.map((e, i) => (
            <li key={e.title}>
              <Reveal delay={i * 0.05} className="grid gap-2 border-b border-border py-7 transition-colors hover:bg-surface/60 md:grid-cols-12 md:gap-8 md:px-4">
                <p className="figure text-sm text-gold md:col-span-3">{e.period || '—'}</p>
                <div className="md:col-span-4">
                  <h3 className="text-3xl">{e.title}</h3>
                  <p className="mt-1 text-sm text-muted">{e.org}</p>
                </div>
                {e.text && <p className="text-foreground/85 md:col-span-5">{e.text}</p>}
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-20">
          <h3 className="text-3xl">Industry visits & skills series</h3>
        </Reveal>
        <ul className="mt-6 grid gap-px border border-border bg-border md:grid-cols-2">
          {engagements.map((e) => (
            <li key={e.title} className="bg-background p-5">
              <p className="figure text-xs text-gold">{e.period}</p>
              <p className="mt-2 text-foreground/90">{e.title}</p>
              <p className="mt-1 text-sm text-muted">{e.org}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="border-t border-border bg-surface/40">
      <div className="wrap py-24 md:py-32">
        <Heading id="education-title" eyebrow="Education" title="Academic record" />
        <ul className="mt-14 grid gap-6 md:grid-cols-2">
          {education.map((e, i) => {
            const score = e.score?.match(/([\d.]+)%/)
            return (
              <li key={e.title}>
                <Reveal delay={i * 0.08} className="flex h-full flex-col border border-border bg-background p-7 transition-colors hover:border-gold/50">
                  <p className="figure text-xs text-gold">{e.period}</p>
                  <h3 className="mt-3 text-3xl">{e.title}</h3>
                  <p className="mt-2 text-sm text-muted">{e.org}</p>
                  {score ? (
                    <p className="mt-auto pt-8">
                      <Figure value={Number(score[1])} suffix="%" className="gold-text figure text-5xl font-medium" />
                      <span className="ml-3 text-sm text-muted">{e.score?.replace(/^Marks: [\d.]+%\s*/, '') || 'Marks'}</span>
                    </p>
                  ) : (
                    <p className="mt-auto pt-8 text-sm text-emerald">In progress</p>
                  )}
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="border-t border-border">
      <div className="wrap py-24 md:py-32">
        <Heading id="skills-title" eyebrow="Technical skills" title="Toolkit" intro="Grouped exactly as on the resume." />
        <ul className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((g, i) => (
            <li key={g.group} className="group bg-background p-7 transition-colors duration-500 hover:bg-surface">
              <Reveal kind="fade" delay={i * 0.06}>
                <h3 className="text-2xl transition-colors group-hover:text-gold">{g.group}</h3>
                <ul className="mt-5 space-y-2 text-[0.95rem] text-foreground/85">
                  {g.items.map((s) => (
                    <li key={s} className="flex gap-3">
                      <span aria-hidden className="mt-[0.6em] h-1 w-1 shrink-0 rotate-45 bg-gold" />
                      {s}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function Recognition() {
  return (
    <section id="recognition" aria-labelledby="recognition-title" className="border-t border-border">
      <div className="wrap grid gap-14 py-24 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Heading id="recognition-title" eyebrow="Certifications, awards & seminars" title="Recognition" />
        </div>
        <ul className="lg:col-span-7">
          {recognition.map((r, i) => (
            <li key={r.title}>
              <Reveal delay={i * 0.05} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-border py-5">
                <div>
                  <p className="text-lg text-foreground">{r.title}</p>
                  <p className="text-sm text-muted">{r.org}</p>
                </div>
                {r.period && <p className="figure text-xs text-gold">{r.period}</p>}
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
      <div className="wrap pb-24">
        <Reveal className="border border-border p-7 md:flex md:items-center md:justify-between md:gap-10">
          <p className="eyebrow md:w-48 md:shrink-0">Beyond work</p>
          <ul className="mt-4 flex flex-wrap gap-2 md:mt-0">
            {additional.interests.map((x) => (
              <li key={x} className="border border-border px-3 py-1.5 text-sm text-foreground/85">
                {x}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t border-border">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_100%,hsl(var(--gold)/0.12),transparent_70%)]" />
      <div className="wrap relative py-28 text-center md:py-36">
        <div className="hairline mx-auto w-40" />
        <p className="eyebrow mt-10">Contact</p>
        <Reveal>
          <h2 id="contact-title" className="mt-4 text-6xl sm:text-8xl">
            Let’s <span className="gold-text italic">connect</span>.
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href={`mailto:${person.email}`} className="btn btn-gold">
              <Mail className="h-4 w-4" aria-hidden />
              {person.email}
            </a>
            <a href={person.resume} download className="btn btn-line">
              <Download className="h-4 w-4" aria-hidden />
              Download resume
            </a>
            <a href={person.resume} target="_blank" rel="noopener noreferrer" className="btn !px-3 text-muted hover:text-foreground">
              View PDF
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
          <p className="mt-8 inline-flex items-center gap-2 text-sm text-muted">
            <MapPin className="h-4 w-4 text-gold" aria-hidden />
            {person.location}
          </p>
        </Reveal>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="wrap flex flex-col gap-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {person.name}
        </p>
        <a href="#top" className="hover:text-gold">
          Back to top ↑
        </a>
      </div>
    </footer>
  )
}
