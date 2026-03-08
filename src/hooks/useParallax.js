import { useEffect, useRef } from 'react'

export function useParallax(strength = 0.02) {
  const bgRef   = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth  - 0.5) * strength * 100
      const y = (e.clientY / window.innerHeight - 0.5) * strength * 100

      if (bgRef.current)
        bgRef.current.style.transform = `translate(${x}px, ${y}px)`
      if (gridRef.current)
        gridRef.current.style.transform = `translate(${x * 1.5}px, ${y * 1.5}px)`
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [strength])

  return { bgRef, gridRef }
}