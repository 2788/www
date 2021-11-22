/**
 * @file 汽车行业解决方案
 */

import React from 'react'

import { Product } from 'constants/products'
import { Solution, nameMap } from 'constants/solutions'
import { useModal as useFeedbackModal } from 'components/Feedback'
import Layout from 'components/Product/Layout'
import Section from 'components/Product/Section'
import Related, { ProductItem as RelatedProduct } from 'components/Solution/Related'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'
import Cases, { Case } from 'components/Solution/Cases'

import { useBtns } from 'hooks/product-btn'

import Architecture from 'components/pages/automobile/Architecture'
import Scene from 'components/pages/automobile/Scene'
import Advantage from 'components/pages/automobile/Advantage'

import imgBanner from './_images/banner.png'
import imgCase1 from './_images/case1.png'
import imgCase2 from './_images/case2.png'
import imgCase3 from './_images/case3.png'

const title = `${nameMap[Solution.Automobile]}行业解决方案`
const desc = '在汽车产业加速走向智能、网联和共享的时代背景下，如何在愈加复杂的交通环境和市场竞争中，保障人、车、货的安全以及帮助车企实现业务的创新是目前面临的主要难题。'
  + '七牛云携手合作伙伴基于直播与实时互动、大数据、云计算等技术打造可视化安全出行、车联网大数据运营运维服务等场景化解决方案，帮助车企实现数字化转型和升级，加快产品和服务创新。'

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
        desc={desc}
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={imgBanner}
      />

      <Navigator>{btns.nav}</Navigator>

      <Architecture />

      <Scene />

      <Advantage />

      <Section name="cases" title="客户案例">
        <Cases>
          <Case logo={imgCase1} title="盯盯拍" onConsult={handleConsult}>
            盯盯拍作为汽车后装市场的创新者，把智能手机终端和行车记录仪融合起来，形成能联网的智能行车记录仪。七牛云提供视频上云以及多媒体存储服务，实现 24 小时停车监控，关键视频实时上云等功能，切实保障车主的车机安全。
          </Case>
          <Case logo={imgCase2} title="吉利汽车" onConsult={handleConsult}>
            七牛云 Pandora 对吉利 IT 信息系统整体日志进行全生命周期智能管理：统一采集，合并处理，集中存储与关联分析。
            <>实现线上监控、运维数据支撑、问题诊断、故障预警，资源监测、用户行为审计、攻击溯源、业务走势分析等功能。</>
          </Case>
          <Case logo={imgCase3} title="上汽集团" onConsult={handleConsult}>
            七牛云 Pandora 支撑上汽集团进行车联网安全大数据分析，通过对相关符合监管的车辆、网络数据分析，对车辆定位漂移、非授权远程车辆锁门、多车辆异常指令并行发送等异常事件，进行实时预警以及相应响应措施快速联动。
          </Case>
        </Cases>
      </Section>

      <Section name="related" title="相关产品" header="相关云产品" withTailPadding>
        <Related>
          <RelatedProduct product={Product.Rtn} />
          <RelatedProduct product={Product.Plms} />
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

const layoutDescription = '“数智赋能，洞见出行新未来”，在汽车产业加速走向智能、网联和共享的时代背景下，如何在愈加复杂的交通环境和市场竞争中，保障人、车、货的安全以及帮助车企实现业务的创新是目前面临的主要难题。'
  + '七牛云携手合作伙伴基于直播与实时互动、大数据、云计算等技术打造可视化安全出行、车联网大数据运营运维服务等场景化解决方案，帮助车企实现数字化转型和升级，加快产品和服务创新。'

export default function AutomobilePage() {
  return (
    <Layout
      title="汽车行业解决方案"
      keywords="汽车, 数字化转型, 安全出行, 车联网, 车载监控, 大数据运营运维"
      description={layoutDescription}
    >
      <PageContent />
    </Layout>
  )
}
