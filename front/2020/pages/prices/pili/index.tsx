import React from 'react'
import Layout from 'components/Price/Layout'
import Banner from 'components/Price/Banner'
import PricePane from 'components/Price/pili/Price'

function Page() {
  return (
    <>
      <Banner product="价格 | 直播云">
        <PricePane />
      </Banner>
    </>
  )
}

export default function Main() {
  return (
    <Layout
      title="价格 | 直播云"
      keywords="pili价格, pili费用, pili多少钱, 直播价格, 直播费用, 直播多少钱"
      description=""
    >
      <Page />
    </Layout>
  )
}
