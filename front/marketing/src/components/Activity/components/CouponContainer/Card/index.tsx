/**
 * @file Production/Editor Mode of CouponCard
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'
import Spin from 'react-icecream/lib/spin'
import Button from 'react-icecream/lib/button'
import { useLocalStore } from 'qn-fe-core/local-store'

import { ICouponInfo } from 'apis/coupon'

import { asYuan } from 'utils/money'
import { getDerateRule, getValidDuration } from 'utils/coupon'

import Label, { IProps as ILabelProps } from 'components/common/Label'

import CardStore from './store'
import * as styles from './style.m.less'

export interface IProps extends ICouponInfo {}

export default observer(function Card(props: IProps) {
  const {
    label, label_color, coupon_money, threshold_money, 
    rule_text, coupon_scope_desc,
    time_period_type, effect_days, coupon_effect_time, coupon_dead_time
  } = props

  // 使用局部 store
  const cardStore = useLocalStore(CardStore, props)

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
    <Spin
      className={styles.spinWrapper}
      spinning={cardStore.loadings.isLoading(cardStore.Loading.DrawCoupon)}
      tip="领取中...">
      <div className={styles.mainWrapper}>
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
          className={styles.drawBtn}
          size="large">
          立即领取
        </Button>
      </div>
    </Spin>
  )
})
