import React from 'react'
import Layout from 'components/Price/Layout'
import Banner from 'components/Price/Banner'
import PricePane from 'components/Price/openapi/Price'

function Page() {
  return (
    <>
      <Banner product="价格 | Open API">
        <PricePane />
      </Banner>
    </>
  )
}

export default function Main() {
  return (
    <Layout
      title="价格 | Open API"
      keywords="Open API, openapi, open api, 价格, 开放平台"
      description=""
    >
      <Page />
    </Layout>
  )
}
