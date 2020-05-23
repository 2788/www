import React from 'react'
import VcsIcon from './images/scene/vcs.svg'
import KodoeIcon from './images/scene/kodoe.svg'
import PlsvIcon from './images/scene/plsv.svg'
import QavsIcon from './images/scene/qavs.svg'
import Item from './Item'

export default function Scene() {
  return (
    <>
      <Item href="/solutions/vcs" icon={<VcsIcon />} title="视频冷存储解决方案" subtitle="专为综合视频平台打造，高可用低成本的 EB 级数据存储解决方案" />
      <Item href="/solutions/kodoe" icon={<KodoeIcon />} title="私有云行业解决方案" subtitle="为传统媒体、安防、金融等行业用户提供一站式专属解决方案，帮助企业快速实现云转型" />
      <Item href="/solutions/plsv" icon={<PlsvIcon />} title="短视频解决方案" subtitle="集成完整云端能力及卓越采集端、播放端功能的一站式短视频解决方案" />
      <Item href="/solutions/qavs" icon={<QavsIcon />} title="智能视频云解决方案" subtitle="集视觉智能及数据智能为一体、高效、低成本的一站式视频解决方案" />
    </>
  )
}
