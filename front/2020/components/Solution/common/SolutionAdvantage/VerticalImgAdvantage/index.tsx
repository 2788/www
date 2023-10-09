/**
 * @file 方案页 方案优势 垂直布局 图片为 Img
 * @author zzz <zhangzuzhou@qiniu.com>
 */

import React from 'react'

import {
  VerticalImgItem,
  Raw as FeatureRaw
} from 'components/Product/Feature/v2'
import Menu, { SubMenu } from 'components/UI/Menu'

import { useMobile } from 'hooks/ua'

import style from './style.m.less'

export interface Props {
  /** advantage 为 3-6 组，每行 3 个 */
  items: Array<{
    title: string
    desc: string
    bgImgUrl?: string
  }>
}

export default function VerticalImgAdvantage({ items }: Props) {
  const isMobile = useMobile()

  if (!items.length) {
    return null
  }

  if (isMobile) {
    return (
      <div className={style.mobileWrapper}>
        <Menu mode="inline">
          {items.map(({ title, desc, bgImgUrl }) => (
            <SubMenu key={title} title={title}>
              <VerticalImgItem
                title={title}
                desc={desc}
                bgImgUrl={bgImgUrl}
              />
            </SubMenu>
          ))}
        </Menu>
      </div>
    )
  }

  return (
    <FeatureRaw maxColumnsPerRow={3}>
      {items.map(({ title, desc, bgImgUrl }) => (
        <VerticalImgItem
          key={title}
          title={title}
          desc={desc}
          bgImgUrl={bgImgUrl}
        />
      ))}
    </FeatureRaw>
  )
}
