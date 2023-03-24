/**
 * @file 应用场景（tab 水平布局，文案详细）
 * @author tang <tangzhengwei01@qiniu.com>
 */

import React from 'react'

import { useMobile } from 'hooks/ua'
import Tabs, { TabPane } from 'components/UI/Tabs'
import Menu, { SubMenu } from 'components/UI/Menu'

import Description from '../../Description'

import style from './style.less'

export interface Props {
  items: Item[]
}

interface Item {
  /** 场景名称 */
  name: string
  /** 场景描述 */
  desc: string
  /** problems 的标题，通常为「能够解决的问题」 */
  problemsTitle?: string
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
          {items.map(({ name, imgUrl, desc, problemsTitle, problems }) => (
            <SubMenu title={name} key={name}>
              <img className={style.img} src={imgUrl} alt={name} />

              <Detail desc={desc} problemsTitle={problemsTitle} problems={problems.slice(0, 3)} />
            </SubMenu>
          ))}
        </Menu>
      </div>
    )
  }

  return (
    <div className={style.pcWrapper}>
      <Tabs defaultValue={items[0].name}>
        {items.map(({ name, desc, problemsTitle, problems, imgUrl }) => (
          <TabPane key={name} value={name} tab={name}>
            <div className={style.wrapper}>

              <Detail desc={desc} problemsTitle={problemsTitle} problems={problems.slice(0, 3)} />

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

function Detail({ desc, problemsTitle, problems }: Omit<Item, 'name' | 'imgUrl'>) {
  return (
    <div className={style.detail}>
      <div className={style.desc}>
        <div className={style.title}>场景描述</div>
        <Description className={style.text}>{desc}</Description>
      </div>

      <div className={style.problems}>
        <div className={style.title}>{problemsTitle?.trim().length ? problemsTitle : '能够解决的问题'}</div>
        {problems.slice(0, 3).map(propblem => <Problem key={propblem.name} {...propblem} />)}
      </div>
    </div>
  )
}

function Problem({ name, desc }: { name: string, desc: string }) {
  return (
    <div className={style.problem}>
      <div className={style.problemTitle}>{name}</div>
      <Description className={style.text}>{desc}</Description>
    </div>
  )
}
