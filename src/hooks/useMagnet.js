import { useEffect, useRef } from 'react'

export function useMagnet(strength = 0.3) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const dx = e.clientX - centerX
      const dy = e.clientY - centerY
      const distance = Math.sqrt(dx * dx + dy * dy)
      const maxDist = 80

      if (distance < maxDist) {
        const pull = (1 - distance / maxDist) * strength
        el.style.transform = `translate(${dx * pull}px, ${dy * pull}px)`
      } else {
        el.style.transform = 'translate(0, 0)'
      }
    }

    const onLeave = () => {
      el.style.transform = 'translate(0, 0)'
      el.style.transition = 'transform 0.4s ease'
    }

    const onEnter = () => {
      el.style.transition = 'transform 0.1s ease'
    }

    window.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    el.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      el.removeEventListener('mouseenter', onEnter)
    }
  }, [strength])

  return ref
}