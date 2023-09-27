import React from 'react'

import { CardList, CardItemProps } from 'components/Card'

import No1 from './imgs/no1.png'
import No2 from './imgs/no2.png'
import No3 from './imgs/no3.png'
import bg1url from './imgs/bg1.png'
import bg2url from './imgs/bg2.png'
import bg3url from './imgs/bg3.png'

const processMotivationList: CardItemProps[] = [
  {
    serial: No1,
    title: '小喇叭奖',
    bgUrl: bg1url,
    description: '在社交媒体、技术社区等渠道进行活动传播，即可获得活动精美周边',
    detail: [
      '#### 活动规则',
      '在以下渠道分享活动信息，分享次数达5次以上，可获得以下七牛周边1个：帆布袋/西桥T',
      '* 朋友圈、牛客网、微博、QQ群或微信群（技术相关≥100人）',
      '* V2EX、CSDN、GitHub、知乎、简书、Golang中国社区、GoCN社区等技术社区或论坛',
      '#### 如何兑奖',
      '完成分享后保留页面截图，联系活动小助手，确认后填写收件信息。',
      '#### 活动时间',
      '报名截止前'
    ].join('\n')
  },
  {
    serial: No2,
    title: '最佳推荐官',
    bgUrl: bg2url,
    description: '分享活动，邀请好友参赛，带来有效报名即可获得奖品。',
    detail: [
      '#### 活动规则',
      '联系小助手获取专属推荐码，分享并邀请好友参赛，若你为本次大赛带来的有效报名（除自己组队的队伍成员外），将有机会获得以下“带盐”奖品；',
      '有效报名，指提交报名信息后实际参赛，进行编程创作，提交了比较完整的作品。',
      '#### 如何兑奖',
      '大赛结束组委会统计完成后统一发放奖品。',
      '#### 活动时间',
      '有效报名指提交报名信息后实际参赛，进行编程创作，提交比较完整的作品（超过 50% 的功能实现）。',
      '| 带来有效报名 | 奖品                | 数量（先到先得） |',
      '| ------------ | --------------------- | ---------------- |',
      '| 1 人         | 联想小新无线蓝牙鼠标          | 200              |',
      '| 4 人         | 三星固态移动硬盘1T | 25               |',
      '| 7 人         | AirPods Pro二代 | 7               |',
      '| 10 人        | PlayStation 5    | 5                |',
      '| 25 人        | iPhone15 256G      | 1                |'
    ].join('\n')
  },
  {
    serial: No3,
    title: '幸运观众奖',
    bgUrl: bg3url,
    description: '观看 11月12日 路演直播，参与直播间人气奖投票，即可参与礼品抽奖（迪士尼或环球影城双人门票）',
    detail: '观看 11月12日 路演直播，参与直播间人气奖投票，即可参与礼品抽奖（迪士尼或环球影城双人门票）'
  }
]

export default function ProcessMotivation() {
  return <CardList list={processMotivationList} motivation />
}
