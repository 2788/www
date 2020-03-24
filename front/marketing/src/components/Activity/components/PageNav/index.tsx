/**
 * @file component PageNav
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState, useEffect, forwardRef, RefCallback, ReactNode } from 'react'
import { observer } from 'mobx-react'
import { isFunction } from 'lodash'

import { reactionMouseLeave, getViewportSize, reactionViewportSize } from 'utils/dom'
import { screenSm } from 'utils/styles/variables'
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
  ref?: RefCallback<HTMLElement | null>
}

export interface ICommonProps {
  visible: boolean
  setVisible(visible: boolean): void
  children: ReactNode
}

function useVisible(initVisible: boolean, enabled: boolean) {
  const [visible, setVisible] = useState(initVisible)

  useEffect(() => {
    if (!enabled && visible) {
      // reset，同步状态，避免按钮状态跟 menu 状态不同步，或者 enabled 变化后突然显示出来（虽然 data 实际上不太会变）
      setVisible(false)
    }
  }, [enabled, visible])

  // enabled 传导到 visible 需要再 render 一次，这里提前先拦下来可以提高渲染性能和中间状态的潜在一致性（感觉不管也行）
  return [visible && enabled, setVisible] as const
}

function useHoverMode() {
  function shouldBeHoverMode(width: number) {
    return width >= screenSm
  }

  const [isHoverMode, setIsHoverMode] = useState(shouldBeHoverMode(getViewportSize().width))

  useEffect(() => reactionViewportSize(({ width }) => {
    setIsHoverMode(shouldBeHoverMode(width))
  }), [])

  return [isHoverMode] as const
}

export default observer(forwardRef<HTMLElement, IProps>(function PageNav(
  { info: { data }, onScrollTo },
  onElementChange
) {
  const { list } = data
  const hasData = !!(list && list.length)

  // 没用 useRef 是为了让 useEffect 能观察到
  const [mainElement, setMainElement] = useState<HTMLElement | null | undefined>()

  const [isHoverMode] = useHoverMode()

  const [visible, setVisible] = useVisible(false, hasData)

  useEffect(() => {
    if (mainElement && isHoverMode && visible) {
      return reactionMouseLeave(mainElement, () => setVisible(false))
    }
  }, [mainElement, isHoverMode, visible])

  function handleRefChange(element: HTMLElement | null) {
    setMainElement(element)

    // FIXME: 内部实现只处理 RefCallback，对外的 IProps 也是对的，但是 forwardRef 类型搞不定
    if (!isFunction(onElementChange)) {
      throw new Error('Only support ref callback.')
    }
    onElementChange(element)
  }

  function handleSelect(key: string) {
    setVisible(false) // 需要吗？
    onScrollTo(key)
  }

  // 维持容器的存在，方便开发调试等
  function renderMain(children: ReactNode) {
    return (
      <div ref={handleRefChange}>
        {children}
      </div>
    )
  }

  // 这里拦一下很重要，简化后面的整体实现，并且后续不容易出错
  if (!hasData) {
    return renderMain(null)
  }

  const commonProps = {
    visible,
    setVisible,
    children: visible && (
      <Menu {...data} onSelect={handleSelect} />
    )
  }

  return renderMain(
    isHoverMode ? (
      <Pc {...commonProps} />
    ) : (
      <Mobile {...commonProps} color={data.background_hover} />
    )
  )
}))
