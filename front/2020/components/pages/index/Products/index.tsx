import React, { ReactNode, PropsWithChildren, useState } from 'react'
import QueueAnim from 'rc-queue-anim'
import classnames from 'classnames'

import { useMobile } from 'hooks/ua'
import Section from 'components/pages/index/Section'
import Tabs, { TabPane } from 'components/UI/Tabs'
import Menu, { SubMenu } from 'components/UI/Menu'
import { Card as UICard, Title, Content, Desc } from 'components/UI/Card'
import { Product, nameMap, urlMap } from 'constants/products'
import ProductIcon from 'components/Product/Icon'
import Link from 'components/Link'

import styles from './style.less'

import TabStorageIcon from './images/tabs/storage.svg'
import TabServiceIcon from './images/tabs/service.svg'
import TabVideoIcon from './images/tabs/video.svg'
import TabIntelligenceIcon from './images/tabs/intelligence.svg'

interface CardProps {
  icon: ReactNode
  title: string
  href?: string
  disabled?: boolean
}

function Card({ icon, title, href, disabled, children }: PropsWithChildren<CardProps>) {
  if (!href) {
    return (
      <UICard className={classnames(styles.card, disabled && styles.disabled)}>
        {icon}
        <Content className={styles.content}>
          <Title className={styles.title}>{title}</Title>
          <Desc className={styles.desc}>{children}</Desc>
        </Content>
      </UICard>
    )
  }
  return (
    <Link href={href}>
      <UICard className={styles.card}>
        {icon}
        <Content className={styles.content}>
          <Title className={styles.title}>{title}</Title>
          <Desc className={styles.desc}>{children}</Desc>
        </Content>
      </UICard>
    </Link>
  )
}

interface AnimProps {
  active: boolean
}

function Anim({ active, children }: PropsWithChildren<AnimProps>) {
  return (
    <QueueAnim ease="easeInOutCubic">
      {
        active
        ? children
        : null
      }
    </QueueAnim>
  )
}

function MenuItem({ title, href, children }: PropsWithChildren<{ title: string, href?: string }>) {
  return (
    <Link href={href}>
      <div className={styles.menuItem}>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.desc}>{children}</p>
      </div>
    </Link>
  )
}

function PaneForMobile({ children }: PropsWithChildren<{}>) {
  return (
    <div className={styles.mobilePane}>
      {children}
    </div>
  )
}

