import React, { PropsWithChildren, HTMLAttributes, useState, useCallback, cloneElement, createContext, useContext } from 'react'
import RcDropdown, { DropdownProps } from 'rc-dropdown/lib/Dropdown'
import useDelay from 'hooks/use-delay'
import { useOnChange } from 'hooks'

import 'rc-dropdown/assets/index.css'
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
  const delayObj = useDelay(delay)

  // 是否增加延迟效果           受控模式不处理
  const shouldAddDelayEffect = _visible === undefined && (
    props.trigger === undefined || props.trigger === 'hover' || props.trigger?.includes('hover')
  )

  const onVisibleChange = useCallback((value: boolean) => {
    if (_onVisibleChange) {
      _onVisibleChange(value)
    }

    // case: Header Product
    if (shouldAddDelayEffect) {
      // 如果需要增加延迟效果，显示交给后面的 onMouseEnter 去处理
      if (value === false) {
        // 等 RcDropdown 关闭弹窗同步状态(受控状态还会触发 onVisibleChange)
        setVisible(false)
      }
      return
    }

    // 非受控自己管理状态 case: 价格 Banner
    if (_visible === undefined) {
      setVisible(value)
    }
  }, [shouldAddDelayEffect, _visible, _onVisibleChange])

  useOnChange(() => {
    if (_visible !== undefined && _visible !== visible) {
      setVisible(_visible)
    }
  }, [_visible])

  const children = shouldAddDelayEffect
    ? cloneElement(props.children, {
      onMouseEnter() {
        delayObj.start(() => {
          setVisible(true)
        })
      },
      onMouseLeave() {
        // 已经不可见的弹窗可以关闭计时器了，避免重新可见
        if (visible === false) {
          delayObj.stop()
        }
      }
    })
    : props.children

  const getContainer = useContext(DropdownContainerContext)

  return (
    <DropdownContext.Provider value={{ open: () => setVisible(true), close: () => setVisible(false) }}>
      <RcDropdown onVisibleChange={onVisibleChange} visible={visible} getPopupContainer={getContainer} {...rest}>
        {children}
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

export function DropdownMenuGroup({ children, title }: PropsWithChildren<{ title: string }>) {
  return (
    <li className={style.group}>
      <div className={style.groupTitle}>{title}</div>
      <ul>{children}</ul>
    </li>
  )
}
