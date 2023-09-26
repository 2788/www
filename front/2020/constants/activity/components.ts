/* eslint-disable react/display-name */
import React from 'react'

import ActivityEntryComp from 'components/Activity/common/ActivityEntry'
import ActivityDescriptionComp from 'components/Activity/common/ActivityDescription'
import EventScheduleComp from 'components/Activity/common/EventSchedule'
import JoinCommunityComp from 'components/Activity/common/JoinCommunity'
import JudgesLineupComp from 'components/Activity/common/JudgesLineup'
import RewardedEventComp from 'components/Activity/common/RewardedEvent'
import VideoHighlightsComp from 'components/Activity/common/VideoHighlights'
import PrizeArrangementComp from 'components/Activity/common/PrizeArrangement'
import MarkdownComp from 'components/Activity/common/Markdown'
import ProcessMotivationComp from 'components/Activity/common/ProcessMotivation'
import PartnerComp from 'components/Activity/common/Partner'
import TopicIntroductionComp from 'components/Activity/common/TopicIntroduction'
import SelectionRulesComp from 'components/Activity/common/SelectionRules'

export enum ActivityComponentName {
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

export const ComponentMap: Record<ActivityComponentName, React.FC<any>> = {
  [ActivityComponentName.JudgesLineup]: JudgesLineupComp,
  [ActivityComponentName.RewardedEvent]: RewardedEventComp,
  [ActivityComponentName.Markdown]: MarkdownComp,
  [ActivityComponentName.JoinCommunity]: JoinCommunityComp,

  [ActivityComponentName.ActivityDescription]: ActivityDescriptionComp,
  [ActivityComponentName.ActivityEntry]: ActivityEntryComp,
  [ActivityComponentName.TopicIntroduction]: TopicIntroductionComp,
  [ActivityComponentName.SelectionRules]: SelectionRulesComp,
  [ActivityComponentName.EventSchedule]: EventScheduleComp,
  [ActivityComponentName.PrizeArrangement]: PrizeArrangementComp,
  [ActivityComponentName.ProcessMotivation]: ProcessMotivationComp,
  [ActivityComponentName.VideoHighlights]: VideoHighlightsComp,
  [ActivityComponentName.Partner]: PartnerComp
}
