import Section from 'components/Product/Section'
import { useMobile } from 'hooks/ua'
import React, { CSSProperties } from 'react'
import ForMobile from './Mobile'
import ForPc from './Pc'
import Pic01 from './images/产品功能01.png'
import Pic02 from './images/产品功能02.png'
import Pic03 from './images/产品功能03.png'
import Pic04 from './images/产品功能04.png'
import Pic05 from './images/产品功能05.png'
import Pic06 from './images/产品功能06.png'
import Pic07 from './images/产品功能07.png'
import Pic08 from './images/产品功能08.png'

export type ItemType = {
  title: string
  desc: string
  url: string | undefined
}

const productFunctions = [
  { url: Pic01, title: '高级美颜', desc: '提供可调节的磨皮、美白、红润、锐化、大眼、瘦脸等功能，轻松打造逼真美颜效果。' },
  { url: Pic02, title: '滤镜', desc: '支持多款精美滤镜，充分满足不同场景需求，丰富用户体验。' },
  { url: Pic03, title: '贴纸', desc: '提供海量 2D 静态贴纸和 3D 动态贴纸，贴合人脸稳定跟踪，带来更有趣玩法。' },
  { url: Pic04, title: '微整形', desc: '支持微调整额头、眼睛、鼻子、下巴、嘴唇等五官及面部细节，让你拥有更美五官。' },
  { url: Pic05, title: '美妆', desc: '提供口红、眼影、眉毛、美发等多种美妆能力，风格多样，效果自然细腻。' },
  { url: Pic06, title: '美体', desc: '通过对人体关键点进行实时检测，实现瘦身、瘦头、瘦肩、瘦腰、丰臀、瘦腿、长腿等智能美体效果，打造完美身型。' },
  { url: Pic07, title: '人像分割', desc: '准确识别人体轮廓，精准分割人像与背景，一键轻松替换理想背景。' },
  { url: Pic08, title: '手势识别', desc: '精确定位并跟踪识别出比心，点赞等多种手势，增强互动体验效果。' }
]

export default function BeautyFuctions() {
  const isMobile = useMobile()
  const mobileStyle: CSSProperties = {
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0
  }
  return (
    <Section title="产品功能" name="features" style={isMobile ? mobileStyle : {}}>
      {isMobile ? <ForMobile productFunctions={productFunctions} /> : <ForPc productFunctions={productFunctions} />}
    </Section>
  )
}
