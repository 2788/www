/**
 * @file 应用场景（tab 水平布局，文案简略）
 * @author zzz <zhangzuzhou@qiniu.com>
 */

import React from 'react'

import Tabs, { TabPane } from 'components/UI/Tabs'
import Menu, { SubMenu } from 'components/UI/Menu'

import { useMobile } from 'hooks/ua'

import style from './style.less'

export interface Props {
  items: Item[]
}

interface Item {
  title: string
  /** 场景描述 */
  desc: string
  /** 场景图片 */
  imgUrl: string
}

export default function HorizontalSimpleScene({ items }: Props) {
  const isMobile = useMobile()

  if (isMobile) {
    return (
      <div className={style.mobileWrapper}>
        <Menu mode="inline">
          {items.map(({ title, desc, imgUrl }) => (
            <SubMenu title={title} key={title}>
              <div className={style.content}>
                <div className={style.desc}>{desc}</div>
                <div className={style.logoWrapper}>
                  <img src={imgUrl} alt={title} />
                </div>
              </div>
            </SubMenu>
          ))}
        </Menu>
      </div>
    )
  }

  return (
    <Tabs defaultValue={items[0].title}>
      {items.map(({ title, desc, imgUrl }) => (
        <TabPane key={title} value={title} tab={title}>
          <div className={style.content}>
            <div className={style.desc}>{desc}</div>
            <div className={style.logoWrapper}>
              <img src={imgUrl} alt={title} />
            </div>
          </div>
        </TabPane>
      ))}
    </Tabs>
  )
}
