import React from 'react'
import PricePane, { PricePaneSection } from 'components/Price/Banner/PricePane'
import Table, { ColumnProps } from 'react-icecream/lib/table'

import style from './index.less'

const columns: Array<ColumnProps<any>> = [
  {
    title: '计费方式',
    dataIndex: 'name'
  },
  {
    title: '计费规则',
    dataIndex: 'rule'
  },
  {
    title: '价格',
    dataIndex: 'price'
  }
]

const data = [
  {
    key: 0,
    name: '预付费（资源包）',
    rule: '预先购买资源包，根据实际短信发送量扣除额度',
    price: '0.043 元 / 条，套餐包可用于中国大陆地区的验证码、短信通知和推广短信'
  }
]

export default function Price() {
  return (
    <PricePane>
      <PricePaneSection title="计费方式" className={style.mode} padding>
        <p>云短信服务的计费方式只支持预付费（资源包），自 2019 年 12 月 10 日起，完成实名认证后，还可享受共 300 条的免费测试短信（1 年有效期）。</p>
        <strong>免费短信套餐包 300 条 = 验证码 100 条 + 通知 100 条 + 推广 100 条</strong>

        <p className={style.alert}>* 请您在免费额度使用完后，及时购买短信资源包，以免您的短信服务受到限制。</p>
      </PricePaneSection>
      <PricePaneSection title="价格详情" padding>
        <Table bordered scroll={{ x: 'max-content' }} columns={columns} dataSource={data} pagination={false} />
      </PricePaneSection>
    </PricePane>
  )
}
