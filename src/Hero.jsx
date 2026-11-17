import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, CheckCircle, List, Phone, ShieldCheck, Star, WhatsappLogo, X } from '@phosphor-icons/react'
import { CONTACT, LOANS, wa } from './data.js'
import { emi, inr } from './lib/finance.js'
import { Logo, Magnetic, Num, Reveal, spring } from './ui.jsx'
import IndiaMap from './IndiaMap.jsx'

const LINKS = [
  ['Loans', '#loans'],
  ['Process', '#process'],
  ['Calculators', '#calculators'],
  ['Documents', '#documents'],
  ['FAQ', '#faq'],
]
const HELLO = wa('Hello India Finance, I would like to discuss a loan.')

export function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:pt-4">
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ...spring, delay: 0.1 }}
        className="glass mx-auto flex max-w-6xl items-center justify-between rounded-full py-2 pl-4 pr-2 md:pl-5"
      >
        <Logo />
        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map(([label, href]) => (
            <li key={href}>
              <a href={href} className="rounded-full px-3.5 py-2 text-[13px] font-medium text-fg/65 transition-colors hover:text-fg">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1.5">
          <a href={CONTACT.tel} className="hidden items-center gap-2 rounded-full px-3 py-2 font-mono text-[13px] text-fg/80 transition-colors hover:text-fg md:flex">
            <Phone size={15} weight="bold" className="text-brand" /> {CONTACT.phone}
          </a>
          <Magnetic href="#contact" className="hidden items-center gap-1.5 rounded-full bg-fg px-4 py-2.5 text-[13px] font-semibold text-bg sm:flex">
            Apply now <ArrowUpRight size={14} weight="bold" />
          </Magnetic>
          <button
            onClick={() => setOpen((o) => !o)}
            className="grid size-10 place-items-center rounded-full bg-fg/10 text-fg transition active:scale-95 lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </motion.nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={spring}
            className="glass mx-auto mt-2 max-w-6xl rounded-3xl bg-bg/90 p-3 lg:hidden"
          >
            <motion.ul initial="h" animate="s" variants={{ s: { transition: { staggerChildren: 0.04 } } }}>
              {[...LINKS, ['Contact', '#contact']].map(([label, href]) => (
                <motion.li key={href} variants={{ h: { opacity: 0, x: -10 }, s: { opacity: 1, x: 0 } }}>
                  <a href={href} onClick={() => setOpen(false)} className="flex items-center justify-between rounded-2xl px-4 py-3 font-display text-xl text-fg hover:bg-fg/5">
                    {label} <ArrowRight size={18} className="text-fg/40" />
                  </a>
                </motion.li>
              ))}
            </motion.ul>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <a href={CONTACT.tel} className="flex items-center justify-center gap-2 rounded-2xl bg-fg/10 py-3 text-sm font-semibold">
                <Phone size={18} weight="bold" /> Call
              </a>
              <a href={HELLO} target="_blank" rel="noopener" className="flex items-center justify-center gap-2 on-dark rounded-2xl bg-brand py-3 text-sm font-semibold">
                <WhatsappLogo size={18} weight="fill" /> WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

const blurIn = {
  h: { opacity: 0, y: 24, filter: 'blur(10px)' },
  s: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 70, damping: 18 } },
}

// "Loan" across Indian languages
const LOAN_WORDS = [
  ['ऋण', 'Hindi'], ['ঋণ', 'Bengali'], ['கடன்', 'Tamil'], ['రుణం', 'Telugu'], ['कर्ज', 'Marathi'],
  ['ಸಾಲ', 'Kannada'], ['വായ്പ', 'Malayalam'], ['ਕਰਜ਼ਾ', 'Punjabi'], ['ધિરાણ', 'Gujarati'], ['ଋଣ', 'Odia'],
]

