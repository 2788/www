/**
 * @file 组件公共
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

export enum ActivityComponentName {
  Banner = 'banner',
  UsageGuide = 'usage-guide',

  JoinCommunity = 'join-community', // 加入社群
  RewardedEvent = 'rewarded-event', // 有奖事件
  Markdown = 'markdown', // 通用的富文本模块
  JudgesLineup = 'judges-lineup', // 评奖席

  ActivityDescription = 'activity-description', // 活动说明
  ActivityEntry = 'activity-entry', // 活动报名
  TopicIntroduction = 'topic-introduction', // 议题介绍
  SelectionRules = 'selection-rules', // 评选规则
  EventSchedule = 'event-schedule', // 赛程安排
  PrizeArrangement = 'prize-arrangement', // 奖品安排
  ProcessMotivation = 'process-motivation', // 过程激励
  VideoHighlights = 'video-highlights', // 视频亮点（往届风采）
  Partner = 'partner' // 合作伙伴
}

/**
 * @example `ActivityComponentProps<XxxProps>`
 * @example `ActivityComponentProps<'xxxType', XxxProps>`
 */
export type ActivityComponentProps<TP, P = undefined> = (
  P extends undefined ? (
    {
      /** 组件默认类型 */
      type: 'default'
    } & TP
  ) : TP extends string ? (
    {
      /** 组件类型 */
      type: TP
    } & P
  ) : never
)

export type ActivityComponentConfig<N extends ActivityComponentName, P> = ({
  /** 组件名称，组件被 Section 包裹 */
  name: N
  /** `ActivityComponentProps` */
  props: P
})
