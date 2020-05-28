/**
 * @file 产品“人脸核验”
 */

import React from 'react'
import { Product } from 'constants/products'
import { urlForPrice } from 'utils/route'
import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import Feature, * as feature from 'components/Product/Feature'
import Usage from 'components/pages/faceid/Usage'
import Scenes from 'components/pages/faceid/Scenes'
import LinkGroups, { LinkGroup, LinkItem } from 'components/Product/LinkGroups'
import UsageGuide, { Button as UGButton } from 'components/Product/UsageGuide'
import { useBtns } from 'hooks/product-btn'
import IconBanner from './banner.svg'
import IconAdvan1 from './_icons/advan-1.svg'
import IconAdvan2 from './_icons/advan-2.svg'
import IconAdvan3 from './_icons/advan-3.svg'
import IconAdvan4 from './_icons/advan-4.svg'
import IconFeat1 from './_icons/feat-1.svg'
import IconFeat2 from './_icons/feat-2.svg'
import IconFeat3 from './_icons/feat-3.svg'
import style from './style.less'

// 内容放到单独的组件里，主要是为了让这里的内容可以接触到 feedback
// context（由 `<Layout>` 提供），使用 `useFeedbackModal`
function PageContent() {

  const btns = useBtns(
    { href: 'https://developer.qiniu.com/dora/api/6699/facecompare', children: '使用文档' },
    { href: 'https://jinshuju.net/f/fgideP', children: '申请开通' }
  )

  const featureHeaderView = (
    <>
      核心功能
      <p className={style.featureDesc}>利用活体检测、1:1 人脸比对、身份证 OCR 等配套服务，识别准确率高，并可根据需求灵活组合</p>
    </>
  )

  return (
    <>
      <PageBanner
        title="人脸核验"
        desc="利用活体检测、1:1 人脸比对、身份证 OCR 等 AI 技术，对用户身份进行审核验证，广泛应用于数字金融、在线教育、线上政务和直播等各类实名制场景中。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={<IconBanner />}
      />

      <Navigator priceLink={urlForPrice(Product.FaceID)}>{btns.nav}</Navigator>

      <Feature name="features" title="核心功能" header={featureHeaderView}>
        <feature.Group>
          <feature.Item title="活体检测" icon={<IconFeat1 />}>
            <feature.Desc>验证设备前操作任务真实的活人，而非打印照片/3D 面具等伪造的攻击，支持光线活体、数字活体、动作活体等多种模式</feature.Desc>
          </feature.Item>
          <feature.Item title="人脸比对" icon={<IconFeat2 />}>
            <feature.Desc>将用户人脸照片和预留照片或权威证件库进行比对，判断是否为同一人</feature.Desc>
          </feature.Item>
          <feature.Item title="身份证 OCR" icon={<IconFeat3 />}>
            <feature.Desc>拍摄身份证照片，自动识别文字信息，减少用户输入，该功能涵盖了对身份证图片的验证功能，以防止伪造攻击；同时支持与权威库校验，验证信息真实性</feature.Desc>
          </feature.Item>
        </feature.Group>
      </Feature>

      <Feature name="advantages" title="产品优势">
        <feature.Group>
          <feature.Item pos="left-right" title="算法领先" icon={<IconAdvan1 />}>
            <feature.Desc>活体检测、人脸核验等技术深度优化，效果领先</feature.Desc>
          </feature.Item>
          <feature.Item pos="left-right" title="安全可靠" icon={<IconAdvan2 />}>
            <feature.Desc>可防止照片、视频、静态 3D 模型等的伪造攻击</feature.Desc>
          </feature.Item>
        </feature.Group>
        <feature.Group>
          <feature.Item pos="left-right" title="方案优选" icon={<IconAdvan3 />}>
            <feature.Desc>提供功能组合定制方案，契合实际业务场景</feature.Desc>
          </feature.Item>
          <feature.Item pos="left-right" title="接入方便" icon={<IconAdvan4 />}>
            <feature.Desc>提供 SDK、API、H5 等多种接入方式，并提供全流程技术支持</feature.Desc>
          </feature.Item>
        </feature.Group>
      </Feature>

      <Usage />
      <Scenes />

      <LinkGroups title="相关文档">
        <LinkGroup title="使用文档">
          <LinkItem href="https://jinshuju.net/f/fgideP">申请入口</LinkItem>
        </LinkGroup>
        <LinkGroup title="API 文档">
          <LinkItem href="https://developer.qiniu.com/dora/api/6699/facecompare">人脸比对</LinkItem>
        </LinkGroup>
      </LinkGroups>

      <UsageGuide title="注册即可免费试用人脸核验服务">
        <UGButton href="https://jinshuju.net/f/fgideP">申请开通</UGButton>
      </UsageGuide>
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
