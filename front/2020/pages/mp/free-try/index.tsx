/**
 * @file 小程序免费体验
 */

import React from 'react'
import Layout from 'components/mp/Layout'
import Banner from 'components/mp/Banner'
import FreeProducts from 'components/pages/events/free/Products'

import banner from './banner.png'

export default function FreePage() {
  return (
    <Layout title="免费云服务套餐">
      <Banner banner={banner} />
      <FreeProducts />
    </Layout>
  )
}
