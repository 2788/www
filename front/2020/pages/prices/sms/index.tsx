import React from 'react'
import Layout from 'components/Price/Layout'
import Banner from 'components/Price/Banner'
import PricePane from 'components/Price/sms/Price'

function Page() {
  return (
    <>
      <Banner product="价格 | 云短信">
        <PricePane />
      </Banner>
    </>
  )
}

export default function Main() {
  return (
    <Layout
      title="价格 | 云短信"
      keywords="云短信服务价格, 云短信服务费用, 云短信服务多少钱"
      description=""
    >
      <Page />
    </Layout>
  )
}
