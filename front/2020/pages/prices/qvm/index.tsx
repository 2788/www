import React from 'react'
import Layout from 'components/Price/Layout'
import Banner from 'components/Price/Banner'
import PricePane from 'components/Price/qvm/Price'
import CalcPane from 'components/Price/qvm/Calc'

function Page() {
  return (
    <>
      <Banner product="价格 | 云主机">
        <PricePane />
        <CalcPane />
      </Banner>
    </>
  )
}

export default function Main() {
  return (
    <Layout title="价格 | 云主机">
      <Page />
    </Layout>
  )
}
