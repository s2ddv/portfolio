import { useReveal } from '../hooks/useReveal'
import styles from './Contact.module.css'

export default function Contact() {
  const r1 = useReveal(0), r2 = useReveal(100), r3 = useReveal(200), r4 = useReveal(300)
  return (
    <section id="contact" className={styles.contact}>
      <div className={`${styles.label} reveal`} ref={r1}>Get in touch</div>
      <h2 className={`${styles.heading} reveal`} ref={r2}>Let's<br /><em>work</em><br />together.</h2>
      <p className={`${styles.sub} reveal`} ref={r3}>Open to new opportunities, collaborations, and interesting projects. Let's build something great.</p>
      <div className={`${styles.links} reveal`} ref={r4}>
        <a href="mailto:you@email.com" className={`${styles.link} ${styles.primary}`}>Send a message</a>
        <a href="https://github.com/yourusername" className={`${styles.link} ${styles.secondary}`} target="_blank" rel="noreferrer">GitHub</a>
      </div>
    </section>
  )
}
