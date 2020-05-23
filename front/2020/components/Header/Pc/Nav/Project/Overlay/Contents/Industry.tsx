import React from 'react'
import EssIcon from './images/industry/ess.svg'
import Item from './Item'

export default function Industry() {
  return (
    <>
      <Item href="/solutions/ess" icon={<EssIcon />} title="监控视频边缘存储解决方案" subtitle="满足监控视频及图片就近存储、加速传输、倍速播放等关键需求" />
    </>
  )
}
