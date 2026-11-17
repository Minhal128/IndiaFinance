import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Leaf, Tree } from '@phosphor-icons/react'
import india from '@svg-maps/india'
import { wa } from './data.js'
import FlagGL from './FlagGL.jsx'

// The svg-maps India sheet is Mercator: 21.11 px per degree, calibrated against Delhi, Goa, Tripura,
// Sikkim and Kerala bounding boxes. (lat, lon) → viewBox point.
const K = 21.11
const merc = (lat) => (Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360)) * 180) / Math.PI
const P = (lat, lon) => [K * lon - 1443.6, 210.4 - K * (merc(lat) - 29.82)]

// Line-art landmarks, 32×32, stroke = currentColor.
const ART = {
  howrah: <><path d="M2 24h28M8 24V8M24 24V8M2 18 8 8l8 6 8-6 6 10M12 24V11.5M20 24V11.5M16 14v10" /></>,
  indiagate: <><path d="M5 28h22M8 28V9h16v19M12 28v-8a4 4 0 0 1 8 0v8M7 9h18M10 9V6h12v3" /></>,
  gateway: <><path d="M4 28h24M7 28V12h18v16M12 28v-7a4 4 0 0 1 8 0v7M7 12V8M11.5 12V8M20.5 12V8M25 12V8M6 8h2M10.5 8h2M19.5 8h2M24 8h2" /></>,
  taj: <><path d="M3 28h26M10 28V18h12v10M10 18c0-5 3-7 6-9 3 2 6 4 6 9M16 9V5M5 28V12M27 28V12M4 12h2M26 12h2M14 28v-4a2 2 0 0 1 4 0v4" /></>,
  charminar: <><path d="M3 28h26M6 28V6M26 28V6M5 6l1-2 1 2M25 6l1-2 1 2M6 22h20M6 14h20M11 28v-6a5 5 0 0 1 10 0v6" /></>,
  gopuram: <><path d="M6 28 8 22h16l2 6ZM8 22l2-6h12l2 6M10 16l2-5h8l2 5M12 11l1.5-4h5L20 11M16 7V4M14 28v-4h4v4" /></>,
  konark: <><circle cx="16" cy="16" r="11" /><circle cx="16" cy="16" r="3" /><path d="M16 5v8M16 19v8M5 16h8M19 16h8M8.2 8.2l5.7 5.7M18.1 18.1l5.7 5.7M23.8 8.2l-5.7 5.7M13.9 18.1l-5.7 5.7" /></>,
  golden: <><path d="M8 22v-7h16v7M11 15c0-4 2.5-6 5-7 2.5 1 5 3 5 7M16 8V5M6 22h20M3 26c3-1.5 5-1.5 8 0s5 1.5 8 0 5-1.5 8 0" /></>,
  nets: <><path d="M3 26c3-1.5 5-1.5 8 0s5 1.5 8 0 5-1.5 8 0M8 25 22 7M22 7l-7 11h13ZM8 25l-3-6" /></>,
  kite: <><path d="M16 3 26 14 16 25 6 14ZM16 3v22M6 14h20M16 25c-2 2 2 3 0 5" /></>,
}

