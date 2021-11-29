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
  title: '返佣比例',
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
  key: 'cps-reward-bronze',
  level: '青铜',
  rebate: '25%',
  limit: '5 万'
}, {
  key: 'cps-reward-silver',
  level: '白银',
  rebate: '30%',
  limit: '8 万'
}, {
  key: 'cps-reward-gold',
  level: '黄金',
  rebate: '35%',
  limit: '10 万'
}]

const linkView = (
  <Link
    href="https://developer.qiniu.com/mkt/manual/7261/cps-promotion-rules"
    blue
  >
    推广规则解释 &gt;
  </Link>
)
const footerView = (
  <div className={style.footer}>
    客户通过专属推广链接注册 / 登录与新推官建立关联，关联期间所产生的有效订单均可获得现金奖励。了解 {linkView}
  </div>
)

export default function Reward() {
  const isMobile = useMobile()
  // pc 端使用中文括号，移动端使用英文括号
  if (isMobile) {
    columns[2].title = <>每月佣金上限(元)<span className={style.subTitle}>(单笔订单佣金上限 5 千)</span></>
  }
  return (
    <Section
      name="reward"
      title="推广奖励"
      subtitle="推荐客户下单最高可获 35% 返现奖励"
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
