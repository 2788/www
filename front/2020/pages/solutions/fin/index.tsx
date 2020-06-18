/**
 * @file 金融行业解决方案
 */

/* eslint-disable max-len */
import React from 'react'

import { Product, urlMap as productUrlMap } from 'constants/products'
import { Solution, urlMap as solutionUrlMap, iconMap as solutionIconMap } from 'constants/solutions'
import Swiper from 'components/UI/Swiper'
import { useModal as useFeedbackModal } from 'components/Feedback'
import Layout from 'components/Product/Layout'
import Section from 'components/Product/Section'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import Feature, * as feature from 'components/Product/Feature'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'
import Cases, { Case } from 'components/Solution/Cases'
import Related, { Item as RelatedItem, ProductItem as RelatedProduct } from 'components/Solution/Related'

import { useBtns } from 'hooks/product-btn'

import imgBanner from './_images/banner.png'
import IconValue1 from './_images/value-1.svg'
import IconValue2 from './_images/value-2.svg'
import IconValue3 from './_images/value-3.svg'
import imgScreenshotPersonal from './_images/screenshot-personal.png'
import imgScreenshotEnterprise from './_images/screenshot-enterprise.png'
import imgScreenshotMobile from './_images/screenshot-mobile.png'
import IconAdvan1 from './_images/advan-1.svg'
import IconAdvan2 from './_images/advan-2.svg'
import IconAdvan3 from './_images/advan-3.svg'
import IconAdvan4 from './_images/advan-4.svg'
import imgArchitecture from './_images/architecture.png'
import imgCaseIngeek from './_images/case-ingeek.png'
import IconOcr from './_images/ocr.svg'
import style from './style.less'

const IconKodoe = solutionIconMap[Solution.Kodoe]

function PageContent() {
  const { startConsulting } = useFeedbackModal()

  const btns = useBtns(
    { onClick: startConsulting, children: '咨询详情' }
  )

  return (
    <>
      <PageBanner
        title="金融行业解决方案"
        desc="凭借七牛在异构数据湖和数据分析与处理等领域的核心技术和独到理解，帮助银行客户在满足监管合规要求的同时有序和文件的开展各项金融业务。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={imgBanner}
      />

      <Navigator>{btns.nav}</Navigator>

      <Feature name="values" title="客户价值">
        <feature.Group className={style.valueGroup}>
          <feature.Item icon={<IconValue1 />}>
            <feature.Desc className={style.valueDesc}>通过多种灵活的策略采集资金交易、账户系统、金融理财等多系统的实时数据</feature.Desc>
          </feature.Item>
          <feature.Item icon={<IconValue2 />}>
            <feature.Desc className={style.valueDesc}>支持对所有不同数据源的数据直接分析处理，产出各种符合监管要求的报送数据</feature.Desc>
          </feature.Item>
          <feature.Item icon={<IconValue3 />}>
            <feature.Desc className={style.valueDesc}>数据分析平台的高性能和实时计算，保证报送数据稳定、按时地汇总到监管系统</feature.Desc>
          </feature.Item>
        </feature.Group>
      </Feature>

      <Section name="arch" title="方案架构">
        <img className={style.imgArch} alt="方案架构" src={imgArchitecture} />
      </Section>

      <Section name="screenshots" title="效果展示">
        <div className={style.screenshotWrapper}>
          <Swiper withArrow withPagination>
            <ScreenshotItem imgUrl={imgScreenshotPersonal} name="个人网银系统交易" />
            <ScreenshotItem imgUrl={imgScreenshotEnterprise} name="企业网银系统交易" />
            <ScreenshotItem imgUrl={imgScreenshotMobile} name="手机银行系统交易" />
          </Swiper>
        </div>
      </Section>

      <Feature>
        <feature.Group className={style.featureGroup}>
          <feature.Item className={style.featureItem} title="零难度采集" icon={<IconAdvan1 />}>
            <feature.Desc className={style.featureDesc}>可视化配置，实时采集，支持数百种数据源，Schema On Read 能力极大降低数据接入成本</feature.Desc>
          </feature.Item>
          <feature.Item className={style.featureItem} title="数据归一化" icon={<IconAdvan2 />}>
            <feature.Desc className={style.featureDesc}>多数据源的异构数据归一化处理，获取关联业务的整体视图，为企业决策提供可靠支撑</feature.Desc>
          </feature.Item>
          <feature.Item className={style.featureItem} title="高级计算分析" icon={<IconAdvan3 />}>
            <feature.Desc className={style.featureDesc}>支持 SPL 高级搜索分析语法，提供上百种命令来实时监测、探索、预测、可视化数据</feature.Desc>
          </feature.Item>
          <feature.Item className={style.featureItem} title="数据安全" icon={<IconAdvan4 />}>
            <feature.Desc className={style.featureDesc}>细粒度多维度授权机制，精确控制用户对平台知识的操作权限，保障数据及操作的安全</feature.Desc>
          </feature.Item>
        </feature.Group>
      </Feature>

      <Section name="cases" title="客户案例">
        <Cases>
          <Case logo={imgCaseIngeek} title="银基富力">
            Pandora 助力我们打造专业的信息科技风险监管报送系统，面对海量抽象的机器数据，Pandora 提供了专业化的数据采集、实时分析、可视化能力，实时获取监管数据，有效识别、计量、监测和控制信息科技风险，大大提升监管效率。
          </Case>
        </Cases>
      </Section>

      <Section name="related" title="相关产品" header="相关云产品" withTailPadding>
        <Related>
          <RelatedItem icon={<IconKodoe />} href={solutionUrlMap[Solution.Kodoe]}>
            存储与数据湖
          </RelatedItem>
          <RelatedProduct product={Product.Express} />
          <RelatedProduct product={Product.FaceID} />
          <RelatedItem icon={<IconOcr />} href={productUrlMap[Product.FaceID] + '#features'}>
            OCR 识别
          </RelatedItem>
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

export default function FinPage() {
  return (
    <Layout
      title="金融行业解决方案"
      keywords="金融, 行业, 行业解决方案"
      description="凭借七牛在异构数据湖和数据分析与处理等领域的核心技术和独到理解，帮助银行客户在满足监管合规要求的同时有序和文件的开展各项金融业务。"
    >
      <PageContent />
    </Layout>
  )
}

type ScreenshotItemProps = {
  imgUrl: string
  name: string
}

function ScreenshotItem({ imgUrl, name }: ScreenshotItemProps) {
  return (
    <div className={style.screenshotItem}>
      <img src={imgUrl} alt={name} className={style.img} />
      <p className={style.name}>{name}</p>
    </div>
  )
}
