import React from 'react'
import Layout from 'components/Price/Layout'
import Banner from 'components/Price/Banner'
import PricePane from 'components/Price/dora/Price'

function Page() {
  return (
    <>
      <Banner product="价格 | 智能多媒体服务">
        <PricePane />
      </Banner>
    </>
  )
}

export default function Main() {
  return (
    <Layout
      title="价格 | 智能多媒体服务"
      keywords="dora价格, dora费用, dora多少钱, 智能多媒体服务价格, 智能多媒体服务费用, 智能多媒体服务多少钱"
      description=""
    >
      <Page />
    </Layout>
  )
}
