import { useEffect, useRef, useState } from 'react'
import styles from './Hero.module.css'
import { useReveal } from '../hooks/useReveal'
import { useParallax } from '../hooks/useParallax'
import { useMagnet } from '../hooks/useMagnet'
import { useParticles } from '../hooks/useParticles'
import { useGlitch } from '../hooks/useGlitch'

export default function Hero() {
  const ref = useReveal(0, 0.1)
  const { bgRef, gridRef } = useParallax()
  const ctaRef = useMagnet(0.3)
  const canvasRef = useRef(null)
  const glitchRef = useGlitch()
  useParticles(canvasRef)
  const [typed, setTyped] = useState('')
  const fullText = 'Software Engineer'

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setTyped(fullText.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
      }
    }, 80)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="hero" className={styles.hero}>
      <div ref={bgRef} className={styles.bg} />
      <div ref={gridRef} className={styles.grid} />
      <canvas ref={canvasRef} className={styles.particles} />
      <div className={`${styles.left} reveal`} ref={ref}>
        <div className={styles.tag}>
          {typed}
          {typed.length < fullText.length && <span className={styles.cursor} />}
        </div>
        <h1 ref={glitchRef}>Building things<br />that <em>matter</em></h1>
        <p className={styles.desc}>
          Crafting robust, elegant software with precision and purpose.
          From automation systems to full-featured apps — code is my craft.
        </p>
        <a ref={ctaRef} href="#projects" className={styles.cta}><span>View my work</span></a>
      </div>
      <div className={styles.right}>
        <div className={styles.badge}>
          <span className={styles.badgeVal}>2+</span>Projects shipped
        </div>
        <div className={styles.badge}>
          <span className={styles.badgeVal}>∞</span>Lines of code
        </div>
      </div>
      <div className={styles.scrollHint}>
        <div className={styles.scrollLine} />
        Scroll to explore
      </div>
    </section>
  )
}