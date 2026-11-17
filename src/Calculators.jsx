import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Calculator, Info, Scales, Stack, WarningCircle, WhatsappLogo } from '@phosphor-icons/react'
import { drawingPower, eligibility, emi, inr } from './lib/finance.js'
import { wa } from './data.js'
import { Num, spring } from './ui.jsx'

const clamp = (v, min, max) => Math.min(Math.max(v, min), max)

function Field({ label, value, onChange, min, max, step = 1, unit, hint }) {
  const id = useId()
  const bad = value < min || value > max
  return (
    <div className="grid gap-3">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium">{label}</label>
        <div className={`flex items-center gap-1.5 rounded-full border bg-fg/[0.04] px-3.5 py-1.5 transition-colors focus-within:border-brand ${bad ? 'border-heart' : 'border-fg/10'}`}>
          {unit === '₹' && <span className="font-mono text-sm text-fg/40">₹</span>}
          <input
            id={id}
            type="number"
            step={step}
            value={value}
            onChange={(e) => onChange(Number.isNaN(e.target.valueAsNumber) ? 0 : e.target.valueAsNumber)}
            aria-invalid={bad}
            aria-describedby={`${id}-h`}
            className="w-24 bg-transparent text-right font-mono text-sm outline-none [appearance:textfield] sm:w-28 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          {unit && unit !== '₹' && <span className="font-mono text-sm text-fg/40">{unit}</span>}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={clamp(value, min, max)}
        aria-label={label}
        style={{ '--fill': `${((clamp(value, min, max) - min) / (max - min)) * 100}%` }}
        onChange={(e) => onChange(+e.target.value)}
      />
      <p id={`${id}-h`} className={`text-xs ${bad ? 'text-heart' : 'text-fg/40'}`}>
        {bad ? `Enter a value between ${min.toLocaleString('en-IN')} and ${max.toLocaleString('en-IN')}. Using the nearest limit for now.` : hint}
      </p>
    </div>
  )
}

function Stat({ label, value, format, big }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg/50">{label}</p>
      <p className={`mt-2 tracking-tight ${big ? 'font-display text-5xl font-medium md:text-6xl' : 'font-mono text-xl'}`}>
        <Num value={value} format={format} />
      </p>
    </div>
  )
}

function EmiCalc() {
  const [p, setP] = useState(1_000_000)
  const [r, setR] = useState(10.5)
  const [y, setY] = useState(5)
  const P = clamp(p, 10_000, 100_000_000)
  const R = clamp(r, 1, 30)
  const Y = clamp(y, 1, 30)
  const m = emi(P, R, Y * 12)
  const total = m * Y * 12
  return (
    <Panel
      inputs={
        <>
          <Field label="Loan amount" unit="₹" value={p} onChange={setP} min={10_000} max={100_000_000} step={10_000} hint={inr(P, true)} />
          <Field label="Interest rate" unit="% p.a." value={r} onChange={setR} min={1} max={30} step={0.05} hint="Use the rate on your offer letter, or our indicative bands." />
          <Field label="Tenure" unit="years" value={y} onChange={setY} min={1} max={30} hint={`${Y * 12} monthly instalments`} />
        </>
      }
      result={
        <>
          <Stat label="Monthly EMI" value={m} big />
          <div className="mt-8 flex items-center gap-6">
            <svg viewBox="0 0 120 120" className="size-28 shrink-0 -rotate-90">
              <circle cx="60" cy="60" r="50" fill="none" stroke="rgb(255 255 255 / 0.1)" strokeWidth="12" />
              <motion.circle cx="60" cy="60" r="50" fill="none" stroke="#ffffff" strokeWidth="12" strokeLinecap="round" animate={{ pathLength: P / total }} transition={spring} />
            </svg>
            <div className="grid gap-3 text-sm">
              <Legend color="bg-fg" label="Principal" value={inr(P, true)} />
              <Legend color="bg-fg/25" label="Interest" value={inr(total - P, true)} />
            </div>
          </div>
          <div className="mt-8 border-t border-fg/15 pt-6">
            <Stat label="Total you repay" value={total} />
          </div>
        </>
      }
      cta={`Hello India Finance, I used your EMI calculator: ${inr(P)} at ${R}% for ${Y} years comes to ${inr(m)} a month. Can you find me a better rate?`}
    />
  )
}

