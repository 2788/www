/**
 * @file 在线教育解决方案
 */

import React from 'react'

import { Solution, nameMap } from 'constants/solutions'
import { useModal as useFeedbackModal } from 'components/Feedback'
import Layout from 'components/Product/Layout'
import Section from 'components/Product/Section'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'
import Cases, { Case } from 'components/Solution/Cases'

import { useBtns } from 'hooks/product-btn'

import Scene from 'components/pages/edu-online/Scene'
import EduProduct from 'components/pages/edu-online/Product'

import imgBanner from './_images/banner.png'
import imgCase1 from './_images/case-1.png'
import imgCase2 from './_images/case-2.png'
import imgCase3 from './_images/case-3.png'

const title = `${nameMap[Solution.Edu]}解决方案`

function PageContent() {
  const { startIntentConsulting } = useFeedbackModal()
  const handleConsult = () => startIntentConsulting(title)

  const btns = useBtns(
    { onClick: handleConsult, children: '立即咨询' }
  )

  return (
    <>
      <PageBanner
        title={title}
        desc="七牛云在线教育解决方案基于七牛云多年的音视频、AI 及大数据技术积累，提供点播教学、一对一教学、双师课堂、互动直播课等丰富多样的解决方案，帮助客户轻松搭建自己的在线教育平台，提升线上教学体验。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={imgBanner}
      />

      <Navigator>{btns.nav}</Navigator>

      <Scene />

      <EduProduct />

      <Section name="cases" title="客户案例" withTailPadding>
        <Cases>
          <Case logo={imgCase1} title="英语流利说" onConsult={handleConsult}>
            “英语流利说”是一款融合创新口语教学理念和尖端语音评估技术的英语口语学习应用，是中国知名的“AI+教育”公司，为个人、企业提供专业英语学习解决方案。
          </Case>
          <Case logo={imgCase2} title="云上钢琴" onConsult={handleConsult}>
            云上钢琴用智能硬件设备与教学软件相结合，通过闭环教学管理模式 、「浸润式」的教学方法，使钢琴教育融入到生活中。
          </Case>
          <Case logo={imgCase3} title="创客匠人" onConsult={handleConsult}>
            2016 年开始跟七牛合作，从音频到视频、直播、RTC，七牛在技术产品上的更新迭代一直处于行业领先位置，创客匠人选择七牛云成为战略合作伙伴，提升了产品研发的灵活性跟稳定性，确保了产品的服务体验跟性能。
          </Case>
        </Cases>
      </Section>

      <UsageGuide title="欢迎联系我们了解更多行业成功案例经验">
        <UsageGuideButton onClick={handleConsult}>
          立即咨询
        </UsageGuideButton>
      </UsageGuide>
    </>
  )
}

export default function EduOnlinePage() {
  return (
    <Layout
      title="在线教育_直播课_在线课堂_录播课_点播课_大班课_小班课_双师课堂_在线监考_互动教学"
      keywords="在线教育, 直播课, 点播, 在线课堂, 大班课, 小班课, 1v1 教学, 双师课堂, 在线监考, 互动教学"
      description="七牛云在线教育解决方案基于七牛云多年的音视频、AI 及大数据技术积累，提供点播教学、一对一教学、双师课堂、互动直播课等丰富多样的解决方案，帮助客户轻松搭建自己的在线教育平台，提升线上教学体验。"
    >
      <PageContent />
    </Layout>
  )
}

