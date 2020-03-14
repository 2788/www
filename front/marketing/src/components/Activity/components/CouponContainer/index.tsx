/**
 * @file Production Mode of CouponContainer
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React, { forwardRef, Ref } from 'react'
import { observer } from 'mobx-react'
import Spin from 'react-icecream/lib/spin'
import Row from 'react-icecream/lib/row'
import Col from 'react-icecream/lib/col'
import { useLocalStore } from 'qn-fe-core/local-store'
import classNames from 'classnames/bind'

import { ComponentName, IComponentInfo } from 'apis/component'
import { ICouponInfo } from 'apis/coupon'
import { IBaseProps } from '../..'

import Card from './Card'

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
  const { info: { key, data: { count_per_row, background_from, background_to } } } = props

  // 使用局部 store
  const couponContainerStore = useLocalStore(CouponContainerStore, props)

  const bgColorStyle = {
    background: `linear-gradient(${background_from}, ${background_to})`
  }

  const COL_SPAN_TOTAL_COUNT = 24
  const colSpanCount = COL_SPAN_TOTAL_COUNT / count_per_row

  const cx = classNames.bind(styles)

  function renderCouponCard() {
    const { coupon_list } = couponContainerStore
    return coupon_list.map((item: ICouponInfo, index: number) => {
      return (
        <Card {...item} key={`${key}-coupon-${index}`}></Card>
      )
    })
  }

  function isSinglePerRow() {
    return count_per_row && colSpanCount === COL_SPAN_TOTAL_COUNT
  }

  return (
    <Spin
      size='large'
      className={styles.spinWrapper}
      spinning={couponContainerStore.loadings.isLoading(couponContainerStore.Loading.FetchList)}>
      <div className="features" style={bgColorStyle} ref={ref}>
        <div className="container">
          <Row
            className={styles.mainWrapper}
            gutter={48}>
            <Col
              className={cx({singlePerRow: isSinglePerRow()})}
              span={COL_SPAN_TOTAL_COUNT}
              md={{ span: isSinglePerRow() ? COL_SPAN_TOTAL_COUNT : COL_SPAN_TOTAL_COUNT / 2}}
              lg={{ span: colSpanCount}}>
              {renderCouponCard()}
            </Col>
          </Row>
        </div>
      </div>
    </Spin>
  )
}))
