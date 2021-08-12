/**
 * @file 可切换的 tab 列表
 */

import React, { ReactNode, createContext, useContext, ReactElement, useCallback, useState, CSSProperties } from 'react'
import classnames from 'classnames'
import { useOnChange } from 'hooks'
import style from './style.less'

type ContextValue = {
  vertical: boolean
  value: string | null
  onChange: (value: string) => void
}

const tabContext = createContext<ContextValue | null>(null)

// 72 40 56
export type Size = 'default' | 'small' | 'middle'
export type Theme = 'default' | 'white' // theme: white 适用于有底色的环境

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
  /** content class 名 */
  contentClassName?: string
  /** 尺寸 */
  size?: Size
  /** 是否显示 shadow 默认为 true */
  shadow?: boolean
  /** 颜色 */
  theme?: Theme,
  /** 是否垂直 */
  vertical?: boolean
}

const themeClassMap = {
  default: style.themeDefault,
  white: style.themeWhite
}

const sizeMap = {
  default: null,
  middle: style.middle,
  small: style.small
}

export default function Tabs({
  children, className, contentClassName, defaultValue,
  value = null, onChange, size = 'default',
  shadow = true, theme = 'default', vertical = false
}: Props) {
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

  const content = tabPanes.length > 0 && (
    <div
      className={classnames(style.content, contentClassName, vertical && style.verticalContent)}
    >
      {tabPanes}
    </div>
  )

  const handleChange = useCallback((_value: string) => {
    if (onChange) {
      onChange(_value)
    }

    setActive(_value)
  }, [onChange])

  const wrapperClass = classnames(
    style.wrapper,
    className,
    sizeMap[size],
    themeClassMap[theme],
    vertical && style.verticalWrapper
  )

  return (
    <tabContext.Provider value={{ vertical, onChange: handleChange, value: active }}>
      <div className={wrapperClass}>
        <ul className={classnames(style.header, shadow && style.shadow, vertical && style.verticalHeader)}>
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
  /** children 是 string 默认用 children */
  title?: string
  /** 当前 tab 项对应的值 */
  value: string
  /** Tab 内容 */
  children: ReactNode
}

export function Tab({ value, title, children }: TabProps) {
  const contextValue = useContext(tabContext)
  if (!contextValue) {
    throw new Error('Component Tab should be used in Tabs.')
  }

  const active = contextValue.value === value
  const onClick = () => !active && contextValue.onChange(value)
  const className = [style.item, active && style.active, contextValue.vertical && style.verticalItem].filter(Boolean).join(' ')
  // eslint-disable-next-line no-underscore-dangle
  const _title = title || (typeof children === 'string' ? children : undefined)

  return (
    <li className={className} onClick={onClick} title={_title}>
      {children}
    </li>
  )
}

type TabPaneProps = {
  tab: ReactNode
  value: string
  className?: string
  // 非激活自动销毁, 默认隐藏
  autoDestroy?: boolean
  children: ReactNode
  style?: CSSProperties
}

export function TabPane(props: TabPaneProps) {
  const { autoDestroy = false, className, value, children, style: _style } = props
  const tabsContext = useContext(tabContext)

  if (autoDestroy) {
    if (tabsContext?.value === value) {
      return <div className={classnames(className)} style={_style}>{children}</div>
    }

    return null
  }

  return <div className={classnames(className)} style={{ ..._style, display: tabsContext?.value === value ? 'block' : 'none' }}>{children}</div>
}
