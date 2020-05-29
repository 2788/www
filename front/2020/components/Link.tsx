/**
 * @file 自动判断是否应使用 next/Link <Link> or <a> 的链接组件
 */

import React, { AnchorHTMLAttributes } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

export type Props = AnchorHTMLAttributes<HTMLAnchorElement>

export default function Link({ href, ...others }: Props) {
  const { pathname } = useRouter()
  // 对于 hash 直接走 a 标签，next/link 会干掉 hrefe: hash 点击触发的 hashchange 事件
  if (href && href.indexOf('#') > -1) {
    // 当前页跳转 处于 /kodo 想跳转到 /kodo#target，生成 #target
    if (href.indexOf(pathname + '#') === 0) {
      return <a href={'#' + href.split('#')[1]} {...others} />
    }

    // 不同页跳转 处于 /plsv 想跳转到 /kodo#target，不处理。交给 next/link 单页跳转

    // # 开头
    if (href[0] === '#') {
      return <a href={href} {...others} />
    }
  }

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
    // TODO: 后续可以考虑结合当前 host，进一步把 `https://www.qiniu.com/foo` 或
    // `//www.qiniu.com/foo` 转化为 /foo，并当成站内链接处理
    return { inSite: false } as const
  }

  return {
    inSite: true,
    path: href
  } as const
}
