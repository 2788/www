/**
 * @file 解决方案页 应用场景
 * @author tang <tangzhengwei01@qiniu.com>
 */

import React from 'react'

import { useMobile } from 'hooks/ua'
import Tabs, { TabPane } from 'components/UI/Tabs'
import Menu, { SubMenu } from 'components/UI/Menu'

import style from './style.less'

interface Props {
  items: Item[]
}

interface Item {
  /** 场景名称 */
  name: string
  /** 场景描述 */
  desc: string
  /** 能够解决的问题，最多三组 */
  problems: Array<{
    name: string
    desc: string
  }>
  imgUrl: string
}

export default function SolutionScene({ items }: Props) {
  const isMobile = useMobile()

  if (!items.length) {
    return null
  }

  if (isMobile) {
    return (
      <div className={style.mobileWrapper}>
        <Menu mode="inline">
          {items.map(({ name, imgUrl, desc, problems }) => (
            <SubMenu title={name} key={name}>
              <img className={style.img} src={imgUrl} alt={name} />

              <Detail desc={desc} problems={problems.slice(0, 3)} />
            </SubMenu>
          ))}
        </Menu>
      </div>
    )
  }

  return (
    <div className={style.pcWrapper}>
      <Tabs defaultValue={items[0].name}>
        {items.map(({ name, desc, problems, imgUrl }) => (
          <TabPane key={name} value={name} tab={name}>
            <div className={style.wrapper}>

              <Detail desc={desc} problems={problems.slice(0, 3)} />

              <div className={style.scene}>
                <div className={style.img} style={{ backgroundImage: `url("${imgUrl}")` }} />
              </div>

            </div>
          </TabPane>
        ))}
      </Tabs>
    </div>
  )
}

function Detail({ desc, problems }: Omit<Item, 'name' | 'imgUrl'>) {
  return (
    <div className={style.detail}>
      <div className={style.desc}>
        <div className={style.title}>场景描述</div>
        <div className={style.text}>{desc}</div>
      </div>

      <div className={style.problems}>
        <div className={style.title}>能够解决的问题</div>
        {problems.slice(0, 3).map(propblem => <Problem key={propblem.name} {...propblem} />)}
      </div>
    </div>
  )
}

function Problem({ name, desc }: { name: string, desc: string }) {
  return (
    <div className={style.problem}>
      <div className={style.problemTitle}>{name}</div>
      <div className={style.text}>{desc}</div>
    </div>
  )
}
