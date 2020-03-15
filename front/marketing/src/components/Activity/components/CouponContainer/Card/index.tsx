/**
 * @file Production/Editor Mode of CouponCard
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'
import Button from 'react-icecream/lib/button'
import { useLocalStore } from 'qn-fe-core/local-store'

import { ICouponInfo } from 'apis/coupon'

import { asYuan } from 'utils/money'
import { getDerateRule, getValidDuration } from 'utils/coupon'

import Label, { IProps as ILabelProps } from 'components/common/Label'
import Subscript, { IProps as ISubscriptProps } from 'components/common/Subscript'

import CardStore from './store'
import * as styles from './style.m.less'

export interface IProps extends ICouponInfo {}

export default observer(function Card(props: IProps) {
  const {
    label, label_color, coupon_money, threshold_money,
    rule_text, coupon_scope_desc,
    time_period_type, effect_days, coupon_effect_time, coupon_dead_time,
    subscript_name, subscript_text, subscript_color
  } = props

  // 使用局部 store
  const cardStore = useLocalStore(CardStore, props)

  function renderSubscript() {
    if (!subscript_name) {
      return null
    }
    const props: ISubscriptProps = {
      text: subscript_text,
      color: subscript_color
    }
    return (
      <Subscript {...props} />
    )
  }

  function renderLabel() {
    if (!label) {
      return null
    }
    const props: ILabelProps = {
      text: label,
      color: label_color
    }
    return (
      <Label {...props} />
    )
  }

  return (
    <div className={styles.mainWrapper}>
      {renderSubscript()}
      <div className={styles.moneyWrapper}>
        {renderLabel()}
        <p className={styles.money}>
          ￥<span className={styles.huge}>{asYuan(coupon_money).toFixed(2)}</span>
        </p>
      </div>
      <p className={styles.larger}>{getDerateRule(threshold_money)}</p>
      <p className={`${styles.lighter} ${styles.smaller}`}>
        {rule_text || coupon_scope_desc}
      </p>
      <p className={`${styles.lighter} ${styles.smaller}`}>
        {getValidDuration(time_period_type, effect_days, coupon_effect_time, coupon_dead_time)}
      </p>
      <Button
        size="large"
        className={styles.drawBtn}
        loading={cardStore.loadings.isLoading(cardStore.Loading.DrawCoupon)}
        onClick={() => cardStore.drawCouponBtnClick()}>
        {cardStore.loadings.isLoading(cardStore.Loading.DrawCoupon) ? '领取中...' : '立即领取'}
      </Button>
    </div>
  )
})
