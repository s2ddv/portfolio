import { useReveal } from '../hooks/useReveal'
import { useMagnet } from '../hooks/useMagnet'
import styles from './Contact.module.css'

export default function Contact() {
  const r1 = useReveal(0), r2 = useReveal(100), r3 = useReveal(200), r4 = useReveal(300)
  const magnetPrimary   = useMagnet(0.3)
  const magnetSecondary = useMagnet(0.3)

  return (
    <section id="contact" className={styles.contact}>
      <div className={`${styles.label} reveal`} ref={r1}>Get in touch</div>
      <h2 className={`${styles.heading} reveal`} ref={r2}>Let's<br /><em>work</em><br />together.</h2>
      <p className={`${styles.sub} reveal`} ref={r3}>Open to new opportunities, collaborations, and interesting projects. Let's build something great.</p>
      <div className={`${styles.links} reveal`} ref={r4}>
        <a ref={magnetPrimary} href="https://mail.google.com/mail/?view=cm&to=souzasam2008@gmail.com&su=Hello%20Samuel" className={`${styles.link} ${styles.primary}`} target="_blank" rel="noreferrer">Send a message</a>
        <a ref={magnetSecondary} href="https://github.com/s2ddv" className={`${styles.link} ${styles.secondary}`} target="_blank" rel="noreferrer">GitHub</a>
      </div>
    </section>
  )
}