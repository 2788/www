/**
 * @file 解决方案
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { IconId } from 'constants/icon'

import { SolutionSection } from './page'
import { SolutionComponentBannerProps } from './page/comp-banner'

/** 解决方案唯一 id，跟解决方案所在页面的路径一一对应 */
export type SolutionId = string

/** 官网解决方案页 url 前缀 */
export const wwwSolutionPathPrefix = '/solutions/'

/** 解决方案描述 */
export interface SolutionDesc {
  /** 长描述，用于解决方案页 banner、meta 标签 description 等 */
  detail: string
  /** 短描述 */
  brief: string
}

/** 解决方案图标 */
export interface SolutionIcon {
  /** 线框（默认） */
  line: IconId
  /** 线框（小） */
  lineSmall: IconId
  /** 毛玻璃（默认） */
  glass: IconId
}

/** 解决方案信息 */
export interface SolutionInfo {
  /** 解决方案页相对路径，全局唯一，同时用作解决方案 id */
  path: SolutionId
  /** 解决方案名字，全局唯一 */
  name: string

  /** 解决方案页标题 */
  title: string
  /** 关键字列表、解决方案标签 */
  keywords: string[]
  /** 解决方案描述 */
  desc: SolutionDesc

  /** 解决方案图标 */
  icon: SolutionIcon

  /** 解决方案页 banner 配置 */
  banner: SolutionComponentBannerProps | null
  /** 解决方案页组件列表配置 */
  sections: SolutionSection[]
}
