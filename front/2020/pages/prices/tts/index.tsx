import React from 'react'
import Layout from 'components/Price/Layout'
import Banner from 'components/Price/Banner'
import PricePane, { PricePaneSection } from 'components/Price/Banner/PricePane'
import Table, { ColumnProps } from 'react-icecream/lib/table'

const columns: Array<ColumnProps<any>> = [
  {
    title: 'API',
    dataIndex: 'api'
  },
  {
    title: '单价',
    dataIndex: 'price'
  }
]
const data = [
  {
    key: 0,
    api: '语音合成',
    price: '1.7 元/万字'
  }
]

function Page() {
  return (
    <>
      <Banner product="价格 | 语音合成">
        <PricePane>
          <PricePaneSection title="计费模式" padding>
            <Table bordered columns={columns} dataSource={data} pagination={false} size="middle" />
          </PricePaneSection>
        </PricePane>
      </Banner>
    </>
  )
}

export default function Main() {
  return (
    <Layout
      title="价格 | 语音合成"
      keywords="语音合成, 语音合成价格, 语音合成费用, 语音合成多少钱, tts"
      description=""
    >
      <Page />
    </Layout>
  )
}