function EligibilityCalc() {
  const [income, setIncome] = useState(75_000)
  const [existing, setExisting] = useState(8_000)
  const [r, setR] = useState(11.5)
  const [y, setY] = useState(5)
  const [foir, setFoir] = useState(0.5)
  const res = eligibility({
    income: clamp(income, 10_000, 2_000_000),
    existingEmi: clamp(existing, 0, 1_000_000),
    foir,
    annualRate: clamp(r, 1, 30),
    months: clamp(y, 1, 30) * 12,
  })
  return (
    <Panel
      inputs={
        <>
          <Field label="Net monthly income" unit="₹" value={income} onChange={setIncome} min={10_000} max={2_000_000} step={1_000} hint="In-hand salary, or average monthly profit for self-employed." />
          <Field label="EMIs you already pay" unit="₹" value={existing} onChange={setExisting} min={0} max={1_000_000} step={500} hint="Include credit card minimums and any running loans." />
          <div className="grid grid-cols-2 gap-5">
            <Field label="Rate" unit="%" value={r} onChange={setR} min={1} max={30} step={0.05} />
            <Field label="Tenure" unit="yrs" value={y} onChange={setY} min={1} max={30} />
          </div>
          <div>
            <p className="text-sm font-medium">Income share lenders allow for EMIs</p>
            <div className="mt-3 grid grid-cols-3 gap-1 rounded-full bg-fg/[0.05] p-1">
              {[0.4, 0.5, 0.6].map((f) => (
                <button key={f} onClick={() => setFoir(f)} className="relative rounded-full py-2 font-mono text-sm">
                  {foir === f && <motion.span layoutId="foir" transition={spring} className="absolute inset-0 rounded-full bg-fg" />}
                  <span className={`relative ${foir === f ? 'text-bg' : 'text-fg/50'}`}>{f * 100}%</span>
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-fg/40">Most banks use 40–50% at lower incomes and up to 60% for higher earners.</p>
          </div>
        </>
      }
      result={
        res.maxLoan > 0 ? (
          <>
            <Stat label="You could borrow up to" value={res.maxLoan} format={(v) => inr(v, true)} big />
            <div className="mt-8 grid gap-6 border-t border-fg/15 pt-6 sm:grid-cols-2">
              <Stat label="Room for a new EMI" value={res.maxEmi} />
              <Stat label="Exact figure" value={res.maxLoan} />
            </div>
            <p className="mt-8 flex gap-2 text-xs leading-relaxed text-fg/60">
              <Info size={16} className="mt-px shrink-0" /> Your CIBIL score, employer category and city also move this number. We check those with you before any lender sees your file.
            </p>
          </>
        ) : (
          <div className="flex h-full flex-col justify-center">
            <span className="grid size-12 place-items-center rounded-2xl bg-fg/10"><Scales size={24} /></span>
            <p className="mt-5 font-display text-3xl font-medium">No room for a new EMI yet</p>
            <p className="mt-3 max-w-[40ch] text-sm leading-relaxed text-fg/70">
              Your current EMIs already use the share of income lenders allow. Closing a small loan first, adding an earning co-applicant, or a longer tenure on a secured loan usually opens this up.
            </p>
          </div>
        )
      }
      cta={`Hello India Finance, my net income is ${inr(income)} a month and I pay ${inr(existing)} in EMIs. How much can I borrow?`}
    />
  )
}

function DrawingPowerCalc() {
  // ponytail: inputs in ₹ lakh to keep crore-sized numbers readable
  const [stock, setStock] = useState(400)
  const [cred, setCred] = useState(120)
  const [debt, setDebt] = useState(300)
  const [sm, setSm] = useState(25)
  const [dm, setDm] = useState(30)
  const [limit, setLimit] = useState(350)
  const L = 1e5
  const res = drawingPower({
    stock: clamp(stock, 0, 50_000) * L,
    creditors: clamp(cred, 0, 50_000) * L,
    debtors: clamp(debt, 0, 50_000) * L,
    stockMargin: clamp(sm, 0, 60) / 100,
    debtorMargin: clamp(dm, 0, 60) / 100,
    limit: clamp(limit, 0, 50_000) * L,
  })
  const gap = res.dp - clamp(limit, 0, 50_000) * L
  const max = Math.max(res.dp, limit * L, 1)
  return (
    <Panel
      inputs={
        <>
          <Field label="Paid stock (RM + WIP + FG)" unit="₹ L" value={stock} onChange={setStock} min={0} max={50_000} step={5} />
          <Field label="Sundry creditors for goods" unit="₹ L" value={cred} onChange={setCred} min={0} max={50_000} step={5} hint="Unpaid stock is deducted before margin." />
          <Field label="Eligible debtors (under 90 days)" unit="₹ L" value={debt} onChange={setDebt} min={0} max={50_000} step={5} hint="Some lenders accept 120 days for hospital and government receivables." />
          <div className="grid grid-cols-2 gap-5">
            <Field label="Stock margin" unit="%" value={sm} onChange={setSm} min={0} max={60} />
            <Field label="Debtor margin" unit="%" value={dm} onChange={setDm} min={0} max={60} />
          </div>
          <Field label="Sanctioned CC limit" unit="₹ L" value={limit} onChange={setLimit} min={0} max={50_000} step={5} />
        </>
      }
      result={
        <>
          <Stat label="Drawing power" value={res.dp} format={(v) => inr(v, true)} big />
          <div className="mt-8 space-y-3">
            <Bar label="From stock" value={res.stockDp} max={max} className="bg-fg" />
            <Bar label="From debtors" value={res.debtorDp} max={max} className="bg-saffron" />
            <Bar label="Sanctioned limit" value={limit * L} max={max} className="bg-fg/35" />
          </div>
          <div className="mt-8 border-t border-fg/15 pt-6">
            <Stat label="You can actually draw" value={res.available} format={(v) => inr(v, true)} />
            <p className="mt-4 text-sm leading-relaxed text-fg/70">
              {gap > 0
                ? `Your stock and debtors support ${inr(gap, true)} more than your current limit. That is a case for a limit enhancement.`
                : gap < 0
                  ? `Your limit is ${inr(-gap, true)} higher than your stock statement supports, so part of it stays locked. Cleaner stock and debtor reporting usually releases it.`
                  : 'Your drawing power matches your limit exactly.'}
            </p>
          </div>
        </>
      }
      cta={`Hello India Finance, my drawing power works out to ${inr(res.dp, true)} against a CC limit of ${inr(limit * L, true)}. Can you help with enhancement?`}
    />
  )
}

function Bar({ label, value, max, className }) {
  return (
    <div>
      <div className="flex justify-between font-mono text-xs text-fg/65">
        <span>{label}</span>
        <span>{inr(value, true)}</span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-black/25">
        <motion.div className={`h-full origin-left rounded-full ${className}`} animate={{ scaleX: value / max }} transition={spring} />
      </div>
    </div>
  )
}

function Legend({ color, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`size-2.5 rounded-full ${color}`} />
      <span className="w-20 text-fg/65">{label}</span>
      <span className="font-mono">{value}</span>
    </div>
  )
}

function Panel({ inputs, result, cta }) {
  return (
    <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
      <div className="grid content-start gap-8 p-6 md:p-10">{inputs}</div>
      <div className="relative m-2 flex flex-col justify-between overflow-hidden rounded-[2rem] on-dark bg-gradient-to-br from-brand-deep via-[#16338f] to-brand p-7 md:p-10">
        <div aria-hidden className="pointer-events-none absolute -right-16 -top-20 size-72 rounded-full bg-fg/15 blur-3xl" />
        <div className="relative">{result}</div>
        <a href={wa(cta)} target="_blank" rel="noopener" className="relative mt-10 flex items-center justify-center gap-2 rounded-full bg-fg py-3.5 text-sm font-semibold text-bg transition hover:bg-fg/90 active:scale-[0.98]">
          <WhatsappLogo size={18} weight="fill" className="text-leaf" /> Discuss this result
        </a>
      </div>
    </div>
  )
}

const TABS = [
  { id: 'emi', label: 'EMI', icon: Calculator, C: EmiCalc },
  { id: 'elig', label: 'Eligibility', icon: Scales, C: EligibilityCalc },
  { id: 'dp', label: 'Drawing power', icon: Stack, C: DrawingPowerCalc },
]

export default function Calculators() {
  const [tab, setTab] = useState('emi')
  const { C } = TABS.find((t) => t.id === tab)
  return (
    <div className="glass mt-14 overflow-hidden rounded-[2.5rem]">
      <div className="flex items-center gap-1 overflow-x-auto border-b border-fg/[0.08] p-2" role="tablist">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button key={id} role="tab" aria-selected={tab === id} onClick={() => setTab(id)} className="relative flex shrink-0 items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold">
            {tab === id && <motion.span layoutId="calc-tab" transition={spring} className="absolute inset-0 rounded-full bg-fg" />}
            <Icon size={18} className={`relative ${tab === id ? 'text-sky' : 'text-fg/45'}`} />
            <span className={`relative ${tab === id ? 'text-bg' : 'text-fg/55'}`}>{label}</span>
          </button>
        ))}
        <span className="ml-auto hidden items-center gap-2 pr-4 text-xs text-fg/40 md:flex">
          <WarningCircle size={16} /> Estimates only. Lenders set final terms.
        </span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
          <C />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
