/**
 * @file 产品“人脸核验”
 */

/* eslint-disable max-len */

import React from 'react'
import { InferGetStaticPropsType } from 'next'
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
import Link from 'components/Link'
import { getNews, getNotices, INewsResponse, INotice } from 'apis/admin/product'
import ProductNotice from 'components/Product/common/ProductNotice'
import ProductNews from 'components/Product/common/ProductNews'

import { useBtns } from 'hooks/product-btn'
import imgBanner from './banner.png'
import IconAdvan1 from './_icons/advan-1.svg'
import IconAdvan2 from './_icons/advan-2.svg'
import IconAdvan3 from './_icons/advan-3.svg'
import IconAdvan4 from './_icons/advan-4.svg'
import IconFeat1 from './_icons/feat-1.svg'
import IconFeat2 from './_icons/feat-2.svg'
import IconFeat3 from './_icons/feat-3.svg'
import IconFeat4 from './_icons/feat-4.svg'
import IconFeat5 from './_icons/feat-5.svg'
import IconFeat6 from './_icons/feat-6.svg'
import IconFeat7 from './_icons/feat-7.svg'
import IconFeat8 from './_icons/feat-8.svg'
import style from './style.less'

interface LinkTitleProps {
  title: string
  href: string
}

// 内容放到单独的组件里，主要是为了让这里的内容可以接触到 feedback
// context（由 `<Layout>` 提供），使用 `useFeedbackModal`
function PageContent({ notices, newsRes }: { notices: INotice[], newsRes: INewsResponse }) {

  const priceUrl = urlForPrice(Product.FaceID)

  const btns = useBtns(
    { href: 'https://portal.qiniu.com/faceid', children: '开始使用', pcOnly: true },
    { href: 'https://jinshuju.net/f/fgideP', children: '立即咨询' },
    { href: 'https://developer.qiniu.com/dora/6874/seven-niuyun-face-check-products-use-is-introduced', children: '使用文档' }
  )

  const featureHeaderView = (
    <>
      核心功能
      <p className={style.featureDesc}>利用活体检测、1:1 人脸比对、身份证 OCR 等配套服务，识别准确率高，并可根据需求灵活组合</p>
    </>
  )

  // 生成带接口文档标签的标题
  function LinkTitle({ title, href }: LinkTitleProps) {
    return (
      <div className={style.title}>
        <span>{title}</span>
        <Link className={style.link} href={href} blue>接口文档 &gt;&gt;</Link>
      </div>
    )
  }

  return (
    <>
      <PageBanner
        title="人脸核验"
        desc="利用活体检测、1:1 人脸比对、身份证 OCR 等 AI 技术，对用户身份进行审核验证，广泛应用于数字金融、在线教育、线上政务和直播等各类实名制场景中。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={imgBanner}
      />

      <ProductNotice notices={notices} />

      <Navigator priceLink={priceUrl}>{btns.nav}</Navigator>

      <Feature name="features" title="核心功能" header={featureHeaderView}>
        <feature.Group>
          <feature.Item
            pos="left-right"
            title={<LinkTitle title="活体检测" href="https://developer.qiniu.com/dora/6797/face-flashlive" />}
            icon={<IconFeat1 />}
          >
            <feature.Desc>检测识别设备前的用户是否为真人，而非打印照片/3D 面具等伪造的攻击，支持光线活体检测、动作活体检测、数字活体检测等多种模式</feature.Desc>
          </feature.Item>
          <feature.Item
            pos="left-right"
            title={<LinkTitle title="人脸比对" href="https://developer.qiniu.com/dora/6699/facecompare" />}
            icon={<IconFeat2 />}
          >
            <feature.Desc>将用户人脸照片和预留照片库进行比对，判断两张人脸是否为同一人</feature.Desc>
          </feature.Item>
        </feature.Group>
        <feature.Group>
          <feature.Item
            pos="left-right"
            title={<LinkTitle title="权威人脸比对" href="https://developer.qiniu.com/dora/6857/face-hdphotoauth" />}
            icon={<IconFeat3 />}
          >
            <feature.Desc>将用户人脸照片和权威证件库进行比对，判断两张人脸是否为同一人</feature.Desc>
          </feature.Item>
          <feature.Item
            pos="left-right"
            title={<LinkTitle title="人脸检测" href="https://developer.qiniu.com/dora/6817/facedetect" />}
            icon={<IconFeat4 />}
          >
            <feature.Desc>识别照片是否存在人脸信息并返回人脸数量、人脸模糊度、性别、年龄等相关信息</feature.Desc>
          </feature.Item>
        </feature.Group>
        <feature.Group>
          <feature.Item
            pos="left-right"
            title={<LinkTitle title="身份证二要素" href="https://developer.qiniu.com/dora/6926/id-card-two-elements" />}
            icon={<IconFeat5 />}
          >
            <feature.Desc>通过与权威官方数据库进行比对，核验用户填写的姓名和身份证号与上传证件是否相符</feature.Desc>
          </feature.Item>
          <feature.Item
            pos="left-right"
            title={<LinkTitle title="身份证 OCR" href="https://developer.qiniu.com/dora/6820/ocr-idcard" />}
            icon={<IconFeat6 />}
          >
            <feature.Desc>识别并返回身份证正反面信息，例如：身份证中姓名、性别、民族、住址和身份证号码、有效期、签发地址等</feature.Desc>
          </feature.Item>
        </feature.Group>
        <feature.Group>
          <feature.Item
            pos="left-right"
            title={<LinkTitle title="手机号三要素" href="https://developer.qiniu.com/dora/9906/mobile-phone-number-check-the-three-elements" />}
            icon={<IconFeat7 />}
          >
            <feature.Desc>手机号三要素核验接口采用权威官方数据库进行比对，验证验证姓名，证件号码，手机号码的真实性和一致性。</feature.Desc>
          </feature.Item>
          <feature.Item
            pos="left-right"
            title={<LinkTitle title="银行卡四要素" href="https://developer.qiniu.com/dora/9905/the-four-essential-factors-of-bank-card" />}
            icon={<IconFeat8 />}
          >
            <feature.Desc>银行卡四要素核验接口采用权威官方数据库进行比对，验证姓名、证件号码、手机号码、银行卡号的真实性和一致性。</feature.Desc>
          </feature.Item>
        </feature.Group>
      </Feature>

      <Usage />

      <Feature name="advantages" title="产品优势">
        <feature.Group>
          <feature.Item title="算法领先" icon={<IconAdvan1 />}>
            <feature.Desc className={style.featureItemDesc}>活体检测、人脸核验等技术深度优化，效果领先</feature.Desc>
          </feature.Item>
          <feature.Item title="安全可靠" icon={<IconAdvan2 />}>
            <feature.Desc className={style.featureItemDesc}>可防止照片、视频、静态 3D 模型等的伪造攻击</feature.Desc>
          </feature.Item>
          <feature.Item title="方案优选" icon={<IconAdvan3 />}>
            <feature.Desc className={style.featureItemDesc}>提供功能组合定制方案，契合实际业务场景</feature.Desc>
          </feature.Item>
          <feature.Item title="接入方便" icon={<IconAdvan4 />}>
            <feature.Desc className={style.featureItemDesc}>提供 SDK、API、H5 等多种接入方式，并提供全流程技术支持</feature.Desc>
          </feature.Item>
        </feature.Group>
      </Feature>

      <Scenes />

      <ProductNews newsRes={newsRes} />

      <LinkGroups title="相关文档">
        <LinkGroup title="使用文档">
          <LinkItem href="https://jinshuju.net/f/fgideP">申请入口</LinkItem>
        </LinkGroup>
        <LinkGroup title="API 文档">
          <LinkItem href="https://developer.qiniu.com/dora/api/6699/facecompare">人脸比对</LinkItem>
        </LinkGroup>
      </LinkGroups>

      <UsageGuide title="注册即可免费试用人脸核验服务">
        <UGButton href="https://portal.qiniu.com/faceid">立即使用</UGButton>
      </UsageGuide>
    </>
  )
}

export default function FaceIdPage({ notices, newsRes }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      title="人脸核验_活体检测识别_身份验证 OCR 识别_刷脸识别"
      keywords="人脸核验, 身份验证, 人脸比对, 实名制"
      description="利用活体检测、1:1 人脸比对、身份证 OCR 等 AI 技术，对用户身份进行审核验证，广泛应用于数字金融、在线教育、线上政务和直播等各类实名制场景中。"
    >
      <PageContent notices={notices} newsRes={newsRes} />
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      notices: await getNotices(Product.FaceID),
      newsRes: await getNews({ product: Product.FaceID })
    }
  }
}
