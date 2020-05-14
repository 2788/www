import React from 'react'
import Layout from 'components/Price/Layout'
import Banner from 'components/Price/Banner'
import PricePane from 'components/Price/cdn/price'

function Page() {
  return (
    <>
      <Banner>
        <PricePane />
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
