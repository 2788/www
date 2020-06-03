import React from 'react'
import Layout from 'components/Price/Layout'
import Banner from 'components/Price/Banner'
import PricePane from 'components/Price/ssl/Price'

function Page() {
  return (
    <>
      <Banner product="价格 | SSL 证书">
        <PricePane />
      </Banner>
    </>
  )
}

export default function Main() {
  return (
    <Layout
      title="价格 | SSL 证书"
      keywords="ssl证书价格, ssl证书费用, ssl证书多少钱"
      description=""
    >
      <Page />
    </Layout>
  )
}
