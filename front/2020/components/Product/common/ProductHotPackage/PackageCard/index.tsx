/**
 * @file 热销套餐卡片
 * @author zzz <zhangzuzhou@qiniu.com>
 */
import React from 'react'

import Button from 'components/UI/Button'

import { Item } from '../index'

import CheckedIcon from './checked.svg'
import styles from './style.m.less'

export default function PackageCard(props: Item) {
  const { title, desc, introductions, price, button, tag } = props

  const introductionItems = introductions && introductions.map((introduction, index) => (
    <div key={index} className={styles.row}>
      <CheckedIcon className={styles.icon} />
      {introduction.detail}
    </div>
  ))

  return (
    <div className={styles.card}>
      <div>
        <div className={styles.header}>
          {tag?.length && (
            <>
              <div className={styles.tagBackground}></div>
              <div className={styles.tagText}>{tag}</div>
            </>
          )}
          <div className={styles.title}>{title}</div>
          <p className={styles.desc}>{desc}</p>
        </div>
        <div className={styles.body}>{introductionItems}</div>
      </div>
      <div className={styles.footer}>
        <p className={styles.price}>
          <span className={styles.symbol}>¥</span>
          <span className={styles.number}>{price}</span>
          <span>/GB/月</span>
        </p>
        <Button type="hollow" className={styles.button} href={button.url} withBorder>
          {button.title}
        </Button>
      </div>
    </div>
  )
}
