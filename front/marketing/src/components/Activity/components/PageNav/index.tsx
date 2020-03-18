/**
 * @file component PageNav
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState, forwardRef, Ref } from 'react'
import { observer } from 'mobx-react'

import { ComponentName, IComponentInfo } from 'apis/component'
import { IBaseProps } from '../..'

import Menu from './Menu'
import Pc from './Pc'
import Mobile from './Mobile'

// import * as styles from './style.m.less'

export interface INavComponentItem {
  key: string // 导航项对应组建的唯一 key，同 IComponentInfo.key
  text: string // 导航项文案
}

export interface IConfig {
  list: INavComponentItem[]
  background_to: string // 楼层标题组件背景色结束颜色
  background_from: string // 楼层标题组件背景色开始颜色
  background_hover: string // 导航项鼠标悬浮时的背景色
}

export interface IProps extends IBaseProps {
  info: IComponentInfo<ComponentName.PageNav>
  onScrollTo(key: string): void
}

export interface ICommonProps {
  visible: boolean
  setVisible(visible: boolean): void
  children: React.ReactNode
}

export default observer(forwardRef(function PageNav({ info: { data }, onScrollTo }: IProps, ref: Ref<any>) {
  const [visible, setVisible] = useState(false)

  const { list } = data

  if (!list || !list.length) {
    return null
  }

  function handleSelect(key: string) {
    setVisible(false) // 需要吗？
    onScrollTo(key)
  }

  const menuView = visible && (
    <Menu {...data} onSelect={handleSelect} />
  )

  const commonProps = {
    visible,
    setVisible
  }

  return (
    <div ref={ref}>
      <Pc {...commonProps}>{menuView}</Pc>
      <Mobile {...commonProps} color={data.background_hover}>{menuView}</Mobile>
    </div>
  )
}))
