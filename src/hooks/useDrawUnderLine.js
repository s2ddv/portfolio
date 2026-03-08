import { useRef } from 'react'

export function useDrawUnderline() {
  const ref = useRef(null)

  const onEnter = () => {
    const el = ref.current
    if (!el) return
    el.style.backgroundSize = '100% 1px'
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.backgroundSize = '0% 1px'
  }

  return { ref, onEnter, onLeave }
}