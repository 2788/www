/**
 * @file 完备的一站式视频能力
 */

import React, { FC, ReactNode, SVGAttributes } from 'react'

import { Desc, Card as UICard, Title, Row, Content } from 'components/UI/Card'
import Link from 'components/Link'

import { useMobile } from 'hooks/ua'
import { Product, urlMap } from 'constants/products'

import Section from '../Section'

import Icon1 from './images/直播.svg'
import Icon2 from './images/点播.svg'
import Icon3 from './images/实时音视频.svg'
import Icon4 from './images/摄像头智能分析.svg'
import NextArrow from './images/next.svg'

import styles from './style.less'

export default function VideoAbility() {
  const isMobile = useMobile()
  const desc1 = isMobile ? '强大的全球化实时流网络；完善的客户端服务和云端服务；可无缝切换低延时直。' : <>强大的全球化实时流网络<br />完善的客户端服务和云端服务<br />可无缝切换低延时直播</>
  const desc2 = isMobile ? '集视频采集、编辑、上传、管理、分发于一体；全站加速保障音视频点播服务的稳定；多种转码模板适配不同网络环境。' : <>集视频采集、编辑、上传、管理、分发于一体<br />全站加速保障音视频点播服务的稳定<br />多种转码模板适配不同网络环境</>
  const desc3 = isMobile ? '支持 1v1 视频通话、互动直播、语音聊天室等；自研 RTC 端到端延迟小于 200 ms；支持万人规模的超大房间。' : <>支持 1v1 视频通话、互动直播、语音聊天室等<br />自研 RTC 端到端延迟小于 200 ms<br />支持万人规模的超大房间</>
  const desc4 = isMobile ? '集直播、录制、存储、监看、点播为一体；视频流上云实时流畅观看；智能多媒体服务及智能识别技术。' : <>集直播、录制、存储、监看、点播为一体<br />视频流上云实时流畅观看<br />智能多媒体服务及智能识别技术</>
  return (
    <Section
      title="完备的一站式视频能力"
      subtitle="覆盖音视频生产、处理、传输、消费全流程，集直播、点播、实时音视频、摄像头智能分析为一体，满足不同场景需求。"
      dark
    >
      <Row className={styles.row}>
        <Card
          href={urlMap[Product.Pili]}
          icon={Icon1}
          title="直播"
          desc={desc1}
        />
        <Card
          href={urlMap[Product.Plsv]}
          icon={Icon2}
          title="点播"
          desc={desc2}
        />
      </Row>
      <Row className={styles.row}>
        <Card
          href={urlMap[Product.Rtn]}
          icon={Icon3}
          title="实时音视频"
          desc={desc3}
        />
        <Card
          href={urlMap[Product.Qvs]}
          icon={Icon4}
          title="摄像头智能分析"
          desc={desc4}
        />
      </Row>
    </Section>
  )
}

type Props = {
  href: string
  title: ReactNode
  desc: ReactNode
  icon: FC<SVGAttributes<SVGElement>>
}

function Card({ href, icon: Icon, title, desc }: Props) {
  const isMobile = useMobile()
  const children = [
    <Icon key="1" className={styles.icon} />,
    <Content key="2" className={styles.content}>
      <Title className={styles.title}>{title}</Title>
      <Desc className={styles.desc}>{desc}</Desc>
    </Content>
  ]
  return (
    <Link className={styles.link} href={href}>
      <UICard className={styles.card} horizontal>
        {!isMobile && <div className={styles.background} />}
        {!isMobile && <NextArrow className={styles.arrow} />}
        {isMobile ? children.reverse() : children}
      </UICard>
    </Link>
  )
}
