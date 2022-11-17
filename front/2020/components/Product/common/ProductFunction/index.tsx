/**
 * @file 产品页 产品功能及服务
 * @author tang <tangzhengwei01@qiniu.com>
 */

import React from 'react'
import classnames from 'classnames'
import { chunk } from 'lodash'

import Link from 'components/Link'
import { Row } from 'components/UI/Card'
import { useMobile } from 'hooks/ua'

import IconArrowRight from './arrow-right.svg'
import style from './style.less'

interface Item {
  title: string
  desc: string
  /** 立即体验 url */
  url?: string
}

interface Props {
  /** 最多 9 组，最少 3 组。一行最多展示 3 组 */
  items: Item[]
}

export default function ProductFunction({ items }: Props) {
  if (!items.length) {
    return null
  }

  // 3 - 9 个 item，一行展示 3 个，最多 3 行
  const groups = chunk(items, 3).slice(0, 3)

  return (
    <div className={style.functionWrapper}>
      {
        groups.map((group, i) => (
          <Row key={i}>
            {[...group, ...Array.from({ length: 3 }).map(() => null)].slice(0, 3)
              .map((item, index) => <Item key={index} item={item} />)}
          </Row>
        ))
      }
    </div>
  )
}

function Item({ item }: { item: Item | null }) {
  const isMobile = useMobile()

  if (item == null) {
    return isMobile
      ? null
      : (
        <div className={classnames(style.itemWrapper, style.invisible)} />
      )
  }

  const { title, desc, url } = item

  const content = (
    <div className={style.item}>
      <div className={style.left}>
        <h3 className={style.title}>{title}</h3>
        <p className={style.desc}>{desc}</p>
        {url && !isMobile && <Link className={style.link} href={url} blue>立即体验 &gt;&gt;</Link>}
      </div>

      {isMobile && (
        <div className={style.right}>
          <IconArrowRight />
        </div>
      )}
    </div>
  )

  if (isMobile) {
    return (
      <Link className={style.itemWrapper} href={url}>
        {content}
      </Link>
    )
  }

  return (
    <div className={style.itemWrapper}>
      {content}
    </div>
  )
}