function ProductsForMobile() {
  return (
    <Menu mode="inline">
      <SubMenu title={
        <span className={styles.tab}>
          <TabStorageIcon />存储与数据湖
        </span>
      }
      >
        <PaneForMobile>
          <MenuItem
            title={nameMap[Product.Kodo]}
            href={urlMap[Product.Kodo]}
          >
            高可用、易扩展、低成本、一站式、支持边缘存储
          </MenuItem>
          <MenuItem
            title={nameMap[Product.Archive]}
            href={urlMap[Product.Archive]}
          >
            可定制化的数百 EB 级别、高可靠、强安全的存储系统
          </MenuItem>
          <MenuItem
            title={nameMap[Product.Hdfs]}
            href={urlMap[Product.Hdfs] || undefined}
          >
            正在建设，敬请期待
          </MenuItem>
        </PaneForMobile>
      </SubMenu>
      <SubMenu title={
        <span className={styles.tab}>
          <TabServiceIcon />基础服务
        </span>
      }
      >
        <PaneForMobile>
          <MenuItem
            title={nameMap[Product.Cdn]}
            href={urlMap[Product.Cdn]}
          >
            优质节点、可监控、智能调度的内容分发服务
          </MenuItem>
          <MenuItem
            title={nameMap[Product.Ssl]}
            href={urlMap[Product.Ssl]}
          >
            提供 SSL 证书申请、管理等一站式服务
          </MenuItem>
          <MenuItem
            title={nameMap[Product.Pili]}
            href={urlMap[Product.Pili]}
          >
            提供全球化实时流服务和端到端直播场景解决方案
          </MenuItem>
          <MenuItem
            title={nameMap[Product.Qvm]}
            href={urlMap[Product.Qvm]}
          >
            提供云主机、负载均衡、云数据库、高防等服务
          </MenuItem>
          <MenuItem
            title={nameMap[Product.Sms]}
            href={urlMap[Product.Sms]}
          >
            致力于为用户提供快捷高效的通信服务能力
          </MenuItem>
        </PaneForMobile>
      </SubMenu>
      <SubMenu title={
        <span className={styles.tab}>
          <TabVideoIcon />智能视频
        </span>
      }
      >
        <PaneForMobile>
          <MenuItem
            title={nameMap[Product.Dora]}
            href={urlMap[Product.Dora]}
          >
            提供云端图片、音视频基础处理、丰富的人工智能服务
          </MenuItem>
          <MenuItem
            title={nameMap[Product.Censor]}
            href={urlMap[Product.Censor]}
          >
            提供图片、视频等内容的审核服务，精准识别过滤色情、暴恐、敏感人物等违规内容
          </MenuItem>
          <MenuItem
            title={nameMap[Product.Rtn]}
            href={urlMap[Product.Rtn]}
          >
            基于 WebRTC 的一站式解决方案，零基础搭建音视频平台
          </MenuItem>
          <MenuItem
            title={nameMap[Product.Plsv]}
            href={urlMap[Product.Plsv]}
          >
            自然场景下对整图和文字进行检测、定位和识别
          </MenuItem>
          <MenuItem
            title={nameMap[Product.Plms]}
            href={urlMap[Product.Plms]}
          >
            基于 WebRTC 的一站式解决方案，零基础搭建音视频平台
          </MenuItem>
          <MenuItem
            title={nameMap[Product.FaceID]}
            href={urlMap[Product.FaceID]}
          >
            利用活体检测、1:1 人脸比对、身份证 OCR 等 AI 技术，对用户身份进行审核验证
          </MenuItem>
        </PaneForMobile>
      </SubMenu>
      <SubMenu title={
        <span className={styles.tab}>
          <TabIntelligenceIcon />机器数据智能
        </span>
      }
      >
        <PaneForMobile>
          {/* TODO: 这边内容改为从 constants/products 中 category 定义来 */}
          <MenuItem
            title={nameMap[Product.Express]}
            href={urlMap[Product.Express]}
          >
            助力企业探索数据、创造价值、预见未来
          </MenuItem>
        </PaneForMobile>
      </SubMenu>
    </Menu>
  )
}

