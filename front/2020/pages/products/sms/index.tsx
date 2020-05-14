/**
 * @file 产品“云短信”
 */

import React, { ReactNode } from 'react'
import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import Navigator, { Button as NavButton } from 'components/Product/Navigator'
import Feature, * as feature from 'components/Product/Feature'
import CustomerCaseGroup, { CustomerCase } from 'components/Product/CustomerCaseGroup'
import AccessProcess, { Step as AccessStep } from 'components/Product/AccessProcess'
import LinkGroups, { LinkGroup, LinkItem } from 'components/Product/LinkGroups'
import { useModal as useFeedbackModal } from 'components/Feedback'
import UIButton from 'components/UI/Button'
import IconBanner from './banner.svg'
import IconTODO from './_icons/todo.svg'
import LogoTODO from './_logos/todo.png'
import IconStepTODO from './_icons/step-todo.svg'

// 内容放到单独的组件里，主要是为了让这里的内容可以接触到 feedback
// context（由 `<Layout>` 提供），使用 `useFeedbackModal`
function PageContent() {

  const { showModal } = useFeedbackModal()

  function handleConsult() {
    showModal()
  }

  const bannerBtns: ReactNode[] = [(
    <UIButton key="try" href="https://portal.qiniu.com/sms">
      免费试用
    </UIButton>
  ), (
    <UIButton key="consult" type="hollow" onClick={handleConsult}>
      售前咨询
    </UIButton>
  )]

  return (
    <>
      <PageBanner
        title="云短信 SMS"
        desc="七牛云短信服务（SMS），是指对短信功能进行封装打包、向用户提供通信能力的服务。借助七牛云短信服务，企业和开发者可以自定义各类 短信使用场景，如验证码、通知类短信以及营销短信等。"
        bgColor="#34A1EC"
        btns={bannerBtns}
        icon={<IconBanner />}
      />

      <Navigator priceLink="/TODO">
        <NavButton type="primary" href="https://portal.qiniu.com/sms">免费试用</NavButton>
        <NavButton withBorder onClick={handleConsult}>售前咨询</NavButton>
      </Navigator>

      <Feature name="advantages" title="产品优势" grey>
        <feature.Group>
          <feature.Item title="智能调度" icon={<IconTODO />}>七牛短信服务平台融合多家专属运营商，多通道智能调度，轻松应对业务高峰。</feature.Item>
          <feature.Item title="快速稳定" icon={<IconTODO />}>专属通道，3-5 秒到达，国内短信具备 99% 超高到达率（空号或不在服务区除外），保障终端用户体验。</feature.Item>
          <feature.Item title="三网合一" icon={<IconTODO />}>移动、联通、电信网全覆盖，充分满足跨网发送的需求。</feature.Item>
        </feature.Group>
        <feature.Group>
          <feature.Item title="智能分流" icon={<IconTODO />}>海量数据多通道智能分流，到达率可靠。</feature.Item>
          <feature.Item title="满足个性化" icon={<IconTODO />}>支持自定义签名，支持为不同的客户提供独享通道、专用通道、大客户通道。</feature.Item>
          <feature.Item title="便捷接入" icon={<IconTODO />}>提供详尽、完善的短信接入文档，简单易懂，快速上线。</feature.Item>
        </feature.Group>
      </Feature>

      <Feature name="usage" title="应用场景">TODO</Feature>

      <CustomerCaseGroup header="他们都在用七牛">
        <CustomerCase pic={LogoTODO} />
        <CustomerCase pic={LogoTODO} />
        <CustomerCase pic={LogoTODO} />
        <CustomerCase pic={LogoTODO} />
        <CustomerCase pic={LogoTODO} />
        <CustomerCase pic={LogoTODO} />
        <CustomerCase pic={LogoTODO} />
        <CustomerCase pic={LogoTODO} />
      </CustomerCaseGroup>

      <AccessProcess>
        <AccessStep icon={<IconStepTODO />}>服务咨询</AccessStep>
        <AccessStep icon={<IconStepTODO />}>商务洽谈</AccessStep>
        <AccessStep icon={<IconStepTODO />}>平台对接</AccessStep>
        <AccessStep icon={<IconStepTODO />}>上线运营</AccessStep>
      </AccessProcess>

      <LinkGroups>
        <LinkGroup title="产品文档">
          <LinkItem href="https://developer.qiniu.com/sms/manual/5812/sms-product-introduction">产品简介</LinkItem>
          <LinkItem href="https://developer.qiniu.com/sms/manual/5794/sms-limit">限制说明</LinkItem>
          <LinkItem href="https://developer.qiniu.com/sms/manual/5796/sms-prices">产品定价</LinkItem>
          <LinkItem href="https://developer.qiniu.com/sms/manual/6647/sms-auditing-standard">签名和模板审核须知</LinkItem>
          <LinkItem href="https://developer.qiniu.com/sms/manual/5916/power-of-attorney">短信业务授权书</LinkItem>
        </LinkGroup>
        <LinkGroup title="快速入门">
          <LinkItem href="https://developer.qiniu.com/sms/manual/6639/sms-quick-start">快速入门</LinkItem>
        </LinkGroup>
        <LinkGroup title="常见问题">
          <LinkItem href="https://developer.qiniu.com/sms/kb/6282/message-resource-bundle-using-method">资源包使用方法</LinkItem>
        </LinkGroup>
      </LinkGroups>
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
