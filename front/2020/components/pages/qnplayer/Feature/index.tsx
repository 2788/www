/**
 * @file: 播放器 SDK —— 产品功能
 * @author hovenjay <hovenjay@qiniu.com>
 */

import React from 'react'
import { Block } from 'components/Product/Navigator'
import styles from './style.less'
import playerImg from './player.png'

interface IFeature {
  key: string
  title: string
  description: string
}

export default function Feature() {
  const featureList: IFeature[] = [
    {
      key: '1',
      title: 'DRM 版权保护',
      description: '防止数字媒体的非法复制'
    },
    {
      key: '2',
      title: '智能调整播放策略',
      description: '有效降低播放延迟和卡顿'
    },
    {
      key: '3',
      title: '大数据分析',
      description: '性能数据实时监测分析、告警、优化终端用户体验'
    },
    {
      key: '4',
      title: 'HLS 自适应码率',
      description: '轻松应对终端用户复杂网络环境'
    }
  ]

  return (
    <Block className={styles.wrapper} title="产品功能" name="feature">
      <div className={styles.sectionTitle}>产品功能</div>
      <div className={styles.sectionContent}>
        <div className={styles.list}>
          {featureList.map(({ key, title, description }) => (
            <div key={key} className={styles.listItem}>
              <div className={styles.itemTitle}>{title}</div>
              <div className={styles.itemDescription}>{description}</div>
            </div>
          ))}
        </div>
        <img className={styles.img} src={playerImg} />
      </div>
    </Block>
  )
}
