import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight, ArrowUpRight, Bank, Briefcase, Calculator, Check, CheckCircle, Clock, Coins, Envelope, FacebookLogo,
  GoogleLogo, House, InstagramLogo, LinkedinLogo, MapPin, Phone, Plus, Quotes, ShareNetwork, Star, TrendDown, User,
  WarningCircle, WhatsappLogo, XLogo, YoutubeLogo,
} from '@phosphor-icons/react'
import { CONTACT, CRITERIA, DOCS, FACTS, FAQ, LOANS, REVIEWS, SOCIAL, STEPS, wa } from './data.js'
import { Band, Hero, QuoteSection } from './Hero.jsx'
import { useTitle } from './router.jsx'
import Calculators from './Calculators.jsx'
import { Arc, Logo, Magnetic, Num, Reveal, SectionHead, spot, spring } from './ui.jsx'
import { emi, inr } from './lib/finance.js'

export const wrap = 'mx-auto max-w-7xl px-4 md:px-6'
export const HELLO = wa('Hello India Finance, I would like to discuss a loan.')

export function Home() {
  useTitle(null)
  return (
    <>
      <Hero />
      <Band />
      <QuoteSection />
      <Facts />
      <Loans />
      <Process />
      <section id="calculators" className={`${wrap} py-28 md:py-36`}>
        <SectionHead
          index="03"
          label="Calculators"
          title="Run the numbers"
          accent="yourself."
          lede="Everything below is calculated in your browser. Nothing is saved, sent or checked against your credit report."
        />
        <Reveal><Calculators /></Reveal>
      </section>
      <Readiness />
      <Reviews />
      <Faq />
      <Cta />
      <Contact />
    </>
  )
}

/* ---------- Facts ---------- */
export function Facts() {
  return (
    <section className={wrap}>
      <Reveal className="grid grid-cols-2 border-y border-fg/[0.08] lg:grid-cols-4">
        {FACTS.map((f, i) => (
          <div key={f.k} className={`py-10 ${i % 2 ? 'border-l border-fg/[0.08] pl-5 md:pl-8' : 'pr-4'} ${i === 2 ? 'border-t border-fg/[0.08] lg:border-l lg:border-t-0 lg:pl-8' : ''} ${i === 3 ? 'border-t border-fg/[0.08] lg:border-t-0' : ''}`}>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg/40">{f.k}</p>
            <p className="mt-3 font-display text-3xl font-medium tracking-tight md:text-5xl">{f.v}</p>
            <p className="mt-2 text-sm text-fg/50">{f.note}</p>
          </div>
        ))}
      </Reveal>
    </section>
  )
}

/* ---------- Loans bento ---------- */
export const ICONS = { personal: User, business: Briefcase, lap: House, cc: Coins, bt: TrendDown }
export const LAYOUT = {
  personal: 'on-dark md:col-span-7 md:row-span-2 bg-gradient-to-br from-navy to-[#173a9e] border-transparent',
  business: 'md:col-span-5 bg-deep border-fg/[0.08]',
  lap: 'md:col-span-5 bg-deep border-fg/[0.08]',
  cc: 'md:col-span-7 bg-deep border-fg/[0.08]',
  bt: 'on-dark md:col-span-5 bg-gradient-to-br from-brand-deep to-brand border-transparent',
}
export const VISUAL = { personal: OfferSort, business: GstBars, lap: LtvGauge, cc: UtilWave, bt: RateDrop }

