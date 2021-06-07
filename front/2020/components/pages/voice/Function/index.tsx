import React from 'react'
import { useMobile } from 'hooks/ua'
import Feature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc,
  Link as FeatureLink
} from 'components/Product/Feature'
import Link from 'components/Link'

import Icon1 from './images/icon1.svg'
import Icon2 from './images/icon2.svg'
import Icon3 from './images/icon3.svg'

import style from './style.less'

const funcs = [
  { icon: <Icon1 />, title: '语音识别', demoUrl: 'http://fir.qnsdk.com/5s2n', desc: '语音识别包括实时录音文件识别、一句话识别、实时语音识别三类服务。录音文件支持支持对提交的录音文件进行转写，输出文字。一句话语音识别通常应用于小于 60s 的指令，短消息类的语音场景，针对请求的语音返回文本，可应用于机器人问答、智能家电助手等场景。实时语音识别有“边说边出文本”的效果，应用于对实时性有要求的场景，如语音机器人、智能会议、智能硬件、直播字幕等。' },
  { icon: <Icon2 />, title: '语音合成', desc: '语音合成可将文本转化成拟人化语音的一类功能，采用先进的深度神经网络模型技术，合成效果自然流畅，合成度快，部署成本低，并提供多语种、多音色可供选择，满足不同业务场景需求，可广泛应用于新闻播报、小说、客服、智能硬件等场景。' },
  { icon: <Icon3 />, title: '声纹识别', desc: '声纹识别基于 CNN、Attention 等先进网络结构，在文本无关条件下实现声纹特征的高效抽取，辨别说话人的身份信息，可应用于身份验证、智能设备等场景。' }
]

export default function Function() {
  return (
    <Feature title="产品功能" name="function">
      <FeatureGroup>
        {
          funcs.map((item, i) => (
            <FeatureItem pos="top-down" align="left" icon={item.icon} title={item.title} key={i}>
              <FeatureDesc>{item.desc}</FeatureDesc>
              { item.demoUrl ? <MyFeatureLink url={item.demoUrl} /> : null}
            </FeatureItem>
          ))
        }
      </FeatureGroup>
    </Feature>
  )
}

// TODO，目前因为该产品功能只有一个有底部的链接，所以为了布局考虑，移动端在这边定制了，后续如果都加上底部链接，可以直接使用 FeatureLink 即可
function MyFeatureLink({ url }: { url: string }) {
  const isMobile = useMobile()
  return (
    isMobile
      ? <Link className={style.link} href={url} blue>免费体验 &gt;&gt;</Link>
      : <FeatureLink href={url}>免费体验 &gt;&gt;</FeatureLink>
  )
}
