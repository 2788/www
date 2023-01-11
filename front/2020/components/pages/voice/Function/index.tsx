import React from 'react'
import { useMobile } from 'hooks/ua'
import Feature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc,
  Icon as FeatureIcon
} from 'components/Product/Feature'
import CardFeatureItem, { LinkItem } from 'components/Product/Feature/CardFeatureItem'
import Link from 'components/Link'
import { urlMap, Product } from 'constants/products'

import icon1 from './images/icon1.png'
import icon2 from './images/icon2.png'
import icon3 from './images/icon3.png'
import style from './style.less'

type FuncItem = {
  icon: JSX.Element
  title: string
  desc: string
  links: Array<{isPcOnly?: true} & LinkItem>
}

const funcs: FuncItem[] = [
  {
    icon: <FeatureIcon src={icon1} />,
    title: '语音识别',
    desc: '语音识别包括实时录音文件识别、一句话识别、实时语音识别三类服务。录音文件支持对提交的录音文件进行转写，输出文字。一句话语音识别通常应用于小于 60s 的指令，短消息类的语音场景，针对请求的语音返回文本，可应用于机器人问答、智能家电助手等场景。实时语音识别有“边说边出文本”的效果，应用于对实时性有要求的场景，如语音机器人、智能会议、智能硬件、直播字幕等。',
    links: [
      {
        text: '免费体验',
        type: 'hollow',
        url: 'http://fir.qnsdk.com/5a94'
      }
    ]
  },
  {
    icon: <FeatureIcon src={icon2} />,
    title: '语音合成',
    desc: '语音合成可将文本转化成拟人化语音的一类功能，采用先进的深度神经网络模型技术，合成效果自然流畅，合成度快，部署成本低，并提供多语种、多音色可供选择，满足不同业务场景需求，可广泛应用于新闻播报、小说、客服、智能硬件等场景。',
    links: [
      {
        text: '查看详情',
        type: 'primary',
        url: urlMap[Product.Tts]
      },
      {
        text: '立即体验',
        type: 'hollow',
        url: `${urlMap[Product.Tts]}#demo`,
        isPcOnly: true
      },
      {
        text: '接口文档',
        type: 'hollow',
        url: 'https://developer.qiniu.com/dora/8091/speech-synthesis'
      }
    ]
  },
  {
    icon: <FeatureIcon src={icon3} />,
    title: '声纹识别',
    desc: '声纹识别基于 CNN、Attention 等先进网络结构，在文本无关条件下实现声纹特征的高效抽取，辨别说话人的身份信息，可应用于身份验证、智能设备等场景。',
    links: []
  }
]

function ItemsView() {
  const isMobile = useMobile()
  // 移动端的显示样式
  if (isMobile) {
    return (
      <>
        {
          funcs.map((item, index) => (
            <FeatureItem key={index} title={item.title} icon={item.icon}>
              <FeatureDesc>{item.desc}</FeatureDesc>
              {
                // 对于 links 中没有 isPcOnly 属性限制的链接才会在移动端显示
                item.links.map(linkItem => (
                  !linkItem.isPcOnly && (
                    <Link className={style.link} href={linkItem.url} blue>{linkItem.text} &gt;&gt;</Link>
                  )
                ))
              }
            </FeatureItem>
          ))
        }
      </>
    )
  }

  // pc 端的现实样式
  return (
    <>
      {
        funcs.map((item, index) => (
          <CardFeatureItem
            className={style.card}
            key={index}
            title={item.title}
            icon={item.icon}
            desc={item.desc}
            links={item.links}
          />
        ))
      }
    </>
  )
}

export default function Function() {

  return (
    <Feature title="产品功能" name="function">
      <FeatureGroup>
        <ItemsView />
      </FeatureGroup>
    </Feature>
  )
}

