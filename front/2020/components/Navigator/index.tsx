/**
 * @file 产品页导航栏
 * @description 反映产品页当前所有的内容模块，点击在页内跳转
 */

import React, { ReactNode, useContext, useCallback } from 'react'
import { findIndex } from 'lodash'
import classnames from 'classnames'
import Link from 'components/Link'
import Tabs, { Tab } from 'components/UI/Tabs'
import UIButton, { Props as UIButtonProps } from 'components/UI/Button'
import { useSticky } from 'hooks/scroll'
import { useMobile } from 'hooks/ua'
import Navigatable, { Props as _NavigatableProps } from './Navigatable'
import Block, { Props as _BlockProps } from './Block'
import { context } from './utils'
import Arrow from './arrow.svg'
import style from './style.less'

// 写成这样是因为 https://github.com/microsoft/TypeScript/issues/28481
export type NavigatableProps = _NavigatableProps
export type BlockProps = _BlockProps
export { Navigatable, Block }

export type Props = {
  priceLink?: string
  children?: ReactNode
}

/** 直接页面跳转的价格链接对应的 tab value */
const tabPriceLink = 'price-link'

/** 导航栏 */
export default function Navigator({ priceLink, children }: Props) {
  const [setWrapper, isWrapperFixed] = useSticky()
  const contextValue = useContext(context)
  const isMobile = useMobile()

  const wrapperRef = useCallback((wrapper: HTMLElement | null) => {
    if (contextValue && wrapper && contextValue.navigator?.wrapper !== wrapper) {
      contextValue.registerNavigator({ wrapper })
    }
    setWrapper(wrapper)
  }, [contextValue, setWrapper])

  // 移动端不需要导航栏 TODO: 价格链接咋办？
  if (isMobile) {
    return null
  }

  if (!contextValue) {
    throw new Error('Component `Navigator` should be used in `Navigatable`')
  }

  const { blocks, active, setActive } = contextValue

  // 如果当前没有 active block，将第一个 tab 高亮
  const activeTab = active != null ? active : blocks[0]?.name

  function handleTabsChange(newActiveTab: string) {
    // “价格”不对应可导航区块，会直接做页面跳转，这里无须处理
    if (newActiveTab !== tabPriceLink) {
      setActive(newActiveTab)
    }
  }

  const blockTabsView = blocks.map(
    ({ name, title }) => <Tab key={name} value={name}>{title}</Tab>
  )

  const priceLinkView = priceLink && (
    <Tab value={tabPriceLink}>
      <Link className={style.priceLink} href={priceLink}>
        查看价格<Arrow className={style.priceArrow} />
      </Link>
    </Tab>
  )

  const wrapperClassName = [
    style.wrapper,
    isWrapperFixed && style.fixed
  ].filter(Boolean).join(' ')

  return (
    <div ref={wrapperRef} className={wrapperClassName}>
      <div className={style.content}>
        <Tabs
          className={classnames(style.tabs, !children && style.center)}
          value={activeTab}
          onChange={handleTabsChange}
        >
          {blockTabsView}
          {priceLinkView}
        </Tabs>
        {
          children && (
            <div className={style.extra}>
              {children}
            </div>
          )
        }
      </div>
    </div>
  )
}

export type ButtonProps = UIButtonProps

/** 导航栏中的按钮 */
export function Button(props: ButtonProps) {
  const className = [props.className, style.button].filter(Boolean).join(' ')
  return <UIButton {...props} className={className} />
}

export function useIndex(name: string) {
  const contextValue = useContext(context)
  if (!contextValue) {
    throw new Error('`useIndex` should be used in descendants of `Navigatable`')
  }

  return findIndex(
    contextValue.blocks,
    block => block.name === name
  )
}
