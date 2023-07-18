import React, { useState } from 'react'

import {
  Category, categoryNameMap, categoryDescMap, Solution, nameMap, getUrl
} from 'constants/solutions'

import Section from '../Section'
import Tabs, { TabPane } from './Tabs'
import Content from './Content'
import Link from './Link'

// TODO: icon 挪到 constants 里并且给 mp 用

// 视频营销
import vmEntryIconUrl from './imgs/video-marketing/entry.png' // 入口 icon
import vmIllustrationUrl from './imgs/video-marketing/illustration.jpg' // 配图
import vmEntLiveIconUrl from './imgs/video-marketing/ent-live.png' // 企业直播
import vmInteractMktIconUrl from './imgs/video-marketing/interact-mkt.png' // 互动营销

// 社交娱乐
import seEntryIconUrl from './imgs/social-entertainment/entry.png' // 入口 icon
import seIllustrationUrl from './imgs/social-entertainment/illustration.jpg' // 配图
import sePlsvIconUrl from './imgs/social-entertainment/plsv.png' // 短视频
import seShowLiveIconUrl from './imgs/social-entertainment/show-live.png' // 赛事直播
import seImageIconUrl from './imgs/social-entertainment/image.png' // 图片处理分发加速

// 视联网
import vnEntryIconUrl from './imgs/video-networking/entry.png' // 入口 icon
import vnIllustrationUrl from './imgs/video-networking/illustration.jpg' // 配图
import vnSmartHomeIconUrl from './imgs/video-networking/smart-home.png' // 家居视联网
import vnKindergartenMonitoringIconUrl from './imgs/video-networking/kindergarten-monitoring.png' // 智慧幼教
import vnVehicleIntelligenceIconUrl from './imgs/video-networking/vehicle-intelligence.png' // 车载智能

// 智能新媒体
import snmEntryIconUrl from './imgs/smart-new-media/entry.png' // 入口 icon
import snmIllustrationUrl from './imgs/smart-new-media/illustration.jpg' // 配图
import snmCmediaProductionIconUrl from './imgs/smart-new-media/cmedia-production.png' // 智能剪辑
import snmMediaManagementIconUrl from './imgs/smart-new-media/media-management.png' // 智能媒资

// 元宇宙
import mvEntryIconUrl from './imgs/metaverse/entry.png' // 入口 icon
import mvIllustrationUrl from './imgs/metaverse/illustration.jpg' // 配图
import mvAvatarIconUrl from './imgs/metaverse/avatar.png' // 虚拟数字人
import mvVrLiveIconUrl from './imgs/metaverse/vrlive.jpg' // VR 直播

import styles from './style.less'

export default function AllSolutions() {
  const [current, setCurrent] = useState(0)
  return (
    <Section
      title="全方位的解决方案"
      rootClassName={styles.root}
      className={styles.section}
    >
      <Tabs value={current} onChange={v => { setCurrent(v) }}>
        <TabPane
          title={categoryNameMap[Category.VideoMarketing]}
          iconUrl={vmEntryIconUrl}
        >
          <Content
            title={categoryNameMap[Category.VideoMarketing]}
            desc={categoryDescMap[Category.VideoMarketing]}
            imgUrl={vmIllustrationUrl}
          >
            <Link iconUrl={vmEntLiveIconUrl} href={getUrl(Solution.EntLive)}>{nameMap[Solution.EntLive]}</Link>
            <Link iconUrl={vmInteractMktIconUrl} href={getUrl(Solution.InteractMkt)}>
              {nameMap[Solution.InteractMkt]}
            </Link>
          </Content>
        </TabPane>
        <TabPane
          title={categoryNameMap[Category.SocialEntertainment]}
          iconUrl={seEntryIconUrl}
        >
          <Content
            title={categoryNameMap[Category.SocialEntertainment]}
            desc={categoryDescMap[Category.SocialEntertainment]}
            imgUrl={seIllustrationUrl}
          >
            <Link iconUrl={sePlsvIconUrl} href={getUrl(Solution.Plsv)}>{nameMap[Solution.Plsv]}</Link>
            <Link iconUrl={seShowLiveIconUrl} href={getUrl(Solution.ShowLive)}>{nameMap[Solution.ShowLive]}</Link>
            <Link iconUrl={seImageIconUrl} href={getUrl(Solution.Image)}>{nameMap[Solution.Image]}</Link>
          </Content>
        </TabPane>
        <TabPane
          title={categoryNameMap[Category.VideoNetworking]}
          iconUrl={vnEntryIconUrl}
        >
          <Content
            title={categoryNameMap[Category.VideoNetworking]}
            desc={categoryDescMap[Category.VideoNetworking]}
            imgUrl={vnIllustrationUrl}
          >
            <Link iconUrl={vnSmartHomeIconUrl} href={getUrl(Solution.SmartHome)}>{nameMap[Solution.SmartHome]}</Link>
            <Link iconUrl={vnKindergartenMonitoringIconUrl} href={getUrl(Solution.KindergartenMonitoring)}>
              {nameMap[Solution.KindergartenMonitoring]}
            </Link>
            <Link iconUrl={vnVehicleIntelligenceIconUrl} href={getUrl(Solution.VehicleIntelligence)}>
              {nameMap[Solution.VehicleIntelligence]}
            </Link>
          </Content>
        </TabPane>
        <TabPane
          title={categoryNameMap[Category.SmartNewMedia]}
          iconUrl={snmEntryIconUrl}
        >
          <Content
            title={categoryNameMap[Category.SmartNewMedia]}
            desc={categoryDescMap[Category.SmartNewMedia]}
            imgUrl={snmIllustrationUrl}
          >
            <Link iconUrl={snmCmediaProductionIconUrl} href={getUrl(Solution.CmediaProduction)}>
              {nameMap[Solution.CmediaProduction]}
            </Link>
            <Link iconUrl={snmMediaManagementIconUrl} href={getUrl(Solution.MediaManagement)}>
              {nameMap[Solution.MediaManagement]}
            </Link>
          </Content>
        </TabPane>
        <TabPane
          title={categoryNameMap[Category.Metaverse]}
          iconUrl={mvEntryIconUrl}
        >
          <Content
            title={categoryNameMap[Category.Metaverse]}
            desc={categoryDescMap[Category.Metaverse]}
            imgUrl={mvIllustrationUrl}
          >
            <Link iconUrl={mvAvatarIconUrl} href={getUrl(Solution.Avatar)}>{nameMap[Solution.Avatar]}</Link>
            <Link iconUrl={mvVrLiveIconUrl} href={getUrl(Solution.VrLive)}>{nameMap[Solution.VrLive]}</Link>
          </Content>
        </TabPane>
      </Tabs>
    </Section>
  )
}
