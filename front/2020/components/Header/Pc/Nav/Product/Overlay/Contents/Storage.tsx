import React from 'react'
import ObjectIcon from './images/storage/object.svg'
import ArchiveIcon from './images/storage/archive.svg'
import HDFSIcon from './images/storage/hdfs.svg'
import Item from './Item'

export default function Storage() {
  return (
    <>
      <Item href="/products/kodo" icon={<ObjectIcon />} hot title="对象存储" subtitle="高可用、易扩展、低成本、一站式、支持边缘存储" />
      <Item href="/products/kodo" icon={<ArchiveIcon />} title="归档存储" subtitle="可定制化的数百 EB 级别、高可靠、强安全的存储系统" />
      <Item href="#" disabled icon={<HDFSIcon />} title="HDFS" subtitle="正在建设，敬请期待" />
    </>
  )
}
