import { useEffect, useRef } from 'react'
import styles from './Cursor.module.css'
import { useCursorAnimation } from '../hooks/animations'

export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  useCursorAnimation(dotRef, ringRef)

  return (
    <>
      <div ref={dotRef}  className={styles.dot} />
      <div ref={ringRef} className={styles.ring} />
    </>
  )
}