function LoanWord() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % LOAN_WORDS.length), 1800)
    return () => clearInterval(t)
  }, [])
  const [word, lang] = LOAN_WORDS[i]
  return (
    <span className="inline-flex items-center gap-3 rounded-2xl border border-fg/10 bg-deep px-4 py-2.5 shadow-[0_14px_30px_-18px_rgb(31_79_216/0.5)]">
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg/45">Loan in</span>
      <span className="relative inline-flex h-8 min-w-36 items-center overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={word}
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -28, opacity: 0 }}
            transition={spring}
            className="flex items-baseline gap-2 whitespace-nowrap"
          >
            <span className="text-2xl font-semibold text-brand">{word}</span>
            <span className="text-xs text-fg/50">{lang}</span>
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  )
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 md:pt-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(10_26_74/0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgb(10_26_74/0.045)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_70%_60%_at_70%_40%,black,transparent)]" />
        <div className="absolute -right-40 -top-40 size-[720px] rounded-full bg-brand/12 blur-[140px]" />
        <div className="absolute -left-48 top-80 size-[420px] rounded-full bg-saffron/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 size-[380px] rounded-full bg-leaf/8 blur-[120px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 md:px-6 lg:grid-cols-[1fr_1.05fr] lg:pb-24">
        <motion.div initial="h" animate="s" variants={{ s: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}>
          <motion.a variants={blurIn} href={CONTACT.directions} target="_blank" rel="noopener" className="glass inline-flex items-center gap-2.5 rounded-full py-1.5 pl-2 pr-4 text-xs font-medium text-fg/70 hover:text-fg">
            <span className="relative ml-1 flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-heart/70" />
              <span className="relative size-2 rounded-full bg-heart" />
            </span>
            Kolkata office · apply from anywhere in India
          </motion.a>

          <motion.h1 variants={blurIn} className="mt-7 font-display text-[2.9rem] font-medium leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-[5.2rem]">
            Loans that make <br className="hidden sm:block" />
            life <span className="font-serif italic tracking-[-0.02em] text-brand">easy</span><span className="text-heart">.</span>
          </motion.h1>

          <motion.div variants={blurIn} className="mt-7">
            <LoanWord />
          </motion.div>

          <motion.p variants={blurIn} className="mt-6 max-w-[52ch] text-base leading-relaxed text-fg/65 md:text-lg">
            Personal, business and property loans, matched to the bank or NBFC most likely to say yes. Whatever language you speak, one banker handles your file from the first call to the day the money lands.
          </motion.p>

          <motion.div variants={blurIn} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Magnetic href="#quote" className="group flex items-center justify-center gap-3 rounded-full bg-fg py-2 pl-6 pr-2 text-sm font-semibold text-bg shadow-[0_18px_40px_-16px_rgb(10_26_74/0.6)]">
              Check my eligibility
              <span className="grid size-9 place-items-center rounded-full bg-brand text-[#fff] transition-transform group-hover:rotate-[-45deg]">
                <ArrowRight size={15} weight="bold" />
              </span>
            </Magnetic>
            <a href={wa('Hello India Finance, I would like to talk to a banker about a loan.')} target="_blank" rel="noopener" className="flex items-center justify-center gap-2 rounded-full border border-fg/12 bg-deep px-6 py-3.5 text-sm font-semibold transition hover:border-fg/30 active:scale-[0.98]">
              <WhatsappLogo size={18} weight="fill" className="text-leaf" /> WhatsApp a banker
            </a>
          </motion.div>

          <motion.dl variants={blurIn} className="mt-11 grid max-w-lg grid-cols-3 divide-x divide-fg/10 border-t border-fg/10 pt-6">
            {[
              [<span key="r" className="flex items-center gap-1">{CONTACT.rating}<Star size={16} weight="fill" className="text-saffron" /></span>, 'Google rating'],
              ['₹50k–25Cr', 'Loan range'],
              ['15 yrs', 'Longest tenure'],
            ].map(([v, k], i) => (
              <div key={k} className={i ? 'pl-4 sm:pl-6' : 'pr-4'}>
                <dd className="font-display text-xl font-medium tracking-tight sm:text-2xl">{v}</dd>
                <dt className="mt-1 text-xs text-fg/50">{k}</dt>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ ...spring, delay: 0.3 }} className="relative mx-auto w-full max-w-[600px]">
          <IndiaMap />
        </motion.div>
      </div>
    </section>
  )
}

