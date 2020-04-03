/**
 * @file Production Mode of CouponCard
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'

import { useInjection } from 'qn-fe-core/di'
import { useLocalStore } from 'qn-fe-core/local-store'

import Button from 'react-icecream/lib/button'

import { ICouponInfo } from 'apis/coupon'

import { asYuan } from 'utils/money'
import { getDerateRule, getValidDuration } from 'utils/coupon'

import Label, { IProps as ILabelProps } from 'components/common/Label'
import Subscript, { IProps as ISubscriptProps } from 'components/common/Subscript'
import NeedSigninModal, { IProps as INeedSigninModalProps } from 'components/common/NeedSigninModal'

import UserStore from 'stores/user'
import CouponCardStore from './store'

import * as styles from './style.m.less'

export interface IProps extends ICouponInfo {
  code: string // activity code
}

export default observer(function CouponCard(props: IProps) {
  const {
    code,
    label, label_color, coupon_money, threshold_money,
    rule_text, coupon_scope_desc,
    time_period_type, effect_days, coupon_effect_time, coupon_dead_time,
    subscript_name, subscript_text, subscript_color
  } = props

  const userStore = useInjection(UserStore)
  // 使用局部 store
  const couponCardStore = useLocalStore(CouponCardStore, props)

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

  function renderValidDuration() {
    const content: string = getValidDuration(
      time_period_type, effect_days,
      coupon_effect_time, coupon_dead_time
    )
    if (!content) {
      return null
    }
    return (
      <p className={`${styles.lighter} ${styles.smaller}`}>
        {content}
      </p>
    )
  }

  function renderNeedSigninModal() {
    const { isNeedSigninModalShow, controlNeedSigninModalShow } = couponCardStore

    const needSigninModalProps: INeedSigninModalProps = {
      code,
      is_show: isNeedSigninModalShow,
      control_show_func: controlNeedSigninModalShow
    }

    return (
      <NeedSigninModal {...needSigninModalProps} />
    )
  }

  return (
    <div className={styles.mainWrapper}>
      {renderSubscript()}
      <div className={styles.moneyWrapper}>
        {renderLabel()}
        <p className={styles.money}>
          ￥<span className={styles.huge}>{asYuan(parseInt(coupon_money)).toFixed(2)}</span>
        </p>
      </div>
      <p className={styles.larger}>{getDerateRule(parseInt(threshold_money))}</p>
      <p className={`${styles.lighter} ${styles.smaller}`}>
        {rule_text || coupon_scope_desc}
      </p>
      {renderValidDuration()}
      <Button
        size="large"
        className={styles.drawBtn}
        loading={couponCardStore.loadings.isLoading(couponCardStore.Loading.DrawCoupon)}
        onClick={() => {
          if (!userStore.isSignIn) {
            couponCardStore.controlNeedSigninModalShow(true)
            return
          }
          couponCardStore.drawCouponBtnClick()
        }}>
        {couponCardStore.loadings.isLoading(couponCardStore.Loading.DrawCoupon) ? '领取中...' : '立即领取'}
      </Button>
      {renderNeedSigninModal()}
    </div>
  )
})
