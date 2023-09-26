/**
 * @author yinxulai <yinxulai@qiniu.com>
 */

import React from 'react'
import { chunk } from 'lodash'
import { Tag } from 'react-icecream-2'

import { useMobile } from 'hooks/ua'
import styles from './style.less'

import prize01 from './images/01.png'
import prize02 from './images/02.png'
import prize03 from './images/03.png'
import prize04 from './images/04.png'
import prize05 from './images/05.png'
import prize06 from './images/06.png'

export interface Props {
}

export default function PrizeArrangement(_props: Props) {
  interface Prize {
    name: string
    label: string
    money: string
    more: string
    backgroundImage: string
  }

  const data: Prize[] = [
    {
      name: '一等奖',
      label: 'x1',
      money: '¥100000',
      more: '+直发实习 Offer',
      backgroundImage: prize01
    },
    {
      name: '二等奖',
      label: 'x1',
      money: '¥20000',
      more: '+直发实习 Offer',
      backgroundImage: prize02
    },
    {
      name: '三等奖',
      label: 'x1',
      money: '¥10000',
      more: '+直发实习 Offer',
      backgroundImage: prize03
    },
    {
      name: '优胜奖',
      label: 'x5',
      money: '¥5000',
      more: '+直发实习 Offer',
      backgroundImage: prize04
    },
    {
      name: '创作奖',
      label: 'x20',
      money: '¥500',
      more: '+面试直通卡',
      backgroundImage: prize05
    },
    {
      name: '最佳人气奖',
      label: '路演直播投票 No.1',
      money: '¥5000',
      more: '-',
      backgroundImage: prize06
    }
  ]

  const renderPrizeItem = (item: Prize, row: boolean) => (
    <div className={`${styles.prizeItem} ${row ? styles.row : ''}`}>
      <img className={styles.img} src={item.backgroundImage} alt={item.label} />
      <div className={styles.content}>
        <div className={styles.name}>
          <span>{item.name}</span>
          <div className={styles.label}>
            <Tag color="yellow">{item.label}</Tag>
          </div>
        </div>
        <div className={styles.prize}>
          <div className={styles.money}>{item.money}</div>
          <div className={styles.more}>{item.more}</div>
        </div>
      </div>
    </div>
  )

  const isMobile = useMobile()
  const column = isMobile ? 2 : 4

  return (
    <p className={styles.root}>
      {chunk(data, column).map((list, index) => (
        <div key={index} className={styles.group}>
          {list.map(i => renderPrizeItem(i, list.length < column))}
        </div>
      ))}
    </p>
  )
}