const CITIES = [
  { id: 'kol', en: 'Kolkata', native: 'কলকাতা', lang: 'Bengali', state: 'wb', at: [22.57, 88.36], art: 'howrah', note: 'Howrah Bridge · our home desk at Esplanade' },
  { id: 'del', en: 'Delhi', native: 'दिल्ली', lang: 'Hindi', state: 'dl', at: [28.61, 77.21], art: 'indiagate', note: 'India Gate · the capital' },
  { id: 'agr', en: 'Agra', native: 'आगरा', lang: 'Hindi', state: 'up', at: [27.18, 78.01], art: 'taj', note: 'Taj Mahal · a monument to love' },
  { id: 'amr', en: 'Amritsar', native: 'ਅੰਮ੍ਰਿਤਸਰ', lang: 'Punjabi', state: 'pb', at: [31.63, 74.87], art: 'golden', note: 'Golden Temple · langar for all' },
  { id: 'amd', en: 'Ahmedabad', native: 'અમદાવાદ', lang: 'Gujarati', state: 'gj', at: [23.02, 72.57], art: 'kite', note: 'Uttarayan · the kite festival' },
  { id: 'mum', en: 'Mumbai', native: 'मुंबई', lang: 'Marathi', state: 'mh', at: [19.08, 72.88], art: 'gateway', note: 'Gateway of India · city of dreams' },
  { id: 'hyd', en: 'Hyderabad', native: 'హైదరాబాద్', lang: 'Telugu', state: 'tg', at: [17.39, 78.49], art: 'charminar', note: 'Charminar · pearls and biryani' },
  { id: 'blr', en: 'Bengaluru', native: 'ಬೆಂಗಳೂರು', lang: 'Kannada', state: 'ka', at: [12.97, 77.59], art: 'tree', note: 'Garden city · India’s tech hub' },
  { id: 'che', en: 'Chennai', native: 'சென்னை', lang: 'Tamil', state: 'tn', at: [13.08, 80.27], art: 'gopuram', note: 'Temple gopurams · Carnatic music' },
  { id: 'koc', en: 'Kochi', native: 'കൊച്ചി', lang: 'Malayalam', state: 'kl', at: [9.93, 76.27], art: 'nets', note: 'Chinese fishing nets · backwaters' },
  { id: 'bbs', en: 'Bhubaneswar', native: 'ଭୁବନେଶ୍ୱର', lang: 'Odia', state: 'or', at: [20.3, 85.82], art: 'konark', note: 'Konark wheel · temple city' },
  { id: 'guw', en: 'Guwahati', native: 'গুৱাহাটী', lang: 'Assamese', state: 'as', at: [26.14, 91.74], art: 'tea', note: 'Assam tea · gateway to the North-East' },
].map((c) => ({ ...c, xy: P(...c.at) }))

const HUB = CITIES[0].xy
const TRI = ['#f0953a', '#1f4fd8', '#23a455'] // tagline tricolour

function Landmark({ art, className }) {
  if (art === 'tree') return <Tree className={className} weight="light" />
  if (art === 'tea') return <Leaf className={className} weight="light" />
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {ART[art]}
    </svg>
  )
}

// Quadratic arc from Kolkata, bowed away from the map centre.
function route([x2, y2]) {
  const [x1, y1] = HUB
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.hypot(dx, dy) || 1
  const bow = Math.min(90, len * 0.28)
  return `M${x1} ${y1} Q${mx + (dy / len) * bow} ${my - (dx / len) * bow} ${x2} ${y2}`
}

