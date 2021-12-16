import React, { PropsWithChildren, HTMLAttributes, useState, useCallback, createContext, useContext, useMemo, useRef } from 'react'
import RcDropdown, { DropdownProps } from 'rc-dropdown/lib/Dropdown'
import useDelay from 'hooks/use-delay'
import { useOnChange } from 'hooks'

import 'rc-dropdown/assets/index.css'

import Link from 'components/Link'
import style from './index.less'

export * from 'rc-dropdown/lib/Dropdown'

export type DropdownContext = {
  open?(): void
  close?(): void
}

const DropdownContext = createContext<DropdownContext>({})

export function useDropdown() {
  return useContext(DropdownContext)
}

export type GetContainer = () => HTMLElement

export const DropdownContainerContext = createContext<GetContainer | undefined>(undefined)

export function DropdownContainerProvider(
  { getContainer, children }: PropsWithChildren<{ getContainer: GetContainer }>
) {
  return (
    <DropdownContainerContext.Provider value={getContainer}>
      {children}
    </DropdownContainerContext.Provider>
  )
}

// 给 Dropdown 增加类似 debounce 效果，防止滑过等误开其他 Dropdown
export default function Dropdown(props: DropdownProps & { delay?: number }) {
  const { visible: _visible, onVisibleChange: _onVisibleChange, delay = 50, ...rest } = props
  const [visible, setVisible] = useState(_visible || false)
  // 因为可能有延迟，所以增加一个临时变量表示期望产生的 visible（和 visible 不一定一致)
  const [tempVisible, setTempVisible] = useState(_visible || false)
  const onVisibleChangeRef = useRef(_onVisibleChange)
  onVisibleChangeRef.current = _onVisibleChange

  // 是否增加延迟效果           受控模式不处理
  const shouldAddDelayEffect = useMemo(() => (
    _visible === undefined && (
      props.trigger === undefined || props.trigger === 'hover' || props.trigger?.includes('hover')
    )
  ), [_visible, props.trigger])
  useOnChange(() => {
    if (onVisibleChangeRef.current) {
      onVisibleChangeRef.current(visible)
    }
  }, [visible])
  const onVisibleChange = useCallback((value: boolean) => {
    setTempVisible(value)
    // case: Header Product
    if (shouldAddDelayEffect) { // 需要延迟效果则交给后面的的处理
      return
    }
    // 非受控自己管理状态 case: 价格 Banner
    if (_visible === undefined) {
      setVisible(value)
    }
  }, [shouldAddDelayEffect, _visible])

  useOnChange(() => {
    if (_visible !== undefined && _visible !== visible) {
      setVisible(_visible)
    }
  }, [_visible])

  /** 开启和关闭 dropdown 都做成延时的 */
  const openDelayObj = useDelay(delay)
  const closeDelayObj = useDelay(delay)
  useOnChange(() => {
    if (shouldAddDelayEffect) {
      /** 当应该开始 dropdown 时，停止'关闭定时器'，并启动'开启定时器' */
      if (tempVisible === true) {
        closeDelayObj.stop()
        openDelayObj.start(() => {
          setVisible(true)
        })
      } else { /** 当应该关闭 dropdown 时，停止'开启定时器'，并启动'关闭定时器' */
        openDelayObj.stop()
        closeDelayObj.start(() => {
          setVisible(false)
        })
      }
    }
  }, [shouldAddDelayEffect, tempVisible])

  const getContainer = useContext(DropdownContainerContext)

  const open = useCallback(() => {
    setVisible(true)
    setTempVisible(true)
  }, [])

  const close = useCallback(() => {
    setVisible(false)
    setTempVisible(false)
  }, [])

  return (
    <DropdownContext.Provider value={{ open, close }}>
      <RcDropdown onVisibleChange={onVisibleChange} visible={visible} getPopupContainer={getContainer} {...rest}>
        {props.children}
      </RcDropdown>
    </DropdownContext.Provider>
  )
}

export const DropdownMenu = ({ children, className = '' }: PropsWithChildren<{ className?: string }>) => (
  <ul className={className + ' ' + style.menu}>{children}</ul>
)

export type DropdownMenuItemProps = HTMLAttributes<HTMLLIElement>

export function DropdownMenuItem({ className, ...others }: DropdownMenuItemProps) {
  className = [style.item, className].filter(Boolean).join(' ')
  return (
    <li className={className} {...others} />
  )
}

export type DropdownMenuItemLinkProps = DropdownMenuItemProps & {
  href: string
  target?: string // 有的站外链接但是需要当前页面打开而不是新页面，所以这边支持下 target
}

// 专门用于 MenuItem 内容为一个 link 的组件，统一规范下行为，并使点击区域扩大为整个 Item
export function DropdownMenuItemLink({ className, href, target, children, ...others }: DropdownMenuItemLinkProps) {
  className = [style.itemLink, className].filter(Boolean).join(' ')
  const targetProp = target !== undefined ? { target } : null
  return (
    <li className={className} {...others}>
      <Link className={style.link} href={href} {...targetProp}>{children}</Link>
    </li >
  )
}

export function DropdownMenuGroup({ children, title }: PropsWithChildren<{ title: string }>) {
  return (
    <li className={style.group}>
      <div className={style.groupTitle}>{title}</div>
      <ul>{children}</ul>
    </li>
  )
}
