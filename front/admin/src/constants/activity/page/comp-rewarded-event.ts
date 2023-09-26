/**
 * @file 有奖活动
 * @author  yinxulai <yinxulai@qiniu.com>
 */

import { ActivityComponentProps, ActivityComponentName, ActivityComponentConfig } from './comp-common'

export type RewardedEventComponentProps = ActivityComponentProps<{
}>

export type RewardedEventComponentConfig = ActivityComponentConfig<
  ActivityComponentName.RewardedEvent,
  RewardedEventComponentProps
>
