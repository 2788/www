/**
 * @file 云主机-使用场景组件
 */

import React, { PropsWithChildren } from 'react'
import Scene, { Panel, Block } from 'components/Product/Scene'
import Tabs, { TabPane } from 'components/UI/Tabs'
import Button from 'components/UI/Button'
import { useMobile } from 'hooks/ua'
import { urlForQvmBuy } from 'utils/route'
import imgWeb from './web.png'
import imgMemdb from './memdb.png'
import imgGame from './game.png'
import imgGraphRender from './graph-render.png'
import imgHighPerf from './high-perf.png'
import style from './style.less'

export default function QvmScenes() {
  const isPc = !useMobile()

  return (
    <Scene name="scenes" title="使用场景">
      <Panel name="1" title="简单官网 / WEB 应用">
        <Block className={style.imgBlock}><img src={imgWeb} /></Block>
        <Detail>
          <Title>场景特点</Title>
          <List>
            <Item>对 CPU、内存、硬盘空间无特殊要求</Item>
            <Item>对成本比较敏感</Item>
            <Item>对安全性、可靠性要求高</Item>
            <Item>对网络带宽有一定要求</Item>
          </List>
          {isPc && (
            <>
              <Title>推荐配置</Title>
              <Tabs defaultValue="1" size="small">
                <TabPane value="1" tab="个人测试开发环境">
                  <InstanceCard
                    type="ecs.t5-lc1m2.small"
                    region="cn-zhangjiakou"
                    name="突发性能型 1 C/2 G"
                    desc="适合测试开发等非线上生产环境"
                    bandwidth={1}
                    ipNum={1}
                    storage="高效云盘 40 G"
                  />
                </TabPane>
                <TabPane value="2" tab="中小型官网/应用">
                  <InstanceCard
                    type="ecs.n4.large"
                    region="cn-qingdao"
                    name="共享计算型 2 C/4 G"
                    desc="适合 PV 10 万， DAU 1000左右的业务系统"
                    bandwidth={3}
                    ipNum={1}
                    storage="高效云盘 40 G"
                  />
                </TabPane>
                <TabPane value="3" tab="大型官网/应用">
                  <InstanceCard
                    type="ecs.c5.xlarge"
                    region="cn-zhangjiakou"
                    name="计算型 4 C/8 G"
                    desc="适合 PV 20 万， DAU 3000 的业务系统 "
                    bandwidth={5}
                    ipNum={1}
                    storage="高效云盘 40 G"
                  />
                </TabPane>
              </Tabs>
            </>
          )}
        </Detail>
      </Panel>
      <Panel name="2" title="内存数据库">
        <Block className={style.imgBlock}><img src={imgMemdb} /></Block>
        <Detail>
          <Title>场景特点</Title>
          <List>
            <Item>重内存应用</Item>
            <Item>数据量大并且数据访问量大</Item>
            <Item>要求快速的数据交换和处理</Item>
          </List>
          <Title>适用场景</Title>
          <List>
            <Item>高网络包收发场景，如视频弹幕、电信业务转发等</Item>
            <Item>高性能数据库、内存数据库</Item>
            <Item>Hadoop，Spark 集群以及其他企业大内存需求应用</Item>
          </List>
          {isPc && (
            <>
              <Title>推荐配置</Title>
              <InstanceCard
                type="ecs.r6.2xlarge"
                region="cn-zhangjiakou"
                name="内存型 8 C/64 G"
                bandwidth={5}
                ipNum={1}
                storage="高效云盘 40 G"
              />
            </>
          )}
        </Detail>
      </Panel>
      <Panel name="3" title="游戏类业务">
        <Block className={style.imgBlock}><img src={imgGame} /></Block>
        <Detail>
          <Title>实例特点</Title>
          <List>
            <Item>高网络包收发场景</Item>
            <Item>支持 SSD 云盘和高效云盘</Item>
          </List>
          <Title>适用场景</Title>
          <List>
            <Item>多人游戏：手游，社交游戏，网页游戏等</Item>
            <Item>实时应用：聊天，消息推送，等等</Item>
          </List>
          {isPc && (
            <>
              <Title>推荐配置</Title>
              <InstanceCard
                type="ecs.sn1ne.xlarge"
                region="cn-qingdao"
                name="计算网络增强型 4 C/8 G"
                bandwidth={3}
                ipNum={1}
                storage="高效云盘 40 G"
              />
            </>
          )}
        </Detail>
      </Panel>
      <Panel name="4" title="图形渲染">
        <Block className={style.imgBlock}><img src={imgGraphRender} /></Block>
        <Detail>
          <Title>场景特点</Title>
          <List>
            <Item>对图像视频质量要求高</Item>
            <Item>大内存，大量数据处理，I/O 并发能力</Item>
            <Item>快速的数据处理交换</Item>
            <Item>大量的 GPU 计算能力</Item>
          </List>
          <Title>适用场景</Title>
          <List>
            <Item>深度学习，例如图像分类、无人驾驶、语音识别等人工智能算法的训练、推理应用</Item>
            <Item>科学计算，例如计算流体动力学、计算金融学、分子动力学、环境分析等</Item>
          </List>
          <Title>实例特点</Title>
          <List>
            <Item>I/O 优化实例</Item>
            <Item>采用NVIDIA V100（32 GB NVLink）GPU 计算卡</Item>
            <Item>
              GPU 加速器：V100（SXM2 封装）
              <SubList>
                <SubItem>创新的 Volta 架构</SubItem>
                <SubItem>单 GPU 显存 16 GB HBM2（GPU 显存带宽 900 GB/s）</SubItem>
                <SubItem>单 GPU 5120 个 CUDA Cores</SubItem>
                <SubItem>单 GPU 640 个 Tensor Cores</SubItem>
                <SubItem>支持 6 个 NVLink 链路，每个 25 GB/s，总共 300 GB/s</SubItem>
              </SubList>
            </Item>
          </List>
          {isPc && (
            <>
              <Title>推荐配置</Title>
              <InstanceCard
                type="ecs.gn6v-c8g1.8xlarge"
                region="cn-zhangjiakou"
                name="GPU机型 32 C/128 G"
                bandwidth={5}
                ipNum={1}
                storage="高效云盘 40 G"
              />
            </>
          )}
        </Detail>
      </Panel>
      <Panel name="5" title="高性能计算">
        <Block className={style.imgBlock}><img src={imgHighPerf} /></Block>
        <Detail>
          <Title>场景特点</Title>
          <List>
            <Item>高计算能力</Item>
            <Item>高吞吐量</Item>
          </List>
          <Title>适用场景</Title>
          <List>
            <Item>高网络包收发场景，例如视频弹幕、电信业务转发等</Item>
            <Item>Web 前端服务器</Item>
            <Item>大型多人在线游戏（MMO）前端</Item>
            <Item>数据分析、批量计算、视频编码</Item>
            <Item>高性能科学和工程应用</Item>
          </List>
          <Title>规格族特点</Title>
          <List>
            <Item>依托神龙架构，将大量虚拟化功能卸载到专用硬件，降低虚拟化开销，提供稳定可预期的超高性能</Item>
            <Item>支持 ESSD 云盘、SSD 云盘和高效云盘</Item>
            <Item>超高网络 PPS 收发包能力</Item>
            <Item>支持开启或关闭超线程配置</Item>
            <Item>实例网络性能与计算规格对应</Item>
          </List>
          {isPc && (
            <>
              <Title>推荐配置</Title>
              <InstanceCard
                type="ecs.hfc6.16xlarge"
                region="cn-zhangjiakou"
                name="高主频计算型 64 C/128 G"
                bandwidth={1}
                ipNum={1}
                storage="高效云盘 40 G"
              />
            </>
          )}
        </Detail>
      </Panel>
    </Scene>
  )
}

