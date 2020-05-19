/**
 * @file 自动判断是否应使用 next/Link <Link> or <a> 的链接组件
 */

import React, { AnchorHTMLAttributes } from 'react'
import NextLink from 'next/link'

export type Props = AnchorHTMLAttributes<HTMLAnchorElement>

export default function Link({ href, ...others }: Props) {
  const checked = checkInSite(href)
  if (checked.inSite) {
    return (
      <NextLink href={checked.path}>
        <a {...others} />
      </NextLink>
    )
  }
  // 站外链接默认新页面打开
  return <a target="_blank" rel="noopener" href={href} {...others} />
}

function checkInSite(href?: string) {
  if (!href) return { inSite: true, path: '' } as const

  const hasProtocolAndHost = /^[a-z]+:/.test(href) // href="foo://bar.com"
  const hasHostOnly = /\/\//.test(href) // href="//bar.com/..."

  if (hasProtocolAndHost || hasHostOnly) {
    // 后续可以考虑结合当前 host，进一步把 `https://www.qiniu.com/foo` 或
    // `//www.qiniu.com/foo` 转化为 /foo，并当成站内链接处理
    return { inSite: false } as const
  }

  return {
    inSite: true,
    path: href
  } as const
}
