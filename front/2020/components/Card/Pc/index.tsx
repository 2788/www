import React, { ReactNode, useState } from 'react'
import classNames from 'classnames'
import type { CardType } from '..'
import styles from './style.less'

export interface Props {
  serial: ReactNode
  title: string
  desc: ReactNode
  bgUrl: string
  popDir: 'up' | 'down'
  type?: CardType
}

const popDirStyle = {
  up: styles.popDirUp,
  down: styles.popDirDown
}

function DefaultItem({ serial, title, desc, bgUrl, popDir }: Props) {
  return (
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

type MotivationProps = {
  title: string
  desc: ReactNode
  bgUrl: string
}

function MotivationItem({ title, desc, bgUrl }: MotivationProps) {
  const [isEnter, setIsEnter] = useState(false)
  const motion = isEnter ? styles.enter : styles.leave

  return (
    <div className={classNames(styles.motivationCard, motion)}
      onMouseEnter={() => setIsEnter(true)}
      onMouseLeave={() => setIsEnter(false)}
    >
      <img src={bgUrl} />
      <h5>{title}</h5>
      <p>{desc}</p>
    </div>
  )
}

export default function Item(props: Props) {
  const cardMapper = new Map<CardType | undefined, JSX.Element>([
    ['default', <DefaultItem {...props} key={props.title} />],
    ['motivation', <MotivationItem title={props.title} desc={props.desc} bgUrl={props.bgUrl} key={props.title} />],
    [undefined, <DefaultItem {...props} key={props.title} />]
  ])

  return cardMapper.get(props.type) || <DefaultItem {...props} />
}
