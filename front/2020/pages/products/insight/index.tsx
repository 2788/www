/**
 * @file 产品“智能日志管理平台”
 */

import React, { ReactNode } from 'react'
import { useMobile } from 'hooks/ua'
import { useBtns } from 'hooks/product-btn'
import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import Section from 'components/Product/Section'
import PageNotice, { Group as PageNoticeGroup, Item as PageNoticeItem } from 'components/Product/PageNotice'
import Navigator from 'components/Product/Navigator'
import Feature, * as feature from 'components/Product/Feature'
import CustomerCaseGroup, { CustomerCase } from 'components/Product/CustomerCaseGroup'
import LinkGroups, { LinkGroup, LinkItem } from 'components/Product/LinkGroups'
import Scene, { Panel as ScenePanel, Block as SceneBlock } from 'components/Product/Scene'
import UsageGuide, { Button as UGButton } from 'components/Product/UsageGuide'
import imgBanner from './banner.png'
import imgAbilities from './_imgs/abilities.png'
import IconAdvanAssist from './_imgs/advan-assist.svg'
import IconAdvanCrossPlatform from './_imgs/advan-cross-platform.svg'
import IconAdvanFlexibility from './_imgs/advan-flexibility.svg'
import IconAdvanMs from './_imgs/advan-ms.svg'
import IconAdvanRealtime from './_imgs/advan-realtime.svg'
import IconAdvanUe from './_imgs/advan-ue.svg'
import imgSceneDc from './_imgs/scene-dc.png'
import imgSceneIot from './_imgs/scene-iot.png'
import imgSceneLog from './_imgs/scene-log.png'
import imgSceneQuality from './_imgs/scene-quality.png'
import LogoBilibili from './_logos/bilibili.png'
import LogoCmb from './_logos/cmb.png'
import LogoDianxin from './_logos/dianxin.png'
import LogoFaceu from './_logos/faceu.png'
import LogoLiulishuo from './_logos/liulishuo.png'
import LogoRenmin from './_logos/renmin.png'
import LogoTaiping from './_logos/taiping.png'
import LogoYidong from './_logos/yidong.png'

import style from './style.less'

const applyUrl = 'https://portal.qiniu.com/apply-pandora'