export default function IndiaMap() {
  const [flag, setFlag] = useState(false)
  const [i, setI] = useState(1)
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n % (CITIES.length - 1)) + 1), 2600)
    return () => clearInterval(t)
  }, [])
  const c = CITIES[i]

  return (
    <div className="relative">
      {/* three stacked layers on one 612×696 sheet: land (svg) → waving tiranga (webgl, on hover/tap) → routes + pins (svg) */}
      <div
        className="relative aspect-[612/696] w-full"
        onPointerEnter={(e) => e.pointerType === 'mouse' && setFlag(true)}
        onPointerLeave={(e) => e.pointerType === 'mouse' && setFlag(false)}
        onPointerUp={(e) => e.pointerType !== 'mouse' && setFlag((f) => !f)}
      >
      <svg viewBox={india.viewBox} className="absolute inset-0 h-full w-full drop-shadow-[0_30px_40px_rgb(31_79_216/0.18)]" role="img" aria-label="Map of India with routes from our Kolkata office to cities across the country">
        <defs>
          <linearGradient id="land" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#dfe8fd" />
          </linearGradient>
          <pattern id="dots" width="7" height="7" patternUnits="userSpaceOnUse">
            <circle cx="3.5" cy="3.5" r="0.9" fill="#0a1a4a" opacity="0.16" />
          </pattern>
        </defs>
        {india.locations.map((s) => (
          <path
            key={s.id}
            d={s.path}
            fill={s.id === c.state ? 'rgb(31 79 216 / 0.16)' : 'url(#land)'}
            stroke="#c9d6f5"
            strokeWidth="0.8"
            className="transition-[fill] duration-700"
          />
        ))}
        <g fill="url(#dots)" pointerEvents="none">
          {india.locations.map((s) => <path key={s.id} d={s.path} />)}
        </g>
      </svg>

      <FlagGL active={flag} className="pointer-events-none absolute inset-0 h-full w-full" />

      <svg viewBox={india.viewBox} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        {CITIES.slice(1).map((city, k) => {
          const d = route(city.xy)
          const on = city.id === c.id
          return (
            <g key={city.id}>
              <path d={d} fill="none" stroke="#1f4fd8" strokeOpacity={on ? 0.9 : 0.28} strokeWidth={on ? 1.8 : 1} strokeDasharray="3 4" className="transition-[stroke-opacity] duration-500" />
              <circle r="2.6" fill={TRI[k % 3]} className="motion-reduce:hidden">
                <animateMotion dur={`${3.2 + (k % 4) * 0.6}s`} repeatCount="indefinite" path={d} begin={`${k * 0.35}s`} />
              </circle>
            </g>
          )
        })}

        {CITIES.map((city) => {
          const [x, y] = city.xy
          const on = city.id === c.id
          const hub = city.id === 'kol'
          const left = x > 430 // keep labels inside the sheet on the east coast
          return (
            <g key={city.id} transform={`translate(${x} ${y})`}>
              {(on || hub) && (
                <circle r="6" fill="none" stroke={hub ? '#e3262e' : '#1f4fd8'} strokeWidth="1.5">
                  <animate attributeName="r" values="5;16" dur="1.8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.9;0" dur="1.8s" repeatCount="indefinite" />
                </circle>
              )}
              <circle r={hub ? 6 : on ? 5 : 3.5} fill={hub ? '#e3262e' : on ? '#1f4fd8' : '#0a1a4a'} stroke="#fff" strokeWidth="1.5" className="transition-all duration-500" />
              <text
                x={left ? -9 : 9}
                y="4"
                textAnchor={left ? 'end' : 'start'}
                className={`transition-all duration-500 ${on || hub ? 'fill-fg text-[14px] font-semibold' : 'fill-fg/65 text-[11.5px] font-medium'}`}
                paintOrder="stroke"
                stroke="#f5f7fc"
                strokeWidth="3"
              >
                {city.native}
              </text>
            </g>
          )
        })}
      </svg>
      </div>

      <p className="pointer-events-none absolute right-0 top-0 hidden font-mono text-[10px] uppercase tracking-[0.18em] text-fg/40 sm:block">
        <span className="hidden [@media(hover:hover)]:inline">Hover</span><span className="[@media(hover:hover)]:hidden">Tap</span> the map
      </p>

      {/* ponytail: sits in the Bay of Bengal (x 44–80%, y > 72% of the sheet), clear of land and the Andamans */}
      <div className="mt-4 sm:absolute sm:bottom-[1%] sm:left-[44%] sm:mt-0 sm:w-[36%]">
        <AnimatePresence mode="wait">
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
            transition={{ type: 'spring', stiffness: 140, damping: 18 }}
            className="glass rounded-3xl p-4"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-sky text-brand">
                <Landmark art={c.art} className="size-9" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-lg font-semibold leading-tight">{c.native}</p>
                <p className="mt-0.5 text-xs text-fg/55">{c.en} · {c.lang}</p>
              </div>
            </div>
            <p className="mt-3 text-[13px] leading-snug text-fg/70">{c.note}</p>
            <a
              href={wa(`Hello India Finance, I'm in ${c.en} and would like to discuss a loan.`)}
              target="_blank"
              rel="noopener"
              className="pointer-events-auto mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand"
            >
              Apply from {c.en} <ArrowUpRight size={14} weight="bold" />
            </a>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
