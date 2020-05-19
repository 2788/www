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
    <Layout>
      <Page />
    </Layout>
  )
}
