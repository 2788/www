/**
 * @file 视频SDK feature模块
 */
import React, { PropsWithChildren, ReactFragment, ReactNode } from 'react'
import Button from 'components/UI/Button'
import Block from 'components/Navigator/Block'
import classnames from 'classnames'
import { useMobile } from 'hooks/ua'
import { Product, urlMap } from 'constants/products'

import style from './index.less'
import Plms from './images/plms.svg'
import Plsv from './images/plsv.svg'
import Rtn from './images/rtn.svg'
import Svesdk from './images/svesdk.svg'

import plms1 from './images/plms1.png'
import plms2 from './images/plms2.png'
import plms3 from './images/plms3.png'

import plsv1 from './images/plsv1.png'
import plsv2 from './images/plsv2.png'
import plsv3 from './images/plsv3.png'
import plsv4 from './images/plsv4.png'

import rtn1 from './images/rtn1.png'
import rtn2 from './images/rtn2.png'
import rtn3 from './images/rtn3.png'
import rtn4 from './images/rtn4.png'

export default function Feature() {
  const features = [
    {
      title: '短视频 SDK',
      name: 'plsv',
      icon: <Plsv />,
      subTitle: '100+ 功能覆盖绝大部分视频拍摄和编辑场景，本地转码性能优异，更支持对接第三方滤镜、贴纸等高级功能。',
      contentTitle: '应用场景',
      contentSubTitle: ['社交娱乐', '在线教育', '电商购物', '更多场景'],
      contentTextArr: ['聊天小视频、动漫配音秀、游戏精彩集锦', '短视频微课、学员作业展示',
        '商品短视频、买家秀、商品点评等', '制作、短视频资讯、视频看房等'],
      caseArr: [plsv1, plsv2, plsv3, plsv4],
      caseTitleArr: ['快看', '聚美', '一起学', '自如'],
      detailHref: urlMap[Product.Plsv]
    },
    {
      title: '连麦 SDK',
      name: 'rtn',
      icon: <Rtn />,
      subTitle: '零基础构建实时音视频平台，快速支持一对一视频通话、多人会议、直播互动、旁路直播等多种业务场景。',
      contentTitle: '应用场景',
      contentSubTitle: ['社交娱乐', '远程医疗', '互动会议', '在线教育', '在线客服'],
      contentTextArr: ['秀场直播、 唱吧直播、 脱口秀', '远程协同、 远程会诊、 手术教学',
        '传统视频会议、 新型网络会议等', '短视频微课、学员作业展示', '银行证券开户、 电商在线客服等'],
      caseArr: [rtn1, rtn2, rtn3, rtn4],
      caseTitleArr: ['他趣', '云上钢琴', '英语趣配音', '创客匠人'],
      detailHref: urlMap[Product.Rtn]
    },
    {
      title: '直播推流 SDK',
      name: 'plms',
      icon: <Plms />,
      subTitle: '包体轻盈、接入简单，支持手机端 RTMP & QUIC 推流，简单易上手，助您快速搭建直播推流核心功能。',
      contentTitle: '应用场景',
      contentSubTitle: ['社交娱乐', '电商购物', '在线教育', '更多场景'],
      contentTextArr: ['直播交友、游戏直播、才艺秀场', '好物优选、鉴宝拍卖、房屋推荐',
        '名师在线、招生大课、直播答题', '户外直播、语音直播、活动直播'],
      caseArr: [plms1, plms2, plms3, rtn1],
      caseTitleArr: ['汽车之家', '中国平安', '淡蓝', '他趣'],
      detailHref: urlMap[Product.Plms]
    },
    {
      title: '视频特效 SDK',
      name: 'svesdk',
      icon: <Svesdk />,
      subTitle: '融合业界领先技术，为直播、连麦、短视频等应用场景提供美颜、滤镜、贴纸等高级特效，功能强大，性能优越。',
      contentTitle: '核心功能',
      contentSubTitle: ['高级美颜', '滤镜', '贴纸'],
      contentTextArr: ['美白、磨皮、锐化、大眼、瘦脸', '多款风格滤镜，满足各类场景需要', '2D、3D 人脸等上千款贴纸'],
      detailHref: '../products/svesdk'
    }
  ]
  return (
    <div className={style.wrapper}>
      {features.map((ele, index) => (
        <Row {...ele} preferLeft={index % 2 === 1} key={index} />
      ))}
    </div>
  )
}
function List({ children }: PropsWithChildren<{}>) {
  return <ul className={style.list}>{children}</ul>
}

function Item({ children }: PropsWithChildren<{}>) {
  return <li className={style.item}>{children}</li>
}

export type RowProps = {
  // true：图左内容右 false：相反
  preferLeft: boolean
  icon: ReactNode
  detailHref: string
  title: string
  subTitle: string
  name: string
  contentTitle: string,
  contentSubTitle: string[],
  contentTextArr: string[],
  caseArr?: string[],
  caseTitleArr?: ReactNode[]
}

function Row({ preferLeft, icon, detailHref, title, name, subTitle, contentTitle, contentSubTitle, contentTextArr,
  caseArr, caseTitleArr }: RowProps) {
  const isMobile = useMobile()
  const img = <div className={style.sectionIcon}>{icon}</div>
  const sceneItems = contentSubTitle.map(
    (scene, idx) => <Item key={idx}><span>{scene}</span>{contentTextArr[idx]}</Item>
  )
  let caseItems: ReactFragment = <></>
  if (caseArr && caseTitleArr) {
    caseItems = (
      <>
        <div className={style.scene}>客户案例</div>
        <ul className={style.logoList}>
          {
            caseArr.map((e, i) => (
              <li className={style.logoItem} key={i}>
                <img className={style.logoImg} src={e} />
                <span>{caseTitleArr[i]}</span>
              </li>
            ))
          }
        </ul>
      </>
    )
  }
  const buttonClassName = classnames(style.btns, caseArr && style.caseMargin)

  const content = (
    <div className={style.content}>
      <h3 className={style.title}>{title}</h3>
      <div className={style.subtitle}>{subTitle}</div>
      <div className={style.scene}>{contentTitle}</div>
      <List>
        {sceneItems}
      </List>
      {caseItems}
      <div className={buttonClassName}>
        <Button href={detailHref} type="primary">了解详情</Button>
      </div>
    </div>
  )

  let children: ReactFragment
  if (isMobile) {
    children = (
      <>
        {content}
      </>
    )
  } else if (preferLeft) {
    children = (
      <>
        {img}
        {content}
      </>
    )
  } else {
    children = (
      <>
        {content}
        {img}
      </>
    )
  }

  return (
    <Block className={style.block} title={title} name={name}>
      {children}
    </Block>
  )
}
