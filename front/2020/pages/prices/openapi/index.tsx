import React from 'react'
import Layout from 'components/Price/Layout'
import Banner from 'components/Price/Banner'
import PricePane from 'components/Price/openapi/Price'

function Page() {
  return (
    <>
      <Banner product="价格 | Open Api">
        <PricePane />
      </Banner>
    </>
  )
}

export default function Main() {
  return (
    <Layout
      title="价格 | Open Api"
      keywords="Open Api, openapi, open api, 价格"
      description=""
    >
      <Page />
    </Layout>
  )
}
