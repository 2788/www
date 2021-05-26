import React from 'react'
import Layout from 'components/Price/Layout'
import Banner from 'components/Price/Banner'
import PricePane from 'components/Price/openapi/Price'

function Page() {
  return (
    <>
      <Banner product="价格 | AI 开放市场">
        <PricePane />
      </Banner>
    </>
  )
}

export default function Main() {
  return (
    <Layout
      title="价格 | AI 开放市场"
      keywords="AI 开放市场, AI, 开放市场, Open API, openapi, open api, 价格, 开放平台"
      description=""
    >
      <Page />
    </Layout>
  )
}
