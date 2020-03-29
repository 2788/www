/**
 * @file Production Mode of CouponCard
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'
import Button from 'react-icecream/lib/button'
import { useLocalStore } from 'qn-fe-core/local-store'

import Modal from 'react-icecream/lib/modal'
import Icon from 'react-icecream/lib/icon'

import { ICouponInfo } from 'apis/coupon'

import { asYuan } from 'utils/money'
import { getDerateRule, getValidDuration } from 'utils/coupon'

import Label, { IProps as ILabelProps } from 'components/common/Label'
import Subscript, { IProps as ISubscriptProps } from 'components/common/Subscript'
import NeedSigninModal, { IProps as INeedSigninModalProps } from 'components/common/NeedSigninModal'

import CouponCardStore from './store'
import * as styles from './style.m.less'

export interface IProps extends ICouponInfo {}

export default observer(function CouponCard(props: IProps) {
  const {
    label, label_color, coupon_money, threshold_money,
    rule_text, coupon_scope_desc,
    time_period_type, effect_days, coupon_effect_time, coupon_dead_time,
    subscript_name, subscript_text, subscript_color
  } = props

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
      is_show: isNeedSigninModalShow,
      control_show_func: controlNeedSigninModalShow
    }

    return (
      <NeedSigninModal {...needSigninModalProps} />
    )
  }

  function renderSuccessModal() {
    const { isSuccessModalShow, controlSuccessModalShow } = couponCardStore

    const header: JSX.Element = (
      <div className={styles.header}>
        <Icon type="exclamation-circle" />&nbsp;&nbsp;提示
      </div>
    )

    const footer: JSX.Element[] = [
      <Button.Link
        className={styles.footerBtn}
        key="check-coupon"
        href="https://portal.qiniu.com/financial/overview"
        type="primary"
        target="_blank">
        去查看
      </Button.Link>
    ]

    return (
      <Modal
        title={header}
        visible={isSuccessModalShow}
        onCancel={() => {
          controlSuccessModalShow(false)
        }}
        onOk={() => {
          controlSuccessModalShow(false)
        }}
        footer={footer}
        maskClosable={true}
        className={styles.modal}>
          <p className={styles.content}>
            抵用券领取成功，您可以到&nbsp;
            <a
              className={styles.link}
              href="https://portal.qiniu.com/financial/overview"
              type="primary"
              target="_blank">财务中心
            </a>
            &nbsp;查看
          </p>
      </Modal>
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
          // TODO: 根据登录状态触发不同的响应
          if (Math.random() < 0.3) {
            couponCardStore.controlNeedSigninModalShow(true)
            return
          }
          couponCardStore.drawCouponBtnClick()
        }}>
        {couponCardStore.loadings.isLoading(couponCardStore.Loading.DrawCoupon) ? '领取中...' : '立即领取'}
      </Button>
      {renderNeedSigninModal()}
      {renderSuccessModal()}
    </div>
  )
})
