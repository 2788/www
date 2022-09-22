import React from 'react'
import Feature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc,
  Icon as FeatureItemIcon
} from 'components/Product/Feature'

import icon1 from './images/icon1.png'
import icon2 from './images/icon2.png'
import icon3 from './images/icon3.png'
import icon4 from './images/icon4.png'

const advantages = [
  { icon: <FeatureItemIcon src={icon1} alt="海量营销工具" />, title: '海量营销工具', desc: '提供互动抽奖、红包、邀请有奖、礼物打赏、签到点赞、机器人暖场等海量营销工具' },
  { icon: <FeatureItemIcon src={icon2} alt="直播效果分析" />, title: '直播效果分析', desc: '全面统计直播访问人次、人数、并发人数、分享效果、互动数据；精准分析商品热度、用户地区、观看时间、直播消耗用量，生成用户画像和行为分析' },
  { icon: <FeatureItemIcon src={icon3} alt="多平台一键转推" />, title: '多平台一件转推', desc: '支持网页 H5、公众号、APP、微信小程序、PC多端观看，也可一键转推视频号、B站、微博、快手、小红书等多平台' },
  { icon: <FeatureItemIcon src={icon4} alt="多种接入及交付方式" />, title: '多种接入及交付方式', desc: '支持H5、SDK、API等多种接入方式，提供公有云、混合部署、私有化部署交付' }
]

export default function Advantage() {
  return (
    <Feature title="方案优势" name="advantage">
      <FeatureGroup>
        {
          advantages.map((item, i) => (
            <FeatureItem pos="top-down" align="justify" icon={item.icon} title={item.title} key={i}>
              <FeatureDesc>{item.desc}</FeatureDesc>
            </FeatureItem>
          ))
        }
      </FeatureGroup>
    </Feature>
  )
}
