import React from 'react'
import InsightIcon from './images/intelligence/insight.svg'
import ExpressIcon from './images/intelligence/express.svg'
import Item from './Item'

export default function Intelligence() {
  return (
    <>
      <Item href="/products/insight" icon={<InsightIcon />} title="智能日志管理平台" subtitle="海量异构数据采集，秒级实时日志检索，高效智能业务洞察" />
      <Item href="/products/express" icon={<ExpressIcon />} title="Pandora 机器数据分析平台" subtitle="助力企业探索数据、创造价值、预见未来" />
    </>
  )
}
