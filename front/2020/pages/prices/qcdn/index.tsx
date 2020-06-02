import React from 'react'
import Layout from 'components/Price/Layout'
import Banner from 'components/Price/Banner'
import PricePane from 'components/Price/qcdn/Price'
import CalcPane from 'components/Price/qcdn/Calc'

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
