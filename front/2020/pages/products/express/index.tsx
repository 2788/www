/**
 * @file 产品“机器数据分析平台”
 */

import React, { ReactNode } from 'react'
import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import PageNotice, {
  Group as PageNoticeGroup,
  Item as PageNoticeItem
} from 'components/Product/PageNotice'
import Navigator, { Button as NavButton } from 'components/Product/Navigator'
import Feature from 'components/Product/Feature'
import Section from 'components/Product/Section'
import UIButton from 'components/UI/Button'
import * as cards from 'components/UI/Card'
import IconBanner from './banner.svg'

// 内容放到单独的组件里，主要是为了让这里的内容可以接触到 feedback
// context（由 `<Layout>` 提供），使用 `useFeedbackModal`
function PageContent() {

  const bannerBtns: ReactNode[] = [(
    <UIButton key="use" href="https://portal.qiniu.com/express">立即使用</UIButton>
  ), (
    <UIButton key="demo" type="hollow" href="/TODO">查看 Demo</UIButton>
  )]

  return (
    <>
      <PageBanner
        title="Pandora 数据分析平台"
        desc="智能日志管理平台实现日志数据/业务数据的全生命周期智能管理，适用于运维监控、安全审计及业务数据分析等场景，已帮助上千家互联网、智能制造、金融、新媒体及物联网等行业客户数字化升级。七牛云海量存储系统（KODO）是自主研发的非结构化数据存储管理平台，支持中心和边缘存储。
        平台经过多年大规模用户验证已跻身先进技术行列，并广泛应用于海量数据管理的各类场景。"
        bgColor="#34A1EC"
        btns={bannerBtns}
        icon={<IconBanner />}
      />

      <PageNotice>
        <PageNoticeGroup title="新闻动态" type="news">
          <PageNoticeItem title="平台全面升级，点击了解最新特性" href="/TODO">
            平台全面升级，点击了解最新特性
          </PageNoticeItem>
        </PageNoticeGroup>
        <PageNoticeGroup title="福利活动" type="welfares">
          <PageNoticeItem title="免费额度 TODO" href="/TODO">
            免费额度 TODO
          </PageNoticeItem>
        </PageNoticeGroup>
      </PageNotice>

      <Navigator priceLink="/TODO">
        <NavButton type="primary" href="https://portal.qiniu.com/express">立即使用</NavButton>
        <NavButton withBorder href="/TODO">查看 Demo</NavButton>
      </Navigator>

      <Feature name="intro" title="产品介绍" grey>TODO</Feature>
      <Features />
      <Feature name="usage" title="使用场景">TODO</Feature>
      <Feature name="cases" title="客户案例">TODO</Feature>
      <Feature name="docs" title="相关文档">TODO</Feature>
    </>
  )
}

export default function ExpressPage() {
  return (
    <Layout>
      <PageContent />
    </Layout>
  )
}

function Features() {
  return (
    <Section name="features" title="功能与优势">
      <cards.Row>
        <cards.Card>
          <cards.Img src="https://www.qiniu.com/assets/express/bank-438fae237e9b53adaa688d9e2e9359fcb28a020212956899fb0ce45c305a1c02.jpg" />
          <cards.Content>
            <cards.Title>数据归一化</cards.Title>
            <cards.Desc>多数据源的异构数据归一化处理，获取关联业务的整体视图，为企业决策提供可靠支撑。</cards.Desc>
          </cards.Content>
        </cards.Card>
        <cards.Card>
          <cards.Img src="https://www.qiniu.com/assets/express/bank-438fae237e9b53adaa688d9e2e9359fcb28a020212956899fb0ce45c305a1c02.jpg" />
          <cards.Content>
            <cards.Title>高级计算分析</cards.Title>
            <cards.Desc>支持 SPL 高级搜索分析语法，提供上百种命令来实时监测、探索、预测、可视化数据。</cards.Desc>
          </cards.Content>
        </cards.Card>
        <cards.Card>
          <cards.Img src="https://www.qiniu.com/assets/express/bank-438fae237e9b53adaa688d9e2e9359fcb28a020212956899fb0ce45c305a1c02.jpg" />
          <cards.Content>
            <cards.Title>应用商店</cards.Title>
            <cards.Desc>扩展应用丰富，支持海量应用，针对典型场景提供开箱即用的解决方案。</cards.Desc>
          </cards.Content>
        </cards.Card>
        <cards.Card>
          <cards.Img src="https://www.qiniu.com/assets/express/bank-438fae237e9b53adaa688d9e2e9359fcb28a020212956899fb0ce45c305a1c02.jpg" />
          <cards.Content>
            <cards.Title>数据安全</cards.Title>
            <cards.Desc>精确控制用户对平台知识的操作权限，保障数据安全和合规性。</cards.Desc>
          </cards.Content>
        </cards.Card>
      </cards.Row>
    </Section>
  )
}
