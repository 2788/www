/**
 * @file icon 库相关 context 和组件
 */

import React, { createContext, useContext } from 'react'
import { Icon, IconType } from 'apis/admin/icon-lib'
import { InlineSvgIcon } from 'components/UI/InlineSvg'
import { iconScheme } from 'constants/icon'

export interface IconMap {
  [id: string]: Icon
}

export const context = createContext<IconMap | null>(null)

export function LibIcon({ src, alt, className }: { src: string, className?: string, alt: string }) {
  const iconLibMap = useContext(context)

  if (src && src.startsWith(iconScheme)) {
    if (!iconLibMap) return null

    const icon = iconLibMap[src.slice(iconScheme.length)]
    if (!icon) return null

    if (icon.type === IconType.Url) {
      return <img alt={alt} src={icon.url} className={className} />
    }

    if (icon.type === IconType.SvgInline) {
      return <InlineSvgIcon content={icon.content} />
    }
  }

  return <img alt={alt} src={src} className={className} />
}
