import React, { ReactNode, useState, useRef, useEffect } from 'react'
import classNames from 'classnames'

import styles from './style.less'

export interface Props {
  serial: ReactNode
  title: string
  desc: ReactNode
  bgUrl: string
  popDir: 'up' | 'down'
  motivation?: boolean
}

const popDirStyle = {
  up: styles.popDirUp,
  down: styles.popDirDown
}

export default function Item({ serial, title, desc, bgUrl, popDir, motivation = false }: Props) {
  const [isEnter, setIsEnter] = useState(false)
  const moti = isEnter ? styles.enter : styles.leave
  const motivationRef = useRef<HTMLDivElement | null>(null)

  const handleMotivationEnter = () => setIsEnter(true)
  const handleMotivationLeave = () => setIsEnter(false)

  useEffect(() => {
    if (motivationRef.current) {
      motivationRef.current.addEventListener('mouseenter', handleMotivationEnter)
      motivationRef.current.addEventListener('mouseleave', handleMotivationLeave)
    }
    return () => {
      motivationRef.current!.removeEventListener('mouseenter', handleMotivationEnter)
      motivationRef.current!.removeEventListener('mouseleave', handleMotivationLeave)
    }
  }, [])

  return motivation
    ? (<div className={classNames(styles.motivationCard, moti)} ref={motivationRef}>
      <img src={bgUrl} />
      <h5>{title}</h5>
      <p>{desc}</p>
    </div >)
    : (
      <div
        className={classNames(styles.card, popDirStyle[popDir])}
        style={{ backgroundImage: `url("${bgUrl}")` }}
      >
        <div className={styles.group}>
          <div className={styles.serial}>{serial}</div>
          <div className={styles.title}>{title}</div>
          <div className={styles.desc}>{desc}</div>
        </div>
      </div>
    )
}
