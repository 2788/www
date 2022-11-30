/**
 * @file icon 库相关 context 和组件
 */

import React, { createContext, useContext, useState, useMemo } from 'react'

import { iconScheme } from 'constants/icon'
import { isBrowser } from 'utils'
import { isPreviewContext } from 'utils/admin-preview'
import { Icon, IconType, getIconMap } from 'apis/admin/icon-lib'
import { InlineSvgIcon } from 'components/UI/InlineSvg'

export interface IconMap {
  [id: string]: Icon
}

export const context = createContext<IconMap | null>(null)

// TODO: 接个异常监控…
function handleError(error: string, isPreview: boolean) {
  if (isPreview) {
    return
  }

  // 确保 ssr 首屏阶段静态渲染
  if (!isBrowser()) {
    throw new Error(error)
  }

  // eslint-disable-next-line no-console
  console.error(error)
}

export function LibIcon({ src, alt, className }: { src: string, className?: string, alt: string }) {
  const isPreview = useContext(isPreviewContext)

  const iconLibMapFromContext = useContext(context)
  const [iconLibMapFromCsr, setIconLibMapFromCsr] = useState<IconMap>({})
  const iconLibMap = useMemo(
    () => ({ ...iconLibMapFromContext, ...iconLibMapFromCsr }),
    [iconLibMapFromContext, iconLibMapFromCsr]
  )

  if (src && src.startsWith(iconScheme)) {
    if (!iconLibMapFromContext) {
      handleError('找不到图标库', isPreview)
      return null
    }

    const iconId = src.slice(iconScheme.length)
    const icon = iconLibMap[iconId]
    if (!icon) {
      handleError(`找不到图标 ${iconId}`, isPreview)

      // 线上客户端兜底，保证勉强能用，仅延迟 / 抖动
      getIconMap([iconId]).then(newIconMap => {
        setIconLibMapFromCsr(oldIconMap => ({ ...oldIconMap, ...newIconMap }))
      })

      return null
    }

    if (icon.type === IconType.Url) {
      return <img alt={alt} src={icon.url} className={className} />
    }

    if (icon.type === IconType.SvgInline) {
      return <InlineSvgIcon content={icon.content} />
    }
  }

  return <img alt={alt} src={src} className={className} />
}
