/**
 * @file cdn 页节点覆盖 Component
 * @author zhuhao <zhuhao@qiniu.com>
 */

import React, { ReactNode, PropsWithChildren } from 'react'

import Section from 'components/Product/Section'

import NodeIcon1 from './images/node1.svg'
import NodeIcon2 from './images/node2.svg'
import NodeIcon3 from './images/node3.svg'
import NodeIcon4 from './images/node4.svg'

import MapImage from './images/MAP.svg'

import styles from './style.less'

interface PointProps {
  icon: ReactNode
}

function Point({ icon, children }: PropsWithChildren<PointProps>) {
  return (
    <li className={styles.point}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.text}>{children}</div>
    </li>
  )
}

export default function Coverage() {
  return (
    <Section header="国内外优质节点覆盖，用户随处可用" title="节点覆盖" name="coverage">
      <div className={styles.coverage}>
        <ul className={styles.container}>
          <Point icon={<NodeIcon1 />}>全球 <span className={styles.highlight}>1800</span> 节点</Point>
          <Point icon={<NodeIcon2 />}><span className={styles.highlight}>20+</span> 运营商覆盖</Point>
          <Point icon={<NodeIcon3 />}>访问提速 <span className={styles.highlight}>80%</span></Point>
          <Point icon={<NodeIcon4 />}><span className={styles.highlight}>80万</span> 客户选择</Point>
        </ul>
        <div className={styles.map}>
          <MapImage />
        </div>
      </div>
    </Section>
  )
}
