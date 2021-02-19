/**
 * @file 视频SDK feature模块
 */
import React, { PropsWithChildren, ReactFragment, ReactNode } from 'react'
import Button from 'components/UI/Button'
import Block from 'components/Navigator/Block'
import classnames from 'classnames'
import { useMobile } from 'hooks/ua'
import { Product, urlMap, nameMap } from 'constants/products'

import Plms from './images/plms.svg'
import Plsv from './images/plsv.svg'
import Rtn from './images/rtn.svg'
import QnPlayer from './images/qnPlayer.svg'
import Svesdk from './images/svesdk.svg'

import ckjr from './images/ckjr.png'
import cykg from './images/cykg.png'
import dl from './images/dl.png'
import jm from './images/jm.png'
import kk from './images/kk.png'
import mm from './images/mm.png'
import qczj from './images/qczj.png'
import qpy from './images/qpy.png'
import sgw from './images/sgw.png'
import tq from './images/tq.png'
import xhs from './images/xhs.png'
import yqx from './images/yqx.png'
import ysgq from './images/ysgq.png'
import zgpa from './images/zgpa.png'
import zr from './images/zr.png'

import style from './index.less'

export default function Feature() {
  const features = [
    {
      title: '短视频 SDK',
      name: 'plsv',
      icon: <Plsv />,
      subTitle: '100+ 功能覆盖绝大部分视频拍摄和编辑场景，本地转码性能优异，更支持对接第三方滤镜、贴纸等高级功能。',
      contentTitle: '应用场景',
      contentSubTitles: ['社交娱乐', '在线教育', '电商购物', '更多场景'],
      contentTexts: ['聊天小视频、动漫配音秀、游戏精彩集锦', '短视频微课、学员作业展示',
        '商品短视频、买家秀、商品点评等', '制作、短视频资讯、视频看房等'],
      cases: [kk, jm, yqx, zr],
      caseTitles: ['快看', '聚美', '一起学', '自如'],
      btns: [<Button href={urlMap[Product.Plsv]} type="primary" style={{ width: 120 }} key={0}>了解详情</Button>]
    },
    {
      title: '连麦 SDK',
      name: 'rtn',
      icon: <Rtn />,
      subTitle: '零基础构建实时音视频平台，快速支持一对一视频通话、多人会议、直播互动、旁路直播等多种业务场景。',
      contentTitle: '应用场景',
      contentSubTitles: ['社交娱乐', '远程医疗', '互动会议', '在线教育', '在线客服'],
      contentTexts: ['秀场直播、 唱吧直播、 脱口秀', '远程协同、 远程会诊、 手术教学',
        '传统视频会议、 新型网络会议等', '短视频微课、学员作业展示', '银行证券开户、 电商在线客服等'],
      cases: [tq, ysgq, qpy, ckjr],
      caseTitles: ['他趣', '云上钢琴', '英语趣配音', '创客匠人'],
      btns: [<Button href={urlMap[Product.Rtn]} type="primary" style={{ width: 120 }} key={0}>了解详情</Button>]
    },
    {
      title: '直播推流 SDK',
      name: 'plms',
      icon: <Plms />,
      subTitle: '包体轻盈、接入简单，支持手机端 RTMP & QUIC 推流，简单易上手，助您快速搭建直播推流核心功能。',
      contentTitle: '应用场景',
      contentSubTitles: ['社交娱乐', '电商购物', '在线教育', '更多场景'],
      contentTexts: ['直播交友、游戏直播、才艺秀场', '好物优选、鉴宝拍卖、房屋推荐',
        '名师在线、招生大课、直播答题', '户外直播、语音直播、活动直播'],
      cases: [qczj, zgpa, dl, tq],
      caseTitles: ['汽车之家', '中国平安', '淡蓝', '他趣'],
      btnTitles: ['短视频特效 SDK', '直播特效 SDK'],
      btns: [<Button href={urlMap[Product.Plms]} type="primary" style={{ width: 120 }} key={0}>了解详情</Button>]
    },
    {
      title: '播放器 SDK',
      name: 'qnPlayer',
      icon: <QnPlayer />,
      subTitle: '七牛全自研内核多媒体播放器，支持多种视频格式及流媒体协议，可快速应用于直播或点播场景。',
      contentTitle: '核心功能',
      contentSubTitles: ['毫秒级首开', 'HLS 自适应码率', '动态追帧', 'SEI 附加信息'],
      contentTexts: ['直播首开速度仅 300 ms', '应对网络波动，拒绝卡顿', '产生累积延时后可动态追帧，保障观众体验', '支持附加信息，用于观众端数据同步'],
      cases: [sgw, cykg, xhs, mm],
      caseTitles: ['时光网', '传音控股', '小红书', '脉脉'],
      btns: [<Button href={urlMap[Product.QnPlayer]} type="primary" style={{ width: 120 }} key={0}>了解详情</Button>]
    },
    {
      title: '视频特效 SDK',
      name: 'svesdk',
      icon: <Svesdk />,
      subTitle: '融合业界领先技术，为直播、连麦、短视频等应用场景提供美颜、滤镜、贴纸等高级特效，功能强大，性能优越。',
      contentTitle: '核心功能',
      contentSubTitles: ['高级美颜', '滤镜', '贴纸'],
      contentTexts: ['美白、磨皮、锐化、大眼、瘦脸', '多款风格滤镜，满足各类场景需要', '2D、3D 人脸等上千款贴纸'],
      btns: [
        <Button href={urlMap[Product.Svesdk]} type="primary" style={{ width: 136 }} key={0}>{nameMap[Product.Svesdk]}</Button>,
        <Button href={urlMap[Product.Plesdk]} type="primary" style={{ width: 136, marginLeft: 12 }} key={1}>{nameMap[Product.Plesdk]}</Button>
      ]
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
  title: string
  subTitle: string
  name: string
  contentTitle: string,
  contentSubTitles: string[],
  contentTexts: string[],
  cases?: string[],
  caseTitles?: string[]
  btns: ReactNode[]
}

function Row({ preferLeft, icon, title, name, subTitle, contentTitle, contentSubTitles, contentTexts,
  cases, caseTitles, btns }: RowProps) {
  const isMobile = useMobile()
  const imgView = <div className={style.sectionIcon}>{icon}</div>
  const sceneItems = contentSubTitles.map(
    (scene, idx) => <Item key={idx}><span>{scene}</span>{contentTexts[idx]}</Item>
  )
  let caseItems: ReactFragment = <></>
  if (cases && caseTitles) {
    caseItems = (
      <>
        <div className={style.scene}>客户案例</div>
        <ul className={style.logoList}>
          {
            cases.map((e, i) => (
              <li className={style.logoItem} key={i}>
                <img className={style.logoImg} src={e} />
                <span>{caseTitles[i]}</span>
              </li>
            ))
          }
        </ul>
      </>
    )
  }

  const contentView = (
    <div className={style.content}>
      <h3 className={style.title}>{title}</h3>
      <div className={style.subtitle}>{subTitle}</div>
      <div className={style.scene}>{contentTitle}</div>
      <List>
        {sceneItems}
      </List>
      {caseItems}
      <div className={classnames(style.footer, cases && style.caseMargin)}>
        {btns}
      </div>
    </div>
  )

  let children: ReactFragment
  if (isMobile) {
    children = (
      <>
        {contentView}
      </>
    )
  } else if (preferLeft) {
    children = (
      <>
        {imgView}
        {contentView}
      </>
    )
  } else {
    children = (
      <>
        {contentView}
        {imgView}
      </>
    )
  }

  return (
    <Block className={style.block} title={title} name={name}>
      {children}
    </Block>
  )
}
