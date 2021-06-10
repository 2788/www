/**
 * @file 使用场景组件 index.tsx
 * @description 包含使用场景等
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React, { ReactNode, HTMLAttributes, CSSProperties } from 'react'

import Section, { SectionProps } from 'components/Product/Section'

import { useMobile } from 'hooks/ua'

import PcScene, { PcPanel, PcBlock } from './Pc'
import MobileScene, { MobilePanel, MobileBlock } from './Mobile'

import styles from './style.less'

// Block 缩放的类型
// zoom: Block 会根据内容缩放，常用于右侧描述部分
// fix: 需要指定 Block 内容的宽度，常用于左侧图片或 icon 部分
// 默认为 zoom
export type BlockType = 'zoom' | 'fixed' | undefined

export type ISceneProps = HTMLAttributes<HTMLElement> & Partial<SectionProps> & {
  defaultActive?: string
}

export interface IPanelProps extends HTMLAttributes<HTMLElement> {
  name: string
  title: string
  children: ReactNode
  verticalCenter?: boolean
}

export interface IBlockProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  shadow?: boolean
  blockType?: BlockType
}

export interface IClientGroupProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
}

export interface IClientItemProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
}

export default function Scene(props: ISceneProps) {
  const {
    name = 'scene', title = '使用场景',
    children, grey, ...otherProps
  } = props
  const isMobile = useMobile()

  if (!children) {
    return null
  }

  function renderMain({ subPaths }: { subPaths?: string[] }) {
    let { defaultActive } = otherProps
    if (subPaths && subPaths.length > 0) {
      defaultActive = subPaths[0]
    }
    if (isMobile) {
      return (
        <MobileScene defaultActive={defaultActive} {...otherProps}>
          {children}
        </MobileScene>
      )
    }

    return (
      <PcScene defaultActive={defaultActive} {...otherProps}>
        {children}
      </PcScene>
    )
  }

  const mobileStyle: CSSProperties = {
    paddingLeft: '0',
    paddingRight: '0',
    paddingBottom: '0'
  }

  // TODO: `otherPropsForSection` 上边还有 HTMLAttributes 的内容
  // 也是不预期传给 Section 的，最好也干掉
  const { defaultActive, ...otherPropsForSection } = otherProps

  return (
    <Section
      name={name}
      title={title}
      grey={grey && !isMobile}
      style={isMobile ? mobileStyle : {}}
      render={renderMain}
      {...otherPropsForSection}
    />
  )
}

export function Panel(props: IPanelProps) {
  const { name, title, children, ...otherProps } = props
  const isMobile = useMobile()

  if (!children) {
    return null
  }

  function renderMain() {
    if (isMobile) {
      return (
        <MobilePanel name={name} title={title} {...otherProps}>
          {children}
        </MobilePanel>
      )
    }

    return (
      <PcPanel name={name} title={title} {...otherProps}>
        {children}
      </PcPanel>
    )
  }

  return renderMain()
}

export function Block(props: IBlockProps) {
  const { children, ...otherProps } = props
  const isMobile = useMobile()

  if (!children) {
    return null
  }

  function renderMain() {
    if (isMobile) {
      return (
        <MobileBlock {...otherProps}>
          {children}
        </MobileBlock>
      )
    }

    return (
      <PcBlock {...otherProps}>
        {children}
      </PcBlock>
    )
  }

  return renderMain()
}

export function ClientGroup(props: IClientGroupProps) {
  const { children, ...otherProps } = props

  if (!children) {
    return null
  }

  const className = [
    props.className,
    styles.clientGroup
  ].filter(Boolean).join(' ')

  return (
    <div className={className} {...otherProps}>
      {children}
    </div>
  )
}

export function ClientItem(props: IClientItemProps) {
  const { children, ...otherProps } = props

  if (!children) {
    return null
  }

  const className = [
    props.className,
    styles.clientItem
  ].filter(Boolean).join(' ')

  return (
    <div className={className} {...otherProps}>
      {children}
    </div>
  )
}
