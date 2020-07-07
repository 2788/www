/**
 * @file 产品“机器数据分析平台”
 */

/* eslint-disable max-len */

import React, { PropsWithChildren } from 'react'
import * as card from 'components/UI/Card'
import Button from 'components/UI/Button'
import Swiper from 'components/UI/Swiper'
import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import LinkGroups, { LinkGroup, LinkItem } from 'components/Product/LinkGroups'
import { RawAccessProcess as AccessProcess, Step } from 'components/Product/AccessProcess'
import Section from 'components/Product/Section'
import Scene, * as scene from 'components/Product/Scene'
import { RawCustomerCaseGroup as RawCaseGroup, CustomerCase as Case } from 'components/Product/CustomerCaseGroup'
import GuideLink from 'components/Product/GuideLink'
import * as logos from 'components/pages/express/logos'
import { useMobile } from 'hooks/ua'
import { useBtns } from 'hooks/product-btn'
import { bbg } from 'constants/cases'
import imgBanner from './banner.png'
import ImgIntro from './_images/intro.svg'
import imgFeature1 from './_images/feature-1.png'
import imgFeature2 from './_images/feature-2.png'
import imgFeature3 from './_images/feature-3.png'
import imgFeature4 from './_images/feature-4.png'
import imgFeature5 from './_images/feature-5.png'
import imgFeature6 from './_images/feature-6.png'

import imgScene1 from './_images/scene-1.file.svg'
import imgScene2 from './_images/scene-2.file.svg'
import imgScene3 from './_images/scene-3.file.svg'
import imgScene4 from './_images/scene-4.file.svg'
import imgDemo1 from './_images/demo-1.png'
import imgDemo2 from './_images/demo-2.png'
import imgDemo3 from './_images/demo-3.png'

import IconStep1 from './_images/step-1.svg'
import IconStep2 from './_images/step-2.svg'
import IconStep3 from './_images/step-3.svg'
import style from './style.less'

// 使用链接
const portalUrl = 'https://portal.qiniu.com/express'

