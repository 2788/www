/**
 * @file: 播放器 SDK —— 相关文档
 * @author hovenjay <hovenjay@qiniu.com>
 */

import React from 'react'
import LinkGroups, { LinkGroup, LinkItem } from 'components/Product/LinkGroups'

interface ILink {
  key: string
  href: string
  name: string
}

interface ILinkGroup {
  key: string
  title: string
  children: ILink[]
}

export default function Document() {
  const linkGroups: ILinkGroup[] = [
    {
      key: '1',
      title: '常用文档',
      children: [
        {
          key: '1-1',
          href: 'https://developer.qiniu.com/pili/4262/player-sdk-introduction-and-demo-download',
          name: '产品介绍'
        }
      ]
    },
    {
      key: '2',
      title: 'SDK 及工具',
      children: [
        {
          key: '2-1',
          href: 'https://developer.qiniu.com/pili/1210/the-android-client-sdk',
          name: 'Android 接入文档'
        },
        {
          key: '2-2',
          href: 'https://developer.qiniu.com/pili/1211/ios-playback-end-the-sdk',
          name: 'iOS 接入文档'
        }
      ]
    }
  ]

  return (
    <LinkGroups title="相关文档">
      {linkGroups.map(({ key: groupKey, title, children }) => (
        <LinkGroup key={groupKey} title={title}>
          {children.map(({ key, href, name }) => (
            <LinkItem key={key} href={href}>
              {name}
            </LinkItem>
          ))}
        </LinkGroup>
      ))}
    </LinkGroups>
  )
}
