/**
 * @file 富文本模块
 * @author  yinxulai <yinxulai@qiniu.com>
 */

import { ActivityComponentConfig, ActivityComponentName, ActivityComponentProps } from './comp-common'

export type ActivityComponentMarkdownProps = ActivityComponentProps<{
  content: string
}>

export type MarkdownComponentConfig = ActivityComponentConfig<
  ActivityComponentName.Markdown,
  ActivityComponentMarkdownProps
>
