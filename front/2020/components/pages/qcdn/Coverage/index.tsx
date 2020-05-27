/**
 * @file cdn 页节点覆盖 Component
 * @author zhuhao <zhuhao@qiniu.com>
 */

import React, { ReactNode, PropsWithChildren, useState } from 'react'
import classnames from 'classnames'

import ButtonRadioGroup, { ButtonRadio } from 'components/UI/ButtonRadio'
import Section from 'components/Product/Section'

import NodeIcon1 from './images/node1.svg'
import NodeIcon2 from './images/node2.svg'
import NodeIcon3 from './images/node3.svg'
import NodeIcon4 from './images/node4.svg'

import ChinaMapImage from './images/map_china.png'
import WorldMapImage from './images/map_world.png'

import styles from './style.less'

enum CoverageType {
  China = 'china',
  World = 'world'
}

const coverageImageMap = {
  [CoverageType.China]: ChinaMapImage,
  [CoverageType.World]: WorldMapImage
}

const coverageNameTextMap = {
  [CoverageType.China]: '国内节点覆盖',
  [CoverageType.World]: '国际节点覆盖'
}

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
  const [coverageType, setCoverageType] = useState(CoverageType.China)
  return (
    <Section header="国内外优质节点覆盖，用户随处可用" title="节点覆盖" name="coverage">
      <div className={styles.coverage}>
        <ul className={styles.container}>
          <Point icon={<NodeIcon1 />}>全球 <span className={styles.highlight}>1800</span> 节点</Point>
          <Point icon={<NodeIcon2 />}><span className={styles.highlight}>20+</span> 运营商覆盖</Point>
          <Point icon={<NodeIcon3 />}>访问提速 <span className={styles.highlight}>80%</span></Point>
          <Point icon={<NodeIcon4 />}><span className={styles.highlight}>80万</span> 客户选择</Point>
        </ul>
        <div className={classnames(styles.map, coverageType === CoverageType.China ? styles.china : styles.world)}>
          <img className={styles.mapImage} src={coverageImageMap[coverageType]} />
          <ButtonRadioGroup
            className={styles.radios}
            value={coverageType}
            onChange={t => setCoverageType(t as CoverageType)}
          >
            <ButtonRadio
              className={styles.radio}
              value={CoverageType.China}
            >
              {coverageNameTextMap[CoverageType.China]}
            </ButtonRadio>
            <ButtonRadio
              className={styles.radio}
              value={CoverageType.World}
            >
              {coverageNameTextMap[CoverageType.World]}
            </ButtonRadio>
          </ButtonRadioGroup>
        </div>
      </div>
    </Section>
  )
}
