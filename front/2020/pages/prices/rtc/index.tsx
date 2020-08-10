import React from 'react'
import Layout from 'components/Price/Layout'
import Banner from 'components/Price/Banner'
import PricePane from 'components/Price/rtc/Price'
import { Product, nameMap } from 'constants/products'

const title = `价格 | ${nameMap[Product.Rtn]}`

function Page() {
  return (
    <>
      <Banner product={title}>
        <PricePane />
      </Banner>
    </>
  )
}

export default function Main() {
  return (
    <Layout
      title={title}
      keywords="RTC价格, RTC费用, RTC多少钱, 实时音视频费用, 实时音视频多少钱"
      description=""
    >
      <Page />
    </Layout>
  )
}