function Detail({ children }: PropsWithChildren<{}>) {
  return <Block className={style.detailBlock} blockType="fixed" shadow>{children}</Block>
}

function Title({ children }: PropsWithChildren<{}>) {
  return <h5 className={style.title}>{children}</h5>
}

function List({ children }: PropsWithChildren<{}>) {
  return <ul className={style.list}>{children}</ul>
}

function Item({ children }: PropsWithChildren<{}>) {
  return <li className={style.item}>{children}</li>
}

function SubList({ children }: PropsWithChildren<{}>) {
  return <ul className={style.subList}>{children}</ul>
}

function SubItem({ children }: PropsWithChildren<{}>) {
  return <li className={style.subItem}>{children}</li>
}

type InstanceCardProps = {
  type: string // instance type 用来拼接购买链接
  region: string // region id 用来拼接购买链接
  name: string
  desc?: string
  bandwidth: number // 带宽，单位 M
  ipNum: number // IP 数量
  storage: string // 系统盘大小
}

function InstanceCard({ type, region, name, desc, bandwidth, ipNum, storage }: InstanceCardProps) {

  const buyUrl = urlForQvmBuy({
    ui_mode: 'submit',
    instance_type: type,
    region_id: region,
    eip: bandwidth,
    buymonth: 12
  })

  return (
    <div className={style.instanceCard}>
      <div className={style.body}>
        <h5 className={style.instanceName}>{name}</h5>
        <p className={style.instanceDesc}>{desc}</p>
        <table className={style.instanceTable}>
          <thead>
            <tr>
              <th className={style.colBandwidth}>带宽</th>
              <th className={style.colIp}>IP</th>
              <th className={style.colStorage}>系统盘</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{bandwidth} M</td>
              <td>{ipNum} 个</td>
              <td>{storage}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={style.footer}>
        <Button type="primary" size="small" href={buyUrl}>立即购买</Button>
      </div>
    </div>
  )
}
