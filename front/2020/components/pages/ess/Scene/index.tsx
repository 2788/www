/**
 * @file 监控视频边缘存储应用场景 index.tsx
 * @description 监控视频边缘存储应用场景
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'

import Section from 'components/Product/Section'
import * as Cards from 'components/UI/Card'

import SceneImgOneURL from './scene-img-one.png'
import SceneImgTwoURL from './scene-img-two.png'
import SceneImgThreeURL from './scene-img-three.png'

import styles from './style.less'

export default function EssScene() {
  return (
    <Section name="scene" title="典型应用场景">
      <Cards.Row>
        <Cards.Card>
          <Cards.Img className={styles.img} src={SceneImgOneURL} />
          <Cards.Content>
            <Cards.Title>公共交通监控</Cards.Title>
            <Cards.Desc>
              城市公共交通监控设备分布广，数据量大，存在跨地域跨运营商各种问题，
              边缘存储解决方案可解决网络复杂度高引起的各种问题，可灵活部署，实现就近高速存储。
            </Cards.Desc>
          </Cards.Content>
        </Cards.Card>
        <Cards.Card>
          <Cards.Img className={styles.img} src={SceneImgTwoURL} />
          <Cards.Content>
            <Cards.Title>楼宇小区监控</Cards.Title>
            <Cards.Desc>
              楼宇小区监控视频涉及租住户隐私，边缘存储解决方案可配合边缘计算就近处理视频数据，同时可以满足脱敏需求。
            </Cards.Desc>
          </Cards.Content>
        </Cards.Card>
        <Cards.Card>
          <Cards.Img className={styles.img} src={SceneImgThreeURL} />
          <Cards.Content>
            <Cards.Title>工厂园区监控</Cards.Title>
            <Cards.Desc>
              工厂园区生产环境及网络环境具有较严重的不可靠性，
              边缘存储解决方案可在客户侧灵活部署存储节点，脱离公网也可继续服务，稳定可靠。
            </Cards.Desc>
          </Cards.Content>
        </Cards.Card>
      </Cards.Row>
    </Section>
  )
}