export function ProductsForPc() {
  const [activeKey, setActiveKey] = useState('1')
  const onTabChange = (key: string) => {
    setActiveKey(key)
  }
  return (
    <>
      <Tabs defaultValue="1" onChange={onTabChange}>
        <TabPane value="1" tab={<span className={styles.tab}><TabStorageIcon />存储与数据湖</span>} className={styles.pane}>
          {/* 目前缺少合适的文案，先藏起来 */}
          {/* <div className={styles.tip}>七牛云提供的大数据产品集和机器学习产品集可以帮助您以简单直观的方式理解自己的资产</div> */}
          <Anim active={activeKey === '1'}>
            <Card
              key="1"
              icon={<ProductIcon className={styles.icon} product={Product.Kodo} />}
              title={nameMap[Product.Kodo]}
              href={urlMap[Product.Kodo]}
            >
              高可用、易扩展、低成本、一站式、支持边缘存储
            </Card>
            <Card
              key="2"
              icon={<ProductIcon className={styles.icon} product={Product.Archive} />}
              title={nameMap[Product.Archive]}
              href={urlMap[Product.Archive]}
            >
              可定制化的数百 EB 级别、高可靠、强安全的存储系统
            </Card>
            <Card
              key="3"
              icon={<ProductIcon className={styles.icon} product={Product.Hdfs} />}
              title={nameMap[Product.Hdfs]}
              href={urlMap[Product.Hdfs] || undefined}
              disabled
            >
              正在建设，敬请期待
            </Card>
          </Anim>
        </TabPane>
        <TabPane value="2" tab={<span className={styles.tab}><TabServiceIcon />基础服务</span>} className={styles.pane}>
          {/* <div className={styles.tip}>七牛云提供的大数据产品集和机器学习产品集可以帮助您以简单直观的方式理解自己的资产</div> */}
          <Anim active={activeKey === '2'}>
            <Card
              key="1"
              icon={<ProductIcon className={styles.icon} product={Product.Cdn} />}
              title={nameMap[Product.Cdn]}
              href={urlMap[Product.Cdn]}
            >
              优质节点、可监控、智能调度的内容分发服务
            </Card>
            <Card
              key="2"
              icon={<ProductIcon className={styles.icon} product={Product.Ssl} />}
              title={nameMap[Product.Ssl]}
              href={urlMap[Product.Ssl]}
            >
              提供 SSL 证书申请、管理等一站式服务
            </Card>
            <Card
              key="3"
              icon={<ProductIcon className={styles.icon} product={Product.Pili} />}
              title={nameMap[Product.Pili]}
              href={urlMap[Product.Pili]}
            >
              提供全球化实时流服务和端到端直播场景解决方案
            </Card>
            <Card
              key="4"
              icon={<ProductIcon className={styles.icon} product={Product.Qvm} />}
              title={nameMap[Product.Qvm]}
              href={urlMap[Product.Qvm]}
            >
              提供云主机、负载均衡、云数据库、高防等服务
            </Card>
            <Card
              key="5"
              icon={<ProductIcon className={styles.icon} product={Product.Sms} />}
              title={nameMap[Product.Sms]}
              href={urlMap[Product.Sms]}
            >
              致力于为用户提供快捷高效的通信服务能力
            </Card>
          </Anim>
        </TabPane>
        <TabPane value="3" tab={<span className={styles.tab}><TabVideoIcon />智能视频</span>} className={styles.pane}>
          {/* <div className={styles.tip}>七牛云提供的大数据产品集和机器学习产品集可以帮助您以简单直观的方式理解自己的资产</div> */}
          <Anim active={activeKey === '3'}>
            <Card
              key="1"
              icon={<ProductIcon className={styles.icon} product={Product.Dora} />}
              title={nameMap[Product.Dora]}
              href={urlMap[Product.Dora]}
            >
              提供云端图片、音视频基础处理、丰富的人工智能服务
            </Card>
            <Card
              key="2"
              icon={<ProductIcon className={styles.icon} product={Product.Censor} />}
              title={nameMap[Product.Censor]}
              href={urlMap[Product.Censor]}
            >
              提供图片、视频等内容的审核服务，精准识别过滤色情、暴恐、敏感人物等违规内容
            </Card>
            <Card
              key="3"
              icon={<ProductIcon className={styles.icon} product={Product.Pili} />}
              title={nameMap[Product.Pili]}
              href={urlMap[Product.Pili]}
            >
              基于 WebRTC 的一站式解决方案，零基础搭建音视频平台
            </Card>
            <Card
              key="4"
              icon={<ProductIcon className={styles.icon} product={Product.Plsv} />}
              title={nameMap[Product.Plsv]}
              href={urlMap[Product.Plsv]}
            >
              自然场景下对整图和文字进行检测、定位和识别
            </Card>
            <Card
              key="5"
              icon={<ProductIcon className={styles.icon} product={Product.Plms} />}
              title={nameMap[Product.Plms]}
              href={urlMap[Product.Plms]}
            >
              基于 WebRTC 的一站式解决方案，零基础搭建音视频平台
            </Card>
            <Card
              key="6"
              icon={<ProductIcon className={styles.icon} product={Product.FaceID} />}
              title={nameMap[Product.FaceID]}
              href={urlMap[Product.FaceID]}
            >
              利用活体检测、1:1 人脸比对、身份证 OCR 等 AI 技术，对用户身份进行审核验证
            </Card>
          </Anim>
        </TabPane>
        <TabPane value="4" tab={<span className={styles.tab}><TabIntelligenceIcon />机器数据智能</span>} className={styles.pane}>
          {/* <div className={styles.tip}>七牛云提供的大数据产品集和机器学习产品集可以帮助您以简单直观的方式理解自己的资产</div> */}
          <Anim active={activeKey === '4'}>
            {/* TODO: 这边内容改为从 constants/products 中 category 定义来 */}
            <Card
              key="1"
              icon={<ProductIcon className={styles.icon} product={Product.Express} />}
              title={nameMap[Product.Express]}
              href={urlMap[Product.Express]}
            >
              助力企业探索数据、创造价值、预见未来
            </Card>
          </Anim>
        </TabPane>
      </Tabs>
      <Link href="/invite" className={styles.explore}>开始免费体验</Link>
    </>
  )
}

export default function Products() {
  const isMobile = useMobile()
  return (
    <Section grey className={styles.products} title="云产品" style={{ padding: isMobile ? '0' : 'auto' }}>
      {
        isMobile ? <ProductsForMobile /> : <ProductsForPc />
      }
    </Section>
  )
}
