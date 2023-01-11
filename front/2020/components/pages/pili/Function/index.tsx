import React from 'react'
import Feature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc,
  Icon as FeatureIcon
} from 'components/Product/Feature'

import icon1 from './images/icon1.png'
import icon2 from './images/icon2.png'
import icon3 from './images/icon3.png'
import icon4 from './images/icon4.png'
import icon5 from './images/icon5.png'
import icon6 from './images/icon6.png'

const funcs = [
  [
    { icon: <FeatureIcon src={icon1} />, title: '直播推流 SDK', desc: '提供音视频采集、处理、编码及推流能力，支持 RTMP、SRT、QUIC 等推流协议，支持多种终端和各类客户场景' },
    { icon: <FeatureIcon src={icon2} />, title: '直播转码', desc: '基于推流内容，指定码率和分辨率进行多路输出，满足各类播放需求' }
  ],
  [
    { icon: <FeatureIcon src={icon3} />, title: '直播时移', desc: '直播过程中，回放之前任意时刻直播内容，满足电商、教育、体育等场景下对直播历史内容的播放需求' },
    { icon: <FeatureIcon src={icon4} />, title: '数据统计', desc: '提供直播空间、流管理等业务数据，实时提供服务运营分析，为精致服务保驾护航' }
  ],
  [
    { icon: <FeatureIcon src={icon5} />, title: '转推服务', desc: '提供一路流转推多路流的专属解决方案，满足主播经纪公司、多平台内容转播等核心诉求' },
    { icon: <FeatureIcon src={icon6} />, title: '鉴权鉴黄', desc: '保护用户资源的同时，基于直播空间以及单流提供鉴黄审核能力' }
  ]
]

export default function Function() {
  return (
    <Feature title="产品功能" name="function">
      {
        funcs.map((func, index) => (
          <FeatureGroup key={index}>
            {
              func.map((item, i) => (
                <FeatureItem pos="left-right" icon={item.icon} title={item.title} key={`${index}-${i}`}>
                  <FeatureDesc>{item.desc}</FeatureDesc>
                </FeatureItem>
              ))
            }
          </FeatureGroup>
        ))
      }
    </Feature>
  )
}
