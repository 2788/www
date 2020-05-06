import React from 'react'
import AvIcon from './images/video/av.svg'
import SecurityIcon from './images/video/security.svg'
import MultimediaIcon from './images/video/multimedia.svg'
import PlayerIcon from './images/video/player.svg'
import SdkPushIcon from './images/video/sdk-push.svg'
import SdkVideoIcon from './images/video/sdk-video.svg'
import Item from './Item'

export default function Video() {
  return (
    <>
      <Item href="TODO" icon={<MultimediaIcon />} title="智能多媒体服务" subtitle="高可用、易扩展、低成本、一站式、支持边缘存储" />
      <Item href="TODO" icon={<SecurityIcon />} title="内容安全" subtitle="自然场景下对整图和文字进行检测、定位和识别超出两行的情况" />
      <Item href="TODO" icon={<AvIcon />} title="实时音视频" subtitle="高可用、易扩展、低成本、一站式、支持边缘存储" />
      <Item href="TODO" icon={<SdkVideoIcon />} title="短视频SDK" subtitle="自然场景下对整图和文字进行检测、定位和识别超出两行的情况" />
      <Item href="TODO" icon={<SdkPushIcon />} title="推流SDK" subtitle="高可用、易扩展、低成本、一站式、支持边缘存储" />
      <Item href="TODO" icon={<PlayerIcon />} title="播放器" subtitle="自然场景下对整图和文字进行检测、定位和识别超出两行的情况" />
    </>
  )
}
