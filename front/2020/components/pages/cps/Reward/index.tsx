import React from 'react'

import { useMobile } from 'hooks/ua'

import Section from 'components/Product/Section'
import Link from 'components/Link'

import Table, { ColumnProps } from 'react-icecream/lib/table'

import style from './style.less'

const columns: Array<ColumnProps<any>> = [{
  title: '推广等级',
  width: 60,
  dataIndex: 'level',
  align: 'center'
}, {
  title: '首单返佣比例',
  width: 80,
  dataIndex: 'rebate',
  align: 'center'
}, {
  title: <>每月佣金上限（元）<span className={style.subTitle}>（单笔订单佣金上限 5 千）</span></>,
  width: 120,
  dataIndex: 'limit',
  align: 'center'
}]

const data = [{
  key: 1,
  level: '钻石',
  rebate: '30%',
  limit: '10 万'
}, {
  key: 2,
  level: '铂金',
  rebate: '26%',
  limit: '8 万'
}, {
  key: 3,
  level: '黄金',
  rebate: '24%',
  limit: '5 万'
}, {
  key: 4,
  level: '白银',
  rebate: '22%',
  limit: '5 万'
}, {
  key: 5,
  level: '青铜',
  rebate: '20%',
  limit: '5 万'
}]

const linkView = (
  <Link
    href="https://developer.qiniu.com/mkt/manual/7261/cps-promotion-rules"
    blue
  >
    CPS 推广解释
  </Link>
)
const footerView = (
  <div className={style.footer}>
    注意：返佣奖励将根据推广等级分期结算给推广者，关于更多规则请查看 {linkView}
  </div>
)

export default function Reward() {
  const isMobile = useMobile()
  // pc端使用中文括号，移动端使用英文括号
  if (isMobile) {
    columns[2].title = <>每月佣金上限(元)<span className={style.subTitle}>(单笔订单佣金上限 5 千)</span></>
  }
  return (
    <Section
      name="reward"
      title="推广奖励"
    >
      <Table
        bordered
        className={style.table}
        columns={columns}
        dataSource={data}
        pagination={false}
        footer={() => footerView}
      />
    </Section>
  )
}
