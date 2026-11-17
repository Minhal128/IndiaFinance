import { motion } from 'framer-motion'
import { ArrowUpRight, BookOpen, Calculator, FileText, Gauge, Percent, Scales, Stack } from '@phosphor-icons/react'
import { TOOLS } from '../data.js'
import { useTitle } from '../router.jsx'
import { Cta, wrap } from '../sections.jsx'
import { DrawingPowerCalc, DscrCalc, EligibilityCalc, EmiCalc } from '../Calculators.jsx'
import { PageHero, Reveal, SectionHead, spot } from '../ui.jsx'
import { NotFound, slugTerm } from './Info.jsx'

const META = {
  'emi-calculator': {
    icon: Calculator,
    C: EmiCalc,
    formula: ['EMI = P × r × (1 + r)ⁿ ÷ ((1 + r)ⁿ − 1)', 'P = loan amount · r = yearly rate ÷ 12 ÷ 100 · n = months'],
    terms: ['EMI', 'Amortisation', 'Tenure'],
  },
  'eligibility-calculator': {
    icon: Scales,
    C: EligibilityCalc,
    formula: ['Room for EMI = Income × FOIR − current EMIs', 'Max loan = Room × ((1 + r)ⁿ − 1) ÷ (r × (1 + r)ⁿ)'],
    terms: ['FOIR', 'Co-applicant', 'CIBIL score'],
  },
  'drawing-power-calculator': {
    icon: Stack,
    C: DrawingPowerCalc,
    formula: ['DP = (Stock − Creditors) × (1 − stock margin)', '     + Debtors × (1 − debtor margin), capped at the limit'],
    terms: ['Drawing power (DP)', 'Stock statement', 'Cash credit (CC)'],
  },
  'dscr-calculator': {
    icon: Gauge,
    C: DscrCalc,
    formula: ['DSCR = (Profit + Depreciation + Interest)', '       ÷ (Interest + Principal + New EMIs × 12)'],
    terms: ['DSCR', 'CMA data', 'MPBF'],
  },
}

// tiny looping previews for the hub cards
function Preview({ slug }) {
  if (slug === 'emi-calculator')
    return (
      <svg viewBox="0 0 120 120" className="size-28 -rotate-90" aria-hidden>
        <circle cx="60" cy="60" r="46" fill="none" stroke="rgb(10 26 74 / 0.08)" strokeWidth="14" />
        <motion.circle cx="60" cy="60" r="46" fill="none" stroke="#1f4fd8" strokeWidth="14" strokeLinecap="round" animate={{ pathLength: [0.55, 0.78, 0.55] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
      </svg>
    )
  if (slug === 'eligibility-calculator')
    return (
      <div className="flex h-28 w-40 items-end gap-2">
        {[0.35, 0.55, 0.8, 1].map((h, i) => (
          <motion.span key={i} className="flex-1 origin-bottom rounded-t-lg bg-gradient-to-t from-sky to-brand" style={{ height: `${h * 100}%` }} animate={{ scaleY: [0.8, 1, 0.8] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }} />
        ))}
      </div>
    )
  if (slug === 'drawing-power-calculator')
    return (
      <div className="grid w-44 gap-2.5">
        {[['bg-brand', 0.75], ['bg-saffron', 0.6], ['bg-fg/20', 0.9]].map(([c, w], i) => (
          <div key={i} className="h-2.5 overflow-hidden rounded-full bg-fg/[0.06]">
            <motion.div className={`h-full origin-left rounded-full ${c}`} animate={{ scaleX: [w * 0.7, w, w * 0.7] }} transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.3 }} />
          </div>
        ))}
      </div>
    )
  return (
    <div className="relative grid size-28 place-items-center">
      <svg viewBox="0 0 120 70" className="w-36" aria-hidden>
        <path d="M10 62 A50 50 0 0 1 110 62" fill="none" stroke="rgb(10 26 74 / 0.08)" strokeWidth="10" strokeLinecap="round" />
        <motion.path d="M10 62 A50 50 0 0 1 110 62" fill="none" stroke="#23a455" strokeWidth="10" strokeLinecap="round" animate={{ pathLength: [0.5, 0.72, 0.5] }} transition={{ duration: 4, repeat: Infinity }} />
      </svg>
      <span className="absolute bottom-3 font-display text-xl font-medium">1.4×</span>
    </div>
  )
}

