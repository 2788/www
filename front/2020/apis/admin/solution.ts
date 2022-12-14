/**
 * @file 解决方案相关 admin 接口
 */

import { ComponentName } from 'constants/solutions/components'
import { BannerButton, ButtonClickWebLink, ButtonClickConsult } from 'hooks/product-btn'
import { getCode } from 'utils/fetch'
import { get as mongoGet, listAll } from '.'

/** 解决方案图标 */
export interface SolutionIcons {
  /** 线框（默认） */
  line: string
  /** 线框（小） */
  lineSmall: string
  /** 毛玻璃（默认） */
  glass: string
}

/** 解决方案描述 */
export interface SolutionDesc {
  /** 长描述，用于解决方案页 banner、meta 标签 description 等 */
  detail: string
  /** 短描述 */
  brief: string
}

export interface SectionsConfig {
  /** section 内容的 key，当前区块在可导航区域中的唯一标示，也会用来作为 URL hash 的值 */
  name: string
  /** section 内容标题，即对应 tab 项中的文本内容 */
  title: string

  component: {
    /** 组件名称，组件被 Section 包裹 */
    name: ComponentName
    /** 组件参数 */
    props: unknown
  }
}

export interface SolutionInfo {
  /** 解决方案页相对路径，全局唯一，同时用作解决方案 id */
  path: string
  /** 解决方案名字，全局唯一 */
  name: string

  /** 解决方案页标题 */
  title: string
  /** 关键字列表、解决方案标签 */
  keywords: string[]
  /** 解决方案描述 */
  desc: SolutionDesc

  /** 解决方案图标 */
  icon: SolutionIcons

  // TODO: 后续用新的 mongo api 按需裁剪，相关升级参考产品配置页
  /** 解决方案页 banner 配置 */
  banner?: {
    bgImgUrl: {
      large: string
      small?: string
    }
    bgColor: string
    /** 是否为浅色风格（默认深色风格）；浅色风格对应深色按钮和深色文字，深色风格反之 */
    light?: boolean
    buttons: BannerButton[]
  } | null
  /** 解决方案页底部使用引导模块 */
  usageGuide?: {
    title: string
    desc?: string
    button: {
      text: string
      click: ButtonClickWebLink | ButtonClickConsult
    }
  } | null
  /** 解决方案页组件列表配置 */
  sections: SectionsConfig[]
}

// 获取解决方案页面配置
export async function getSolutionInfo(path: string): Promise<SolutionInfo | null> {
  try {
    return await mongoGet<SolutionInfo>('www-solution', path)
  } catch (err) {
    if (Number(getCode(err)) === 404) {
      return null
    }
    throw err
  }
}

export async function listAllSolutionInfos() {
  return listAll<SolutionInfo>('www-solution')
}
