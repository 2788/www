/**
 * @file 云主机-使用场景组件
 */

import React, { PropsWithChildren } from 'react'
import Scene, { Panel, Block } from 'components/Product/Scene'
import Tabs, { TabPane } from 'components/UI/Tabs'
import Button from 'components/UI/Button'
import { useMobile } from 'hooks/ua'
import { urlForQvmBuy } from 'utils/route'
import ImgWeb from './web.svg'
import ImgMemdb from './memdb.svg'
import ImgGame from './game.svg'
import ImgGraphRender from './graph-render.svg'
import ImgHighPerf from './high-perf.svg'
import style from './style.less'

export default function QvmScenes() {
  const isPc = !useMobile()

  return (
    <Scene name="scenes" title="使用场景">
      <Panel name="1" title="简单官网 / WEB 应用">
        <Block className={style.imgBlock}><ImgWeb /></Block>
        <Detail>
          <Title>场景特点</Title>
          <List>
            <Item>对CPU、内存、硬盘空间无特殊要求</Item>
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
                    type="t5-lc1m2.small"
                    name="突发性能型 1C/2G"
                    desc="适合测试开发等非线上生产环境"
                    bandwidth={1}
                    ipNum={1}
                    storage="高效云盘 40 G"
                  />
                </TabPane>
                <TabPane value="2" tab="中小型官网/应用">
                  <InstanceCard
                    type="n4.large"
                    name="共享计算型 2C/4G"
                    desc="适合 PV 10 万， DAU 1000左右的业务系统"
                    bandwidth={3}
                    ipNum={1}
                    storage="高效云盘 40 G"
                  />
                </TabPane>
                <TabPane value="3" tab="大型官网/应用">
                  <InstanceCard
                    type="c6.xlarge"
                    name="计算型 4C/8G"
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
        <Block className={style.imgBlock}><ImgMemdb /></Block>
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
            <Item>Hadoop，Spark 群集以及其他企业大内存需求应用</Item>
          </List>
          {isPc && (
            <>
              <Title>推荐配置</Title>
              <InstanceCard
                type="r6.2xlarge"
                name="内存型 8C/64G"
                bandwidth={5}
                ipNum={1}
                storage="ESSD 100 G"
              />
            </>
          )}
        </Detail>
      </Panel>
      <Panel name="3" title="游戏类业务">
        <Block className={style.imgBlock}><ImgGame /></Block>
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
                type="sn1ne.xlarge"
                name="计算网络增强型 4C/8G"
                bandwidth={3}
                ipNum={1}
                storage="高效云盘 40 G"
              />
            </>
          )}
        </Detail>
      </Panel>
      <Panel name="4" title="图形渲染">
        <Block className={style.imgBlock}><ImgGraphRender /></Block>
        <Detail>
          <Title>场景特点</Title>
          <List>
            <Item>对图像视频质量要求高</Item>
            <Item>大内存，大量数据处理，I/O 并发能力</Item>
            <Item>快速的数据处理交换</Item>
            <Item>大量的GPU计算能力</Item>
          </List>
          <Title>适用场景</Title>
          <List>
            <Item>深度学习，例如图像分类、无人驾驶、语音识别等人工智能算法的训练、推理应用</Item>
            <Item>科学计算，例如计算流体动力学、计算金融学、分子动力学、环境分析等</Item>
          </List>
          <Title>实例特点</Title>
          <List>
            <Item>I/O优化实例</Item>
            <Item>采用NVIDIA V100（32 GB NVLink）GPU计算卡</Item>
            <Item>
              GPU加速器：V100（SXM2封装）
              <SubList>
                <SubItem>创新的Volta架构</SubItem>
                <SubItem>单GPU显存16 GB HBM2（GPU显存带宽900 GB/s）</SubItem>
                <SubItem>单GPU 5120个CUDA Cores</SubItem>
                <SubItem>单GPU 640个Tensor Cores</SubItem>
                <SubItem>支持6个NVLink链路，每个25 GB/s，总共300 GB/s</SubItem>
              </SubList>
            </Item>
          </List>
          {isPc && (
            <>
              <Title>推荐配置</Title>
              <InstanceCard
                type="gn6v-c8g1.8xlarge"
                name="GPU机型 32C/128G"
                bandwidth={5}
                ipNum={1}
                storage="ESSD 200G"
              />
            </>
          )}
        </Detail>
      </Panel>
      <Panel name="5" title="高性能计算">
        <Block className={style.imgBlock}><ImgHighPerf /></Block>
        <Detail>
          <Title>场景特点</Title>
          <List>
            <Item>高计算能力</Item>
            <Item>高吞吐量</Item>
          </List>
          <Title>适用场景</Title>
          <List>
            <Item>高网络包收发场景，例如视频弹幕、电信业务转发等</Item>
            <Item>Web前端服务器</Item>
            <Item>大型多人在线游戏（MMO）前端</Item>
            <Item>数据分析、批量计算、视频编码</Item>
            <Item>高性能科学和工程应用</Item>
          </List>
          <Title>规格族特点</Title>
          <List>
            <Item>依托神龙架构，将大量虚拟化功能卸载到专用硬件，降低虚拟化开销，提供稳定可预期的超高性能</Item>
            <Item>支持ESSD云盘、SSD云盘和高效云盘</Item>
            <Item>超高网络PPS收发包能力</Item>
            <Item>支持开启或关闭超线程配置</Item>
            <Item>实例网络性能与计算规格对应</Item>
          </List>
          {isPc && (
            <>
              <Title>推荐配置</Title>
              <InstanceCard
                type="hfc6.16xlarge"
                name="高主频计算型 64C/128G"
                bandwidth={1}
                ipNum={1}
                storage="ESSD 100G"
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
  name: string
  desc?: string
  bandwidth: number // 带宽，单位 M
  ipNum: number // IP 数量
  storage: string // 系统盘大小
}

function InstanceCard({ type, name, desc, bandwidth, ipNum, storage }: InstanceCardProps) {

  const buyUrl = urlForQvmBuy({
    instance_type: type,
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