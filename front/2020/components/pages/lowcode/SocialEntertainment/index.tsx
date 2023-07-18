/**
 * @file 社交娱乐
 */

import React from 'react'

import Section from 'components/Product/Section/v2'

import CardList, { CardItemProps } from '../CardList'

import img1 from './images/image1.jpg'
import img2 from './images/image2.jpg'

const MemoizedCardList = React.memo(CardList)

const cardListInfo: CardItemProps[] = [
  {
    imgUrl: img1,
    title: '图片处理分发加速',
    desc: '针对有海量用户生成内容的场景。七牛云存储服务的高并发能力使您灵活应对大流量的业务场景。您可以对存储在云端的图片文件进行数据处理。',
    portalUrl: '/',
    learnMoreUrl: '/'
  },
  {
    imgUrl: img2,
    title: '视频点播',
    desc: '针对短视频、长视频、直播等应用，需要为海量在线视频提供视频存储、网络分发加速、视频智能处理等功能，为C端用户提供更稳当、更流畅的播放体验，也为企业用户提供稳定、安全的视频服务',
    learnMoreUrl: '/'
  }
]

export default function SocialEntertainment() {
  return (
    <Section name="socialEntertainment" title="社交娱乐" withTailPadding>
      <MemoizedCardList cardListInfo={cardListInfo} />
    </Section>
  )
}