function PageContent() {

  const btns = useBtns(
    { href: portalUrl, children: '立即使用', pcOnly: true },
    { href: '/products/pandora/demos', children: '查看 Demo' }
  )

  return (
    <>
      <PageBanner
        title="机器数据分析平台 Pandora"
        desc="机器数据分析平台 Pandora 能实现数据的全生命周期智能管理，适用于智能运维管理、业务运营分析、安全事态分析、智能网联数据分析等场景，帮助金融、汽车、运营商、智能制造、互联网等行业客户探索数据、挖掘价值、预见未来。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={imgBanner}
      />

      <Navigator>{btns.nav}</Navigator>

      <Section
        name="intro"
        title="产品介绍"
        header="探索数据 挖掘价值"
      >
        <ImgIntro className={style.introImg} />
      </Section>

      <Section name="features" title="核心能力">
        <ExpressFeatures />
      </Section>

      <Scene name="scenes" title="典型场景">
        <scene.Panel name="op" title="智能运维监控">
          <scene.Block className={style.sceneImgWrapper} blockType="fixed">
            <img className={style.sceneImg} src={imgScene3} alt="智能运维监控" />
          </scene.Block>
          <scene.Block className={style.sceneDesc} shadow>
            <h5 className={style.sceneDescTitle}>价值</h5>
            <p className={style.sceneDescContent}>构建统一运维监控管理平台，实时采集并监控分析资源、系统、应用层日志及指标数据，洞察 IT 基础架构和业务服务运行状况；基于机器学习的智能化运维管理，快速定位系统故障，增强故障分析及处置能力，推动事后处置向事前预警转变，实现被动监控运维向主动智能运维管理转型，提高自动化运维管理效率。</p>
          </scene.Block>
        </scene.Panel>
        <scene.Panel name="business" title="业务运营分析">
          <scene.Block className={style.sceneImgWrapper} blockType="fixed">
            <img className={style.sceneImg} src={imgScene2} alt="业务运营分析" />
          </scene.Block>
          <scene.Block className={style.sceneDesc} shadow>
            <h5 className={style.sceneDescTitle}>价值</h5>
            <p className={style.sceneDescContent}>针对不同业务场景构建数据分析模型，实现全面化业务实时监控，结合机器学习算法分析和预测业务运营情况、用户行为，主动发现业务风险，从而提升用户体验，通过数据驱动业务决策实现商业智能。</p>
          </scene.Block>
        </scene.Panel>
        <scene.Panel name="security" title="安全事态分析">
          <scene.Block className={style.sceneImgWrapper} blockType="fixed">
            <img className={style.sceneImg} src={imgScene1} alt="安全分析" />
          </scene.Block>
          <scene.Block className={style.sceneDesc} shadow>
            <h5 className={style.sceneDescTitle}>价值</h5>
            <p className={style.sceneDescContent}>灵活调整分析模式和方法，快速构建基于安全大数据的实时分析系统，覆盖多个典型安全场景的智能化风险识别、分析及响应处置，快速识别网络、系统及应用层安全威胁并快速定位问题根因，实现主动运维管理；进一步从全局视角构建安全可视化大盘，提升安全态势感知能力，支撑行动决策。</p>
          </scene.Block>
        </scene.Panel>
        <scene.Panel name="iot" title="智能网联数据分析">
          <scene.Block className={style.sceneImgWrapper} blockType="fixed">
            <img className={style.sceneImg} src={imgScene4} alt="物联网数据智能" />
          </scene.Block>
          <scene.Block className={style.sceneDesc} shadow>
            <h5 className={style.sceneDescTitle}>价值</h5>
            <p className={style.sceneDescContent}>归一化各类智能网联云管边端数据，统一监控管理网联设备及系统运行状态，结合机器学习算法实现近实时智能网联设备异常行为分析及预测分析，构建可扩展的智能网联产品数据分析与检测能力。</p>
          </scene.Block>
        </scene.Panel>
      </Scene>

      <Section name="demos" title="Demo 体验">
        <Demo name="运维监控" img={imgDemo1} url="/products/pandora/demos">
          实时采集并监控资源、系统、应用层日志及指标数据，快速定位系统故障，将被动监控转化为主动监控，实现开发运维一体化，提高自动化运维管理效率。
        </Demo>
        <Demo name="安全分析" img={imgDemo2} url="/products/pandora/demos" reverse>
          安全风险全面可观测，提供业务、架构、网络等维度风险管理能力，协助企业通过安全数据分析快速应对威胁，加快调查并满足合规性要求。
          <br /><br />
          通过用于安全性，合规性和配置的统一工具为您的 SecOps 团队提供支持。快速识别网络、系统、操作层安全威胁和风险，加速安全信息和事件调查管理，满足合规性要求。
        </Demo>
        <Demo name="BI 分析" img={imgDemo3} url="/products/pandora/demos">
          关联复杂业务系统，实现业务全面化实时监控，结合机器学习能力主动发现业务风险，并分析和预测客户行为，通过数据驱动业务决策实现商业智能。
        </Demo>
      </Section>

      <Section name="words" title="客户评价">
        <card.Row>
          <Word title="华数传媒" logo={logos.huashu}>
            Pandora 很好的帮助我们完善了实时业务运营分析，可以随时根据需求调整分析维度获取结果助力业务决策，另外 Pandora 也大大改进了产品开发测试流程。
          </Word>
          <Word title="上海电气" logo={logos.shdq}>
            Pandora 界面简单易懂，对用户非常友好，它的快速检索、灵活的聚合分析和建模能力帮助我们在安全分析领域获得了深入洞察，快速发现并管理安全事件。
          </Word>
        </card.Row>
        <card.Row>
          <Word title="中国太平" logo={logos.taiping}>
            我们使用 Pandora 对全栈的日志数据进行统一管理，这使得我们大大提升了 IT 运维效率，并能够通过日志实时洞察系统运行状态并快速定位故障。
          </Word>
          <Word title="中信银行" logo={logos.zhongxin}>
            面对繁多的内部系统和各部门不同权限操作带来的风险，借助 Pandora 分析日志实现了灵活的 IT 操作风险计量与检核平台，使得我们能够界面化建立多系统多维度的内部审计安全规则，实时感知内部风险。
          </Word>
        </card.Row>
        <card.Row>
          <Word title="步步高" logo={bbg.logo}>
            将日志数据的管理和分析交给 Pandora，使我们更加专注在自身产品和业务，Pandora 很好的支撑起我们业务的快速增长、实现业务实时监控，帮助步步高小天才节约了 30% 成本。
          </Word>
          <Word title="银基富力" logo={logos.yjfl}>
            Pandora 助力我们打造专业的信息科技风险监管报送系统，面对海量抽象的机器数据，Pandora 提供了专业化的数据采集、实时分析、可视化能力，实时获取监管数据，有效识别、计量、监测和控制信息科技风险，大大提升监管效率。
          </Word>
        </card.Row>
      </Section>

      <Section name="cases" title="客户案例" header="他们都在用">
        <div className={style.casesWrapper}>
          <Swiper withArrow withPagination>
            <CaseGroup>
              <Case pic={logos.cmb} alt="招商银行" />
              <Case pic={logos.zhongxin} alt="中信银行" />
              <Case pic={logos.taiping} alt="中国太平" />
              <Case pic={logos.huatai} alt="华泰" />
              <Case pic={logos.yiodng} alt="中移动" />
              <Case pic={logos.dianxin} alt="中国电信" />
              <Case pic={logos.shdq} alt="上海电气" />
              <Case pic={logos.huawei} alt="华为" />
            </CaseGroup>
            <CaseGroup>
              <Case pic={logos.faceu} alt="Faceu" />
              <Case pic={logos.vipkid} alt="VIPkid" />
              <Case pic={logos.wps} alt="WPS" />
              <Case pic={logos.ruxin} alt="如新" />
              <Case pic={logos.jingsheng} alt="晶盛" />
              <Case pic={logos.qingbo} alt="清博" />
              <Case pic={logos.baiao} alt="百奥" />
              <Case pic={logos.qutoutiao} alt="趣头条" />
            </CaseGroup>
            <CaseGroup>
              <Case pic={logos.shyc} alt="上海烟草" />
              <Case pic={logos.huashu} alt="华数传媒" />
              <Case pic={logos.sohutv} alt="搜狐视频" />
              <Case pic={logos.qczj} alt="汽车之家" />
              <Case pic={logos.zbcm} alt="浙报传媒" />
              <Case pic={logos.jltv} alt="吉林电视台" />
            </CaseGroup>
          </Swiper>
        </div>
      </Section>

      <Section name="access" title="接入流程">
        <AccessProcess>
          <Step icon={<IconStep1 />}>
            下载 Pandora 2.0<br />
            安装包并安装
          </Step>
          <Step icon={<IconStep2 />}>
            注册 Pandora 2.0
          </Step>
          <Step icon={<IconStep3 />}>
            按指引采集数据<br />
            开始数据探索分析
          </Step>
        </AccessProcess>
        <GuideLink className={style.tryLink} href={portalUrl}>
          开始免费体验
        </GuideLink>
      </Section>

      {/* TODO: 这部分 Pandora PM 还没给到，先拿这几个放着 */}
      <LinkGroups name="docs" title="相关文档">
        <LinkGroup title="使用文档">
          <LinkItem href="https://developer.qiniu.com/express/manual/6009/product_overview">产品概述</LinkItem>
        </LinkGroup>
        <LinkGroup title="API 文档">
          <LinkItem href="https://developer.qiniu.com/express/manual/6010/spl_manual">SPL 参考手册</LinkItem>
        </LinkGroup>
      </LinkGroups>
    </>
  )
}

