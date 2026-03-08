import { useReveal } from '../hooks/useReveal'
import { skills } from '../data/projects'
import styles from './About.module.css'

export default function About() {
  const l = useReveal(0)
  const r = useReveal(150)
  return (
    <section id="about" className={styles.about}>
      <div className="reveal" ref={l}>
        <div className={styles.label}>About me</div>
        <h2 className={styles.heading}>Passionate about<br /><em>clean code</em> &<br />great software</h2>
        <p className={styles.text}>I'm a software engineer who loves turning complex problems into elegant, reliable solutions. My focus spans automation, backend systems, and full-stack applications.</p>
        <p className={styles.text}>I believe great software is invisible — it just works, feels right, and makes people's lives easier without getting in the way.</p>
        <div className={styles.skillsGrid}>
          {skills.map(s => <div key={s} className={styles.skillItem}>{s}</div>)}
        </div>
      </div>
      <div className={`${styles.right} reveal`} ref={r}>
        <div className={styles.statRow}><div className={styles.statNum}>02</div><div className={styles.statLabel}>Projects<br />shipped &amp; live</div></div>
        <div className={styles.statRow}><div className={styles.statNum}>∞</div><div className={styles.statLabel}>Curiosity for<br />new technologies</div></div>
        <div className={styles.statRow}><div className={styles.statNum}>01</div><div className={styles.statLabel}>Developer<br />obsessed with craft</div></div>
      </div>
    </section>
  )
}
