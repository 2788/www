import { IconMap } from 'components/LibIcon'
import { iconScheme } from 'constants/icon'
import { listAll } from '.'

export interface IconBase {
  id: string
  name: string
}

export enum IconType {
  Url = 'url',
  SvgInline = 'svg-inline'
}

export interface UrlIcon extends IconBase {
  type: IconType.Url
  /** icon 地址 */
  url: string
}

export interface SvgInlineIcon extends IconBase {
  type: IconType.SvgInline
  /** svg 源码 */
  content: string
}

export type Icon = UrlIcon | SvgInlineIcon

export async function getIconMap(ids?: string[]) {
  return listAll<Icon>('icon', ids ? { query: { id: { $in: ids } } } : undefined)
    .then(icons => icons.reduce((pre, cur) => {
      if (!pre[cur.id]) {
        pre[cur.id] = cur
      }
      return pre
    }, {} as IconMap))
}

/** 从 json 中取出所有的 icon id */
export function getIconIdsFromJson(o: any): string[] {
  if (o == null) return []

  if (typeof o === 'string') return o.startsWith(iconScheme) ? [o.slice(iconScheme.length)] : []

  if (Array.isArray(o)) {
    const icons: string[] = []
    o.forEach(value => icons.push(...getIconIdsFromJson(value)))
    return icons
  }

  if (typeof o === 'object') {
    const icons: string[] = []
    Object.values(o).forEach(v => icons.push(...getIconIdsFromJson(v)))
    return icons
  }

  return []
}
