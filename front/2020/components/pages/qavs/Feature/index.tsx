/**
 * @file 智能视频云产品优势 index.tsx
 * @description 包含智能视频云产品优势
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'

import { useMobile } from 'hooks/ua'

import Feature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc
} from 'components/Product/Feature'

import FeatureIconOne from './feature-icon-one.svg'
import FeatureIconTwo from './feature-icon-two.svg'
import FeatureIconThree from './feature-icon-three.svg'
import FeatureIconFour from './feature-icon-four.svg'
import FeatureIconFive from './feature-icon-five.svg'

import styles from './style.less'

export default function QavsFeature() {
  const isMobile = useMobile()

  return (
    <Feature name="advantage" title="产品优势" grey>
      <FeatureGroup>
        <FeatureItem
          pos="left-right"
          icon={<FeatureIconOne className={styles.icon} />}
          title="稳定的网络传输与分发"
        >
          <FeatureDesc>直播延迟不高于 1s，互动延迟不高于 150ms</FeatureDesc>
        </FeatureItem>
        <FeatureItem
          pos="left-right"
          icon={<FeatureIconTwo className={styles.icon} />}
          title="可扩展的海量存储服务"
        >
          <FeatureDesc>可实现业务层无感知 EB 级扩容</FeatureDesc>
        </FeatureItem>
      </FeatureGroup>

      <FeatureGroup>
        <FeatureItem
          pos="left-right"
          icon={<FeatureIconThree className={styles.icon} />}
          title="云端媒体的编辑处理"
        >
          <FeatureDesc>可在数秒内创建独立计算实例，执行自定义媒体编辑操作</FeatureDesc>
        </FeatureItem>
        <FeatureItem
          pos="left-right"
          icon={<FeatureIconFour className={styles.icon} />}
          title="视频内容的智能分析"
        >
          <FeatureDesc>视频内容识别率高于 95%</FeatureDesc>
        </FeatureItem>
      </FeatureGroup>

      <FeatureGroup>
        <FeatureItem
          pos="left-right"
          icon={<FeatureIconFive className={styles.icon} />}
          title="完备的权限控制"
        >
          <FeatureDesc>彻底杜绝非法拷贝，秒级封禁盗链流量</FeatureDesc>
        </FeatureItem>

        {
          isMobile
          ? null
          : (
            <FeatureItem
              pos="left-right"
              icon={null}
              title=""
            >
              <FeatureDesc>{null}</FeatureDesc>
            </FeatureItem>
          )
        }
      </FeatureGroup>
    </Feature>
  )
}
