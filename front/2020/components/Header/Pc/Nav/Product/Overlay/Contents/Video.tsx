import React from 'react'
import AvIcon from './images/video/av.svg'
import SecurityIcon from './images/video/security.svg'
import MultimediaIcon from './images/video/multimedia.svg'
import SdkPushIcon from './images/video/sdk-push.svg'
import SdkVideoIcon from './images/video/sdk-video.svg'
import FaceidIcon from './images/video/faceid.svg'
import Item from './Item'

export default function Video() {
  return (
    <>
      <Item href="/products/dora" icon={<MultimediaIcon />} title="智能多媒体服务" subtitle="提供云端图片、音视频基础处理、丰富的人工智能服务" />
      <Item href="/products/censor" icon={<SecurityIcon />} title="内容安全" subtitle="七牛云人工智能实验室提供的一站式内容审核服务" />
      <Item href="/products/rtn" icon={<AvIcon />} title="实时音视频" subtitle="基于 WebRTC 的一站式解决方案，零基础搭建音视频平台" />
      <Item href="/products/plsv" icon={<SdkVideoIcon />} title="短视频 SDK" subtitle="自然场景下对整图和文字进行检测、定位和识别" />
      <Item href="/products/plms" icon={<SdkPushIcon />} title="推流 SDK" subtitle="基于 WebRTC 的一站式解决方案，零基础搭建音视频平台" />
      <Item href="/products/faceid" icon={<FaceidIcon />} title="人脸核验" subtitle="利用活体检测、1:1 人脸比对、身份证 OCR 等 AI 技术，对用户身份进行审核验证" />
    </>
  )
}
