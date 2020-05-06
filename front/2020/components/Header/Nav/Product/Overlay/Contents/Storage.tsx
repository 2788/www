import React from 'react'
import ObjectIcon from './images/storage/object.svg'
import ArchiveIcon from './images/storage/archive.svg'
import Item from './Item'

export default function Storage() {
  return (
    <>
      <Item href="TODO" icon={<ObjectIcon />} hot title="对象存储" subtitle="高可用、易扩展、低成本、一站式、支持边缘存储" />
      <Item href="TODO" icon={<ArchiveIcon />} title="归档存储" subtitle="自然场景下对整图和文字进行检测、定位和识别超出两行的情况" />
      {/* TODO 更换图标 */}
      <Item href="TODO" disabled icon={<ArchiveIcon />} title="HDFS" subtitle="敬请期待" />
    </>
  )
}
