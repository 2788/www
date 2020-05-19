import React from 'react'
import Layout from 'components/Price/Layout'
import Banner from 'components/Price/Banner'
import PricePane from 'components/Price/kodo/Price'

function Page() {
  return (
    <>
      <Banner product="价格 | 对象存储">
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
