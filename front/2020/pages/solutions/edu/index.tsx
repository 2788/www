/**
 * @file 教育行业解决方案
 */

/* eslint-disable max-len */
import React from 'react'

import { Product } from 'constants/products'
import { Solution, nameMap } from 'constants/solutions'
import { useModal as useFeedbackModal } from 'components/Feedback'
import Layout from 'components/Product/Layout'
import Section from 'components/Product/Section'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import Scene, { Panel as ScenePanel, Block as SceneBlock } from 'components/Product/Scene'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'
import Cases, { Case } from 'components/Solution/Cases'
import Related, { ProductItem as RelatedProduct } from 'components/Solution/Related'

import { useBtns } from 'hooks/product-btn'

import Architecture from 'components/pages/edu/Architecture'
import EduProduct from 'components/pages/edu/Product'

import imgBanner from './_images/banner.png'
import imgScene1 from './_images/scene-1.png'
import imgScene2 from './_images/scene-2.png'
import imgScene3 from './_images/scene-3.png'
import imgScene4 from './_images/scene-4.png'
import imgCase1 from './_images/case-1.png'
import imgCase2 from './_images/case-2.png'
import imgCase3 from './_images/case-3.png'
import style from './style.less'

const title = `${nameMap[Solution.Edu]}行业解决方案`

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
        desc="以出色的技术能力全场景覆盖，实现直播教学、课程回看、师生身份核验等功能，打造满足不同群体的在线学习解决方案。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={imgBanner}
      />

      <Navigator>{btns.nav}</Navigator>

      <Scene name="scene" title="适用场景" defaultActive="scene-tab-1">
        <ScenePanel name="scene-tab-1" title="在线教育">
          <SceneBlock blockType="fixed">
            <img src={imgScene1} className={style.sceneImg} />
          </SceneBlock>
          <SceneBlock className={style.sceneContentBlock}>
            <div className={style.sceneContainer}>
              <h4 className={style.sceneTitle}>场景描述</h4>
              <ul>
                <li className={style.sceneContentItem}>七牛云为多种教育场景打造快捷的解决方案，无论您是在线教育企业、学校，还是科研机构，都能通过七牛云快速搭建业务，节约研发成本和开发周期。</li>
              </ul>
            </div>
          </SceneBlock>
        </ScenePanel>
        <ScenePanel name="scene-tab-2" title="大班课">
          <SceneBlock blockType="fixed">
            <img src={imgScene2} className={style.sceneImg} />
          </SceneBlock>
          <SceneBlock className={style.sceneContentBlock}>
            <div className={style.sceneContainer}>
              <h4 className={style.sceneTitle}>场景描述</h4>
              <ul>
                <li className={style.sceneContentItem}>后疫情时代，在家上课从新风尚转向常态化</li>
                <li className={style.sceneContentItem}>云端课堂支持海量学生同时上课，点名、提问，各种互动功能齐备，提升上课体验</li>
              </ul>
            </div>
          </SceneBlock>
        </ScenePanel>
        <ScenePanel name="scene-tab-3" title="小班课">
          <SceneBlock blockType="fixed">
            <img src={imgScene3} className={style.sceneImg} />
          </SceneBlock>
          <SceneBlock className={style.sceneContentBlock}>
            <div className={style.sceneContainer}>
              <h4 className={style.sceneTitle}>场景描述</h4>
              <ul>
                <li className={style.sceneContentItem}>线上也能有真实的小班教学体验</li>
                <li className={style.sceneContentItem}>师生之间可通过连麦进行提问、答疑、讨论，多人共同学习，让上课有趣更有效</li>
              </ul>
            </div>
          </SceneBlock>
        </ScenePanel>
        <ScenePanel name="scene-tab-4" title="1 对 1 辅导">
          <SceneBlock blockType="fixed">
            <img src={imgScene4} className={style.sceneImg} />
          </SceneBlock>
          <SceneBlock className={style.sceneContentBlock}>
            <div className={style.sceneContainer}>
              <h4 className={style.sceneTitle}>场景描述</h4>
              <ul>
                <li className={style.sceneContentItem}>老师与学生1对1视频连麦，因材施教，针对性辅导</li>
                <li className={style.sceneContentItem}>高质量兴趣课堂高清画质，学得更细致，高保真音质，宛如亲临音乐教室</li>
                <li className={style.sceneContentItem}>用技术保障让兴趣开花结果</li>
              </ul>
            </div>
          </SceneBlock>
        </ScenePanel>
      </Scene>

      <Architecture />

      <EduProduct />

      <Section name="cases" title="客户案例">
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

      <Section name="related" title="相关产品" header="相关云产品" withTailPadding>
        <Related>
          <RelatedProduct product={Product.Pili} />
          <RelatedProduct product={Product.Plsv} />
          <RelatedProduct product={Product.FaceID} />
        </Related>
        <Related>
          <RelatedProduct product={Product.Cdn} />
          <RelatedProduct product={Product.Qvm} />
        </Related>
      </Section>

      <UsageGuide title="欢迎联系我们了解更多行业成功案例经验">
        <UsageGuideButton onClick={handleConsult}>
          立即咨询
        </UsageGuideButton>
      </UsageGuide>
    </>
  )
}

export default function EduPage() {
  return (
    <Layout
      title="教育场景解决方案_云教育场景_在线教育场景解决方案"
      keywords="教育, 行业, 行业解决方案, 七牛云教育场景, 七牛云, 七牛云教育解决方案, 教育上云, 在线教育解决方案, 在线教育场景方案"
      description="七牛云以出色的技术能力全场景覆盖，实现直播教学、课程回看、师生身份核验等功能，打造满足不同群体的在线学习解决方案。"
    >
      <PageContent />
    </Layout>
  )
}

