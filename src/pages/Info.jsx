import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight, Bank, ChartLineDown, Clock, Handshake, House, IdentificationCard, MagnifyingGlass, MapPin, Phone,
  Printer, ShieldCheck, WhatsappLogo,
} from '@phosphor-icons/react'
import { CONTACT, FAQ_ALL, GLOSSARY, LOANS, wa } from '../data.js'
import { drawingPower, inr } from '../lib/finance.js'
import { useTitle } from '../router.jsx'
import { Contact, Cta, HELLO, Readiness, wrap } from '../sections.jsx'
import { PageHero, Reveal, SectionHead, spring } from '../ui.jsx'

export const slugTerm = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

/* ---------- Rates: a departure-board style rate board ---------- */
const FACTORS = [
  [IdentificationCard, 'CIBIL score', 'The single biggest lever. 750+ opens the lowest bands and the widest choice of lenders.'],
  [Bank, 'Income type', 'Salaried with a listed employer usually prices below self-employed with variable income.'],
  [House, 'Security', 'Property-backed loans price well below unsecured ones; LTV matters too.'],
  [Clock, 'Tenure', 'Longer tenures can carry a slightly higher rate, and always more total interest.'],
  [Handshake, 'Relationship', 'Your salary or current account bank sometimes offers a better rate to existing customers.'],
  [ChartLineDown, 'Benchmark', 'Floating loans move with the lender’s benchmark, usually the RBI repo rate.'],
]
const BANDS = [
  ['750 – 900', 'Best pricing, most lenders compete for you', 'bg-leaf'],
  ['700 – 749', 'Most approvals, slightly higher rates', 'bg-[#8bc34a]'],
  ['650 – 699', 'Unsecured is harder; secured loans still possible', 'bg-saffron'],
  ['Below 650', 'Rebuild first, or apply secured / with a co-applicant', 'bg-heart'],
  ['No history', 'Start small; a co-applicant or secured loan helps', 'bg-fg/30'],
]

