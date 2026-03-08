import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import styles from './About.module.css'

const skills = [
  { name: 'JavaScript', level: 75 },
  { name: 'Python',     level: 60 },
  { name: 'Node.js',    level: 40 },
  { name: 'TypeScript', level: 40 },
  { name: 'Angular',    level: 30 },
  { name: 'AWS',        level: 40 },
]

function getRank(level) {
  if (level >= 90) return { rank: 'SSS', color: '#6b8fff', glow: '0 0 30px #6b8fff, 0 0 60px #3d6bff' }
  if (level >= 80) return { rank: 'SS',  color: '#6b8fff', glow: '0 0 24px #6b8fff, 0 0 48px #3d6bff' }
  if (level >= 70) return { rank: 'S',   color: '#3d6bff', glow: '0 0 20px #3d6bff, 0 0 40px #1a3fff' }
  if (level >= 60) return { rank: 'A',   color: '#3d6bff', glow: '0 0 14px #3d6bff' }
  if (level >= 50) return { rank: 'B',   color: '#8a8aaa', glow: '0 0 10px #8a8aaa' }
  if (level >= 40) return { rank: 'C',   color: '#5a5a7a', glow: '0 0 8px #5a5a7a'  }
  if (level >= 30) return { rank: 'D',   color: '#3a3a5a', glow: 'none' }
  return                  { rank: 'E',   color: '#2a2a3a', glow: 'none' }
}

function PieChart({ level }) {
  const r = 70
  const cx = 90, cy = 90
  const circumference = 2 * Math.PI * r
  const filled = (level / 100) * circumference
  const empty  = circumference - filled

  return (
    <svg viewBox="0 0 180 180" className={styles.pie}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(61,107,255,0.1)" strokeWidth="8" />
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke="url(#blueGrad)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={`${filled} ${empty}`}
        strokeDashoffset={circumference * 0.25}
        style={{ transition: 'stroke-dasharray 0.8s ease' }}
      />
      <defs>
        <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#1a3fff" />
          <stop offset="100%" stopColor="#6b8fff" />
        </linearGradient>
      </defs>
      <text x={cx} y={cy - 8} textAnchor="middle" fill="#3d6bff" fontFamily="Cormorant Garamond, serif" fontSize="28" fontWeight="300">{level}%</text>
      <text x={cx} y={cy + 16} textAnchor="middle" fill="#8a8aaa" fontFamily="DM Mono, monospace" fontSize="9" letterSpacing="2">PROFICIENCY</text>
    </svg>
  )
}

export default function About() {
  const l = useReveal(0)
  const r = useReveal(150)
  const [selected, setSelected] = useState(skills.find(s => s.name === 'Node.js'))
  const { rank, color, glow } = getRank(selected.level)

  return (
    <section id="about" className={styles.about}>
      <div className={`${styles.left} reveal`} ref={l}>
        <div className={styles.label}>About me</div>
        <h2 className={styles.heading}>Passionate about<br /><em>clean code</em> &<br />great software</h2>
        <p className={styles.text}>I'm a software engineer who loves turning complex problems into elegant, reliable solutions. My focus spans automation, backend systems, and full-stack applications.</p>
        <p className={styles.text}>I believe great software is invisible — it just works, feels right, and makes people's lives easier without getting in the way.</p>
        <div className={styles.skillsGrid}>
          {skills.map(s => (
            <div
              key={s.name}
              className={`${styles.skillItem} ${selected.name === s.name ? styles.skillActive : ''}`}
              onClick={() => setSelected(s)}
            >
              {s.name}
            </div>
          ))}
        </div>
      </div>

      <div className={`${styles.right} reveal`} ref={r}>
        <div className={styles.chartWrapper}>
          <PieChart level={selected.level} />
          <div className={styles.chartLabel}>{selected.name}</div>
          <div className={styles.rankBadge} style={{ color, textShadow: glow }}>{rank}</div>
          <div className={styles.rankSub}>Current Rank</div>
        </div>
      </div>
    </section>
  )
}