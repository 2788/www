/**
 * @file 产品页功能与优势组件 index.tsx
 * @description 包含产品的功能、优势介绍
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React, { ReactNode, HTMLAttributes, PropsWithChildren } from 'react'
import classnames from 'classnames'

import Section, { SectionProps } from '../Section'

import { PcFeatureItem, PcFeatureLink, PcPlaceholder } from './Pc'
import { MobileFeatureItem, MobileFeatureLink } from './Mobile'

import { useMobile } from '../../../hooks/ua'

import styles from './style.less'

// 图片和文案和布局，支持上下布局和左右布局，默认上下布局
export type PosType = 'top-down' | 'left-right' | undefined

// 文案（标题除外）及连接对齐方式，支持居中和左对齐，默认居中
export type AlignType = 'center' | 'left' | undefined

// 描述前面的 icon 样式，支持 check 和 dot，默认 undefined
// 推荐在上下布局 && 文案左对齐的情况下使用
export type PreIconType = 'check' | 'dot' | undefined

export type IFeatureProps = HTMLAttributes<HTMLElement> & Partial<SectionProps>

export interface IFeatureGroupProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
}

export interface IFeatureItemProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title?: ReactNode
  icon: ReactNode
  children: ReactNode
  pos?: PosType
  align?: AlignType
}

export interface IFeatureDescProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  preIcon?: PreIconType
}

export interface IFeatureLinkProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  href: string
}

export function RawFeature({ children }: PropsWithChildren<{}>) {
  const isMobile = useMobile()

  if (!children) {
    return null
  }

  function renderMain() {
    if (isMobile) {
      return (
        <div className={styles.mobile}>
          {children}
        </div>
      )
    }

    return (
      <div className={styles.pc}>
        {children}
      </div>
    )
  }

  return renderMain()
}

export default function Feature({
  name = 'feature',
  title = '功能与优势',
  children,
  grey,
  ...otherProps
}: IFeatureProps) {
  const isMobile = useMobile()
  return (
    <Section {...otherProps} grey={grey && !isMobile} name={name} title={title}>
      <RawFeature>{children}</RawFeature>
    </Section>
  )
}

export function Group(props: IFeatureGroupProps) {
  const { children } = props

  if (!children) {
    return null
  }

  const className = [
    props.className,
    styles.groupWrapper
  ].filter(Boolean).join(' ')

  return (
    <div className={className}>
      {children}
    </div>
  )
}

/** 用于占位 */
export function Placeholder() {
  const isMobile = useMobile()
  if (isMobile) return null
  return (
    <div className={styles.itemWrapper}>
      <PcPlaceholder />
    </div>
  )
}

export function Item(props: IFeatureItemProps) {
  const { children, ...otherProps } = props
  const isMobile = useMobile()

  if (!children) {
    return null
  }

  function renderMain() {
    if (isMobile) {
      return (
        <MobileFeatureItem {...otherProps}>
          {children}
        </MobileFeatureItem>
      )
    }

    return (
      <PcFeatureItem {...otherProps}>
        {children}
      </PcFeatureItem>
    )
  }

  const className = [
    props.className,
    styles.itemWrapper
  ].filter(Boolean).join(' ')

  return (
    <div className={className}>
      {renderMain()}
    </div>
  )
}

export function Desc(props: IFeatureDescProps) {
  const { children, preIcon } = props

  if (!children) {
    return null
  }

  function getClassByPreIconType(preIconType: PreIconType) {
    switch (preIconType) {
      case 'check':
        return styles.preIconCheck
      case 'dot':
        return styles.preIconDot
      default:
        return ''
    }
  }

  const className = [
    props.className,
    styles.desc
  ].filter(Boolean).join(' ')

  return (
    <p className={classnames(className, getClassByPreIconType(preIcon))}>
      {children}
    </p>
  )
}

export function Link(props: IFeatureLinkProps) {
  const { children, href } = props
  const isMobile = useMobile()

  if (!children) {
    return null
  }

  function renderMain() {
    if (isMobile) {
      return (
        <MobileFeatureLink href={href}>
          {children}
        </MobileFeatureLink>
      )
    }

    const className = [
      props.className,
      styles.link
    ].filter(Boolean).join(' ')

    return (
      <div className={className}>
        <PcFeatureLink href={href}>
          {children}
        </PcFeatureLink>
      </div>
    )
  }

  return renderMain()
}
