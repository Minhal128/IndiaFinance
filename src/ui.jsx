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

export function Logo({ className = '' }) {
  return (
    <a href="#top" className={`flex items-center gap-2.5 ${className}`} aria-label="India Finance home">
      <img src="/logo-mark.png" alt="" className="h-8 w-auto" width="580" height="545" />
      <img src="/logo-word.png" alt="India Finance" className="h-4 w-auto md:h-[18px]" width="1080" height="140" />
    </a>
  )
}
