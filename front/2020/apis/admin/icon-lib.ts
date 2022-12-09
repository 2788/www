/**
 * @file 图标库相关 admin 接口
 */

import { uniq } from 'lodash'

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

async function listAllMongoIcons(ids?: string[]) {
  return listAll<Icon>(
    'icon',
    ids ? { query: { id: { $in: uniq(ids) } } } : undefined
  )
}

export async function getIconMap<T extends string>(ids?: T[]): Promise<{ [P in T]: Icon }> {
  const icons = await listAllMongoIcons(ids)
  return Object.assign({}, ...icons.map(icon => icon && ({ [icon.id]: icon })))
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
