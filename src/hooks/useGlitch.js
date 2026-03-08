import { useEffect, useRef } from 'react'

export function useGlitch() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let timeout
    let intervals = []

    const glitchChars = '!<>-_\\/[]{}—=+*^?#'

    const randomChar = () => glitchChars[Math.floor(Math.random() * glitchChars.length)]

    const runGlitch = () => {
      const original = el.innerText
      let iteration = 0
      const total = 8

      const interval = setInterval(() => {
        el.innerText = original
          .split('')
          .map((char, i) => {
            if (char === ' ' || char === '\n') return char
            if (i < iteration) return original[i]
            return randomChar()
          })
          .join('')

        iteration += 0.5
        if (iteration >= original.length) {
          el.innerText = original
          clearInterval(interval)
        }
      }, 40)

      intervals.push(interval)
    }

    timeout = setTimeout(runGlitch, 800)

    return () => {
      clearTimeout(timeout)
      intervals.forEach(clearInterval)
    }
  }, [])

  return ref
}