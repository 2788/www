import React from 'react'

import Section from 'components/Product/Section'
import { TabPane, Tabs } from 'react-icecream-2'

import img1 from './images/tab-1-1.png'
import img2 from './images/tab-1-2.png'
import img3 from './images/tab-2-1.png'
import img4 from './images/tab-2-2.png'
import img5 from './images/tab-3-1.png'
import img6 from './images/tab-4-1.png'

import styles from './pc.less'

export default function Pc() {
  return (
    <Section name="functions" title="产品功能">
      <Tabs type="vertical" size="large">
        <TabPane name="计算服务" value="1" className={styles.tabpane}>
          <Card
            img={img1}
            title="云主机"
            desc="云主机，是一种可弹性扩展、按需使用的虚拟计算机。用户可根据需求设置其 vCPU、内存、镜像类型等，从而获取相应的计算、存储、网络等资源，大大降低使用成本。"
          />
          <Card
            img={img2}
            title="镜像"
            desc="镜像是一个包含了软件及必要配置的云主机模板，包含操作系统、预装的公共应用、用户的私有应用或用户的业务数据。"
          />
        </TabPane>
        <TabPane name="网络服务" value="2" className={styles.tabpane}>
          <Card
            img={img3}
            title="公网 IP"
            desc="公网 IP 服务是创建一个可直接访问 Internet 的 IP 地址，并将该地址与虚拟网络的云主机虚拟网卡、云物理机或负载均衡绑定后，实现云资源通过 EIP 地址与互联网通信。"
          />
          <Card
            img={img4}
            title="专有网络"
            desc="专有网络 VPC（Virtual Private Cloud）是一种自定义私有网络, 不同的专有网络之间二层逻辑隔离，用户可以在自己创建的专有网络内创建和管理云产品实例。"
          />
        </TabPane>
        <TabPane name="存储服务" value="3" className={styles.tabpane}>
          <Card
            img={img5}
            title="磁盘"
            desc="磁盘（云硬盘），是可以为云主机提供独立可扩展虚拟块存储的一种服务。用户可以创建云硬盘为云主机和镜像提供持久的存储资源，不仅可以用作系统盘存放镜像文件来启动云主机，还可以作为云主机的数据盘。"
          />
          <InvisibleCard />
        </TabPane>
        <TabPane name="负载均衡" value="4" className={styles.tabpane}>
          <Card
            img={img6}
            title="负载均衡"
            desc="负载均衡服务提供将流量分发到多台云主机能力，通过负载均衡可以扩展应用系统对外的服务能力，可以扩展网络设备和服务器的带宽，增加数据吞吐量，提高服务响应能力和可靠性，消除单点故障。"
          />
          <InvisibleCard />
        </TabPane>
      </Tabs>
    </Section>
  )
}

function Card({ img, title, desc }: { img: string, title: string, desc: string }) {
  return (
    <div className={styles.card}>
      <img className={styles.img} src={img} />
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.desc}>{desc}</div>
      </div>
    </div>
  )
}

function InvisibleCard() {
  return <div className={styles.invisibleCard} />
}
