/**
 * @file 可切换的 tab 列表
 */

import React, { ReactNode, createContext, useContext, ReactElement, useCallback, useState } from 'react'
import classnames from 'classnames'
import { useOnChange } from 'hooks'
import style from './style.less'

type ContextValue = {
  value: string | null
  onChange: (value: string) => void
}

const tabContext = createContext<ContextValue | null>(null)

export type Props = {
  /** Tabs 的内容，一般是多个 `<Tab>` */
  children: ReactNode
  /** 默认选中的 tab */
  defaultValue?: string
  /** 当前选中的 tab 项的 value */
  value?: string | null
  /** 选中 tab 项发生变化时的回调 */
  onChange?: (value: string) => void
  /** class 名 */
  className?: string
}

export default function Tabs({ children, className, defaultValue, value = null, onChange }: Props) {
  const [active, setActive] = useState(value || defaultValue || null)
  const tabList: ReactElement[] = []
  const tabPanes: ReactElement[] = []

  // 同步 value 到内部状态
  // 会渲染好几次，有空优化这个组件
  useOnChange(() => setActive(value), [value])

  React.Children.forEach(children, child => {
    if (!React.isValidElement(child)) {
      return
    }

    if (isTab(child)) {
      tabList.push(child)
    }

    if (isTabPane(child)) {
      tabList.push(<Tab key={child.props.value} value={child.props.value}>{child.props.tab}</Tab>)
      tabPanes.push(child)
    }
  })

  const content = tabPanes.length > 0 && <div className={style.content}>{tabPanes}</div>

  const handleChange = useCallback((_value: string) => {
    if (onChange) {
      onChange(_value)
    }

    setActive(_value)
  }, [onChange])

  return (
    <tabContext.Provider value={{ onChange: handleChange, value: active }}>
      <div className={className}>
        <ul className={style.header}>
          {tabList}
        </ul>
        {content}
      </div>
    </tabContext.Provider>
  )
}

function isTab(elm: ReactElement): elm is ReactElement<TabProps> {
  return elm.type === Tab
}

function isTabPane(elm: ReactElement): elm is ReactElement<TabPaneProps> {
  return elm.type === TabPane
}

export type TabProps = {
  /** 当前 tab 项对应的值 */
  value: string
  /** Tab 内容 */
  children: ReactNode
}

export function Tab({ value, children }: TabProps) {
  const contextValue = useContext(tabContext)
  if (!contextValue) {
    throw new Error('Component Tab should be used in Tabs.')
  }

  const active = contextValue.value === value
  const onClick = () => !active && contextValue.onChange(value)
  const className = [style.item, active && style.active].filter(Boolean).join(' ')

  return (
    <li className={className} onClick={onClick}>
      {children}
    </li>
  )
}

type TabPaneProps = {
  tab: string
  value: string
  className?: string
  children: ReactNode
}

export function TabPane(props: TabPaneProps) {
  const { className, value, children } = props
  const tabsContext = useContext(tabContext)

  return <div className={classnames(className)} style={{ display: tabsContext?.value === value ? 'block' : 'none' }}>{children}</div>
}