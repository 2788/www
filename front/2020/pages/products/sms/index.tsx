/**
 * @file 产品“云短信”
 */

import React from 'react'
import { useBtns } from 'hooks/product-btn'
import { Product } from 'constants/products'
import { urlForPrice } from 'utils/route'
import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import Feature, * as feature from 'components/Product/Feature'
import AccessProcess, { Step as AccessStep } from 'components/Product/AccessProcess'
import LinkGroups, { LinkGroup, LinkItem } from 'components/Product/LinkGroups'
import Scene, { Panel as ScenePanel, Block as SceneBlock } from 'components/Product/Scene'
import { useModal as useFeedbackModal } from 'components/Feedback'
import Cases from 'components/pages/qvm/Cases' // 短信使用跟 QVM 一样的客户案例内容
import IconBanner from './banner.svg'
import IconSchedule from './_icons/schedule.svg'
import IconQuick from './_icons/quick.svg'
import Icon3Net from './_icons/3-net.svg'
import IconShunt from './_icons/shunt.svg'
import IconCustomize from './_icons/customize.svg'
import IconEasy from './_icons/easy.svg'
import ImgSceneConfirm from './_imgs/scene-confirm.png'
import ImgSceneMarketing from './_imgs/scene-marketing.png'
import ImgSceneNotice from './_imgs/scene-notice.png'
import IconStep1 from './_icons/step-1.svg'
import IconStep2 from './_icons/step-2.svg'
import IconStep3 from './_icons/step-3.svg'
import IconStep4 from './_icons/step-4.svg'

import style from './style.less'

// 内容放到单独的组件里，主要是为了让这里的内容可以接触到 feedback
// context（由 `<Layout>` 提供），使用 `useFeedbackModal`
function PageContent() {

  const { showModal } = useFeedbackModal()

  const btns = useBtns(
    { children: '免费试用', href: 'https://portal.qiniu.com/sms', pcOnly: true },
    { children: '售前咨询', onClick: showModal }
  )

  return (
    <>
      <PageBanner
        title="云短信 SMS"
        desc="七牛云短信服务（SMS），是指对短信功能进行封装打包、向用户提供通信能力的服务。借助七牛云短信服务，企业和开发者可以自定义各类 短信使用场景，如验证码、通知类短信以及营销短信等。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={<IconBanner />}
      />

      <Navigator priceLink={urlForPrice(Product.Sms)}>
        {btns.nav}
      </Navigator>

      <Feature name="advantages" title="产品优势">
        <feature.Group>
          <feature.Item title="智能调度" icon={<IconSchedule />}>七牛短信服务平台融合多家专属运营商，多通道智能调度，轻松应对业务高峰。</feature.Item>
          <feature.Item title="快速稳定" icon={<IconQuick />}>专属通道，3-5 秒到达，国内短信具备 99% 超高到达率（空号或不在服务区除外），保障终端用户体验。</feature.Item>
          <feature.Item title="三网合一" icon={<Icon3Net />}>移动、联通、电信网全覆盖，充分满足跨网发送的需求。</feature.Item>
        </feature.Group>
        <feature.Group>
          <feature.Item title="智能分流" icon={<IconShunt />}>海量数据多通道智能分流，到达率可靠。</feature.Item>
          <feature.Item title="满足个性化" icon={<IconCustomize />}>支持自定义签名，支持为不同的客户提供独享通道、专用通道、大客户通道。</feature.Item>
          <feature.Item title="便捷接入" icon={<IconEasy />}>提供详尽、完善的短信接入文档，简单易懂，快速上线。</feature.Item>
        </feature.Group>
      </Feature>

      <Scene>
        <ScenePanel name="confirm" title="验证码类短信" className={style.scenePanel}>
          <SceneBlock>
            <img className={style.sceneImg} src={ImgSceneConfirm} />
          </SceneBlock>
          <SceneBlock blockType="fixed" shadow className={style.sceneDetail}>
            <h5 className={style.sceneTitle}>使用场景</h5>
            <p className={style.sceneDesc}>通过短信将验证码发送到用户手机上，安全有效的完成用户信息验证。适用于注册、登录、找回密码、支付等验证场景。</p>
          </SceneBlock>
        </ScenePanel>
        <ScenePanel name="notice" title="通知类短信" className={style.scenePanel}>
          <SceneBlock>
            <img className={style.sceneImg} src={ImgSceneNotice} />
          </SceneBlock>
          <SceneBlock blockType="fixed" shadow className={style.sceneDetail}>
            <h5 className={style.sceneTitle}>使用场景</h5>
            <p className={style.sceneDesc}>通过发送短信的形式将企业的产品，服务等信息通知给用户。适用于服务通知（如账号开通、账单）、物流通知、系统通知（如升级、故障）等场景。</p>
          </SceneBlock>
        </ScenePanel>
        <ScenePanel name="marketing" title="营销类短信" className={style.scenePanel}>
          <SceneBlock>
            <img className={style.sceneImg} src={ImgSceneMarketing} />
          </SceneBlock>
          <SceneBlock blockType="fixed" shadow className={style.sceneDetail}>
            <h5 className={style.sceneTitle}>使用场景</h5>
            <p className={style.sceneDesc}>通过发送短信的形式将营销活动，节日祝福等信息传递给用户。适用于营销活动（如促销、赠送福利）、客户节日关怀等营销场景。</p>
          </SceneBlock>
        </ScenePanel>
      </Scene>

      <Cases />

      <AccessProcess>
        <AccessStep icon={<IconStep1 />} url="https://developer.qiniu.com/af/manual/4057/the-identity-authentication">
          注册 &amp; 认证七牛 &gt;&gt;
        </AccessStep>
        <AccessStep icon={<IconStep2 />} url="https://developer.qiniu.com/sms/manual/6639/sms-quick-start">
          查看快速入门 &gt;&gt;
        </AccessStep>
        <AccessStep icon={<IconStep3 />} url="https://developer.qiniu.com/sms/manual/6647/sms-auditing-standard">
          查看使用须知 &gt;&gt;
        </AccessStep>
        <AccessStep icon={<IconStep4 />} url="https://portal.qiniu.com/sms">
          开始接入 &gt;&gt;
        </AccessStep>
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