export function Rates() {
  useTitle('Indicative loan rates')
  return (
    <>
      <PageHero
        crumbs={[['Home', '/'], ['Rates']]}
        title="Where rates start,"
        accent="and what moves them."
        lede="Indicative starting rates from partner lenders. Your actual rate depends on your profile; we show you the real offer before anything is signed."
        aside={
          <div className="on-dark overflow-hidden rounded-[2rem] bg-[#07122f] p-2 shadow-[0_40px_80px_-40px_rgb(10_26_74/0.8)]">
            <div className="flex items-center justify-between px-5 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#9db8ff]">
              <span>Rate board</span>
              <span className="flex items-center gap-2"><span className="size-1.5 animate-pulse rounded-full bg-leaf" /> Indicative</span>
            </div>
            <ul className="grid gap-1.5">
              {LOANS.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ rotateX: -90, opacity: 0 }}
                  animate={{ rotateX: 0, opacity: 1 }}
                  transition={{ ...spring, delay: 0.3 + i * 0.12 }}
                  style={{ transformPerspective: 600 }}
                  className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-2xl bg-fg/[0.05] px-5 py-4"
                >
                  <span>
                    <span className="block text-sm font-medium">{l.name}</span>
                    <span className="font-mono text-[11px] text-fg/50">{l.tenure}</span>
                  </span>
                  <span className="rounded-lg bg-[#0d1d4d] px-3 py-1.5 font-mono text-sm tracking-wide text-[#ffd37a]">{l.rate}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        }
      />
      <section className={`${wrap} py-16 md:py-24`}>
        <SectionHead index="01" label="Factors" title="Six things that" accent="move your rate." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FACTORS.map(([Icon, t, s], i) => (
            <Reveal key={t} delay={(i % 3) * 0.06} className="rounded-[2rem] border border-fg/[0.08] bg-deep p-7">
              <span className="grid size-12 place-items-center rounded-2xl bg-sky text-brand"><Icon size={22} weight="duotone" /></span>
              <h3 className="mt-5 font-display text-xl font-medium">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg/60">{s}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className={`${wrap} grid gap-12 pb-24 lg:grid-cols-[0.8fr_1.2fr]`}>
        <SectionHead index="02" label="CIBIL bands" title="What your score" accent="usually means." lede="Typical lender behaviour, not a rule. Income, existing EMIs and security can move you up or down a band." />
        <Reveal className="overflow-hidden rounded-[2rem] border border-fg/[0.08] bg-deep">
          {BANDS.map(([band, text, color]) => (
            <div key={band} className="flex items-center gap-5 border-b border-fg/[0.06] p-5 last:border-0">
              <span className={`h-10 w-1.5 shrink-0 rounded-full ${color}`} />
              <span className="w-28 shrink-0 font-mono text-sm font-medium">{band}</span>
              <span className="text-sm text-fg/65">{text}</span>
            </div>
          ))}
        </Reveal>
      </section>
      <Cta />
    </>
  )
}

/* ---------- Glossary: searchable, with an A–Z rail ---------- */
export function Glossary() {
  useTitle('Loan glossary')
  const [q, setQ] = useState('')
  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    return GLOSSARY.filter(([t, d]) => !s || t.toLowerCase().includes(s) || d.toLowerCase().includes(s)).sort((a, b) => a[0].localeCompare(b[0]))
  }, [q])
  const groups = useMemo(() => {
    const m = new Map()
    for (const item of list) {
      const L = item[0][0].toUpperCase()
      m.set(L, [...(m.get(L) || []), item])
    }
    return [...m]
  }, [list])
  return (
    <>
      <PageHero
        crumbs={[['Home', '/'], ['Glossary']]}
        title="Loan words,"
        accent="in plain language."
        lede={`${GLOSSARY.length} terms lenders use, from amortisation to WCDL, explained without jargon.`}
      >
        <label className="glass mt-9 flex max-w-xl items-center gap-3 rounded-full px-5 py-3.5 focus-within:ring-4 focus-within:ring-brand/15">
          <MagnifyingGlass size={20} className="text-fg/50" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search a term, e.g. FOIR or drawing power" className="w-full bg-transparent text-sm outline-none placeholder:text-fg/40" aria-label="Search the glossary" />
          {q && <button onClick={() => setQ('')} className="text-xs font-semibold text-brand">Clear</button>}
        </label>
      </PageHero>
      <section className={`${wrap} grid gap-10 pb-24 lg:grid-cols-[4rem_1fr]`}>
        <nav aria-label="Letters" className="hidden lg:block">
          <ul className="sticky top-32 grid gap-1 font-mono text-sm">
            {groups.map(([L]) => <li key={L}><a href={`#letter-${L}`} className="block rounded-lg px-2 py-1 text-fg/50 hover:bg-sky hover:text-brand">{L}</a></li>)}
          </ul>
        </nav>
        <div>
          {groups.length === 0 && (
            <div className="rounded-[2rem] border border-dashed border-fg/15 p-10 text-center">
              <p className="font-display text-2xl font-medium">No term matches “{q}”</p>
              <p className="mt-2 text-sm text-fg/55">Ask a banker and we will explain it.</p>
              <a href={wa(`Hello India Finance, what does "${q}" mean on my loan papers?`)} target="_blank" rel="noopener" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                <WhatsappLogo size={18} weight="fill" /> Ask on WhatsApp
              </a>
            </div>
          )}
          {groups.map(([L, items]) => (
            <div key={L} id={`letter-${L}`} className="scroll-mt-28 border-t border-fg/[0.08] py-8 first:border-0 first:pt-0">
              <p className="font-serif text-6xl italic leading-none text-brand/80">{L}</p>
              <dl className="mt-6 grid gap-3 md:grid-cols-2">
                {items.map(([t, d]) => (
                  <div key={t} id={slugTerm(t)} className="scroll-mt-28 rounded-3xl border border-fg/[0.08] bg-deep p-6 target:border-brand target:ring-4 target:ring-brand/15">
                    <dt className="font-display text-lg font-medium">{t}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-fg/65">{d}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

/* ---------- Guide: editorial article with sticky contents ---------- */
const DP_EXAMPLE = drawingPower({ stock: 40_00_000, creditors: 12_00_000, debtors: 30_00_000, limit: 35_00_000 })
const TOC = [
  ['what', 'What a cash credit limit is'],
  ['dp', 'How drawing power works'],
  ['compare', 'Cash credit vs overdraft vs term loan'],
  ['size', 'How banks size your limit'],
  ['grow', 'Fresh limit, enhancement, takeover'],
  ['healthy', 'Keeping your limit healthy'],
]

export function Guide() {
  useTitle('Cash credit limit explained')
  const H = ({ id, children }) => <h2 id={id} className="scroll-mt-28 pt-14 font-display text-3xl font-medium tracking-tight md:text-4xl">{children}</h2>
  const P = ({ children }) => <p className="mt-5 text-[17px] leading-[1.8] text-fg/75">{children}</p>
  return (
    <>
      <PageHero
        crumbs={[['Home', '/'], ['Guides'], ['Cash credit explained']]}
        title="Cash credit limits,"
        accent="explained."
        lede="How a working-capital limit works, how drawing power is calculated, and what banks look at before they raise it. A 7-minute read."
      />
      <article className={`${wrap} grid gap-14 pb-24 lg:grid-cols-[15rem_1fr]`}>
        <nav aria-label="Contents" className="hidden lg:block">
          <div className="sticky top-32">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg/45">Contents</p>
            <ol className="mt-4 grid gap-1 border-l border-fg/10">
              {TOC.map(([id, t], i) => (
                <li key={id}><a href={`#${id}`} className="-ml-px block border-l border-transparent py-1.5 pl-4 text-sm text-fg/60 hover:border-brand hover:text-brand"><span className="font-mono text-xs text-fg/35">0{i + 1}</span> {t}</a></li>
              ))}
            </ol>
            <a href="/tools/drawing-power-calculator" className="mt-8 block rounded-3xl bg-navy p-5 text-sm text-[#fff]">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#9db8ff]">Try it</span>
              <span className="mt-2 block font-display text-lg">Drawing power calculator</span>
            </a>
          </div>
        </nav>
        <div className="min-w-0 max-w-[68ch]">
          <H id="what">What a cash credit limit is</H>
          <P>A cash credit (CC) limit is a running line of credit for day-to-day business needs: buying stock, paying suppliers and waiting for customers to pay you. Unlike a term loan, you do not get the full amount at once. You draw what you need, repay when sales come in, and draw again.</P>
          <P>Interest is charged only on the balance you actually use each day. A ₹50 lakh limit drawn to ₹20 lakh for a month costs interest on ₹20 lakh for that month, not ₹50 lakh.</P>

          <H id="dp">How drawing power works</H>
          <P>The sanctioned limit is a ceiling. What you can actually draw on a given day is your drawing power, worked out from the stock and debtors you report each month, after the lender keeps a margin on each.</P>
          <div className="mt-8 overflow-hidden rounded-3xl border border-fg/[0.08] bg-deep">
            <p className="border-b border-fg/[0.08] px-6 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-fg/45">Worked example · 25% stock margin, 30% debtor margin</p>
            <dl className="divide-y divide-fg/[0.06] text-sm">
              {[
                ['Paid stock', '₹40,00,000'],
                ['Less creditors for that stock', '− ₹12,00,000'],
                ['Stock after margin', inr(DP_EXAMPLE.stockDp)],
                ['Eligible debtors ₹30,00,000 after margin', inr(DP_EXAMPLE.debtorDp)],
                ['Drawing power', inr(DP_EXAMPLE.dp)],
                ['Sanctioned limit', '₹35,00,000'],
                ['You can draw', inr(DP_EXAMPLE.available)],
              ].map(([k, v], i, a) => (
                <div key={k} className={`flex justify-between gap-4 px-6 py-3.5 ${i === a.length - 1 ? 'bg-sky font-semibold text-brand' : ''}`}>
                  <dt>{k}</dt><dd className="font-mono">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <P>Here the stock and debtors support more than the limit, so the limit is the cap. If stock fell or debtors aged past the lender’s cut-off, drawing power could drop below the limit and part of it would stay locked.</P>

          <H id="compare">Cash credit vs overdraft vs term loan</H>
          <div className="mt-8 overflow-x-auto rounded-3xl border border-fg/[0.08] bg-deep">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead><tr className="border-b border-fg/[0.08] font-mono text-[10px] uppercase tracking-[0.16em] text-fg/45"><th className="p-4" /><th className="p-4">Cash credit</th><th className="p-4">Overdraft</th><th className="p-4">Term loan</th></tr></thead>
              <tbody className="divide-y divide-fg/[0.06]">
                {[
                  ['Secured by', 'Stock and debtors', 'Property, FD or salary', 'The asset bought, or property'],
                  ['How you get money', 'Draw as needed', 'Draw as needed', 'Full amount upfront'],
                  ['Interest on', 'Amount used', 'Amount used', 'Full outstanding'],
                  ['Repayment', 'Revolving, renewed yearly', 'Revolving', 'Fixed EMIs'],
                  ['Best for', 'Stock and receivables', 'Short cash gaps', 'Machinery, expansion'],
                ].map(([k, ...v]) => (
                  <tr key={k}><th className="p-4 font-medium">{k}</th>{v.map((x, i) => <td key={i} className="p-4 text-fg/65">{x}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>

          <H id="size">How banks size your limit</H>
          <P>For smaller businesses many banks use the turnover method: working capital is taken as roughly a quarter of projected annual turnover, with the business bringing in a small part of it as margin. Larger borrowers are usually assessed on their CMA data with the maximum permissible bank finance method, which looks at current assets and current liabilities instead.</P>
          <P>For very large limits, RBI rules also require that a minimum share of the working-capital limit is taken as a working capital loan for a fixed period rather than as cash credit. If your limit is in that range, plan for that split from the start.</P>

          <H id="grow">Fresh limit, enhancement, takeover</H>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ['Fresh limit', 'First CC line. Expect a full appraisal, CMA data and a stock inspection.'],
              ['Enhancement', 'Turnover has grown. Updated financials and projections justify a higher limit.'],
              ['Takeover', 'Another lender pays off the current one and sanctions its own limit, often on better terms.'],
            ].map(([t, s]) => (
              <div key={t} className="rounded-3xl border border-fg/[0.08] bg-deep p-5">
                <p className="font-display text-lg font-medium">{t}</p>
                <p className="mt-2 text-sm leading-relaxed text-fg/60">{s}</p>
              </div>
            ))}
          </div>

          <H id="healthy">Keeping your limit healthy</H>
          <ul className="mt-6 grid gap-3">
            {[
              'File stock statements on time every month; late filing can freeze drawing power.',
              'Watch debtor ageing. Receivables past the lender’s cut-off stop counting.',
              'Avoid running the limit fully drawn all year. Some movement shows the business is turning over.',
              'Renew on time with updated financials; renewal delays block enhancement.',
            ].map((t) => (
              <li key={t} className="flex gap-3 text-[17px] leading-relaxed text-fg/75"><ShieldCheck size={22} weight="fill" className="mt-1 shrink-0 text-brand" /> {t}</li>
            ))}
          </ul>
          <div className="mt-14 flex flex-col gap-3 rounded-[2rem] bg-sky p-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-display text-xl font-medium">Limit not keeping up with your business?</p>
            <a href={wa('Hello India Finance, I read your cash credit guide and want to discuss my limit.')} target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 rounded-full bg-fg px-5 py-3 text-sm font-semibold text-bg">
              <WhatsappLogo size={18} weight="fill" className="text-leaf" /> Talk to a banker
            </a>
          </div>
          <p className="mt-6 text-xs text-fg/40">General information, not financial advice. Each lender applies its own credit policy.</p>
        </div>
      </article>
    </>
  )
}

/* ---------- FAQ: category chips + search ---------- */
const CATS = ['All', ...new Set(FAQ_ALL.map((f) => f.cat))]

export function FaqPage() {
  useTitle('Frequently asked questions')
  const [cat, setCat] = useState('All')
  const [q, setQ] = useState('')
  const s = q.trim().toLowerCase()
  const list = FAQ_ALL.filter((f) => (cat === 'All' || f.cat === cat) && (!s || (f.q + f.a).toLowerCase().includes(s)))
  return (
    <>
      <PageHero crumbs={[['Home', '/'], ['FAQ']]} title="Straight answers" accent="before you apply." lede="About us, CIBIL, rates and charges, the process and cash credit. Search, or pick a topic.">
        <label className="glass mt-9 flex max-w-xl items-center gap-3 rounded-full px-5 py-3.5 focus-within:ring-4 focus-within:ring-brand/15">
          <MagnifyingGlass size={20} className="text-fg/50" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search questions" className="w-full bg-transparent text-sm outline-none placeholder:text-fg/40" aria-label="Search questions" />
        </label>
      </PageHero>
      <section className={`${wrap} pb-24`}>
        <div className="flex flex-wrap gap-1.5" role="tablist">
          {CATS.map((c) => (
            <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className="relative rounded-full px-4 py-2 text-sm font-medium">
              {cat === c && <motion.span layoutId="faq-cat" transition={spring} className="absolute inset-0 rounded-full bg-fg" />}
              <span className={`relative ${cat === c ? 'text-bg' : 'text-fg/60'}`}>{c}</span>
            </button>
          ))}
        </div>
        <div className="mt-8 divide-y divide-fg/[0.08] border-y border-fg/[0.08]">
          <AnimatePresence initial={false}>
            {list.map((f) => (
              <motion.details key={f.q} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} name="faq-page" className="py-2">
                <summary className="flex items-center justify-between gap-6 py-5">
                  <span>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-brand">{f.cat}</span>
                    <span className="mt-1 block font-display text-lg font-medium md:text-xl">{f.q}</span>
                  </span>
                  <span className="faq-icon grid size-9 shrink-0 place-items-center rounded-full border border-fg/15 text-lg transition-all duration-300">+</span>
                </summary>
                <p className="max-w-[66ch] pb-6 pr-12 leading-relaxed text-fg/65">{f.a}</p>
              </motion.details>
            ))}
          </AnimatePresence>
        </div>
        {list.length === 0 && (
          <p className="mt-10 text-center text-fg/55">
            Nothing matches. <a href={wa(`Hello India Finance, I have a question: ${q}`)} target="_blank" rel="noopener" className="font-semibold text-brand">Ask us on WhatsApp</a>
          </p>
        )}
      </section>
      <Cta />
    </>
  )
}

/* ---------- Documents ---------- */
export function DocumentsPage() {
  useTitle('Document checklist')
  return (
    <>
      <PageHero
        crumbs={[['Home', '/'], ['Documents']]}
        title="Get your file ready"
        accent="before you apply."
        lede="What lenders check for each loan, and the papers to keep at hand. Tick what you have, then print or send us what is missing."
      >
        <button onClick={() => print()} className="mt-8 inline-flex items-center gap-2 rounded-full border border-fg/12 bg-deep px-5 py-3 text-sm font-semibold transition hover:border-fg/30 print:hidden">
          <Printer size={18} /> Print this page
        </button>
      </PageHero>
      <Readiness />
    </>
  )
}

/* ---------- Contact ---------- */
export function ContactPage() {
  useTitle('Contact')
  const ways = [
    [WhatsappLogo, 'WhatsApp', 'Fastest. Send your details and a banker replies in working hours.', HELLO, 'Start a chat'],
    [Phone, 'Call', CONTACT.phone, CONTACT.tel, 'Call now'],
    [MapPin, 'Visit', CONTACT.addressShort, CONTACT.directions, 'Get directions'],
  ]
  return (
    <>
      <PageHero crumbs={[['Home', '/'], ['Contact']]} title="Talk to a banker," accent="your way." lede={`Open ${CONTACT.hours}. Most customers never need to visit, but our Esplanade office is always open to you.`}>
        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {ways.map(([Icon, t, s, href, cta]) => (
            <a key={t} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener" className="group rounded-3xl border border-fg/[0.08] bg-deep p-5 transition hover:-translate-y-0.5 hover:border-brand/40">
              <Icon size={24} weight="duotone" className="text-brand" />
              <p className="mt-4 font-display text-lg font-medium">{t}</p>
              <p className="mt-1 text-sm text-fg/55">{s}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand">{cta} <ArrowRight size={14} className="transition group-hover:translate-x-0.5" /></span>
            </a>
          ))}
        </div>
      </PageHero>
      <Contact />
    </>
  )
}

/* ---------- 404 ---------- */
export function NotFound() {
  useTitle('Page not found')
  return (
    <section className={`${wrap} flex min-h-[70dvh] flex-col items-start justify-center pt-32`}>
      <p className="font-display text-[9rem] font-medium leading-none tracking-[-0.06em] text-brand/90">404</p>
      <h1 className="mt-4 font-display text-3xl font-medium md:text-5xl">This page took a <span className="font-serif italic">wrong turn.</span></h1>
      <p className="mt-4 max-w-[48ch] text-fg/60">The link may be old, or the page may have moved. These will get you back on track.</p>
      <div className="mt-8 flex flex-wrap gap-2">
        {[['/', 'Home'], ['/loans', 'Loans'], ['/tools', 'Calculators'], ['/contact', 'Contact']].map(([href, t]) => (
          <a key={href} href={href} className="rounded-full border border-fg/12 bg-deep px-5 py-2.5 text-sm font-semibold transition hover:border-brand hover:text-brand">{t}</a>
        ))}
      </div>
    </section>
  )
}
