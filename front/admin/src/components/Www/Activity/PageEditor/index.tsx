/**
 * @file 产品页面模块配置
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState, useMemo, useEffect } from 'react'
import { observer } from 'mobx-react'
import { Button, Loading, Alert, Dropdown, Menu, MenuItem, Checkbox, Dialog } from 'react-icecream'
import { AddIcon, SettingIcon } from 'react-icecream/icons'
import { useInjection } from 'qn-fe-core/di'
import { useRouteTitle } from 'qn-fe-core/router'
import { ToasterStore } from 'admin-base/common/toaster'

import MarketActivityApis, { IActivityWithId } from 'apis/activity/market'

import { ActivityComponentName } from 'constants/activity/page/comp-common'
import { ActivitySection, activityComponentNameTitleMap } from 'constants/activity/page'
import { hasActivityPage } from 'transforms/activity'

import List from './List'
import Preview from './Preview'

import useCompBanner from './comps/banner'
import useCompUsageGuide from './comps/usage-guide'
import useVideoHighlights from './comps/video-highlights'

import styles from './style.m.less'
import useMarkdown from './comps/markdown'
import useActivityEntry from './comps/activity-entry'
import useEventSchedule from './comps/event-schedule'
import useJoinCommunity from './comps/join-community'
import useJudgesLineup from './comps/judges-lineup'
import useRewardedEvent from './comps/rewarded-event'
import usePrizeArrangement from './comps/prize-arrangement'
import useActivityDescription from './comps/activity-description'
import useTopicIntroduction from './comps/topic-introduction'
import useSelectionRules from './comps/selection-rules'
import useProcessMotivation from './comps/process-motivation'
import usePartner from './comps/partner'

export interface Props {
  id: string
}

export default observer(function PageEditor({ id }: Props) {
  useRouteTitle(`自定义活动页面：${id}`)

  const toasterStore = useInjection(ToasterStore)
  const marketActivityApis = useInjection(MarketActivityApis)
  const [activityInfo, setActivityInfo] = useState<IActivityWithId | undefined>(undefined)

  /** 固定按钮是否已勾选 */
  const [configFixed, setConfigFixed] = useState(true)
  /** 编辑弹窗是否弹出 */
  const [isEditingComp, setIsEditingComp] = useState(false)
  /** 保存成功后跳转弹窗是否弹出 */
  const [submittedConfirmVisible, setSubmittedConfirmVisible] = useState(false)
  /** 是否有待保存的数据（修改过） */
  const [unsaved, setUnsaved] = useState(false)
  /** 是否正在保存 */
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [configCompBanner, compBannerView] = useCompBanner(activityInfo)
  const [configCompUsageGuide, compUsageGuideView] = useCompUsageGuide(activityInfo)

  const [configMarkdown, markdownView] = useMarkdown()
  const [configJoinCommunity, joinCommunityView] = useJoinCommunity()
  const [configRewardedEvent, rewardedEventView] = useRewardedEvent()
  const [configJudgesLineup, judgesLineupView] = useJudgesLineup()
  const [configActivityDescription, activityDescriptionView] = useActivityDescription()
  const [configActivityEntry, activityEntryView] = useActivityEntry()
  const [configTopicIntroduction, topicIntroductionView] = useTopicIntroduction()
  const [configSelectionRules, selectionRulesView] = useSelectionRules()
  const [configEventSchedule, eventScheduleView] = useEventSchedule()
  const [configPrizeArrangement, prizeArrangementView] = usePrizeArrangement()
  const [configProcessMotivation, processMotivationView] = useProcessMotivation()
  const [configVideoHighlights, videoHighlightsView] = useVideoHighlights()
  const [configPartner, partnerView] = usePartner()

  /** 可用的模块 */
  const availableModules = useMemo(
    () => {
      if (activityInfo == null) return []
      const result = Object.values(ActivityComponentName).filter(comp => {
        if (comp === ActivityComponentName.Banner) {
          return activityInfo.page?.banner == null
        }

        if (comp === ActivityComponentName.UsageGuide) {
          return activityInfo.page?.usageGuide == null
        }

        return !activityInfo.page?.sections.some(section => {
          if (section.repeated) {
            // 如果组件声明是可重复的，则可重复添加
            return false
          }

          // 如果存在相同模块则不可重复添加
          return section.component.name === comp
        })
      })

      return result
    },
    [activityInfo]
  )

  useEffect(() => {
    toasterStore.promise(
      marketActivityApis.get(id).then(result => {
        setActivityInfo(result)
      })
    )
  }, [id, marketActivityApis, toasterStore])

  useEffect(() => {
    function confirmUnsaved(event: BeforeUnloadEvent) {
      if (unsaved) {
        event.preventDefault()
        const text = '还没保存发布，确认离开？'
        event.returnValue = text
        return text
      }
    }

    // TODO: + on router change?
    window.addEventListener('beforeunload', confirmUnsaved, false)
    return () => { window.removeEventListener('beforeunload', confirmUnsaved, false) }
  }, [unsaved])

  function addModule(productModule: ActivityComponentName) {
    const info = activityInfo!

    setIsEditingComp(true)

    let configSectionComp: Promise<ActivitySection>
    switch (productModule) {
      case ActivityComponentName.Banner:
        toasterStore.promise(
          configCompBanner().then(banner => {
            setActivityInfo({
              ...info,
              page: {
                sections: [],
                ...info.page,
                banner
              }
            })
            setUnsaved(true)
          }).finally(() => {
            setIsEditingComp(false)
          })
        )
        return
      case ActivityComponentName.UsageGuide:
        toasterStore.promise(
          configCompUsageGuide().then(usageGuide => {
            setActivityInfo({
              ...info,
              page: {
                sections: [],
                ...info.page,
                usageGuide
              }
            })
            setUnsaved(true)
          }).finally(() => {
            setIsEditingComp(false)
          })
        )
        return

      case ActivityComponentName.Markdown:
        configSectionComp = configMarkdown()
        break
      case ActivityComponentName.JoinCommunity:
        configSectionComp = configJoinCommunity()
        break
      case ActivityComponentName.RewardedEvent:
        configSectionComp = configRewardedEvent()
        break
      case ActivityComponentName.JudgesLineup:
        configSectionComp = configJudgesLineup()
        break
      case ActivityComponentName.ActivityDescription:
        configSectionComp = configActivityDescription()
        break
      case ActivityComponentName.ActivityEntry:
        configSectionComp = configActivityEntry()
        break
      case ActivityComponentName.TopicIntroduction:
        configSectionComp = configTopicIntroduction()
        break
      case ActivityComponentName.SelectionRules:
        configSectionComp = configSelectionRules()
        break
      case ActivityComponentName.EventSchedule:
        configSectionComp = configEventSchedule()
        break
      case ActivityComponentName.PrizeArrangement:
        configSectionComp = configPrizeArrangement()
        break
      case ActivityComponentName.ProcessMotivation:
        configSectionComp = configProcessMotivation()
        break
      case ActivityComponentName.VideoHighlights:
        configSectionComp = configVideoHighlights()
        break
      case ActivityComponentName.Partner:
        configSectionComp = configPartner()
        break

      default:
        toasterStore.error(`未知模块 ${productModule}`)
        return
    }

    toasterStore.promise(
      configSectionComp.then(section => {
        setActivityInfo({
          ...info,
          page: {
            ...info.page,
            sections: [...(info.page?.sections || []), section]
          }
        })
        setUnsaved(true)
      }).finally(() => {
        setIsEditingComp(false)
      })
    )
  }

  function editModule(index: number) {
    const info = activityInfo!
    const currentSection = info.page!.sections[index]

    setIsEditingComp(true)

    let configComp: Promise<ActivitySection>
    switch (currentSection.component.name) {
      case ActivityComponentName.Markdown:
        configComp = configMarkdown({ ...currentSection, component: currentSection.component })
        break
      case ActivityComponentName.JoinCommunity:
        configComp = configJoinCommunity({ ...currentSection, component: currentSection.component })
        break
      case ActivityComponentName.RewardedEvent:
        configComp = configRewardedEvent({ ...currentSection, component: currentSection.component })
        break
      case ActivityComponentName.JudgesLineup:
        configComp = configJudgesLineup({ ...currentSection, component: currentSection.component })
        break
      case ActivityComponentName.ActivityDescription:
        configComp = configActivityDescription({ ...currentSection, component: currentSection.component })
        break
      case ActivityComponentName.ActivityEntry:
        configComp = configActivityEntry({ ...currentSection, component: currentSection.component })
        break
      case ActivityComponentName.TopicIntroduction:
        configComp = configTopicIntroduction({ ...currentSection, component: currentSection.component })
        break
      case ActivityComponentName.SelectionRules:
        configComp = configSelectionRules({ ...currentSection, component: currentSection.component })
        break
      case ActivityComponentName.EventSchedule:
        configComp = configEventSchedule({ ...currentSection, component: currentSection.component })
        break
      case ActivityComponentName.PrizeArrangement:
        configComp = configPrizeArrangement({ ...currentSection, component: currentSection.component })
        break
      case ActivityComponentName.ProcessMotivation:
        configComp = configProcessMotivation({ ...currentSection, component: currentSection.component })
        break
      case ActivityComponentName.VideoHighlights:
        configComp = configVideoHighlights({ ...currentSection, component: currentSection.component })
        break
      case ActivityComponentName.Partner:
        configComp = configPartner({ ...currentSection, component: currentSection.component })
        break
      default:
        toasterStore.error(`未知组件 ${currentSection.name}`)
        return
    }

    toasterStore.promise(
      configComp.then(newSection => {
        const sections = [...(info.page?.sections || [])]
        sections[index] = newSection
        setActivityInfo({
          ...info,
          page: {
            ...info.page,
            sections
          }
        })
        setUnsaved(true)
      }).finally(() => {
        setIsEditingComp(false)
      })
    )
  }

  function submit() {
    if (!activityInfo) {
      toasterStore.error('暂无数据')
      return
    }

    if (!hasActivityPage(activityInfo)) {
      toasterStore.error('请配置 banner 和最少一个模块')
      return
    }

    setIsSubmitting(true)
    const { _id, ...data } = activityInfo
    toasterStore.promise(
      marketActivityApis.update(data, activityInfo._id)
        .then(() => {
          setUnsaved(false)
          setSubmittedConfirmVisible(true)
        })
        .finally(() => {
          setIsSubmitting(false)
        })
    )
  }

  if (activityInfo == null) {
    return (<Loading />)
  }

  const configForm = (
    <div className={styles.list}>
      <div className={styles.fixedCheck}>
        <label>固定：<Checkbox checked={configFixed} onChange={setConfigFixed} /></label>
      </div>
      <List
        activity={activityInfo}
        onBannerEdit={() => {
          setIsEditingComp(true)
          toasterStore.promise(
            configCompBanner().then(banner => {
              setActivityInfo({
                ...activityInfo,
                page: {
                  sections: [],
                  ...activityInfo.page,
                  banner
                }
              })
              setUnsaved(true)
            }).finally(() => {
              setIsEditingComp(false)
            })
          )
        }}
        onUsageGuideEdit={() => {
          setIsEditingComp(true)
          toasterStore.promise(
            configCompUsageGuide().then(usageGuide => {
              setActivityInfo({
                ...activityInfo,
                page: {
                  sections: [],
                  ...activityInfo.page,
                  usageGuide
                }
              })
              setUnsaved(true)
            }).finally(() => {
              setIsEditingComp(false)
            })
          )
        }}
        onUsageGuideRemove={() => {
          setActivityInfo({
            ...activityInfo,
            page: {
              sections: [],
              ...activityInfo.page,
              usageGuide: null
            }
          })
          setUnsaved(true)
        }}
        onSectionEdit={editModule}
        onSectionsChange={sections => {
          setActivityInfo({
            ...activityInfo,
            page: {
              ...activityInfo.page,
              sections
            }
          })
          setUnsaved(true)
        }}
      />

      {availableModules.length > 0 && (
        <div className={styles.btns}>
          <Dropdown
            overlay={
              <Menu className={styles.menu}>
                {availableModules.map((module, index) => (
                  <MenuItem key={index} onClick={() => { addModule(module) }}>
                    {activityComponentNameTitleMap[module]}
                  </MenuItem>
                ))}
              </Menu>
            }
          >
            <Button className={styles.menuBtn} icon={<AddIcon />}>添加模块</Button>
          </Dropdown>
        </div>
      )}
    </div>
  )

  return (
    <div className={styles.wrapper}>

      {unsaved && (<Alert type="info" message="还没保存发布" />)}

      <div className={styles.config}>
        <Button
          type="primary"
          disabled={!activityInfo}
          loading={isSubmitting}
          onClick={() => submit()}
        >
          保存并发布
        </Button>
        <Dropdown
          // FIXME: 优化实现方式，不依赖于 undefined
          visible={configFixed && !isEditingComp || undefined}
          overlay={configForm}
        >
          <Button className={styles.menuBtn} icon={<SettingIcon />}>页面配置</Button>
        </Dropdown>
      </div>

      <div className={styles.preview}>
        <Preview activity={activityInfo} />
      </div>

      <Dialog
        visible={submittedConfirmVisible}
        onOk={() => setSubmittedConfirmVisible(false)}
        onCancel={() => { setSubmittedConfirmVisible(false) }}
      >
        保存完成
      </Dialog>
      {compBannerView}
      {compUsageGuideView}
      {markdownView}
      {joinCommunityView}
      {rewardedEventView}
      {judgesLineupView}
      {activityDescriptionView}
      {activityEntryView}
      {topicIntroductionView}
      {selectionRulesView}
      {eventScheduleView}
      {prizeArrangementView}
      {processMotivationView}
      {videoHighlightsView}
      {partnerView}
    </div>
  )
})
