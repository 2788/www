/**
 * @file 视频看点
 * @description 包含一个视频列表&播放的能力
 * @author yinxulai <yinxulai@qiniu.com>
 */

import { ActivityComponentProps, ActivityComponentName, ActivityComponentConfig } from './comp-common'

export interface HighlightVideo {
  title: string
  description: string
  coverUrl: string
  videoUrl: string
  releaseTime: number
}

export type VideoHighlightsComponentProps = ActivityComponentProps<{
  videos: HighlightVideo[]
}>

export type VideoHighlightsComponentConfig = ActivityComponentConfig<
  ActivityComponentName.VideoHighlights,
  VideoHighlightsComponentProps
>
