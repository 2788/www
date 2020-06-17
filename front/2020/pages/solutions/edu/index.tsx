/**
 * @file 教育行业解决方案
 */

/* eslint-disable max-len */
import React, { ReactNode } from 'react'

import { Product } from 'constants/products'
import { useModal as useFeedbackModal } from 'components/Feedback'
import Layout from 'components/Product/Layout'
import Section from 'components/Product/Section'
import PageBanner from 'components/Product/PageBanner'
import BannerFooter from 'components/Solution/BannerFooter'
import Navigator from 'components/Product/Navigator'
import Scene, { Panel as ScenePanel, Block as SceneBlock } from 'components/Product/Scene'
import Feature, * as feature from 'components/Product/Feature'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'
import Cases, { Case } from 'components/Solution/Cases'
import Related, { ProductItem as RelatedProduct } from 'components/Solution/Related'

import { useBtns } from 'hooks/product-btn'

import imgBanner from './_images/banner.png'
import IconBannerRtc from './_images/banner-rtc.svg'
import IconBannerVideo from './_images/banner-video.svg'
import IconBannerAi from './_images/banner-ai.svg'
import imgScene1 from './_images/scene-1.png'
import imgScene2 from './_images/scene-2.png'
import imgScene3 from './_images/scene-3.png'
import imgScene4 from './_images/scene-4.png'
import IconFeature1 from './_images/feature-1.svg'
import IconFeature2 from './_images/feature-2.svg'
import IconFeature3 from './_images/feature-3.svg'
import IconFeature4 from './_images/feature-4.svg'
import IconFeature5 from './_images/feature-5.svg'
import IconAdvan1 from './_images/advan-1.svg'
import IconAdvan2 from './_images/advan-2.svg'
import IconAdvan3 from './_images/advan-3.svg'
import IconAdvan4 from './_images/advan-4.svg'
import IconAdvan5 from './_images/advan-5.svg'
import IconAdvan6 from './_images/advan-6.svg'
import imgArchitecture from './_images/architecture.png'
import imgCase1 from './_images/case-1.png'
import imgCase2 from './_images/case-2.png'
import style from './style.less'

