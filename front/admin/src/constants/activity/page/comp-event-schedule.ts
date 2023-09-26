/**
 * @file 赛程安排/会程安排
 * @author  yinxulai <yinxulai@qiniu.com>
 */

import { ActivityComponentProps, ActivityComponentName, ActivityComponentConfig } from './comp-common'

export type EventScheduleComponentProps = ActivityComponentProps<{
}>

export type EventScheduleComponentConfig = ActivityComponentConfig<
  ActivityComponentName.EventSchedule,
  EventScheduleComponentProps
>