export function Band() {
  const row = LOANS.map((l, i) => (
    <span key={l.id} className="flex items-center gap-8">
      <span className={i % 2 ? 'text-brand' : 'text-fg'}>{l.name}</span>
      <svg viewBox="0 0 24 24" className="size-6 shrink-0 fill-heart" aria-hidden><path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" /></svg>
    </span>
  ))
  return (
    <div className="overflow-hidden border-y border-fg/[0.07] bg-deep py-7">
      <div className="flex w-max animate-marquee gap-8 pr-8 font-display text-4xl font-medium tracking-tight md:text-6xl">
        {row}
        {row}
      </div>
    </div>
  )
}

// Slider bounds — amount [min, max, step, default], years [min, max, default]
const QUOTE = {
  personal: { label: 'Personal', amount: [50_000, 4_000_000, 50_000, 500_000], years: [1, 6, 4] },
  business: { label: 'Business', amount: [500_000, 10_000_000, 100_000, 2_500_000], years: [1, 5, 3] },
  lap: { label: 'Property', amount: [1_000_000, 50_000_000, 500_000, 5_000_000], years: [2, 15, 10] },
}
const QUOTE_LOANS = LOANS.filter((l) => QUOTE[l.id])
const STAGES = ['Eligibility checked', 'Document list shared', 'Lender matched', 'Sanction letter issued']

export function QuoteSection() {
  return (
    <section id="quote" className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 py-28 md:px-6 md:py-36 lg:grid-cols-[0.9fr_1.1fr]">
      <div aria-hidden className="pointer-events-none absolute right-0 top-1/3 size-[520px] rounded-full bg-brand/15 blur-[140px]" />
      <div className="relative">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-fg/45"><span className="text-brand">00</span> · Quick quote</p>
          <h2 className="mt-6 font-display text-4xl font-medium leading-[1] tracking-[-0.035em] md:text-6xl">
            Know your EMI <span className="font-serif italic text-fg/90">before</span> anyone calls you.
          </h2>
          <p className="mt-6 max-w-[46ch] leading-relaxed text-fg/60">
            Slide to your amount and tenure. The estimate runs on your device and never touches your credit report. Like the number? Send it to a banker in one tap.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-10 grid max-w-md gap-3">
          {[
            [ShieldCheck, 'No credit pull to check your numbers'],
            [CheckCircle, 'Indicative rates from partner lenders'],
            [Phone, `Questions? Call ${CONTACT.phone}`],
          ].map(([Icon, t]) => (
            <p key={t} className="flex items-center gap-3 text-sm text-fg/75">
              <span className="grid size-8 place-items-center rounded-full bg-fg/[0.06] text-brand"><Icon size={16} weight="fill" /></span>
              {t}
            </p>
          ))}
        </Reveal>
      </div>
      <Reveal delay={0.15} className="relative">
        <QuoteConsole />
      </Reveal>
    </section>
  )
}

