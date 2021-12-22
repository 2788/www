import React from 'react'
import Scene, {
  Panel as ScenePanel,
  Block as SceneBlock
} from 'components/Product/Scene'

import icon1 from './images/tab-1-1.png'
import icon2 from './images/tab-1-2.png'
import icon3 from './images/tab-2-1.png'
import icon4 from './images/tab-2-2.png'
import icon5 from './images/tab-3-1.png'
import icon6 from './images/tab-4-1.png'

import styles from './mobile.less'

export default function Mobile() {
  return (
    <Scene name="functions" title="产品功能" grey>
      <ScenePanel name="scene-1" title="私有云存储" verticalCenter>
        <SceneBlock blockType="fixed" className={styles.blockLeft}>
          <img src={icon1} />
        </SceneBlock>
        <SceneBlock shadow className={styles.blockRight}>
          <div className={styles.sceneContainer}>
            <p className={styles.sceneTitle}>云主机</p>
            <p className={styles.sceneContent}>
              云主机，是一种可弹性扩展、按需使用的虚拟计算机。用户可根据需求设置其 vCPU、内存、镜像类型等，从而获取相应的计算、存储、网络等资源，大大降低使用成本。
            </p>
          </div>
        </SceneBlock>
        <SceneBlock blockType="fixed" className={styles.blockLeft}>
          <img src={icon2} />
        </SceneBlock>
        <SceneBlock shadow className={styles.blockRight}>
          <div className={styles.sceneContainer}>
            <p className={styles.sceneTitle}>镜像</p>
            <p className={styles.sceneContent}>
              镜像是一个包含了软件及必要配置的云主机模板，包含操作系统、预装的公共应用、用户的私有应用或用户的业务数据。
            </p>
          </div>
        </SceneBlock>
      </ScenePanel>
      <ScenePanel name="scene-2" title="网络服务" verticalCenter>
        <SceneBlock blockType="fixed" className={styles.blockLeft}>
          <img src={icon3} />
        </SceneBlock>
        <SceneBlock shadow className={styles.blockRight}>
          <div className={styles.sceneContainer}>
            <p className={styles.sceneTitle}>公网 IP</p>
            <p className={styles.sceneContent}>
              公网 IP 服务是创建一个可直接访问 Internet 的 IP 地址，并将该地址与虚拟网络的云主机虚拟网卡、云物理机或负载均衡绑定后，实现云资源通过 EIP 地址与互联网通信。
            </p>
          </div>
        </SceneBlock>
        <SceneBlock blockType="fixed" className={styles.blockLeft}>
          <img src={icon4} />
        </SceneBlock>
        <SceneBlock shadow className={styles.blockRight}>
          <div className={styles.sceneContainer}>
            <p className={styles.sceneTitle}>专有网络</p>
            <p className={styles.sceneContent}>
              专有网络 VPC（Virtual Private Cloud）是一种自定义私有网络, 不同的专有网络之间二层逻辑隔离，用户可以在自己创建的专有网络内创建和管理云产品实例。
            </p>
          </div>
        </SceneBlock>
      </ScenePanel>
      <ScenePanel name="scene-3" title="存储服务" verticalCenter>
        <SceneBlock blockType="fixed" className={styles.blockLeft}>
          <img src={icon5} />
        </SceneBlock>
        <SceneBlock shadow className={styles.blockRight}>
          <div className={styles.sceneContainer}>
            <p className={styles.sceneTitle}>磁盘</p>
            <p className={styles.sceneContent}>
              磁盘（云硬盘），是可以为云主机提供独立可扩展虚拟块存储的一种服务。用户可以创建云硬盘为云主机和镜像提供持久的存储资源，不仅可以用作系统盘存放镜像文件来启动云主机，还可以作为云主机的数据盘。
            </p>
          </div>
        </SceneBlock>
      </ScenePanel>
      <ScenePanel name="scene-4" title="负载均衡" verticalCenter>
        <SceneBlock blockType="fixed" className={styles.blockLeft}>
          <img src={icon6} />
        </SceneBlock>
        <SceneBlock shadow className={styles.blockRight}>
          <div className={styles.sceneContainer}>
            <p className={styles.sceneTitle}>负载均衡</p>
            <p className={styles.sceneContent}>
              负载均衡服务提供将流量分发到多台云主机能力，通过负载均衡可以扩展应用系统对外的服务能力，可以扩展网络设备和服务器的带宽，增加数据吞吐量，提高服务响应能力和可靠性，消除单点故障。
            </p>
          </div>
        </SceneBlock>
      </ScenePanel>
    </Scene>
  )
}
