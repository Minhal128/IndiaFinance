import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { inr } from './lib/finance.js'

export const spring = { type: 'spring', stiffness: 100, damping: 20 }

/** Blur-and-rise on first scroll into view. */
export function Reveal({ children, delay = 0, className, as = 'div' }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ ...spring, delay }}
    >
      {children}
    </M>
  )
}

/** Anchor that drifts toward the cursor. Motion values only — no re-renders. */
export function Magnetic({ children, className = '', strength = 0.22, ...props }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 160, damping: 14 })
  const sy = useSpring(y, { stiffness: 160, damping: 14 })
  return (
    <motion.a
      {...props}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.97 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * strength)
        y.set((e.clientY - r.top - r.height / 2) * strength)
      }}
      onPointerLeave={() => { x.set(0); y.set(0) }}
      className={className}
    >
      {children}
    </motion.a>
  )
}

/** Number that springs to its new value. */
export function Num({ value, format = inr }) {
  const s = useSpring(value, { stiffness: 90, damping: 20 })
  useEffect(() => { s.set(value) }, [value, s])
  const text = useTransform(s, (v) => format(v))
  return <motion.span className="tabular-nums">{text}</motion.span>
}

/** Pointer position → CSS vars for the .spotlight border. */
export function spot(e) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
}

/** The tagline's tricolour arc, reused as a section signature. */
export function Arc({ className = 'w-14' }) {
  return (
    <svg viewBox="0 0 60 8" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="arc" x1="0" x2="1">
          <stop offset="0" stopColor="#f0953a" />
          <stop offset="0.5" stopColor="#1f4fd8" />
          <stop offset="1" stopColor="#34a853" />
        </linearGradient>
      </defs>
      <path d="M1 7 Q30 -1 59 7" fill="none" stroke="url(#arc)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/** Section label + headline. `accent` renders in the italic serif. */
export function SectionHead({ index, label, title, accent, lede, className = '', center = false }) {
  return (
    <Reveal className={`${center ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      <div className={`flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-fg/45 ${center ? 'justify-center' : ''}`}>
        <span className="text-brand">{index}</span>
        <span>{label}</span>
        <Arc />
      </div>
      <h2 className="mt-6 font-display text-4xl font-medium leading-[1] tracking-[-0.035em] md:text-6xl">
        {title} {accent && <span className="font-serif italic tracking-[-0.01em] text-brand">{accent}</span>}
      </h2>
      {lede && <p className={`mt-6 max-w-[58ch] text-base leading-relaxed text-fg/60 ${center ? 'mx-auto' : ''}`}>{lede}</p>}
    </Reveal>
  )
}

/** Top of every inner page: breadcrumb, headline, lede, and a page-specific visual on the right. */
export function PageHero({ crumbs = [], eyebrow, title, accent, lede, children, aside }) {
  return (
    <section className="relative overflow-hidden pt-32 md:pt-40">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(10_26_74/0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgb(10_26_74/0.045)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_70%_70%_at_70%_30%,black,transparent)]" />
        <div className="absolute -right-40 -top-48 size-[640px] rounded-full bg-brand/12 blur-[140px]" />
        <div className="absolute -left-40 top-40 size-[380px] rounded-full bg-saffron/10 blur-[120px]" />
      </div>
      <div className={`relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 md:px-6 md:pb-24 ${aside ? 'lg:grid-cols-[1.05fr_0.95fr]' : ''}`}>
        <motion.div initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={spring}>
          {crumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-fg/45">
              {crumbs.map(([label, href], i) => (
                <span key={label} className="flex items-center gap-2">
                  {i > 0 && <span className="text-fg/25">/</span>}
                  {href ? <a href={href} className="hover:text-brand">{label}</a> : <span className="text-fg/70">{label}</span>}
                </span>
              ))}
            </nav>
          )}
          {eyebrow && <div className="mt-6">{eyebrow}</div>}
          <h1 className="mt-5 max-w-3xl font-display text-[2.6rem] font-medium leading-[1] tracking-[-0.04em] sm:text-6xl lg:text-[4.4rem]">
            {title} {accent && <span className="font-serif italic tracking-[-0.02em] text-brand">{accent}</span>}
          </h1>
          {lede && <p className="mt-6 max-w-[56ch] text-base leading-relaxed text-fg/65 md:text-lg">{lede}</p>}
          {children}
        </motion.div>
        {aside && (
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ ...spring, delay: 0.15 }}>
            {aside}
          </motion.div>
        )}
      </div>
    </section>
  )
}

export function Logo({ className = '' }) {
  return (
    <a href="/" className={`flex items-center gap-2.5 ${className}`} aria-label="India Finance home">
      <img src="/logo-mark.png" alt="" className="h-8 w-auto" width="580" height="545" />
      <img src="/logo-word.png" alt="India Finance" className="h-4 w-auto md:h-[18px]" width="1080" height="140" />
    </a>
  )
}
