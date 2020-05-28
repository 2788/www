/**
 * @file 云主机“更多产品”
 */

/* eslint-disable max-len */

import React, { PropsWithChildren } from 'react'
import Tabs, { TabPane } from 'components/UI/Tabs'
import { Row, Card, InvisibleCard } from 'components/UI/Card'

import IconEip from './eip.svg'
import IconEnterpriseNet from './enterprise-net.svg'
import IconHighSpeedChannel from './high-speed-channel.svg'
import IconLb from './lb.svg'
import IconNatGateway from './nat-gateway.svg'
import IconSharedBandwidth from './shared-bandwidth.svg'
import IconVpnGateway from './vpn-gateway.svg'
import IconVpn from './vpn.svg'

import style from './style.less'

export default function MoreProducts() {
  return (
    <Tabs defaultValue="1">
      <TabPane value="1" tab="网络">
        <Row>
          <Product>
            <IconVpn className={style.icon} />
            <Title>专有网络</Title>
            <Desc>专有网络（Virtual Private Cloud，VPC）是自定义的逻辑隔离网络空间，托管在专有网络内的服务资源包括：云服务器、负载均衡器、云数据库等云服务资源。你可以完全掌握你的专有网络环境，包括自定义专有网络的拓扑和 IP 地址，适用于对网络安全性要求较高和熟悉网络管理的用户。</Desc>
            <Footer tags="⽹络隔离,访问控制,软件定义网络" />
          </Product>
          <Product>
            <IconEip className={style.icon} />
            <Title>弹性公⽹ IP</Title>
            <Desc>弹性公⽹ IP（Elastic IP Address，EIP）是可以独⽴购买和持有的公⽹ IP 地址资源，并且可以弹性绑定，您可以在需要时将弹性公⽹ IP 绑定到需要的资源上；在不需要时，将之解绑并释放，避免不必要的计费。弹性公⽹ IP ⽀持根据需要随时调整带宽，实时响应您的业务需求。</Desc>
            <Footer tags="弹性伸缩,灵活插拔,低成本" />
          </Product>
        </Row>
        <Row>
          <Product>
            <IconHighSpeedChannel className={style.icon} />
            <Title>高速通道</Title>
            <Desc>高速通道（Express Connect）是一款基于 IPVPN 的便捷高效的网络服务，用于在云上的不同网络环境间实现高速、稳定、安全的私网通信，包括跨地域/跨用户的 VPC 内网互通、专线接入等场景，有效提高网络拓扑的灵活性和跨网络通信的质量和安全性。</Desc>
            <Footer tags="高速互通,稳定可靠,安全易用" />
          </Product>
          <Product>
            <IconSharedBandwidth className={style.icon} />
            <Title>共享带宽</Title>
            <Desc>共享带宽提供地域级带宽共享和复用功能。创建共享带宽实例后，您可以将同地域下的所有 EIP 都添加到共享带宽实例中，复用共享带宽中的带宽，节省公网带宽使用成本。</Desc>
            <Footer tags="八线线路,稳定可靠,计费灵活" />
          </Product>
        </Row>
        <Row>
          <Product>
            <IconNatGateway className={style.icon} />
            <Title>NAT 网关</Title>
            <Desc>NAT 网关（NAT Gateway）是一款企业级的 VPC 公网网关，提供 NAT 代理（SNAT、DNAT）、10 Gbps 级别的转发能力、以及跨可用区的容灾能力。NAT 网关与共享带宽包配合使用，可以组合成为高性能、配置灵活的企业级网关。</Desc>
            <Footer tags="灵活易用,高性能,高稳定,按需购买" />
          </Product>
          <Product>
            <IconVpnGateway className={style.icon} />
            <Title>VPN 网关</Title>
            <Desc>VPN 网关是一款基于 Internet，通过加密通道将企业数据中心、企业办公网络、或 Internet 终端和七牛云专有网络（VPC）安全可靠连接起来的服务。七牛云 VPN 网关在国家相关政策法规下提供服务，不提供访问 Internet 功能。</Desc>
            <Footer tags="安全,高可用,成本低,配置简单" />
          </Product>
        </Row>
        <Row>
          <Product>
            <IconEnterpriseNet className={style.icon} />
            <Title>云企业网</Title>
            <Desc>云企业网（Cloud Enterprise Network）是承载在七牛云提供的高性能、低延迟的私有网络上的一张高可用网络，可帮助您在不同地域 VPC 间，VPC 与本地数据中心间搭建私网通信通道，通过自动路由分发及学习，提高网络的快速收敛和跨网络通信的质量和安全性，实现全网资源的互通，打造一张具有企业级规模和通信能力的互联网络。</Desc>
            <Footer tags="网络互联,低延迟,多节点,链路冗余" />
          </Product>
          <Product>
            <IconLb className={style.icon} />
            <Title>负载均衡</Title>
            <Desc>负载均衡（Server Load Balancer，SLB）是将访问流量根据转发策略分发到后端多台云主机的流量分发控制服务，提供四层和七层负载均衡服务。负载均衡能够扩展应用的服务能力，增强应用的可用性。</Desc>
            <Footer tags="⾼可⽤,低成本,健康检查" />
          </Product>
        </Row>
      </TabPane>
      <TabPane value="2" tab="弹性伸缩">
        <Row>
          <Product>
            {/* TODO: icon */}
            <IconLb className={style.icon} />
            <Title>弹性伸缩</Title>
            <Desc>使用弹性伸缩（Auto Scaling）用户可以根据业务需求和策略设置伸缩规则，在业务需求增长时自动为您增加云主机实例以保证计算能力，在业务需求下降时自动减少云主机实例以节约成本。弹性伸缩不仅适合业务量不断波动的应用程序，同时也适合业务量稳定的应用程序。</Desc>
            <Footer tags="弹性扩张,弹性收缩,自动愈合" />
          </Product>
        </Row>
      </TabPane>
      <TabPane value="3" tab="云数据库">
        <Row>
          <Product>
            {/* TODO: icon */}
            <IconLb className={style.icon} />
            <Title>关系型数据库 RDS</Title>
            <Desc>关系型数据库（Relational Database Service，简称RDS）是一种稳定可靠、可弹性伸缩的在线数据库服务。基于七牛云分布式文件系统和 SSD 盘高性能存储，RDS 支持 MySQL、SQL Server、PostgreSQL 等 PaaS 服务，并且提供了容灾、备份、恢复、监控、迁移等方面的全套解决方案，彻底解决数据库运维的烦恼。</Desc>
            <Footer tags="安全可靠,支持多种主流数据库,即开即用,管理便捷" />
          </Product>
          <Product>
            {/* TODO: icon */}
            <IconLb className={style.icon} />
            <Title>云数据库 Redis</Title>
            <Desc>云数据库 Redis 版是兼容开源 Redis 协议标准、提供内存加硬盘的混合存储方式的数据库服务，基于高可靠双机热备架构及可平滑扩展的集群架构，满足高读写性能场景及弹性变配的业务需求。</Desc>
            <Footer tags="类型丰富,高稳定架构" />
          </Product>
        </Row>
        <Row>
          <Product>
            {/* TODO: icon */}
            <IconLb className={style.icon} />
            <Title>MongoDB</Title>
            <Desc>云数据库 MongoDB 版是高可靠存储引擎，提供三节点副本集高可用架构，实现容灾切换、故障迁移完全透明化；提供强大的数据库管理功能，实现数据库的在线扩容、备份回滚、性能优化等。</Desc>
            <Footer tags="部署灵活,完全兼容 MongoDB 协议" />
          </Product>
          <Product>
            {/* TODO: icon */}
            <IconLb className={style.icon} />
            <Title>PolarDB</Title>
            <Desc>下一代关系型分布式云原生数据库，目前兼容 MySQL 引擎。存储容量最高可达 100 TB，单库最多可扩展到 16 个节点，适用于企业多样化的数据库应用场景。</Desc>
            <Footer tags="简单易用,降低成本,极致性能" />
          </Product>
        </Row>
      </TabPane>
      <TabPane value="4" tab="网络文件存储">
        <Row>
          <Product>
            {/* TODO: icon */}
            <IconLb className={style.icon} />
            <Title>网络文件存储</Title>
            <Desc>七牛云主机 QVM 网络文件存储（Network Attached Storage，简称 NAS）是一个可共享访问，弹性扩展，高可靠，高性能的分布式文件系统。它基于 POSIX 文件接口，天然适配原生操作系统，提供共享访问，同时保证数据一致性和锁互斥。您无需对现有应用做任何修改，即可使用具备无限容量及性能扩展、单一命名空间、多共享、高可靠和高可用等特性的分布式文件系统。</Desc>
            <Footer tags="高可靠,高性能,强安全,易用" />
          </Product>
        </Row>
      </TabPane>
      <TabPane value="5" tab="安全产品">
        <Row>
          <Product>
            {/* TODO: icon */}
            <IconLb className={style.icon} />
            <Title>BGP 高防 IP</Title>
            <Desc>
              BGP 高防 IP 是针对游戏、金融以及网站等业务遭受大流量 DDoS 攻击导致用户服务不可用的情况而推出的付费防护服务。用户通过配置高防 IP，将攻击流量引流到高防 IP 进行清洗，确保源站业务的稳定可用。
              <br />
              BGP 高防 IP 使用公网代理的接入方式，支持 TCP，UDP，HTTP，HTTPS 和 HTTP2 等协议，覆盖金融、电商、游戏等各类业务。
            </Desc>
            <Footer tags="多重防护,自定义清洗,防护策略灵活,多地域" />
          </Product>
          <Product>
            {/* TODO: icon */}
            <IconLb className={style.icon} />
            <Title>新 BGP 高防</Title>
            <Desc>新 BGP 高防 IP 服务采用中国大陆地域独有的 T 级八线 BGP 带宽资源，可解决超大流量 DDoS 攻击，天然具有灾备能力、线路更稳定、访问速度更快。</Desc>
            <Footer tags="八线线路,安全可靠,支持四层和七层" />
          </Product>
        </Row>
        <Row>
          <Product>
            {/* TODO: icon */}
            <IconLb className={style.icon} />
            <Title>网站应用防火墙</Title>
            <Desc>网站应用防火墙（Web Application Firewall）是一款基于 AI 的一站式 Web 业务运营风险防护方案。可以有效防御 SQL 注入、XSS 跨站脚本、木马上传、非授权访问等 OWASP 攻击。此外还可以有效过滤 CC 攻击、提供 0day 漏洞补丁、防止网页篡改等。</Desc>
            <Footer tags="安全,网站应用防护,可靠" />
          </Product>
          <InvisibleProduct />
        </Row>
      </TabPane>
    </Tabs>
  )
}

function Product({ children }: PropsWithChildren<{}>) {
  return <Card className={style.product}>{children}</Card>
}

function InvisibleProduct() {
  return <InvisibleCard className={style.product} />
}

function Title({ children }: PropsWithChildren<{}>) {
  return <h5 className={style.title}>{children}</h5>
}

function Desc({ children }: PropsWithChildren<{}>) {
  return <div className={style.desc}>{children}</div>
}

function Footer({ tags }: { tags: string }) {
  const tagsView = tags.split(',').map(
    tag => <span key={tag} className={style.tag}>{tag}</span>
  )
  return (
    <ul className={style.tags}>{tagsView}</ul>
  )
}
