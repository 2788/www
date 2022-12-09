/**
 * @file 校园开发者成长计划页面 - 学习中心
 */

import React, { ReactNode } from 'react'
import { chunk } from 'lodash'

import { useMobile } from 'hooks/ua'
import { Row } from 'components/UI/Card'
import Link from 'components/Link'
import { ProductInfo } from 'apis/admin/product'
import { LibIcon } from 'components/LibIcon'

import ArrowRight from './images/arrow.svg'
import xushiweiImg from './images/xushiwei.png'
import xushiweiMobileImg from './images/xushiwei_mobile.png'
import linhaoImg from './images/linhao.png'
import linhaoMobileImg from './images/linhao_mobile.png'
import huangdongxuImg from './images/huangdongxu.png'
import huangdongxuMobileImg from './images/huangdongxu_mobile.png'
import xiongfeiImg from './images/xiongfei.png'
import xiongfeiMobileImg from './images/xiongfei_mobile.png'

import styles from './style.less'

const quickStartData = [
  { productId: 'kodo', title: '对象存储快速入门', url: 'https://developer.qiniu.com/kodo/1233/console-quickstart' },
  { productId: 'dora', title: '创建转码任务', url: 'https://developer.qiniu.com/dora/6486/submit-transcoding-task-quickly' },
  { productId: 'qcdn', title: 'CDN 快速入门', url: 'https://developer.qiniu.com/fusion/1228/fusion-quick-start' },
  { productId: 'rtn', title: '实时音视频快速入门', url: 'https://developer.qiniu.com/rtc/8802/pd-overview' }
] as const

export const allProductIds = quickStartData.map(item => item.productId)

export function StudyCenter({
  productInfoMap
}: { productInfoMap: Record<(typeof allProductIds)[number], ProductInfo> }) {
  return (
    <div className={styles.wrapper}>
      <QuickStart productInfoMap={productInfoMap} />
      <Career />
    </div>
  )
}

function QuickStart({
  productInfoMap
}: { productInfoMap: Record<(typeof allProductIds)[number], ProductInfo> }) {
  return (
    <div className={styles.quickStartWraper}>

      <div className={styles.intro}>
        <h3 className={styles.introTitle}>新手快速入门</h3>
        <span className={styles.introDesc}>针对入门级别开发者，七牛云准备了丰富的产品入门教程，帮助您更快上手。</span>
      </div>

      <div className={styles.content}>
        {chunk(quickStartData, 2).map((lists, idx) => (
          <Row key={idx} className={styles.contentRow}>
            {lists.map(item => (
              <QuickStartItem
                key={item.title}
                icon={
                  <LibIcon src={productInfoMap[item.productId].icon.glass} alt={productInfoMap[item.productId].path} />
                }
                title={item.title}
                url="https://developer.qiniu.com/kodo/1233/console-quickstart"
              />
            ))}
          </Row>
        ))}
      </div>

    </div>
  )
}

function QuickStartItem({ icon, title, url }: { icon: ReactNode, title: string, url: string }) {
  const isMobile = useMobile()
  return (
    <Link className={styles.quickStartItem} href={url}>
      <span className={styles.itemIcon}>{icon}</span>
      <span className={styles.itemTitle}>{title}</span>
      <span className={styles.arrowIcon}>
        {isMobile && <ArrowRight />}
      </span>
    </Link>
  )
}

function Career() {
  const isMobile = useMobile()
  return (
    <div className={styles.careerWrapper}>
      <div className={styles.content}>
        <CareerItem
          url="/pgc/detail/74ee7517f0c4c8bfa2773374"
          bg={isMobile ? xushiweiMobileImg : xushiweiImg}
          text="工程师成长之道"
        />
        <CareerItem
          url="/pgc/detail/5c01600a9488e225d11b538f"
          bg={isMobile ? linhaoMobileImg : linhaoImg}
          text="开发者提升代码硬实力之路"
        />
        <CareerItem
          url="/pgc/detail/0b75eb16e5760f1229da7f4f"
          bg={isMobile ? huangdongxuMobileImg : huangdongxuImg}
          text="写给后端程序员看的认知心理学"
        />
        <CareerItem
          url="/pgc/detail/ec0759328ec2404b8008ff7c"
          bg={isMobile ? xiongfeiMobileImg : xiongfeiImg}
          text="开源的先进性"
        />
      </div>
      <div className={styles.intro}>
        <h3 className={styles.introTitle}>工程师的职业发展</h3>
        <span className={styles.introDesc}>行业大牛干货分享，助你收获精彩的程序人生。</span>
      </div>
    </div>
  )
}

function CareerItem({ url, bg, text }: { url: string, bg: string, text: string }) {
  return (
    <Link className={styles.careerItemWrapper} href={url}>
      <div className={styles.img}>
        <img src={bg} alt={text} />
      </div>
      <div className={styles.text}>{text}</div>
    </Link>
  )
}