function QuoteConsole() {
  const [type, setType] = useState('personal')
  const cfg = QUOTE[type]
  const loan = QUOTE_LOANS.find((l) => l.id === type)
  const [amount, setAmount] = useState(cfg.amount[3])
  const [years, setYears] = useState(cfg.years[2])

  const pick = (id) => {
    setType(id)
    setAmount(QUOTE[id].amount[3])
    setYears(QUOTE[id].years[2])
  }

  const monthly = emi(amount, loan.defaultRate, years * 12)
  const total = monthly * years * 12
  const pct = (v, [min, max]) => `${((v - min) / (max - min)) * 100}%`
  const message = `Hello India Finance, I'd like a ${loan.name} of ${inr(amount)} for ${years} years. Your website estimated an EMI of about ${inr(monthly)}.`

  return (
    <div className="relative">
      <div className="glass relative rounded-[2rem] p-5 sm:p-7">
        <div className="flex items-center justify-between">
          <p className="font-display text-lg font-medium">EMI estimate</p>
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-fg/45">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-leaf/60" />
              <span className="relative size-2 rounded-full bg-leaf" />
            </span>
            Live · on device
          </span>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-1 rounded-full bg-fg/[0.05] p-1" role="tablist" aria-label="Loan type">
          {QUOTE_LOANS.map((l) => (
            <button key={l.id} role="tab" aria-selected={type === l.id} onClick={() => pick(l.id)} className="relative rounded-full px-2 py-2.5 text-xs font-semibold sm:text-sm">
              {type === l.id && <motion.span layoutId="quote-pill" transition={spring} className="absolute inset-0 rounded-full bg-fg" />}
              <span className={`relative ${type === l.id ? 'text-bg' : 'text-fg/55'}`}>{QUOTE[l.id].label}</span>
            </button>
          ))}
        </div>

        <label className="mt-7 block">
          <span className="flex items-baseline justify-between text-sm text-fg/60">
            Loan amount <span className="font-mono text-base text-fg">{inr(amount, true)}</span>
          </span>
          <input type="range" className="mt-4" min={cfg.amount[0]} max={cfg.amount[1]} step={cfg.amount[2]} value={amount} style={{ '--fill': pct(amount, cfg.amount) }} onChange={(e) => setAmount(+e.target.value)} />
        </label>
        <label className="mt-6 block">
          <span className="flex items-baseline justify-between text-sm text-fg/60">
            Tenure <span className="font-mono text-base text-fg">{years} {years === 1 ? 'year' : 'years'}</span>
          </span>
          <input type="range" className="mt-4" min={cfg.years[0]} max={cfg.years[1]} value={years} style={{ '--fill': pct(years, cfg.years) }} onChange={(e) => setYears(+e.target.value)} />
        </label>

        <div className="relative mt-7 overflow-hidden rounded-3xl on-dark bg-gradient-to-br from-brand-deep via-[#16338f] to-brand p-6">
          <div aria-hidden className="absolute -right-10 -top-16 size-48 rounded-full bg-fg/15 blur-3xl" />
          <p className="relative font-mono text-[10px] uppercase tracking-[0.18em] text-fg/70">Monthly EMI · {loan.defaultRate}% p.a. indicative</p>
          <p className="relative mt-2 font-display text-5xl font-medium tracking-tight">
            <Num value={monthly} />
            <span className="ml-1 text-base text-fg/60">/mo</span>
          </p>
          <div className="relative mt-5 h-1.5 overflow-hidden rounded-full bg-black/25">
            <motion.div className="h-full origin-left rounded-full bg-fg" animate={{ scaleX: amount / total }} transition={spring} />
          </div>
          <div className="relative mt-2 flex justify-between font-mono text-[11px] text-fg/75">
            <span>Principal {inr(amount, true)}</span>
            <span>Interest {inr(total - amount, true)}</span>
          </div>
        </div>

        <a href={wa(message)} target="_blank" rel="noopener" className="mt-4 flex items-center justify-center gap-2 rounded-full bg-fg py-3.5 text-sm font-semibold text-bg transition hover:bg-fg/90 active:scale-[0.98]">
          <WhatsappLogo size={18} weight="fill" className="text-leaf" /> Send this quote to a banker
        </a>
      </div>
      <StageChip />
    </div>
  )
}

function StageChip() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % STAGES.length), 2600)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="glass absolute -bottom-5 left-6 hidden h-11 min-w-56 items-center overflow-hidden rounded-full bg-bg/80 px-4 sm:flex">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span key={i} initial={{ y: 22, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -22, opacity: 0 }} transition={spring} className="flex items-center gap-2 text-xs font-medium">
          <CheckCircle size={16} weight="fill" className="text-brand" />
          <span className="font-mono text-fg/40">0{i + 1}</span> {STAGES[i]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
