import { useEffect, useRef } from 'react'

export function useReveal(delay = 0, threshold = 0.12) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setTimeout(() => el.classList.add('in'), delay)
    }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay, threshold])
  return ref
}