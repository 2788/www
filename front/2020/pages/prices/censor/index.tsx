import React from 'react'
import Layout from 'components/Price/Layout'
import Banner from 'components/Price/Banner'
import PricePane from 'components/Price/censor/Price'

function Page() {
  return (
    <>
      <Banner product="价格 | 内容审核">
        <PricePane />
      </Banner>
    </>
  )
}

export default function Main() {
  return (
    <Layout title="价格 | 内容审核">
      <Page />
    </Layout>
  )
}
