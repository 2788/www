import React from 'react'
import Banner, { Title, Desc } from 'components/Banner'
import Collaborate from 'components/pages/contact/Collaborate'
import Layout from 'components/Product/Layout'
import Distribution from 'components/pages/contact/Distribution'

import imgBanner from './_images/banner.png'

export default function Contact() {
  return (
    <Layout
      title="联系我们"
      keywords="联系, 联系七牛"
      description=""
    >
      <Banner background={imgBanner} backgroundSize="contain" backgroundPosition="right bottom">
        <Title>联系我们</Title>
        <Desc>客户第一，您的满意是我们追求的目标</Desc>
      </Banner>

      <Collaborate />
      <Distribution />
    </Layout>
  )
}