export function ToolsHub() {
  useTitle('Loan calculators')
  return (
    <>
      <PageHero
        crumbs={[['Home', '/'], ['Tools']]}
        title="The calculators bankers use,"
        accent="free for you."
        lede="Four tools that answer the questions lenders ask first: can you afford the EMI, how much can you borrow, what does your stock support, and can your business carry the debt."
      />
      <section className={`${wrap} grid gap-4 pb-12 md:grid-cols-2`}>
        {TOOLS.map((t, i) => {
          const Icon = META[t.slug].icon
          return (
            <Reveal key={t.slug} delay={(i % 2) * 0.08}>
              <a href={`/tools/${t.slug}`} onPointerMove={spot} className="spotlight group flex h-full flex-col justify-between gap-10 rounded-[2rem] border border-fg/[0.08] bg-deep p-7 md:flex-row md:items-center md:p-9">
                <div>
                  <span className="grid size-12 place-items-center rounded-2xl bg-sky text-brand"><Icon size={22} weight="duotone" /></span>
                  <h2 className="mt-6 font-display text-2xl font-medium md:text-3xl">{t.name}</h2>
                  <p className="mt-2 max-w-[36ch] text-sm leading-relaxed text-fg/60">{t.blurb}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand">Open <ArrowUpRight size={14} weight="bold" className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                </div>
                <div className="shrink-0 self-center"><Preview slug={t.slug} /></div>
              </a>
            </Reveal>
          )
        })}
      </section>
      <section className={`${wrap} grid gap-4 pb-24 md:grid-cols-3`}>
        {[
          ['/documents', FileText, 'Document checklist', 'Tick off what you have for each loan type.'],
          ['/rates', Percent, 'Indicative rates', 'Where each loan usually starts, and what moves it.'],
          ['/glossary', BookOpen, 'Loan glossary', 'FOIR, LTV, DSCR and 35 more terms in plain words.'],
        ].map(([href, Icon, t, s]) => (
          <a key={href} href={href} className="group rounded-[2rem] border border-fg/[0.08] bg-deep p-6 transition hover:-translate-y-0.5 hover:border-brand/40">
            <Icon size={22} weight="duotone" className="text-brand" />
            <p className="mt-4 font-display text-lg font-medium">{t}</p>
            <p className="mt-1 text-sm text-fg/55">{s}</p>
          </a>
        ))}
      </section>
    </>
  )
}

export function ToolPage({ id }) {
  const tool = TOOLS.find((t) => t.slug === id)
  useTitle(tool?.name ?? 'Page not found')
  if (!tool) return <NotFound />
  const { C, formula, terms } = META[tool.slug]
  return (
    <>
      <PageHero
        crumbs={[['Home', '/'], ['Tools', '/tools'], [tool.name]]}
        title={tool.name}
        lede={`${tool.blurb} Runs in your browser; nothing is saved or sent.`}
        aside={
          <div className="on-dark rounded-[2rem] bg-navy p-7 md:p-9">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#9db8ff]">How it is worked out</p>
            <pre className="mt-5 overflow-x-auto whitespace-pre font-mono text-sm leading-7 text-fg md:text-base">{formula.join('\n')}</pre>
            <div className="mt-6 flex flex-wrap gap-2 border-t border-fg/15 pt-5">
              {terms.map((t) => (
                <a key={t} href={`/glossary#${slugTerm(t)}`} className="rounded-full border border-fg/20 px-3 py-1.5 text-xs text-fg/80 transition hover:bg-fg hover:text-bg">{t}</a>
              ))}
            </div>
          </div>
        }
      />
      <section className={`${wrap} pb-16`}>
        <Reveal className="glass overflow-hidden rounded-[2.5rem]"><C /></Reveal>
      </section>
      <section className={`${wrap} pb-24`}>
        <SectionHead index="→" label="More tools" title="Check the other" accent="side too." />
        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {TOOLS.filter((t) => t.slug !== id).map((t) => {
            const Icon = META[t.slug].icon
            return (
              <a key={t.slug} href={`/tools/${t.slug}`} className="group flex items-center gap-3 rounded-3xl border border-fg/[0.08] bg-deep p-5 transition hover:-translate-y-0.5 hover:border-brand/40">
                <span className="grid size-10 place-items-center rounded-2xl bg-sky text-brand"><Icon size={20} weight="duotone" /></span>
                <span className="font-medium">{t.name}</span>
                <ArrowUpRight size={16} className="ml-auto text-fg/40 group-hover:text-brand" />
              </a>
            )
          })}
        </div>
      </section>
      <Cta />
    </>
  )
}
