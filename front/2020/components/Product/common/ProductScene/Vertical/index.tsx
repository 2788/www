/**
 * @file 应用场景（tab 垂直布局）
 * @author tang <tangzhengwei01@qiniu.com>
 */

import React, { useState } from 'react'
import classnames from 'classnames'

import { useMobile } from 'hooks/ua'
import Menu, { SubMenu } from 'components/UI/Menu'

import Description from '../../Description'

import style from './style.less'

export interface Props {
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
              <Description className={style.desc}>{desc}</Description>
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
            className={classnames(style.item, activeIdx === idx && style.active)}
            key={title}
            onClick={() => setActiveIdx(idx)}
          >
            <h3 className={style.title}>{title}</h3>
            <Description className={style.desc}>{desc}</Description>
          </div>
        ))}
      </div>

      <div className={style.scene}>
        <div className={style.img} style={{ backgroundImage: `url("${items[activeIdx].imgUrl}")` }} />
      </div>
    </div>
  )
}
