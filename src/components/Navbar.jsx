import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

const sections = ['about', 'projects', 'contact']

function scrollToSection(e, id) {
  e.preventDefault()
  const target = document.getElementById(id)
  if (!target) return
  target.style.opacity = '0'
  target.style.transition = 'opacity 0.3s ease'
  setTimeout(() => {
    target.scrollIntoView({ behavior: 'smooth' })
    setTimeout(() => { target.style.opacity = '1' }, 300)
  }, 150)
}

export default function Navbar() {
  const [active, setActive] = useState('about')

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive(entry.target.id)
      })
    }, { threshold: 0.4 })

    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })

    return () => obs.disconnect()
  }, [])

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>Samuel<span>.Barbosa</span></div>
      <div className={styles.links}>
        {sections.map(id => ( <a
            key={id}
            href={`#${id}`}
            onClick={e => scrollToSection(e, id)}
            className={active === id ? styles.active : ''}
          >
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </a>
        ))}
      </div>
    </nav>
  )
}