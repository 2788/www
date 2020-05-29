import React from 'react'
import Layout from 'components/Price/Layout'
import Banner from 'components/Price/Banner'
import PricePane from 'components/Price/cdn/Price'
import CalcPane from 'components/Price/cdn/Calc'

function Page() {
  return (
    <>
      <Banner product="价格 | CDN">
        <PricePane />
        <CalcPane />
      </Banner>
    </>
  )
}

export default function Main() {
  return (
    <Layout title="价格 | CDN">
      <Page />
    </Layout>
  )
}
