/**
 * @file 产品页文档链接 Component
 * @author zhuhao <zhuhao@qiniu.com>
 */

import React, { PropsWithChildren, CSSProperties } from 'react'

import { useMobile } from 'hooks/ua'
import Section, { SectionProps } from '../Section'
import * as Pc from './Pc'
import * as Mobile from './Mobile'
import { useBlocks, useIndex } from '../Navigator'

export interface LinkItemProps {
  href: string
}

export function LinkItem(props: PropsWithChildren<LinkItemProps>) {
  const isMobile = useMobile()
  return (
    isMobile ? <Mobile.LinkItem {...props} /> : <Pc.LinkItem {...props} />
  )
}

export interface LinkGroupProps {
  title: string
}

export function LinkGroup(props: PropsWithChildren<LinkGroupProps>) {
  const isMobile = useMobile()
  return (
    isMobile ? <Mobile.LinkGroup {...props} /> : <Pc.LinkGroup {...props} />
  )
}

LinkGroups.defaultProps = {
  name: 'docs',
  title: '使用文档'
}

export default function LinkGroups({ children, ...sectionProps }: PropsWithChildren<SectionProps>) {
  if (React.Children.count(children) > 4) {
    throw new Error('Link Groups\'s children no more then 4')
  }
  const blocks = useBlocks()
  const blockIndex = useIndex(sectionProps.name)
  const isLast = blockIndex === blocks.length - 1
  const isMobile = useMobile()
  const mobileStyle: CSSProperties = (
    !isLast
    ? { // 该模块不是移动端的最后一个时，不需要 padding-bottom
      paddingLeft: 0,
      paddingRight: 0,
      paddingBottom: 0
    }
    : { // 移动端需要 menu 两侧顶到屏幕边缘，这里去掉两侧的 padding
      paddingLeft: 0,
      paddingRight: 0
    })
  const sectionStyle: CSSProperties = isMobile ? mobileStyle : {}

  return (
    <Section {...sectionProps} style={sectionStyle}>
      {
        isMobile
        ? <Mobile.LinkGroups>{children}</Mobile.LinkGroups>
        : <Pc.LinkGroups>{children}</Pc.LinkGroups>
      }
    </Section>
  )
}

