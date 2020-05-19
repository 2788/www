import React from 'react'
import PricePane, { PricePaneSection } from 'components/Price/Banner/PricePane'
import Tabs, { TabPane } from 'components/UI/Tabs'

import TrustAsia from './TrustAsia'
import Geotrust from './Geotrust'
import DigiCert from './DigiCert'

import style from './index.less'

export default function Price() {
  return (
    <PricePane>
      <PricePaneSection title="价格详情" className={style.desc}>
        <Tabs defaultValue="1">
          <TabPane value="1" tab="TrustAsia 证书"><TrustAsia /></TabPane>
          <TabPane value="2" tab="Geotrust 证书"><Geotrust /></TabPane>
          <TabPane value="3" tab="DigiCert 证书"><DigiCert /></TabPane>
        </Tabs>
      </PricePaneSection>
    </PricePane>
  )
}