function PageContent() {
  const { startConsulting } = useFeedbackModal()

  const btns = useBtns(
    { onClick: startConsulting, children: '立即咨询' }
  )

  return (
    <>
      <PageBanner
        title="教育行业解决方案"
        desc="以出色的技术能力全场景覆盖，实现直播教学、课程回看、师生身份核验等功能，打造满足不同群体的在线学习解决方案。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={imgBanner}
      />

      <BannerFooter className={style.bannerFooter}>
        <BannerFooterItem
          icon={<IconBannerVideo className={style.icon} />}
          title="多人视频/语音"
          content="支持 1 对 1、多对多，流畅不卡顿"
        />
        <BannerFooterItem
          icon={<IconBannerRtc className={style.icon} />}
          title="多人直播连麦"
          content="支持海量用户同时连麦，清晰稳定"
        />
        <BannerFooterItem
          icon={<IconBannerAi className={style.icon} />}
          title="AI 人脸核验"
          content="身份核验，做好优质教学第一步"
        />
      </BannerFooter>

      <Navigator>{btns.nav}</Navigator>

      <Scene name="scene" title="应用场景" defaultActive="scene-tab-1">
        <ScenePanel name="scene-tab-1" title="K12 大班教育">
          <SceneBlock blockType="fixed">
            <img src={imgScene1} className={style.sceneImg} />
          </SceneBlock>
          <SceneBlock className={style.sceneContentBlock}>
            <div className={style.sceneContainer}>
              <h4 className={style.sceneTitle}>场景描述</h4>
              <ul>
                <li className={style.sceneContentItem}>后疫情时代，在家上课从新风尚转向常态化</li>
                <li className={style.sceneContentItem}>云端课堂支持海量学生同时上课，点名、提问，各种互动功能齐备，提升上课体验。</li>
              </ul>
            </div>
          </SceneBlock>
        </ScenePanel>
        <ScenePanel name="scene-tab-2" title="小班课堂">
          <SceneBlock blockType="fixed">
            <img src={imgScene2} className={style.sceneImg} />
          </SceneBlock>
          <SceneBlock className={style.sceneContentBlock}>
            <div className={style.sceneContainer}>
              <h4 className={style.sceneTitle}>场景描述</h4>
              <ul>
                <li className={style.sceneContentItem}>线上也能有真实的小班教学体验。</li>
                <li className={style.sceneContentItem}>师生之间可通过连麦进行提问、答疑、讨论，多人共同学习，让上课有趣更有效。</li>
              </ul>
            </div>
          </SceneBlock>
        </ScenePanel>
        <ScenePanel name="scene-tab-3" title="1 对 1 辅导">
          <SceneBlock blockType="fixed">
            <img src={imgScene3} className={style.sceneImg} />
          </SceneBlock>
          <SceneBlock className={style.sceneContentBlock}>
            <div className={style.sceneContainer}>
              <h4 className={style.sceneTitle}>场景描述</h4>
              <ul>
                <li className={style.sceneContentItem}>老师与学生1对1视频连麦，因材施教，针对性辅导。</li>
              </ul>
            </div>
          </SceneBlock>
        </ScenePanel>
        <ScenePanel name="scene-tab-4" title="高质量兴趣课堂">
          <SceneBlock blockType="fixed">
            <img src={imgScene4} className={style.sceneImg} />
          </SceneBlock>
          <SceneBlock className={style.sceneContentBlock}>
            <div className={style.sceneContainer}>
              <h4 className={style.sceneTitle}>场景描述</h4>
              <ul>
                <li className={style.sceneContentItem}>高清画质，学得更细致，高保真音质，宛如亲临音乐教室。</li>
                <li className={style.sceneContentItem}>用技术保障让兴趣开花结果。</li>
              </ul>
            </div>
          </SceneBlock>
        </ScenePanel>
      </Scene>

      <Feature name="features" title="产品能力" header="产品能力矩阵">
        <feature.Group>
          <feature.Item title="实时录制" icon={<IconFeature1 />}>
            <feature.Desc>支持音视频录制、存储、转码、分发和点播，课程可点播、回看</feature.Desc>
          </feature.Item>
          <feature.Item title="趣味性互动" icon={<IconFeature2 />}>
            <feature.Desc>提供美颜、滤镜等功能，课程更有趣</feature.Desc>
          </feature.Item>
          <feature.Item title="AI 内容安全" icon={<IconFeature3 />}>
            <feature.Desc>云端实现黄暴恐图自动鉴别，有效规避内容安全风险</feature.Desc>
          </feature.Item>
        </feature.Group>
        <feature.Group>
          <feature.Item title="转码" icon={<IconFeature4 />}>
            <feature.Desc>超大规模转码集群，主流转码格式全覆盖，支持转封装、水印、截图等功能</feature.Desc>
          </feature.Item>
          <feature.Item title="互动工具" icon={<IconFeature5 />}>
            <feature.Desc>支持白板、画笔、发言管理、课件投屏等多种功能，打造云上互动多媒体教室</feature.Desc>
          </feature.Item>
          <feature.Placeholder />
        </feature.Group>
      </Feature>

      <Section name="arch" title="方案架构" header="在线教育平台的一站式解决方案">
        <img className={style.imgArch} alt="方案架构" src={imgArchitecture} />
      </Section>

      <Feature>
        <feature.Group>
          <feature.Item title="接入简单" icon={<IconAdvan1 />}>
            <feature.Desc className={style.featureDesc}>七牛云深度整合各项功能，提供全产品、一站式专家服务</feature.Desc>
          </feature.Item>
          <feature.Item title="低延迟、少丢包" icon={<IconAdvan2 />}>
            <feature.Desc className={style.featureDesc}>路由传输动态选择，自适应直播场景优选调度线路，毫秒级延迟满足更好的直播体验</feature.Desc>
          </feature.Item>
          <feature.Item title="故障容错" icon={<IconAdvan3 />}>
            <feature.Desc className={style.featureDesc}>全网对称部署服务节点，任一节点失效均可立即摘除，及时容错保障服务的高可用</feature.Desc>
          </feature.Item>
        </feature.Group>
        <feature.Group>
          <feature.Item title="弱网少卡顿" icon={<IconAdvan4 />}>
            <feature.Desc className={style.featureDesc}>采用七牛优化后的 QUIC 传输协议，帮助用户减少复杂网络下的卡顿率，提高流畅度</feature.Desc>
          </feature.Item>
          <feature.Item title="安全无忧" icon={<IconAdvan5 />}>
            <feature.Desc className={style.featureDesc}>Face ID 利用活体检测、1:1 人脸比对、身份证 OCR 等 AI 技术，对直播用户身份进行审核验证，保证教学效果</feature.Desc>
          </feature.Item>
          <feature.Item title="网络按需收缩" icon={<IconAdvan6 />}>
            <feature.Desc className={style.featureDesc}>采用全新网络技术，实时计算全链路状态，按需智能伸缩较好路径节点</feature.Desc>
          </feature.Item>
        </feature.Group>
      </Feature>

      <Section name="cases" title="客户案例">
        <Cases>
          <Case logo={imgCase1} title="英语流利说">
            “英语流利说”是一款融合创新口语教学理念和尖端语音评估技术的英语口语学习应用，是中国知名的“AI+教育”公司，为个人、企业提供专业英语学习解决方案。
          </Case>
          <Case logo={imgCase2} title="云上钢琴">
            云上钢琴用智能硬件设备与教学软件相结合，通过闭环教学管理模式 、「浸润式」的教学方法，使钢琴教育融入到生活中。
          </Case>
        </Cases>
      </Section>

      <Section name="related" title="相关产品" header="相关云产品" withTailPadding>
        <Related>
          <RelatedProduct product={Product.Pili} />
          <RelatedProduct product={Product.Plsv} />
          <RelatedProduct product={Product.FaceID} />
          <RelatedProduct product={Product.Cdn} />
        </Related>
      </Section>

      <UsageGuide title="欢迎联系我们了解更多行业成功案例经验">
        <UsageGuideButton onClick={startConsulting}>
          立即咨询
        </UsageGuideButton>
      </UsageGuide>
    </>
  )
}

export default function EduPage() {
  return (
    <Layout
      title="教育行业解决方案"
      keywords="教育, 行业, 行业解决方案"
      description="七牛云以出色的技术能力全场景覆盖，实现直播教学、课程回看、师生身份核验等功能，打造满足不同群体的在线学习解决方案。"
    >
      <PageContent />
    </Layout>
  )
}

function BannerFooterItem({ icon, title, content }: {
  icon: ReactNode
  title: string
  content: string
}) {
  return (
    <div className={style.bannerFooterItem}>
      {icon}
      <h5 className={style.title}>{title}</h5>
      <p className={style.content}>{content}</p>
    </div>
  )
}
