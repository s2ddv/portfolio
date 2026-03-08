import { useState, useRef } from 'react'
import Globe from './Globe'
import { projects } from '../data/projects'
import { useReveal } from '../hooks/useReveal'
import { useFadeIn } from '../hooks/animations'
import { useDrawUnderline } from '../hooks/useDrawUnderline'
import { useMagnet } from '../hooks/useMagnet'
import styles from './Projects.module.css'

export default function Projects() {
  const [current, setCurrent] = useState(0)
  const { visible, setVisible, fadeOut } = useFadeIn(false, 400)
  const globeRef = useRef(null)
  const headerRef = useReveal(0)
  const underline = useDrawUnderline()
  const project = projects[current]

  const magnetRefs = projects.map(() => useMagnet(0.4))

  function switchProject(idx) {
    if (idx === current) return
    fadeOut(200)
    const sign = idx > current ? 1 : -1
    if (globeRef.current) {
      const currentRotY = globeRef.current.getRotY()
      globeRef.current.triggerSwitch(currentRotY + Math.PI * 1.5 * sign, projects[idx].rotX)
    }
    setTimeout(() => { setCurrent(idx) }, 200)
  }

  return (
    <section id="projects" className={styles.projects}>
      <div className={`${styles.header} reveal`} ref={headerRef}>
        <div className={styles.label}>Selected work</div>
        <h2 className={styles.heading}>My <em>projects</em></h2>
      </div>
      <div className={styles.stage}>
        <div className={[styles.info, visible && styles.infoVisible].filter(Boolean).join(' ')}>
          <div className={styles.counter}>{project.counter}</div>
          <div
            ref={underline.ref}
            className={styles.name}
            onMouseEnter={underline.onEnter}
            onMouseLeave={underline.onLeave}
          >
            {project.name}
          </div>
          <p className={styles.desc}>{project.desc}</p>
          <div className={styles.stack}>
            {project.stack.map(s => <span key={s} className={styles.tag}>{s}</span>)}
          </div>
          <a href={project.link} className={styles.link} target="_blank" rel="noreferrer">View project</a>
        </div>
        <div className={styles.globeWrapper}>
          <div className={styles.globeOuter}>
            <Globe ref={globeRef} />
          </div>
          <div className={styles.nav}>
            {projects.map((_, i) => (
              <button
                key={i}
                ref={magnetRefs[i]}
                className={`${styles.numBtn}${i === current ? ` ${styles.active}` : ''}`}
                onClick={() => switchProject(i)}
              >
                <span>{String(i+1).padStart(2,'0')}</span>
              </button>
            ))}
          </div>
        </div>
        <div className={[styles.meta, visible && styles.metaVisible].filter(Boolean).join(' ')}>
          <div className={styles.metaItem}><div className={styles.metaLabel}>Type</div><div className={styles.metaValue}>{project.type}</div></div>
          <div className={styles.metaItem}><div className={styles.metaLabel}>Stack</div><div className={styles.metaValue}>{project.stackShort}</div></div>
          <div className={styles.metaItem}><div className={styles.metaLabel}>Status</div><div className={styles.metaValue}>{project.status}</div></div>
        </div>
      </div>
    </section>
  )
}