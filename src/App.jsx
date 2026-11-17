import { motion } from 'framer-motion'
import { Nav } from './Hero.jsx'
import { Dock, Footer, Home } from './sections.jsx'
import { useLinkInterception, usePath } from './router.jsx'
import { LoanPage, LoansHub } from './pages/Loans.jsx'
import { ToolPage, ToolsHub } from './pages/Tools.jsx'
import { ContactPage, DocumentsPage, FaqPage, Glossary, Guide, NotFound, Rates } from './pages/Info.jsx'

const ROUTES = {
  '/': Home,
  '/loans': LoansHub,
  '/tools': ToolsHub,
  '/rates': Rates,
  '/glossary': Glossary,
  '/guides/cash-credit-explained': Guide,
  '/faq': FaqPage,
  '/documents': DocumentsPage,
  '/contact': ContactPage,
}

function resolve(path) {
  const p = path.replace(/\/+$/, '') || '/'
  if (ROUTES[p]) return [ROUTES[p], {}]
  const m = p.match(/^\/(loans|tools)\/([\w-]+)$/)
  if (m) return [m[1] === 'loans' ? LoanPage : ToolPage, { id: m[2] }]
  return [NotFound, {}]
}

export default function App() {
  useLinkInterception()
  const path = usePath()
  const [Page, params] = resolve(path)
  return (
    <div className="grain">
      <Nav />
      <motion.main key={path} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
        <Page {...params} />
      </motion.main>
      <Footer />
      <Dock />
    </div>
  )
}
