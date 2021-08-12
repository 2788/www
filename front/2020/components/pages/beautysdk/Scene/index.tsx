import Section from 'components/Product/Section'
import { useMobile } from 'hooks/ua'
import React, { CSSProperties } from 'react'
import ForPc from './Pc'
import ForMobile from './Mobile'
import image1 from './images/适用场景01.png'
import image2 from './images/适用场景02.png'
import image3 from './images/适用场景03.png'
import image4 from './images/适用场景04.png'

export type ItemType = {
  url: string
  title: string
  desc: string
}

const scenes = [
  {
    url: image1,
    title: '图片相册',
    desc: '提供多种美颜、滤镜、贴纸、人像分割等特效，满足各类图片编辑、美化、修图等场景，带来自然的图片处理效果和用户体验。'
  },
  {
    url: image2,
    title: '短视频',
    desc: '在拍摄或编辑短视频、Vlog 时，应用短视频特效，轻松实现视频美化、人脸美颜等功能，使视频更美观。并可添加多种特效，让视频更有趣，记录美好瞬间。'
  },
  {
    url: image3,
    title: '视频直播',
    desc: '在电商直播、游戏直播、秀场直播、教育直播、户外直播、活动直播等直播场景中，直播美颜特效提供多种滤镜、2D/3D 人脸贴纸、人像分割、美妆美体等功能，满足不同场景需求，有效提升直播效果。'
  },
  {
    url: image4,
    title: '互动聊天',
    desc: '在实时音视频通话、互动娱乐等场景中，实时音视频特效提供丰富多元化的动态贴纸、手势识别、美妆美型等特效功能，增强互动氛围，随时随地均可无忧互动。'
  }
]

export default function Sences() {
  const isMobile = useMobile()
  const mobileStyle: CSSProperties = {
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0
  }
  return (
    <Section title="适用场景" name="scenes" style={isMobile ? mobileStyle : {}}>
      {isMobile ? <ForMobile scenes={scenes} /> : <ForPc scenes={scenes} />}
    </Section>
  )
}
