import { ArrowRight, ArrowUpRight, CheckCircle, FileText, Warning, WhatsappLogo } from '@phosphor-icons/react'
import { CRITERIA, DOCS, FAQ_ALL, LOAN_DETAILS, LOANS, wa } from '../data.js'
import { useTitle } from '../router.jsx'
import { Cta, ICONS, Loans, VISUAL, wrap } from '../sections.jsx'
import { DrawingPowerCalc, EmiCalc } from '../Calculators.jsx'
import { Magnetic, PageHero, Reveal, SectionHead } from '../ui.jsx'
import { NotFound } from './Info.jsx'

const CRIT_COL = { personal: 0, business: 1, lap: 2, cc: 3, bt: 0 }
const FAQ_CATS = {
  personal: ['CIBIL & eligibility', 'Rates & charges'],
  business: ['CIBIL & eligibility', 'Process'],
  lap: ['Process', 'Rates & charges'],
  cc: ['Cash credit'],
  bt: ['Rates & charges'],
}

export function LoansHub() {
  useTitle('Loans')
  return (
    <>
      <PageHero
        crumbs={[['Home', '/'], ['Loans']]}
        title="Five loans, one banker who knows"
        accent="which lender fits."
        lede="Compare what each loan is for, what it costs and how long it takes. Then open the one that fits for eligibility, documents and an EMI estimate."
        aside={
          <div className="glass overflow-hidden rounded-[2rem]">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-fg/10 font-mono text-[10px] uppercase tracking-[0.16em] text-fg/45">
                  <th className="p-4">Loan</th>
                  <th className="p-4">From</th>
                  <th className="hidden p-4 sm:table-cell">Tenure</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-fg/[0.06]">
                {LOANS.map((l) => (
                  <tr key={l.id} className="group">
                    <td className="p-4">
                      <a href={`/loans/${l.slug}`} className="flex items-center gap-2 font-medium group-hover:text-brand">
                        {l.name} <ArrowRight size={14} className="opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </a>
                    </td>
                    <td className="p-4 text-fg/70">{l.rate}</td>
                    <td className="hidden p-4 text-fg/70 sm:table-cell">{l.tenure}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="border-t border-fg/10 px-4 py-3 text-[11px] text-fg/45">Indicative ranges. Lenders set final terms.</p>
          </div>
        }
      />
      <Loans />
      <Cta />
    </>
  )
}

export function LoanPage({ id }) {
  const loan = LOANS.find((l) => l.slug === id)
  useTitle(loan?.name ?? 'Page not found')
  if (!loan) return <NotFound />
  const d = LOAN_DETAILS[loan.id]
  const Icon = ICONS[loan.id]
  const Visual = VISUAL[loan.id]
  const col = CRIT_COL[loan.id]
  const faqs = FAQ_ALL.filter((f) => FAQ_CATS[loan.id].includes(f.cat)).slice(0, 4)
  const others = LOANS.filter((l) => l.id !== loan.id)
  const ask = wa(`Hello India Finance, I'm interested in a ${loan.name}. Can you check my eligibility?`)

  return (
    <>
      <PageHero
        crumbs={[['Home', '/'], ['Loans', '/loans'], [loan.name]]}
        eyebrow={
          <span className="inline-flex items-center gap-2 rounded-full border border-fg/10 bg-deep py-1.5 pl-1.5 pr-4 text-xs font-medium text-fg/70">
            <span className="grid size-6 place-items-center rounded-full bg-brand text-[#fff]"><Icon size={13} weight="fill" /></span>
            {loan.tag}
          </span>
        }
        title={loan.name}
        lede={loan.blurb}
        aside={
          // same visual as the home bento card, on the same surface it was designed for
          ['personal', 'bt'].includes(loan.id) ? (
            <div className="on-dark relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy via-[#16338f] to-brand p-7 shadow-[0_40px_80px_-40px_rgb(31_79_216/0.6)] md:p-9">
              <div aria-hidden className="absolute -right-16 -top-20 size-64 rounded-full bg-[#fff]/10 blur-3xl" />
              <div className="relative"><Visual /></div>
            </div>
          ) : (
            <div className="glass rounded-[2rem] p-7 md:p-9">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg/45">{loan.name} · at a glance</p>
              <Visual />
            </div>
          )
        }
      >
        <dl className="mt-9 grid max-w-xl grid-cols-3 divide-x divide-fg/10 border-y border-fg/10 py-5">
          {[['Amount', loan.ticket], ['Rate', loan.rate], ['Tenure', loan.tenure]].map(([k, v], i) => (
            <div key={k} className={i ? 'pl-4 sm:pl-6' : 'pr-4'}>
              <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg/45">{k}</dt>
              <dd className="mt-1 text-sm font-semibold sm:text-base">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Magnetic href={ask} target="_blank" rel="noopener" className="group flex items-center justify-center gap-3 rounded-full bg-fg py-2 pl-6 pr-2 text-sm font-semibold text-bg">
            Check my eligibility
            <span className="grid size-9 place-items-center rounded-full bg-brand text-[#fff] transition-transform group-hover:rotate-[-45deg]"><ArrowRight size={15} weight="bold" /></span>
          </Magnetic>
          <a href="#estimate" className="flex items-center justify-center gap-2 rounded-full border border-fg/12 bg-deep px-6 py-3.5 text-sm font-semibold transition hover:border-fg/30">
            {loan.id === 'cc' ? 'Work out drawing power' : 'Estimate my EMI'}
          </a>
        </div>
      </PageHero>

      {/* who it is for + what you get */}
      <section className={`${wrap} grid gap-12 py-20 md:py-28 lg:grid-cols-[0.8fr_1.2fr]`}>
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHead index="01" label="Fit" title="Who this" accent="suits." />
          <Reveal as="ul" className="mt-8 grid gap-3">
            {d.who.map((w) => (
              <li key={w} className="flex items-start gap-3 text-fg/75">
                <CheckCircle size={22} weight="fill" className="mt-0.5 shrink-0 text-brand" /> {w}
              </li>
            ))}
          </Reveal>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {d.features.map(([t, s], i) => (
            <Reveal key={t} delay={i * 0.06} className={`rounded-[2rem] border border-fg/[0.08] bg-deep p-7 ${i % 2 ? 'sm:translate-y-8' : ''}`}>
              <span className="font-serif text-5xl italic leading-none text-brand">0{i + 1}</span>
              <h3 className="mt-5 font-display text-xl font-medium">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg/60">{s}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* estimate */}
      <section id="estimate" className={`${wrap} py-12 md:py-20`}>
        <SectionHead
          index="02"
          label="Estimate"
          title={loan.id === 'cc' ? 'What your stock and debtors' : 'Your EMI on this loan,'}
          accent={loan.id === 'cc' ? 'let you draw.' : 'before you apply.'}
          lede="Calculated in your browser with indicative numbers. Change anything; nothing is saved."
        />
        <Reveal className="glass mt-12 overflow-hidden rounded-[2.5rem]">
          {loan.id === 'cc' ? <DrawingPowerCalc /> : <EmiCalc amount={d.preset.amount} rate={loan.defaultRate} years={d.preset.years} />}
        </Reveal>
      </section>

      {/* eligibility + documents */}
      <section className={`${wrap} grid gap-5 py-12 md:py-20 lg:grid-cols-2`}>
        <Reveal className="rounded-[2rem] border border-fg/[0.08] bg-deep p-7 md:p-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg/45"><span className="text-brand">03</span> · What lenders check</p>
          <dl className="mt-6 divide-y divide-fg/[0.07]">
            {CRITERIA.rows.map(([k, ...v]) => (
              <div key={k} className="grid grid-cols-[9rem_1fr] gap-4 py-4 text-sm">
                <dt className="font-medium">{k}</dt>
                <dd className="text-fg/65">{v[col]}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal delay={0.08} className="on-dark relative overflow-hidden rounded-[2rem] bg-navy p-7 md:p-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg/55"><span className="text-[#9db8ff]">04</span> · Documents to keep ready</p>
          <ul className="mt-6 grid gap-3">
            {DOCS[loan.id].map((doc) => (
              <li key={doc} className="flex items-center gap-3 text-sm">
                <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-fg/10"><FileText size={16} /></span> {doc}
              </li>
            ))}
          </ul>
          <a href={wa(`Hello India Finance, please confirm the documents I need for a ${loan.name}.`)} target="_blank" rel="noopener" className="mt-8 inline-flex items-center gap-2 rounded-full bg-fg px-5 py-3 text-sm font-semibold text-bg">
            <WhatsappLogo size={18} weight="fill" className="text-leaf" /> Confirm my list on WhatsApp
          </a>
        </Reveal>
      </section>

      {/* watch-outs */}
      <section className={`${wrap} py-12 md:py-20`}>
        <SectionHead index="05" label="Read before you sign" title="Three things to" accent="watch for." />
        <div className="mt-12 grid gap-4 md:grid-cols-[1.2fr_1fr_1fr]">
          {d.watch.map((w, i) => (
            <Reveal key={w} delay={i * 0.06} className="rounded-[2rem] border border-heart/20 bg-heart/[0.04] p-7">
              <Warning size={26} weight="duotone" className="text-heart" />
              <p className="mt-5 leading-relaxed text-fg/80">{w}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* faq */}
      {faqs.length > 0 && (
        <section className={`${wrap} grid gap-12 py-12 md:py-20 lg:grid-cols-[0.8fr_1.2fr]`}>
          <SectionHead index="06" label="Questions" title="Asked about" accent="this loan." />
          <div className="divide-y divide-fg/[0.08] border-y border-fg/[0.08]">
            {faqs.map((f) => (
              <details key={f.q} name="loan-faq" className="py-2">
                <summary className="flex items-center justify-between gap-6 py-5">
                  <span className="font-display text-lg font-medium">{f.q}</span>
                  <span className="faq-icon grid size-9 shrink-0 place-items-center rounded-full border border-fg/15 text-lg transition-all duration-300">+</span>
                </summary>
                <p className="max-w-[62ch] pb-6 pr-12 leading-relaxed text-fg/60">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* other loans */}
      <section className={`${wrap} py-12 md:py-20`}>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg/45">Other loans</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((o) => {
            const OIcon = ICONS[o.id]
            return (
              <a key={o.id} href={`/loans/${o.slug}`} className="group flex items-center justify-between gap-3 rounded-3xl border border-fg/[0.08] bg-deep p-5 transition hover:-translate-y-0.5 hover:border-brand/40">
                <span className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-2xl bg-sky text-brand"><OIcon size={20} weight="duotone" /></span>
                  <span className="font-medium">{o.name}</span>
                </span>
                <ArrowUpRight size={16} className="text-fg/40 transition group-hover:text-brand" />
              </a>
            )
          })}
        </div>
      </section>
      <Cta />
    </>
  )
}