export function Loans() {
  return (
    <section id="loans" className={`${wrap} py-28 md:py-36`}>
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHead index="01" label="Loans" title="Pick the loan. We find the lender that" accent="says yes." />
        <Reveal>
          <p className="max-w-xs text-sm leading-relaxed text-fg/50">
            Rates and amounts are indicative ranges from partner lenders. Your final offer depends on your profile.
          </p>
        </Reveal>
      </div>
      <div className="mt-16 grid gap-4 md:grid-cols-12">
        {LOANS.map((l, i) => {
          const Icon = ICONS[l.id]
          const V = VISUAL[l.id]
          return (
            <Reveal key={l.id} delay={(i % 2) * 0.08} className={`group relative flex flex-col overflow-hidden rounded-[2rem] border ${LAYOUT[l.id]}`}>
              <div onPointerMove={spot} className="spotlight flex h-full flex-col rounded-[2rem] p-7 md:p-9">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-12 place-items-center rounded-2xl bg-fg/[0.08] text-fg">
                    <Icon size={22} weight="duotone" />
                  </span>
                  <span className="rounded-full border border-fg/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-fg/55">{l.tag}</span>
                </div>
                <V />
                <h3 className="mt-auto pt-10 font-display text-2xl font-medium tracking-tight md:text-[2rem]">{l.name}</h3>
                <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-fg/60">{l.blurb}</p>
                <dl className="mt-7 grid grid-cols-3 gap-4 border-t border-fg/10 pt-5">
                  {[['Amount', l.ticket], ['Rate', l.rate], ['Tenure', l.tenure]].map(([k, v]) => (
                    <div key={k}>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg/40">{k}</dt>
                      <dd className="mt-1 text-sm font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
                <a href={wa(`Hello India Finance, I'm interested in a ${l.name}.`)} target="_blank" rel="noopener" className="mt-7 inline-flex items-center gap-2 self-start rounded-full bg-fg/[0.08] py-2 pl-4 pr-2 text-sm font-medium transition hover:bg-fg hover:text-bg">
                  Ask about this loan
                  <span className="grid size-7 place-items-center rounded-full bg-fg text-bg transition-transform group-hover:rotate-45">
                    <ArrowUpRight size={14} weight="bold" />
                  </span>
                </a>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

// Perpetual card visuals — each isolated so its timer never re-renders the grid.
const OFFERS = [
  { id: 'pvt', name: 'Private bank' },
  { id: 'psu', name: 'Public sector bank' },
  { id: 'nbfc', name: 'NBFC' },
  { id: 'sfb', name: 'Small finance bank' },
]
const roll = () => OFFERS.map((o) => ({ ...o, rate: +(10.5 + Math.random() * 5).toFixed(2) })).sort((a, b) => a.rate - b.rate)

export function OfferSort() {
  const [list, setList] = useState(roll)
  useEffect(() => {
    const t = setInterval(() => setList(roll()), 2800)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="mt-9">
      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-fg/40">Illustrative · comparing offers for one profile</p>
      <ul className="grid gap-2">
        {list.map((o, i) => (
          <motion.li layout transition={spring} key={o.id} className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm ${i === 0 ? 'bg-fg text-bg shadow-[0_20px_40px_-20px_rgb(227_38_46/0.6)]' : 'bg-fg/[0.04] text-fg/60'}`}>
            <span className="flex items-center gap-3">
              <Bank size={18} weight={i === 0 ? 'fill' : 'regular'} className={i === 0 ? 'text-brand' : ''} />
              {o.name}
              {i === 0 && <span className="hidden rounded-full bg-brand px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-fg sm:inline">Best for you</span>}
            </span>
            <span className="font-mono">{o.rate.toFixed(2)}%</span>
          </motion.li>
        ))}
      </ul>
      <p className="mb-3 mt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-fg/40">We compare more than the rate</p>
      <div className="flex flex-wrap gap-2">
        {['Processing fee', 'Foreclosure charges', 'Insurance bundled in', 'Part-payment rules', 'Disbursal time'].map((t) => (
          <span key={t} className="rounded-full border border-fg/12 px-3 py-1.5 text-xs text-fg/70">{t}</span>
        ))}
      </div>
      <Savings best={list[0].rate} worst={list[list.length - 1].rate} />
    </div>
  )
}

// What picking the cheapest of the offers above saves, on a sample ₹5 L over 4 years.
const SAMPLE_P = 500_000
const SAMPLE_N = 48
export function Savings({ best, worst }) {
  const paidBest = emi(SAMPLE_P, best, SAMPLE_N) * SAMPLE_N
  const paidWorst = emi(SAMPLE_P, worst, SAMPLE_N) * SAMPLE_N
  const intBest = paidBest - SAMPLE_P
  const intWorst = paidWorst - SAMPLE_P
  return (
    <div className="mt-8 rounded-3xl border border-fg/10 bg-fg/[0.05] p-5 md:p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg/45">You keep, by picking the best offer</p>
          <p className="mt-2 font-display text-4xl font-medium tracking-tight md:text-5xl">
            <Num value={paidWorst - paidBest} />
          </p>
        </div>
        <p className="pb-1 text-xs text-fg/55">on ₹5 L over 4 years</p>
      </div>
      <div className="mt-5 grid gap-2.5">
        {[
          ['Best offer', best, intBest, 'bg-fg'],
          ['Costliest offer', worst, intWorst, 'bg-heart'],
        ].map(([label, rate, interest, bar]) => (
          <div key={label}>
            <div className="flex justify-between font-mono text-[11px] text-fg/60">
              <span>{label} · {rate.toFixed(2)}%</span>
              <span>interest {inr(interest, true)}</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-fg/10">
              <motion.div className={`h-full origin-left rounded-full ${bar}`} animate={{ scaleX: interest / intWorst }} transition={spring} />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[11px] text-fg/40">Illustrative. Uses the four sample rates above; your offers depend on your profile.</p>
    </div>
  )
}

export function GstBars() {
  const h = [38, 52, 44, 61, 57, 70, 64, 78, 72, 88, 81, 96]
  return (
    <div className="mt-9 flex h-24 items-end gap-1.5" aria-hidden>
      {h.map((v, i) => (
        <motion.span
          key={i}
          className="flex-1 origin-bottom rounded-t-md bg-gradient-to-t from-fg/[0.04] to-brand"
          style={{ height: `${v}%` }}
          animate={{ scaleY: [0.82, 1, 0.82] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.12, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

export function LtvGauge() {
  return (
    <div className="mt-9 flex items-center gap-5">
      <motion.svg viewBox="0 0 120 66" className="w-36" aria-hidden initial="h" whileInView="s" viewport={{ once: true }}>
        <path d="M10 60 A50 50 0 0 1 110 60" fill="none" stroke="rgb(255 255 255 / 0.1)" strokeWidth="10" strokeLinecap="round" />
        <motion.path
          d="M10 60 A50 50 0 0 1 110 60"
          fill="none"
          className="stroke-brand"
          strokeWidth="10"
          strokeLinecap="round"
          variants={{ h: { pathLength: 0 }, s: { pathLength: 0.65, transition: { ...spring, delay: 0.3 } } }}
        />
      </motion.svg>
      <div>
        <p className="font-display text-3xl font-medium">50–70%</p>
        <p className="text-xs text-fg/50">of market value, typical LTV</p>
      </div>
    </div>
  )
}

export function UtilWave() {
  const d = 'M0 40 Q25 10 50 30 T100 28 T150 18 T200 34 T250 14 T300 30 T350 22 T400 40'
  return (
    <div className="relative mt-9 h-28 overflow-hidden rounded-2xl bg-sky" aria-hidden>
      <div className="absolute inset-x-0 top-4 border-t border-dashed border-fg/25" />
      <span className="absolute right-3 top-5 font-mono text-[10px] uppercase tracking-wider text-fg/40">Limit</span>
      <motion.svg viewBox="0 0 400 60" preserveAspectRatio="none" className="absolute bottom-0 h-24 w-[200%]" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}>
        <defs>
          <linearGradient id="wave" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#1f4fd8" stopOpacity="0.35" />
            <stop offset="1" stopColor="#1f4fd8" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${d} L400 60 L0 60Z`} fill="url(#wave)" />
        <path d={d} fill="none" className="stroke-brand" strokeWidth="2" />
      </motion.svg>
      <span className="absolute bottom-3 left-3 rounded-full bg-bg/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-fg/80 shadow-sm">Interest only on what you draw</span>
    </div>
  )
}

export function RateDrop() {
  return (
    <div className="mt-9 flex items-end gap-4">
      <p className="font-mono text-2xl text-fg/50 line-through decoration-fg/40">14.50%</p>
      <motion.p className="font-display text-6xl font-medium tracking-tight" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ ...spring, delay: 0.4 }}>
        11.20%
      </motion.p>
      <span className="mb-2 font-mono text-[10px] uppercase tracking-wider text-fg/60">illustrative</span>
    </div>
  )
}

/* ---------- Process: native sticky card stack ---------- */
export function Process() {
  return (
    <section id="process" className={`${wrap} grid gap-16 py-28 md:py-36 lg:grid-cols-[0.85fr_1.15fr]`}>
      <div className="lg:sticky lg:top-32 lg:self-start">
        <SectionHead
          index="02"
          label="Process"
          title="One banker owns your file, from first call to"
          accent="disbursal."
          lede="No call-centre handoffs. The person who reads your documents is the person who argues your case with the lender."
        />
        <Reveal>
          <a href={CONTACT.tel} className="glass mt-10 inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-sm font-semibold transition hover:bg-fg/10 active:scale-[0.98]">
            <Phone size={18} weight="bold" className="text-brand" /> Call {CONTACT.phone}
          </a>
        </Reveal>
      </div>
      <ol className="grid gap-5">
        {STEPS.map((s, i) => (
          <li key={s.t} className="sticky" style={{ top: `${7 + i * 1.25}rem` }}>
            <Reveal className="rounded-[2rem] border border-fg/10 bg-deep p-7 shadow-[0_-16px_40px_-24px_rgb(10_26_74/0.25)] md:p-9">
              <div className="flex items-start justify-between gap-6">
                <span className="font-serif text-6xl italic leading-none text-brand md:text-7xl">0{i + 1}</span>
                <span className="mt-2 h-px flex-1 bg-gradient-to-r from-fg/20 to-transparent" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-medium md:text-3xl">{s.t}</h3>
              <p className="mt-3 max-w-[50ch] leading-relaxed text-fg/60">{s.d}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  )
}

/* ---------- Readiness: criteria table + document checklist ---------- */
export const DOC_TABS = [
  ['personal', 'Personal'],
  ['business', 'Business'],
  ['lap', 'Property'],
  ['cc', 'Cash credit'],
]

export function Readiness() {
  return (
    <section id="documents" className={`${wrap} pb-28 md:pb-36`}>
      <SectionHead
        index="04"
        label="Readiness"
        title="What lenders check, and the papers to"
        accent="keep ready."
        lede="Typical requirements across our partner lenders. Each lender applies its own credit policy, and we tell you upfront if yours asks for more."
      />
      <Reveal className="mt-14 overflow-x-auto rounded-[2rem] border border-fg/[0.08] bg-deep">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b border-fg/[0.08]">
              <th className="p-5 font-mono text-[10px] font-normal uppercase tracking-[0.18em] text-fg/40">What they look at</th>
              {CRITERIA.cols.map((c) => <th key={c} className="p-5 font-display text-base font-medium">{c}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-fg/[0.06]">
            {CRITERIA.rows.map(([k, ...v]) => (
              <tr key={k} className="transition-colors hover:bg-fg/[0.03]">
                <th className="p-5 font-medium">{k}</th>
                {v.map((x, i) => <td key={i} className="p-5 text-fg/60">{x}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
      <Reveal><Checklist /></Reveal>
    </section>
  )
}

export function Checklist() {
  const [type, setType] = useState('personal')
  const [have, setHave] = useState({})
  const docs = DOCS[type]
  const got = docs.filter((d) => have[d])
  const missing = docs.filter((d) => !have[d])
  const toggle = (d) => setHave((h) => ({ ...h, [d]: !h[d] }))
  return (
    <div className="mt-5 grid gap-8 rounded-[2rem] border border-fg/[0.08] bg-deep p-6 md:p-10 lg:grid-cols-[1fr_1.4fr]">
      <div>
        <p className="font-display text-3xl font-medium tracking-tight">Document checklist</p>
        <p className="mt-2 max-w-[40ch] text-sm leading-relaxed text-fg/55">Tick what you already have. We will tell you how to get the rest.</p>
        <div className="mt-7 flex flex-wrap gap-1 rounded-full bg-fg/[0.05] p-1">
          {DOC_TABS.map(([id, label]) => (
            <button key={id} onClick={() => setType(id)} className="relative flex-1 rounded-full px-3 py-2 text-sm font-medium">
              {type === id && <motion.span layoutId="doc-tab" transition={spring} className="absolute inset-0 rounded-full bg-fg" />}
              <span className={`relative ${type === id ? 'text-bg' : 'text-fg/55'}`}>{label}</span>
            </button>
          ))}
        </div>
        <div className="mt-9 flex items-end justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg/40">File readiness</p>
          <p className="font-display text-4xl font-medium">{got.length}<span className="text-fg/30">/{docs.length}</span></p>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-fg/[0.08]">
          <motion.div className="h-full origin-left rounded-full bg-gradient-to-r from-saffron to-brand" animate={{ scaleX: got.length / docs.length }} transition={spring} />
        </div>
        <AnimatePresence mode="wait" initial={false}>
          {missing.length === 0 ? (
            <motion.p key="done" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-6 flex items-start gap-2 rounded-2xl border border-leaf/30 bg-leaf/10 p-4 text-sm">
              <CheckCircle size={20} weight="fill" className="shrink-0 text-leaf" /> Your file is ready to log in. Send it across and we will start with the lender match.
            </motion.p>
          ) : (
            <motion.a
              key="ask"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              href={wa(`Hello India Finance, for a ${DOC_TABS.find((t) => t[0] === type)[1].toLowerCase()} loan I still need: ${missing.join(', ')}. How do I arrange these?`)}
              target="_blank"
              rel="noopener"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand"
            >
              <WhatsappLogo size={18} weight="fill" /> Ask how to get the {missing.length} missing
            </motion.a>
          )}
        </AnimatePresence>
      </div>
      <ul className="grid content-start gap-2 sm:grid-cols-2">
        {docs.map((d) => (
          <li key={type + d}>
            <button
              onClick={() => toggle(d)}
              aria-pressed={!!have[d]}
              className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left text-sm transition active:scale-[0.98] ${have[d] ? 'border-brand/50 bg-brand/10 text-fg' : 'border-fg/[0.08] text-fg/65 hover:border-fg/20'}`}
            >
              <span className={`grid size-6 shrink-0 place-items-center rounded-lg border transition-colors ${have[d] ? 'border-brand bg-brand text-[#fff]' : 'border-fg/20'}`}>
                {have[d] && <Check size={14} weight="bold" />}
              </span>
              {d}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ---------- Reviews ---------- */
export function Reviews() {
  return (
    <section className={`${wrap} grid gap-12 pb-28 md:grid-cols-12 md:pb-36`}>
      <Reveal className="relative md:col-span-5">
        <div aria-hidden className="absolute -left-10 top-10 size-72 rounded-full bg-brand/20 blur-[100px]" />
        <div className="relative flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-fg/45">
          <span className="text-brand">05</span> Customers <Arc />
        </div>
        <p className="relative mt-8 font-display text-[9rem] font-medium leading-none tracking-[-0.06em]">{CONTACT.rating}</p>
        <div className="relative mt-4 flex text-saffron">{[0, 1, 2, 3, 4].map((s) => <Star key={s} size={22} weight="fill" />)}</div>
        <p className="relative mt-4 max-w-[34ch] text-fg/55">Average rating from customers who reviewed India Finance on Google.</p>
        <a href={CONTACT.google} target="_blank" rel="noopener" className="glass relative mt-8 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition hover:bg-fg/10 active:scale-[0.98]">
          Read all reviews on Google <ArrowUpRight size={16} weight="bold" />
        </a>
      </Reveal>
      <div className="grid gap-4 md:col-span-7">
        {REVIEWS.map((r, i) => (
          <Reveal key={r.q} delay={i * 0.08} className={`glass rounded-[2rem] p-7 md:p-9 ${i === 1 ? 'md:ml-14' : ''}`}>
            <Quotes size={28} weight="fill" className="text-brand" />
            <p className="mt-5 font-serif text-2xl leading-snug md:text-3xl">{r.q}</p>
            <p className="mt-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-fg/45">
              <span className="size-1.5 rounded-full bg-leaf" /> {r.who}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ---------- FAQ ---------- */
export function Faq() {
  return (
    <section id="faq" className={`${wrap} grid gap-12 pb-28 md:pb-36 lg:grid-cols-[0.8fr_1.2fr]`}>
      <div className="lg:sticky lg:top-32 lg:self-start">
        <SectionHead index="06" label="FAQ" title="Straight answers" accent="before you apply." />
        <Reveal className="glass mt-10 rounded-[2rem] p-7">
          <p className="font-display text-xl font-medium">Question not here?</p>
          <p className="mt-2 text-sm text-fg/55">Message a banker directly. Working hours are {CONTACT.hours}.</p>
          <a href={wa('Hello India Finance, I have a question:')} target="_blank" rel="noopener" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand">
            <WhatsappLogo size={18} weight="fill" /> Ask on WhatsApp
          </a>
        </Reveal>
      </div>
      <div className="divide-y divide-fg/[0.08] border-y border-fg/[0.08]">
        {FAQ.map((f, i) => (
          <Reveal key={f.q} delay={i * 0.03}>
            <details name="faq" className="group py-2">
              <summary className="flex items-center justify-between gap-6 py-5">
                <span className="font-display text-lg font-medium md:text-xl">{f.q}</span>
                <span className="faq-icon grid size-9 shrink-0 place-items-center rounded-full border border-fg/15 transition-all duration-300">
                  <Plus size={16} weight="bold" />
                </span>
              </summary>
              <p className="max-w-[62ch] pb-6 pr-12 leading-relaxed text-fg/60">{f.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ---------- CTA band ---------- */
export function Cta() {
  return (
    <section className="px-3 pb-6">
      <Reveal className="on-dark relative mx-auto max-w-[1400px] overflow-hidden rounded-[2.5rem] bg-brand-deep px-6 py-24 text-center md:py-32">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 -top-32 size-[520px] animate-drift rounded-full bg-brand blur-[110px]" />
          <div className="absolute -bottom-40 right-0 size-[560px] animate-drift rounded-full bg-[#3b82f6]/60 blur-[120px] [animation-delay:-6s]" />
          <div className="absolute left-1/3 top-1/4 size-[380px] animate-drift rounded-full bg-heart/35 blur-[100px] [animation-delay:-11s]" />
          <img src="/logo-mark.png" alt="" className="absolute left-1/2 top-1/2 w-[640px] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.07] mix-blend-overlay" />
        </div>
        <div className="relative">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-fg/70">India Finance · makes life easy</p>
          <h2 className="mx-auto mt-6 max-w-4xl font-display text-5xl font-medium leading-[0.95] tracking-[-0.045em] md:text-8xl">
            Your loan, <span className="font-serif italic">sorted.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[50ch] text-fg/80">Tell us what you need on WhatsApp. A banker replies with your eligibility and the exact document list.</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Magnetic href={HELLO} target="_blank" rel="noopener" className="group flex items-center gap-3 rounded-full bg-fg py-2 pl-6 pr-2 text-sm font-semibold text-bg">
              Start on WhatsApp
              <span className="grid size-9 place-items-center rounded-full bg-brand text-fg transition-transform group-hover:rotate-[-45deg]"><ArrowRight size={15} weight="bold" /></span>
            </Magnetic>
            <a href={CONTACT.tel} className="flex items-center gap-2 rounded-full border border-fg/30 px-6 py-3.5 text-sm font-semibold transition hover:bg-fg/10">
              <Phone size={16} weight="bold" /> {CONTACT.phone}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

/* ---------- Contact ---------- */
const PHONE_RE = /^[6-9]\d{9}$/

export function Contact() {
  const [v, setV] = useState({ name: '', phone: '', loan: '', amount: '', city: '', note: '', consent: false })
  const [err, setErr] = useState({})
  const [sentUrl, setSentUrl] = useState(null)
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const phone = v.phone.replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, '')
    const next = {}
    if (v.name.trim().length < 2) next.name = 'Please enter your full name.'
    if (!PHONE_RE.test(phone)) next.phone = 'Enter a 10-digit Indian mobile number.'
    if (!v.loan) next.loan = 'Choose the loan you need.'
    if (!v.consent) next.consent = 'Please allow us to contact you about this enquiry.'
    setErr(next)
    if (Object.keys(next).length) return
    const text = [
      'New loan enquiry from the website',
      `Name: ${v.name.trim()}`,
      `Mobile: ${phone}`,
      `Loan: ${v.loan}`,
      v.amount && `Amount: ${v.amount}`,
      v.city && `City: ${v.city}`,
      v.note && `Note: ${v.note}`,
    ].filter(Boolean).join('\n')
    const url = wa(text)
    // ponytail: no backend — the enquiry goes out as a WhatsApp message, so the user sees exactly what is sent.
    // Add a server endpoint here if the client wants enquiries stored in a CRM.
    window.open(url, '_blank', 'noopener')
    setSentUrl(url)
  }

  const input = (k) =>
    `w-full rounded-2xl border bg-fg/[0.04] px-4 py-3.5 text-sm text-fg outline-none transition placeholder:text-fg/30 focus:border-brand focus:bg-fg/[0.06] focus:ring-4 focus:ring-brand/15 ${err[k] ? 'border-heart' : 'border-fg/10'}`

  return (
    <section id="contact" className="px-3 py-6">
      <div className="mx-auto grid max-w-[1400px] gap-3 lg:grid-cols-2">
        <div className="rounded-[2.5rem] border border-fg/[0.08] bg-deep p-6 py-12 md:p-14">
          <SectionHead index="07" label="Contact" title="Tell us what you need. A banker" accent="calls back." />
          <form onSubmit={submit} noValidate className="mt-10 grid gap-5 sm:grid-cols-2">
            <Input label="Full name" error={err.name} className="sm:col-span-2">
              <input className={input('name')} value={v.name} onChange={set('name')} autoComplete="name" placeholder="Your name as on PAN" />
            </Input>
            <Input label="Mobile number" error={err.phone}>
              <input className={input('phone')} value={v.phone} onChange={set('phone')} type="tel" inputMode="tel" autoComplete="tel" placeholder="98xxx xxxxx" />
            </Input>
            <Input label="Loan type" error={err.loan}>
              <select className={input('loan')} value={v.loan} onChange={set('loan')}>
                <option value="">Select a loan</option>
                {LOANS.map((l) => <option key={l.id}>{l.name}</option>)}
              </select>
            </Input>
            <Input label="Amount needed" hint="Optional">
              <input className={input('amount')} value={v.amount} onChange={set('amount')} placeholder="e.g. ₹8 lakh" />
            </Input>
            <Input label="City" hint="Optional">
              <input className={input('city')} value={v.city} onChange={set('city')} autoComplete="address-level2" placeholder="Kolkata" />
            </Input>
            <Input label="Anything we should know?" hint="Optional" className="sm:col-span-2">
              <textarea rows={3} className={input('note')} value={v.note} onChange={set('note')} placeholder="Existing loans, purpose, preferred call time" />
            </Input>
            <div className="sm:col-span-2">
              <label className="flex items-start gap-3 text-sm text-fg/60">
                <input type="checkbox" checked={v.consent} onChange={set('consent')} className="mt-0.5 size-4 accent-[#1f4fd8]" />
                I agree to be contacted by India Finance by call or WhatsApp about this enquiry.
              </label>
              {err.consent && <p className="mt-2 flex items-center gap-1.5 text-xs text-heart"><WarningCircle size={14} /> {err.consent}</p>}
            </div>
            <div className="sm:col-span-2">
              <motion.button whileTap={{ scale: 0.98 }} type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-fg py-4 text-sm font-semibold text-bg transition hover:bg-fg/90">
                <WhatsappLogo size={20} weight="fill" className="text-leaf" /> Send enquiry on WhatsApp
              </motion.button>
              <p className="mt-3 text-center text-xs text-fg/40">Opens WhatsApp with your details filled in. Nothing is stored on this website.</p>
              <AnimatePresence>
                {sentUrl && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={spring} className="mt-4 rounded-2xl border border-leaf/30 bg-leaf/10 p-4 text-sm" role="status">
                    WhatsApp should now be open with your message. Press send there to reach us. Didn't open?{' '}
                    <a href={sentUrl} target="_blank" rel="noopener" className="font-semibold text-brand underline">Try again</a> or call{' '}
                    <a href={CONTACT.tel} className="font-semibold text-brand underline">{CONTACT.phone}</a>.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>
        </div>

        <div className="flex flex-col gap-3">
          <div className="relative min-h-[360px] flex-1 overflow-hidden rounded-[2.5rem] border border-fg/[0.08]">
            <div className="skeleton absolute inset-0" aria-hidden />
            <iframe
              title="India Finance office on Google Maps"
              src={CONTACT.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="relative h-full min-h-[360px] w-full border-0"
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Info icon={MapPin} label="Office" value={CONTACT.address} href={CONTACT.directions} cta="Get directions" className="sm:col-span-2" />
            <Info icon={Phone} label="Call" value={CONTACT.phone} href={CONTACT.tel} cta="Call now" />
            <Info icon={Clock} label="Hours" value={CONTACT.hours} />
            {CONTACT.email && <Info icon={Envelope} label="Email" value={CONTACT.email} href={`mailto:${CONTACT.email}`} cta="Write to us" className="sm:col-span-2" />}
            {SOCIAL.length > 0 && (
              <div className="rounded-[2rem] border border-fg/[0.08] bg-deep p-6 sm:col-span-2">
                <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-fg/40">
                  <ShareNetwork size={14} weight="bold" className="text-brand" /> Follow us
                </p>
                <Socials className="mt-3" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Input({ label, hint, error, className = '', children }) {
  return (
    <label className={`grid gap-2 ${className}`}>
      <span className="flex justify-between text-sm font-medium">
        {label} {hint && <span className="font-normal text-fg/35">{hint}</span>}
      </span>
      {children}
      {error && <span className="flex items-center gap-1.5 text-xs text-heart"><WarningCircle size={14} /> {error}</span>}
    </label>
  )
}

const SOCIAL_ICON = { instagram: InstagramLogo, facebook: FacebookLogo, youtube: YoutubeLogo, linkedin: LinkedinLogo, x: XLogo, google: GoogleLogo }

export function Socials({ className = '' }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {SOCIAL.map((s) => {
        const Icon = SOCIAL_ICON[s.id]
        return (
          <li key={s.id}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`India Finance on ${s.label}`}
              title={s.label}
              className="grid size-11 place-items-center rounded-full border border-fg/10 bg-deep text-fg/70 transition hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-[#fff] active:scale-95"
            >
              <Icon size={20} weight="fill" />
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export function Info({ icon: Icon, label, value, href, cta, className = '' }) {
  return (
    <div className={`rounded-[2rem] border border-fg/[0.08] bg-deep p-6 ${className}`}>
      <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-fg/40">
        <Icon size={14} weight="bold" className="text-brand" /> {label}
      </p>
      <p className="mt-2 text-sm leading-relaxed">{value}</p>
      {href && (
        <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand">
          {cta} <ArrowUpRight size={14} weight="bold" />
        </a>
      )}
    </div>
  )
}

/* ---------- Footer & dock ---------- */
export function Footer() {
  return (
    <footer className="relative overflow-hidden pb-28 md:pb-0">
      <div className={`${wrap} grid gap-12 pt-24 md:grid-cols-12`}>
        <div className="md:col-span-4">
          <Logo />
          <p className="mt-3 font-serif text-2xl italic text-fg/80">
            <span className="text-saffron">makes</span> life <span className="text-leaf">easy</span>
          </p>
          <p className="mt-6 max-w-[36ch] text-sm leading-relaxed text-fg/50">
            Loan agency in Esplanade, Kolkata. We arrange personal, business and property loans with partner banks and NBFCs.
          </p>
          <Socials className="mt-6" />
        </div>
        <FooterCol span="md:col-span-3" title="Loans" items={LOANS.map((l) => [l.name, '#loans'])} />
        <FooterCol span="md:col-span-2" title="Tools" items={[['EMI calculator', '#calculators'], ['Eligibility', '#calculators'], ['Drawing power', '#calculators'], ['Documents', '#documents'], ['FAQ', '#faq']]} />
        <div className="md:col-span-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg/40">Visit</p>
          <p className="mt-4 text-sm leading-relaxed text-fg/70">{CONTACT.address}</p>
          <a href={CONTACT.tel} className="mt-4 block font-display text-2xl">{CONTACT.phone}</a>
          <p className="mt-1 text-sm text-fg/45">{CONTACT.hours}</p>
        </div>
      </div>
      <div className={`${wrap} mt-16 border-t border-fg/[0.08] py-8 text-xs leading-relaxed text-fg/40`}>
        <p className="max-w-[110ch]">
          India Finance is a loan agency and does not lend money itself. All loans are sanctioned and disbursed by RBI-regulated banks and NBFCs at their sole discretion. Interest rates, amounts and timelines on this website are indicative and may change. Calculator results are estimates, not offers.
        </p>
        <p className="mt-4">© {new Date().getFullYear()} India Finance, Kolkata. India map: svg-maps by Victor Cazanave, CC BY 4.0.</p>
      </div>
      {/* navy ends exactly at "n", the logo's heart red takes over from "a" — hard split at the letter, no blend */}
      <p aria-hidden className="pointer-events-none -mb-[0.18em] select-none whitespace-nowrap text-center font-display text-[17vw] font-semibold leading-none tracking-[-0.05em] text-transparent">
        <span className="bg-gradient-to-b from-fg to-brand bg-clip-text">India Fin</span>
        <span className="bg-gradient-to-b from-heart to-[#8b1520] bg-clip-text">ance</span>
      </p>
    </footer>
  )
}

export function FooterCol({ title, items, span }) {
  return (
    <div className={span}>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg/40">{title}</p>
      <ul className="mt-4 grid gap-2.5 text-sm text-fg/70">
        {items.map(([label, href]) => (
          <li key={label}><a href={href} className="transition-colors hover:text-fg">{label}</a></li>
        ))}
      </ul>
    </div>
  )
}

export function Dock() {
  return (
    <>
      <nav className="glass fixed inset-x-3 bottom-3 z-40 grid grid-cols-3 gap-1 rounded-full bg-bg/70 p-1.5 md:hidden" aria-label="Quick actions">
        <a href={CONTACT.tel} className="flex items-center justify-center gap-1.5 rounded-full py-3 text-xs font-semibold active:scale-95"><Phone size={18} weight="bold" />Call</a>
        <a href="#calculators" className="flex items-center justify-center gap-1.5 rounded-full py-3 text-xs font-semibold active:scale-95"><Calculator size={18} weight="bold" />EMI</a>
        <a href={HELLO} target="_blank" rel="noopener" className="flex items-center justify-center gap-1.5 rounded-full bg-fg py-3 text-xs font-semibold text-bg active:scale-95"><WhatsappLogo size={18} weight="fill" className="text-leaf" />Chat</a>
      </nav>
      <motion.a
        href={HELLO}
        target="_blank"
        rel="noopener"
        aria-label="Chat on WhatsApp"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ ...spring, delay: 1.8 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="on-dark fixed bottom-6 right-6 z-40 hidden size-14 place-items-center rounded-full bg-leaf text-fg shadow-[0_16px_36px_-12px_rgb(52_168_83/0.8)] md:grid"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-leaf/40 [animation-duration:2.4s]" />
        <WhatsappLogo size={28} weight="fill" className="relative" />
      </motion.a>
    </>
  )
}
