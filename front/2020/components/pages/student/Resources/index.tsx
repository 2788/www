/**
 * @file 校园开发者成长计划页面 - 海量云资源免费领取
 */

import React, { PropsWithChildren, ReactNode } from 'react'
import classnames from 'classnames'

import { Card, Row } from 'components/UI/Card'
import { useMobile } from 'hooks/ua'
import Button from 'components/UI/Button'
import { ProductInfo } from 'apis/admin/product'
import { LibIcon } from 'components/LibIcon'

import styles from './style.less'

const data = [
  { productId: 'kodo', sub: '文件、图片及视频等数据存储', features: ['标准存储：40GB/月', '有效期：12 个月', 'CDN 回源流量：100GB/年'] },
  { productId: 'qcdn', sub: '急速提升访问体验，智能路由选择', features: ['CDN 下行通用流量：全时段 100GB', '有效期：1 年'] },
  { productId: 'dora', sub: '图片处理，影视片转码及智能识别等', features: ['H.264 普通转码：5000 分钟'] },
  { productId: 'rtn', sub: '支持视频通话，直播连麦/旁路直播', features: ['合流转推通用时长：20000 分钟/月', '单路转推通用时长：20000 分钟/月'] }
] as const

export const allProductIds = data.map(d => d.productId)

export function Resources({ productInfoMap }: { productInfoMap: Record<(typeof allProductIds)[number], ProductInfo> }) {
  return (
    <div className={styles.wrapper}>
      <Row>
        {data.map(({ productId, sub, features }) => (
          <MyCard
            key={productInfoMap[productId].path}
            title={productInfoMap[productId].name}
            sub={sub}
            icon={<LibIcon src={productInfoMap[productId].icon.glass} alt={productInfoMap[productId].path} />}
          >
            <List>
              {[...features].map(feature => <Item key={feature}>{feature}</Item>)}
            </List>
          </MyCard>
        ))}
      </Row>

      <Button className={styles.getBtn} type="primary" href="https://marketing.qiniu.com/activity/student_growth">立即领取</Button>
      <div className={styles.moreText}>更多免费资源上架中，敬请期待</div>
    </div>
  )
}

function MyCard({ icon, title, sub, children }: PropsWithChildren<{ icon: ReactNode, title: string, sub: string }>) {
  const isMobile = useMobile()

  return (
    <Card className={classnames(styles.myCard, isMobile ? styles.mobileCard : styles.pcCard)}>
      <div className={styles.iconWrapper}>{icon}</div>
      <h3>{title}</h3>
      <h5>{sub}</h5>
      {children}
    </Card>
  )
}

function List({ children }: PropsWithChildren<{}>) {
  return <ul className={styles.list}>{children}</ul>
}

function Item({ children }: PropsWithChildren<{}>) {
  return <li className={styles.item}>{children}</li>
}