// 内容放到单独的组件里，主要是为了让这里的内容可以接触到 feedback
// context（由 `<Layout>` 提供），使用 `useFeedbackModal`
function PageContent() {

  const isPc = !useMobile()

  const btns = useBtns(
    { children: '免费开通', href: applyUrl, pcOnly: true }
  )

  return (
    <>
      <PageBanner
        title="智能日志管理平台"
        desc="智能日志管理平台实现日志数据/业务数据的全生命周期智能管理，适用于运维监控、安全审计及业务数据分析等场景，已帮助上千家互联网、智能制造、金融、新媒体及物联网等行业客户数字化升级。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={imgBanner}
      />

      <PageNotice>
        <PageNoticeGroup title="新闻动态" type="news">
          <PageNoticeItem href="/products/pandora">
            平台全面升级，点击了解最新特性
          </PageNoticeItem>
        </PageNoticeGroup>
        <PageNoticeGroup title="福利活动" type="welfares">
          <PageNoticeItem href="https://developer.qiniu.com/insight/manual/4676/free-allowances">
            免费额度：新增日志数据 1 GB/月，存量日志数据 1 GB/月，日志仓库 1 个/月，API 调用次数 100 万次/月，了解详情
          </PageNoticeItem>
        </PageNoticeGroup>
      </PageNotice>

      <Navigator priceLink="https://developer.qiniu.com/insight/manual/4677/billing-way?ref=www.qiniu.com">
        {btns.nav}
      </Navigator>

      <Section name="abilities" title="能力全景图">
        <img src={imgAbilities} className={style.imgAbilities} />
      </Section>

      <Feature name="advantages" title="产品优势">
        <feature.Group>
          <feature.Item title="企业级实时采集" icon={<IconAdvanRealtime />}>
            <feature.Desc>
              可视化部署，实时采集，支持上百种数据源
              <AdvanMore href="https://developer.qiniu.com/insight/manual/4738/logkit%20Pro%20%E4%BB%8B%E7%BB%8D" />
            </feature.Desc>
          </feature.Item>
          <feature.Item title="毫秒级实时搜索" icon={<IconAdvanMs />}>
            <feature.Desc>
              类 Lucene 搜索语言，划词分析，关联搜索
              <AdvanMore href="https://portal.qiniu.com/apply-insight">免费体验</AdvanMore>
            </feature.Desc>
          </feature.Item>
          <feature.Item title="智能运维辅助" icon={<IconAdvanAssist />}>
            <feature.Desc>
              异常检测，坏盘预测，告警优化
              <AdvanMore href="https://developer.qiniu.com/insight/manual/4707/scenario-analysis" />
            </feature.Desc>
          </feature.Item>
        </feature.Group>
        <feature.Group>
          <feature.Item title="跨平台融合" icon={<IconAdvanCrossPlatform />}>
            <feature.Desc>
              七牛云/本地 IDC/第三方公有云数据统一管理
              <AdvanMore href="https://developer.qiniu.com/insight/manual/4734/scenario-5" />
            </feature.Desc>
          </feature.Item>
          <feature.Item title="灵活部署" icon={<IconAdvanFlexibility />}>
            <feature.Desc>
              按需部署，支持公有云/私有云/混合方式
              <AdvanMore href="http://qiniuyun.mikecrm.com/ySRYzgK">私有部署咨询</AdvanMore>
            </feature.Desc>
          </feature.Item>
          <feature.Item title="极致用户体验" icon={<IconAdvanUe />}>
            <feature.Desc>
              操作简便易上手，降低用户学习成本
              <AdvanMore href="https://developer.qiniu.com/insight/manual/4834/10-minutes-to-play-smart-logging-platform" />
            </feature.Desc>
          </feature.Item>
        </feature.Group>
      </Feature>

      <Scene title="应用场景" header="典型应用场景">
        <ScenePanel name="dc" title="数据中心监控" className={style.scenePanel} verticalCenter>
          <SceneBlock className={style.sceneImgBlock}>
            <img src={imgSceneDc} className={style.sceneImg} />
          </SceneBlock>
          <SceneBlock blockType="fixed" shadow className={style.sceneDetail}>
            <h5 className={style.sceneTitle}>场景描述</h5>
            <p className={style.sceneDesc}>针对本地 IDC、单一或多个公有云的复杂 IT 环境，搭建稳定高效的监控系统，实现跨平台的 IT 资源监控、安全审计和成本管理。</p>
            <h5 className={style.sceneTitle}>业务价值</h5>
            <p className={style.sceneDesc}>
              实时监控：<br />
              支持 IT 基础设施、数据库、中间件和应用服务的指标监控<br />
              <br />
              统一管理：<br />
              无缝对接多种公有云平台，提供丰富图表的监控大屏<br />
              <br />
              成本管理：<br />
              实现账号、服务、区域等多维度的成本智能分析和预测
            </p>
          </SceneBlock>
        </ScenePanel>
        <ScenePanel name="quality" title="应用质量管理" className={style.scenePanel} verticalCenter>
          <SceneBlock className={style.sceneImgBlock}>
            <img src={imgSceneQuality} className={style.sceneImg} />
          </SceneBlock>
          <SceneBlock blockType="fixed" shadow className={style.sceneDetail}>
            <h5 className={style.sceneTitle}>场景描述</h5>
            <p className={style.sceneDesc}>基于应用运行过程中产生的大量日志，实时感知质量趋势，及时全面的对应用质量进行追踪和优化，管理终端用户体验。</p>
            <h5 className={style.sceneTitle}>业务价值</h5>
            <p className={style.sceneDesc}>
              性能追踪：<br />
              实现面向服务的关键事务的应用性能指标可视化追踪<br />
              <br />
              故障预测：<br />
              支持时序指标序列的异常点检测和故障预测<br />
              <br />
              精准告警：<br />
              基于机器学习的智能告警管理，抑制告警风暴
            </p>
          </SceneBlock>
        </ScenePanel>
        <ScenePanel name="log" title="统一日志管理" className={style.scenePanel} verticalCenter>
          <SceneBlock className={style.sceneImgBlock}>
            <img src={imgSceneLog} className={style.sceneImg} />
          </SceneBlock>
          <SceneBlock blockType="fixed" shadow className={style.sceneDetail}>
            <h5 className={style.sceneTitle}>场景描述</h5>
            <p className={style.sceneDesc}>作为统一的日志中心，集中管理来自多个数据源的日志。帮助用户进行高效检索与分析，更快定位问题，持续挖掘数据价值。</p>
            <h5 className={style.sceneTitle}>业务价值</h5>
            <p className={style.sceneDesc}>
              实时分析：<br />
              毫秒级日志检索，交互式可视化分析和 DSL 命令搜索<br />
              <br />
              成本低廉：<br />
              冷热分级的存储策略，海量低成本的日志永久存储<br />
              <br />
              弹性伸缩：<br />
              开箱即用，弹性架构，按需扩缩容量，按使用量付费
            </p>
          </SceneBlock>
        </ScenePanel>
        <ScenePanel name="iot" title="物联网数据监控" className={style.scenePanel} verticalCenter>
          <SceneBlock className={style.sceneImgBlock}>
            <img src={imgSceneIot} className={style.sceneImg} />
          </SceneBlock>
          <SceneBlock blockType="fixed" shadow className={style.sceneDetail}>
            <h5 className={style.sceneTitle}>场景描述</h5>
            <p className={style.sceneDesc}>对物联网设备产生的数据进行高效的收集与计算，快速进行数据可视化展示与告警配置，实现海量物联网设备的生命周期管理。</p>
            <h5 className={style.sceneTitle}>业务价值</h5>
            <p className={style.sceneDesc}>
              实时感知：<br />
              实时接入每秒钟百万级的传感器数据，低成本储存<br />
              <br />
              健康检查：<br />
              海量传感设备健康状态可视化，实现智能健康巡检<br />
              <br />
              高效运维：<br />
              基于历史数据的故障预测，主动感知，减少设备宕机时间
            </p>
          </SceneBlock>
        </ScenePanel>
      </Scene>

      <CustomerCaseGroup>
        <CustomerCase pic={LogoYidong} />
        <CustomerCase pic={LogoLiulishuo} />
        <CustomerCase pic={LogoRenmin} />
        <CustomerCase pic={LogoBilibili} />
        <CustomerCase pic={LogoDianxin} />
        <CustomerCase pic={LogoTaiping} />
        <CustomerCase pic={LogoCmb} />
        <CustomerCase pic={LogoFaceu} />
      </CustomerCaseGroup>

      <LinkGroups>
        <LinkGroup title="快速入门">
          <LinkItem href="https://developer.qiniu.com/insight/manual/4834/10-minutes-to-play-smart-logging-platform">10 分钟玩转智能日志平台</LinkItem>
          <LinkItem href="https://developer.qiniu.com/insight/manual/4612/usage-scenarios">Nginx 日志分析</LinkItem>
          <LinkItem href="https://developer.qiniu.com/insight/manual/4667/off-line-calculation">Kubernetes 容器日志分析</LinkItem>
          <LinkItem href="https://developer.qiniu.com/insight/manual/5460/start">日志搜索和关键字报警</LinkItem>
          <LinkItem href="https://developer.qiniu.com/insight/manual/4666/real-time-computing">Apache 日志分析</LinkItem>
          <LinkItem href="https://developer.qiniu.com/insight/manual/4734/scenario-5">服务器性能监控</LinkItem>
        </LinkGroup>
        <LinkGroup title="产品文档">
          <LinkItem href="https://developer.qiniu.com/insight/manual/4684/product-ability-to-the-full">产品简介</LinkItem>
          <LinkItem href="https://developer.qiniu.com/insight/manual/4610/product-features-1">产品功能</LinkItem>
          <LinkItem href="https://developer.qiniu.com/insight/manual/4677/billing-way">产品定价</LinkItem>
          <LinkItem href="https://developer.qiniu.com/insight/glossary/5101/real-time-warehouse">概念&amp;术语</LinkItem>
        </LinkGroup>
        <LinkGroup title="SDK 及工具">
          <LinkItem href="https://developer.qiniu.com/insight/sdk/4645/java-sdk">SDK 详解</LinkItem>
          <LinkItem href="https://developer.qiniu.com/insight/api/4824/overview">REST API 详解</LinkItem>
        </LinkGroup>
      </LinkGroups>

      {isPc && (
        <UsageGuide title="准备好了吗？" description="简单几步，即可创建您自己的日志平台">
          <UGButton href={applyUrl}>立即创建</UGButton>
        </UsageGuide>
      )}
    </>
  )
}

export default function InsightPage() {
  return (
    <Layout title="智能日志管理平台">
      <PageContent />
    </Layout>
  )
}

// 产品优势中“了解更多”链接
function AdvanMore({ href, children }: { href: string, children?: ReactNode }) {
  return <a className={style.advantageLink} href={href} target="_blank" rel="noopener">{children || '了解更多'} &gt;&gt;</a>
}
