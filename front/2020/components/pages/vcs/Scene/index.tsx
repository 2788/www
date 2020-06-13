/**
 * @file 视频冷存储应用场景 index.tsx
 * @description 包含视频冷存储应用场景
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'

import Section from 'components/Product/Section'
import * as Cards from 'components/UI/Card'

import SceneImgOneURL from './scene-img-one.png'
import SceneImgTwoURL from './scene-img-two.png'
import SceneImgThreeURL from './scene-img-three.png'

import styles from './style.less'

export default function VcsScene() {
  return (
    <Section name="scene" title="应用场景" header="典型应用场景">
      <Cards.Row>
        <Cards.Card className={styles.card}>
          <Cards.Img className={styles.img} src={SceneImgOneURL} />
          <Cards.Content>
            <Cards.Title className={styles.title}>高清视频原片 - 归档存储</Cards.Title>
          </Cards.Content>
        </Cards.Card>
        <Cards.Card className={styles.card}>
          <Cards.Img className={styles.img} src={SceneImgTwoURL} />
          <Cards.Content>
            <Cards.Title className={styles.title}>媒体资源库 - 数据冷备</Cards.Title>
          </Cards.Content>
        </Cards.Card>
        <Cards.Card className={styles.card}>
          <Cards.Img className={styles.img} src={SceneImgThreeURL} />
          <Cards.Content>
            <Cards.Title className={styles.title}>直播录制资源 - 实时点播</Cards.Title>
          </Cards.Content>
        </Cards.Card>
      </Cards.Row>
    </Section>
  )
}
