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
    <Layout
      title="价格 | 对象存储"
      keywords="云存储价格, kodo价格, 对象存储价格, 存储费用, 存储多少钱, kodo价格计算, 存储价格计算"
      description=""
    >
      <Page />
    </Layout>
  )
}
