import { useEffect, useState } from 'react'

// ponytail: a 30-line history router instead of react-router — the site has flat routes and no data loading.
// Upgrade to react-router if you need nested layouts, loaders or route-level code splitting.
// Hosting must rewrite unknown paths to /index.html (Vite dev/preview already do).

const listeners = new Set()

export function navigate(to) {
  if (to === location.pathname + location.hash) return
  history.pushState(null, '', to)
  listeners.forEach((fn) => fn())
}

export function usePath() {
  const [path, setPath] = useState(location.pathname)
  useEffect(() => {
    const update = () => setPath(location.pathname)
    listeners.add(update)
    addEventListener('popstate', update)
    return () => { listeners.delete(update); removeEventListener('popstate', update) }
  }, [])
  return path
}

// Plain <a href="/..."> links become client-side navigations — no special Link component needed.
export function useLinkInterception() {
  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = e.target.closest('a[href]')
      if (!a || a.target || a.hasAttribute('download')) return
      const url = new URL(a.href, location.href)
      if (url.origin !== location.origin) return
      if (url.pathname === location.pathname && url.hash) return // same-page anchor: let the browser scroll
      e.preventDefault()
      navigate(url.pathname + url.hash)
      requestAnimationFrame(() => {
        const el = url.hash && document.getElementById(url.hash.slice(1))
        el ? el.scrollIntoView() : scrollTo({ top: 0, behavior: 'instant' })
      })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
}

export function useTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | India Finance` : 'India Finance | Personal, Business & Property Loans in Kolkata'
  }, [title])
}
