import React from 'react'

import Section from 'components/pages/index/Section'

import No1 from './imgs/no1.svg'
import No2 from './imgs/no2.svg'
import No3 from './imgs/no3.svg'
import No4 from './imgs/no4.svg'
import bg1url from './imgs/bg1.png'
import bg2url from './imgs/bg2.png'
import bg3url from './imgs/bg3.png'
import bg4url from './imgs/bg4.png'
import Item from './Item'
import styles from './style.less'

export default function PlatformAbility() {
  return (
    <Section title="平台能力" subtitle="提供高效、可复用、多场景覆盖的平台能力" rootClassName={styles.section}>
      <div className={styles.items}>
        <Item
          serial={<No1 />}
          title="低门槛接入"
          desc="提供各种音视频能力SDK和可视化的方案配置，大幅降低音视频开发门槛，助力企业以更低成本和更高效率搭建专属的音视频应用"
          bgUrl={bg1url}
          popDir="up"
        />
        <Item
          serial={<No2 />}
          title="可扩展性强"
          desc="开源所有 UI 组件，您可按自己的需求快速个性化改造"
          bgUrl={bg2url}
          popDir="down"
        />
        <Item
          serial={<No3 />}
          title="全场景支持"
          desc="覆盖泛娱乐互动直播、电商直播带货、语聊房在线教育等多应用场景。"
          bgUrl={bg3url}
          popDir="up"
        />
        <Item
          serial={<No4 />}
          title="一站式方案管理"
          desc="提供基于解决方案的控制台管理平台，可以对创建的音视频应用进行统一管理，提升管理安全性和效率"
          bgUrl={bg4url}
          popDir="down"
        />
      </div>
    </Section>
  )
}
