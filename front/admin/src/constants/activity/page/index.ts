/**
 * @file 产品页
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

// 组件接口文档 https://cf.qiniu.io/pages/viewpage.action?pageId=89899012
// TODO: 组件应该统一定义到一处
import { JoinCommunityComponentConfig } from './comp-join-community'
import { RewardedEventComponentConfig } from './comp-rewarded-event'
import { MarkdownComponentConfig } from './comp-markdown'
import { JudgesLineupComponentConfig } from './comp-judges-lineup'

import { ActivityDescriptionComponentConfig } from './comp-activity-description'
import { ActivityEntryComponentConfig } from './comp-activity-entry'
import { TopicIntroductionComponentConfig } from './comp-topic-introduction'
import { SelectionRulesComponentConfig } from './comp-selection-rules'
import { EventScheduleComponentConfig } from './comp-event-schedule'
import { PrizeArrangementComponentConfig } from './comp-prize-arrangement'
import { ProcessMotivationComponentConfig } from './comp-process-motivation'
import { VideoHighlightsComponentConfig } from './comp-video-highlights'
import { PartnerComponentConfig } from './comp-partner'
import { ActivityComponentName } from './comp-common'

export type ActivityComponent = (
  | JoinCommunityComponentConfig
  | RewardedEventComponentConfig
  | MarkdownComponentConfig
  | JudgesLineupComponentConfig
  | ActivityDescriptionComponentConfig
  | ActivityEntryComponentConfig
  | TopicIntroductionComponentConfig
  | SelectionRulesComponentConfig
  | EventScheduleComponentConfig
  | PrizeArrangementComponentConfig
  | ProcessMotivationComponentConfig
  | VideoHighlightsComponentConfig
  | PartnerComponentConfig
)

export const activityComponentNameTitleMap = {
  [ActivityComponentName.Banner]: '顶部 banner',
  [ActivityComponentName.UsageGuide]: '底部引导',

  [ActivityComponentName.Markdown]: 'Markdown',
  [ActivityComponentName.JoinCommunity]: '加入社群',
  [ActivityComponentName.RewardedEvent]: '有奖事件',
  [ActivityComponentName.JudgesLineup]: '评奖席',

  [ActivityComponentName.ActivityDescription]: ' 活动说明',
  [ActivityComponentName.ActivityEntry]: '活动报名',
  [ActivityComponentName.TopicIntroduction]: '议题介绍',
  [ActivityComponentName.SelectionRules]: '评选规则',
  [ActivityComponentName.EventSchedule]: '赛程安排',
  [ActivityComponentName.PrizeArrangement]: '奖品安排',
  [ActivityComponentName.ProcessMotivation]: '过程激励',
  [ActivityComponentName.VideoHighlights]: '视频亮点',
  [ActivityComponentName.Partner]: '合作伙伴'
} as const

export interface ActivitySectionProps {
  /** section 内容的 key，当前区块在可导航区域中的唯一标示，也会用来作为 URL hash 的值 */
  name: string
  /** section 内容标题，即对应 tab 项中的文本内容 */
  title: string
  /** section 内容副标题 */
  subtitle: string
}

export interface ActivitySection<T extends ActivityComponent = ActivityComponent> extends ActivitySectionProps {
  /** 可以重复使用，页面中插入多个的 */
  repeated?: boolean
  /** 组件参数 */
  component: T
}
