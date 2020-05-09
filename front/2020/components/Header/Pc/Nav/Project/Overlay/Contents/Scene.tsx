import React from 'react'
import AvIcon from './images/video/av.svg'
import SecurityIcon from './images/video/security.svg'
import MultimediaIcon from './images/video/multimedia.svg'
import SdkVideoIcon from './images/video/sdk-video.svg'
import Item from './Item'

export default function Scene() {
  return (
    <>
      <Item href="/products/vcs" icon={<MultimediaIcon />} title="视频冷存储解决方案" subtitle="高可用、易扩展、低成本、一站式、支持边缘存储" />
      <Item href="TODO" icon={<SecurityIcon />} title="私有云行业解决方案" subtitle="自然场景下对整图和文字进行检测、定位和识别超出两行的情况" />
      <Item href="/products/plsv" icon={<AvIcon />} title="短视频解决方案" subtitle="高可用、易扩展、低成本、一站式、支持边缘存储" />
      <Item href="/products/qavs" icon={<SdkVideoIcon />} title="智能视频云解决方案" subtitle="自然场景下对整图和文字进行检测、定位和识别超出两行的情况" />
    </>
  )
}
