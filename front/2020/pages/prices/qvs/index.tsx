import React from 'react'
import Layout from 'components/Price/Layout'
import Banner from 'components/Price/Banner'
import PricePane from 'components/Price/qvs/Price'

function Page() {
  return (
    <>
      <Banner product="价格 | 视频监控">
        <PricePane />
      </Banner>
    </>
  )
}

export default function Main() {
  return (
    <Layout
      title="价格 | 视频监控"
      keywords="qvs价格, qvs费用, qvs多少钱, qvs价格计算, 视频监控价格, 视频监控费用, 视频监控多少钱, 视频监控价格计算"
      description=""
    >
      <Page />
    </Layout>
  )
}
