import React from 'react'
import Layout from 'components/Price/Layout'
import Banner from 'components/Price/Banner'
import PricePane from 'components/Price/kodo/Price'
import CalcPane from 'components/Price/kodo/Calc'

function Page() {
  return (
    <>
      <Banner product="价格 | 对象存储">
        <PricePane />
        <CalcPane />
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
