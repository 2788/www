import React from 'react'
import Layout from 'components/Price/Layout'
import Banner from 'components/Price/Banner'
import PricePane from 'components/Price/faceid/Price'

function Page() {
  return (
    <>
      <Banner product="价格 | 人脸核验">
        <PricePane />
      </Banner>
    </>
  )
}

export default function Main() {
  return (
    <Layout
      title="价格 | 人脸核验"
      keywords="人脸核验价格, 人脸核验费用, 人脸核验多少钱"
      description=""
    >
      <Page />
    </Layout>
  )
}