export default function PandoraPage() {
  return (
    <Layout
      title="机器数据分析平台 Pandora"
      keywords="数据分析, 数据管理, 智能运维管理, 业务运营分析, 安全事态分析, 智能网联数据, 金融, 汽车, 运营商, 智能制造, 互联网"
      description="机器数据分析平台 Pandora 能实现数据的全生命周期智能管理，适用于智能运维管理、业务运营分析、安全事态分析、智能网联数据分析等场景，帮助金融、汽车、运营商、智能制造、互联网等行业客户探索数据、挖掘价值、预见未来。"
    >
      <PageContent />
    </Layout>
  )
}

function ExpressFeatures() {
  return (
    <>
      <card.Row>
        <card.Card>
          <card.Img className={style.featureImg} src={imgFeature1} />
          <card.Content className={style.featureContent}>
            <card.Title>零难度实时数据采集</card.Title>
            <card.Desc>提供可视化交互配置，支持数百种数据源实时采集，支持 Schema On Read 模式解析字段，有效提高数据写入速度，降低数据接入成本。</card.Desc>
          </card.Content>
        </card.Card>
        <card.Card>
          <card.Img className={style.featureImg} src={imgFeature2} />
          <card.Content className={style.featureContent}>
            <card.Title>智能数据处理</card.Title>
            <card.Desc>预配置数据模型可实现不同来源类型的数据字段归一化，呈现关联数据域的统一视图。Schema On Read 模式极大满足灵活的业务分析需求、便于开展探索性数据分析。</card.Desc>
          </card.Content>
        </card.Card>
        <card.Card>
          <card.Img className={style.featureImg} src={imgFeature3} />
          <card.Content className={style.featureContent}>
            <card.Title>高效灵活分析</card.Title>
            <card.Desc>针对典型场景及业务内置百余种分析命令快速创建模型自定义搜索，提供开箱即用的分析模板和检测规则，开放 API 支持自主开发扩展，高效灵活挖掘数据价值满足不同用户场景需求。</card.Desc>
          </card.Content>
        </card.Card>
      </card.Row>
      <card.Row>
        <card.Card>
          <card.Img className={style.featureImg} src={imgFeature4} />
          <card.Content className={style.featureContent}>
            <card.Title>机器学习能力</card.Title>
            <card.Desc>提供回归与分类、异常检测、时序预测、事件聚类等丰富的机器学习算法，提升异常诊断及业务预判能力，维护系统稳定性，降低系统威胁，为企业决策提供可靠支撑。</card.Desc>
          </card.Content>
        </card.Card>
        <card.Card>
          <card.Img className={style.featureImg} src={imgFeature5} />
          <card.Content className={style.featureContent}>
            <card.Title>全面可视化呈现</card.Title>
            <card.Desc>内置丰富图表类型并支持自定义可视化 app 扩展能力，通过拖拽方式简单高效定制仪表盘，实时监控关键指标，及时发现业务异常，使纷繁复杂的数据可视、可感、可知。</card.Desc>
          </card.Content>
        </card.Card>
        <card.Card>
          <card.Img className={style.featureImg} src={imgFeature6} />
          <card.Content className={style.featureContent}>
            <card.Title>应用生态开放</card.Title>
            <card.Desc>应用商店支持海量应用，针对典型场景提供开箱即用的解决方案，不仅内置官方应用沉淀领域知识，而且具备极强的开放性，支持外部合作伙伴自主开发，扩展个性化应用共建的生态圈。</card.Desc>
          </card.Content>
        </card.Card>
      </card.Row>
    </>
  )
}

