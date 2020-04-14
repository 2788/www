/**
 * @file Production Mode of CouponContainer
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React, { forwardRef, Ref } from 'react'
import { observer } from 'mobx-react'
import Spin from 'react-icecream/lib/spin'
import Row from 'react-icecream/lib/row'
import Col from 'react-icecream/lib/col'
import Button from 'react-icecream/lib/button'
import { useLocalStore } from 'qn-fe-core/local-store'

import { ComponentName, IComponentInfo } from 'apis/component'
import { ICouponInfo } from 'apis/coupon'
import { IBaseProps } from '../..'

import CouponCard from '../CouponCard'

import CouponContainerStore from './store'
import * as styles from './style.m.less'

export interface IConfig {
  group: string // 抵用券所属产品线
  background_from: string // 背景颜色开始色
  background_to: string // 背景颜色结束色
  show_more_text: string // 容器底部按钮文案，如果 !== "" 则显示按钮
  show_more_link: string // 容器底部按钮跳转链接
  show_more_bg_color: string // 容器底部按钮背景色
  count_per_row: number // 每行显示多少个抵用券卡片，当前支持范围：1 - 4
}

export interface IProps extends IBaseProps {
  info: IComponentInfo<ComponentName.CouponContainer>
}

export default observer(forwardRef(function CouponContainer(props: IProps, ref: Ref<any>) {
  const { code, info: { key, data: {
    count_per_row, background_from, background_to,
    show_more_text, show_more_link, show_more_bg_color
  } } } = props

  // 使用局部 store
  const couponContainerStore = useLocalStore(CouponContainerStore, props)

  const bgColorStyle = {
    background: `linear-gradient(${background_from}, ${background_to})`
  }

  const SPAN_TOTAL_COUNT = 24
  const spanCount = SPAN_TOTAL_COUNT / count_per_row

  function isSinglePerRow() {
    return !!(count_per_row && spanCount === SPAN_TOTAL_COUNT)
  }

  function renderCouponCard() {
    const { couponList } = couponContainerStore
    if (isSinglePerRow()) {
      return couponList.map((item: ICouponInfo, index: number) => {
        return (
          <Row
            key={`${key}-coupon-row-${index}`}
            className={styles.mainWrapper}
            gutter={48}>
            <Col
              className={styles.singlePerRow}
              span={SPAN_TOTAL_COUNT}>
              <CouponCard {...item} code={code}></CouponCard>
            </Col>
          </Row>
        )
      })
    }

    return (
      <Row
        className={styles.mainWrapper}
        gutter={48}>
        {couponList.map((item: ICouponInfo, index: number) => {
          return (
            <Col
              key={`${key}-coupon-col-${index}`}
              span={SPAN_TOTAL_COUNT}
              sm={{ span: SPAN_TOTAL_COUNT / 2 }}
              lg={{ span: spanCount }}>
              <CouponCard {...item} code={code}></CouponCard>
            </Col>
          )
        })}
      </Row>
    )
  }

  function renderShowMoreBtn() {
    if (!show_more_text) {
      return null
    }
    const bgColorStyle = {
      backgroundColor: show_more_bg_color
    }
    return (
      <div className={styles.showMoreBtnWrapper}>
        <Button
          className={styles.showMoreBtn}
          style={bgColorStyle}
          href={show_more_link}
          size="large"
          target="_blank">
          {show_more_text}
        </Button>
      </div>
    )
  }

  return (
    <Spin
      size="large"
      className={styles.spinWrapper}
      spinning={couponContainerStore.loadings.isLoading(couponContainerStore.Loading.FetchList)}>
      <div className={styles.features} style={bgColorStyle} ref={ref}>
        <div className={styles.container}>
          {renderCouponCard()}
          {renderShowMoreBtn()}
        </div>
      </div>
    </Spin>
  )
}))
