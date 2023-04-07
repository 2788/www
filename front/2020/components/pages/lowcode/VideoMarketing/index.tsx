/**
 * @file 视频营销
 */

import React from 'react'

import Section from 'components/Product/Section/v2'

import CardList, { CardItemProps } from '../CardList'
import img1 from './images/image1.jpg'
import img2 from './images/image2.jpg'
import img3 from './images/image3.jpg'

const MemoizedCardList = React.memo(CardList)

const cardListInfo: CardItemProps[] = [
  {
    imgUrl: img1,
    title: '互动营销',
    desc: '七牛互动营销解决方案覆盖娱乐互动直播、电商直播带货、语聊房、互动教育等多应用场景，基于七牛云音视频、AI 智能算法和网络等先进技术，提供易接入、强扩展、高效部署和覆盖多场景的音视频服务，助力企业快速搭建高品质的专属音视频互动营销业务平台。',
    portalUrl: '/',
    learnMoreUrl: '/'
  },
  {
    imgUrl: img2,
    title: '统一消息营销触达',
    desc: '统一消息触达解决方案提供了包括短信、5G消息、微信、钉钉、客户端APP等多种消息触达客户通道，支持预设消息内容与变量，规范消息格式； 提供推送统计报表、消息历史报表、用户触达分析，整合各通道的推送统计结果，从渠道、通道、用户多维度分析转换率，以进行针对性促活。',
    portalUrl: '/',
    learnMoreUrl: '/'
  },
  {
    imgUrl: img3,
    title: '企业直播',
    desc: '七牛云企业直播解决方案，覆盖营销、带货、企业培训、活动直播等场景。无需开发即可使用，帮助企业快速集成和接入直播服务，支持与企业自有的会员系统、商城系统进行对接。丰富的互营销互动及数据分析能力，帮助企业实现内容生产、直播数据与流量三方面的闭环。',
    portalUrl: '/',
    learnMoreUrl: '/'
  }
]

export default function VideoMarketing() {
  return (
    <Section name="videoMarketing" title="视频营销" withTailPadding>
      <MemoizedCardList cardListInfo={cardListInfo} />
    </Section>
  )
}