type DemoProps = PropsWithChildren<{
  img: string
  name: string
  url: string
  /** 是否调换图片跟内容的位置 */
  reverse?: boolean
}>

function Demo({ img, name, children, url, reverse }: DemoProps) {
  const isPc = !useMobile()

  // PC 才需要调换位置
  if (reverse && isPc) {
    return (
      <card.Row className={style.demo}>
        <DemoContent title={name} url={url}>{children}</DemoContent>
        <DemoImg src={img} alt={name} />
      </card.Row>
    )
  }

  return (
    <card.Row className={style.demo}>
      <DemoImg src={img} alt={name} />
      <DemoContent title={name} url={url}>{children}</DemoContent>
    </card.Row>
  )
}

function DemoImg({ src, alt }: { src: string, alt: string }) {
  return (
    <card.LayoutCard>
      <img className={style.demoImg} src={src} alt={alt} />
    </card.LayoutCard>
  )
}

function DemoContent({ title, url, children }: PropsWithChildren<{ title: string, url: string }>) {
  return (
    <card.LayoutCard className={style.demoContent}>
      <h5 className={style.demoTitle}>{title}</h5>
      <p className={style.demoDesc}>{children}</p>
      <Button className={style.demoBtn} href={url} type="primary">立即体验</Button>
    </card.LayoutCard>
  )
}

type WordProps = PropsWithChildren<{
  title: string
  logo: string
}>

function Word({ title, logo, children }: WordProps) {
  return (
    <card.Card className={style.word}>
      <img src={logo} alt={title} className={style.logo} />
      <h5 className={style.title}>{title}</h5>
      <p className={style.content}>{children}</p>
    </card.Card>
  )
}

function CaseGroup({ children }: PropsWithChildren<{}>) {
  return (
    <div className={style.caseGroupWrapper}>
      <RawCaseGroup>{children}</RawCaseGroup>
    </div>
  )
}