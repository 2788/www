/**
 * @file 产品页 应用场景
 * @author tang <tangzhengwei01@qiniu.com>
 */

import React, { useState } from 'react'
import classnames from 'classnames'

import { useMobile } from 'hooks/ua'
import Menu, { SubMenu } from 'components/UI/Menu'

import style from './style.less'

interface Props {
  items: Array<{
    /** 场景名称 */
    title: string
    /** 场景描述 */
    desc: string
    imgUrl: string
  }>
}

export default function ProductScene({ items }: Props) {
  const isMobile = useMobile()
  const [activeIdx, setActiveIdx] = useState(0)

  if (!items.length) {
    return null
  }

  if (isMobile) {
    return (
      <div className={style.mobileWrapper}>
        <Menu mode="inline">
          {items.map(({ title, imgUrl, desc }) => (
            <SubMenu title={title} key={title}>
              <img className={style.img} src={imgUrl} alt={title} />
              <p className={style.desc}>{desc}</p>
            </SubMenu>
          ))}
        </Menu>
      </div>
    )
  }

  return (
    <div className={style.pcWrapper}>
      <div className={style.list}>
        {items.map(({ title, desc }, idx) => (
          <div
            className={classnames(style.item, activeIdx === idx && style.actived)}
            key={title}
            onClick={() => setActiveIdx(idx)}
          >
            <h3 className={style.title}>{title}</h3>
            <p className={style.desc}>{desc}</p>
          </div>
        ))}
      </div>

      <div className={style.scene}>
        <div className={style.img} style={{ backgroundImage: `url("${items[activeIdx].imgUrl}")` }} />
      </div>
    </div>
  )
}
