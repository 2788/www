/**
 * 图标库
 */

import { IconId, iconScheme } from 'constants/icon'

export function hasIconScheme(url: string) {
  return url.startsWith(iconScheme)
}

export function getIconId(idOrUrl: string): IconId {
  return idOrUrl.replace(iconScheme, '')
}

export function withIconScheme(idOrUrl: string): string {
  return hasIconScheme(idOrUrl) ? idOrUrl : iconScheme + idOrUrl
}
