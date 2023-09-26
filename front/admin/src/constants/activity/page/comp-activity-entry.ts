/**
 * @file 活动页入口组件
 * @author yinxulai <yinxulai@qiniu.com>
 */

import { ActivityComponentConfig, ActivityComponentName, ActivityComponentProps } from './comp-common'

export type ActivityEntryComponentProps = ActivityComponentProps<{
}>

export type ActivityEntryComponentConfig = ActivityComponentConfig<
  ActivityComponentName.ActivityEntry,
  ActivityEntryComponentProps
>
