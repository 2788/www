/**
 * @file 云主机产品规格
 */

import React from 'react'
import Tabs, { TabPane } from 'components/UI/Tabs'
import { Row } from 'components/UI/Card'
import PrimaryCard from './PrimaryCard'

enum Type {
  Primary = 'primary', // 入门版
  Enterprise = 'enterprise' // 企业版
}

// TODO: 这些实例信息需要再跟 PM 对一遍

export default function QvmSpecs() {
  return (
    <Tabs defaultValue={Type.Primary}>
      <TabPane value={Type.Primary} tab="入门版">
        <Row>
          <PrimaryCard
            name="突发性能实例 T5"
            features={[
              '低负载应用 | 微服务',
              '10% 基线性能'
            ]}
            instance="1 核 1G"
            storage="40 GB"
            bandwidth="1 M"
            price={170.3}
            href="/TODO"
          />
          <PrimaryCard
            name="突发性能实例 T6"
            features={[
              '低负载应用 | 微服务',
              '10% 基线性能'
            ]}
            instance="1 核 1G"
            storage="40 GB"
            bandwidth="1 M"
            price={170.3}
            href="/TODO"
          />
          <PrimaryCard
            name="轻量应用型主机"
            features={[
              '低负载应用 | 微服务',
              '10% 基线性能'
            ]}
            instance="1 核 1G"
            storage="40 GB"
            bandwidth="1 M"
            price={235.1}
            href="/TODO"
          />
          <PrimaryCard
            name="GPU P100 主机"
            features={[
              '低负载应用 | 微服务',
              '10% 基线性能'
            ]}
            instance="1 核 1G"
            storage="40 GB"
            bandwidth="1 M"
            price={170.3}
            href="/TODO"
          />
        </Row>
      </TabPane>
      <TabPane value={Type.Enterprise} tab="企业版">
        TODO
      </TabPane>
    </Tabs>
  )
}
