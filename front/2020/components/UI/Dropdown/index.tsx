import React, { PropsWithChildren, HTMLAttributes, useState, useCallback, createContext, useContext, useMemo, useRef } from 'react'
import RcDropdown, { DropdownProps } from 'rc-dropdown/lib/Dropdown'
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

export default function Dropdown(props: DropdownProps) {
  const {
    visible: _visible, onVisibleChange: _onVisibleChange,
    mouseEnterDelay = 0.05, mouseLeaveDelay = 0.15, ...rest
  } = props
  const [visible, setVisible] = useState(_visible || false)
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
    if (_visible === undefined) {
      setVisible(value)
    }
  }, [_visible])

  useOnChange(() => {
    if (_visible !== undefined && _visible !== visible) {
      setVisible(_visible)
    }
  }, [_visible])

  const getContainer = useContext(DropdownContainerContext)

  const open = useCallback(() => {
    setVisible(true)
  }, [])

  const close = useCallback(() => {
    setVisible(false)
  }, [])

  return (
    <DropdownContext.Provider value={{ open, close }}>
      <RcDropdown
        onVisibleChange={onVisibleChange}
        visible={visible}
        getPopupContainer={getContainer}
        mouseEnterDelay={shouldAddDelayEffect ? mouseEnterDelay : undefined}
        mouseLeaveDelay={shouldAddDelayEffect ? mouseLeaveDelay : undefined}
        {...rest}
      >
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
