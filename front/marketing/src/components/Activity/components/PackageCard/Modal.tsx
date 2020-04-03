/**
 * @file Production Mode of Package Buy Modal
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'
import { useLocalStore } from 'qn-fe-core/local-store'

import Modal from 'react-icecream/lib/modal'
import Button from 'react-icecream/lib/button'
import Row from 'react-icecream/lib/row'
import Col from 'react-icecream/lib/col'
import Slider from 'react-icecream/lib/slider'
import Icon from 'react-icecream/lib/icon'

import { effectType } from 'constants/package'
import { portalHost } from 'constants/host'

import { IPackageItem } from 'apis/package'
import { IDimensionDropdownItem } from '.'

import ModalStore from './modalStore'
import * as styles from './style.m.less'

export interface IProps extends IPackageItem {
  code: string // activity code
  product_type: string
  package_name: string
  dimension_list: IDimensionDropdownItem[]
  is_show: boolean
  control_show_func: (isShow: boolean) => void
}

export default observer(function PackageModal(props: IProps) {
  const {
    item_id, max_purchases,
    package_name, dimension_list,
    is_show, control_show_func
  } = props

  // 使用局部 store
  const modalStore = useLocalStore(ModalStore, props)

  function renderBuyPackageModal() {
    const { quantity, updateQuantityValue, buyPackageBtnClick } = modalStore

    const header: JSX.Element = (
      <div className={styles.header}>
        <Icon type="shopping" />&nbsp;&nbsp;商品下单
      </div>
    )

    return (
      <Modal
        title={header}
        visible={is_show}
        onCancel={() => {
          control_show_func(false)
        }}
        onOk={() => {
          control_show_func(false)
        }}
        footer={null}
        maskClosable={true}
        className={styles.modal}>
          <Row className={styles.contentWrapper} gutter={24} type="flex" align="middle">
            <Col className={styles.title} span={24} sm={8}>商品名称</Col>
            <Col className={styles.content} span={24} sm={16}>{package_name}</Col>
            <Col className={styles.title} span={24} sm={8}>商品规格</Col>
            <Col className={styles.content} span={24} sm={16}>
              <ul>{
                dimension_list.map((item: IDimensionDropdownItem, index: number) => {
                  return (
                    <li key={`package-modal-dimension-${index}`}>
                      {item.label}：{item.value}
                    </li>
                  )
                })
              }</ul>
            </Col>
            <Col className={styles.title} span={24} sm={8}>购买数量</Col>
            <Col className={styles.content} span={16} sm={12}>
              <Slider
                min={1}
                max={parseInt(max_purchases)}
                value={quantity}
                onChange={(value: any) => {
                  updateQuantityValue(value)
                }} />
            </Col>
            <Col className={`${styles.content} ${styles.textCenter}`} span={8} sm={4}>{quantity}&nbsp;个</Col>
            <Col className={styles.title} span={24} sm={8}>生效时间</Col>
            <Col className={`${styles.content} ${styles.btnWrapper}`} span={24} sm={16}>
              <Button
                key="effect-current-month"
                type="primary"
                size="large"
                disabled={!item_id}
                loading={modalStore.loadings.isLoading(modalStore.Loading.BuyPackage)}
                onClick={() => {
                  buyPackageBtnClick(effectType.CURRENT_MONTH)
                }}>
                当月生效
              </Button>
              <Button
                key="effect-next-month"
                style={{marginLeft: '0.20rem'}}
                type="default"
                size="large"
                disabled={!item_id}
                loading={modalStore.loadings.isLoading(modalStore.Loading.BuyPackage)}
                onClick={() => {
                  buyPackageBtnClick(effectType.NEXT_MONTH)
                }}>
                次月生效
              </Button>
            </Col>
          </Row>
      </Modal>
    )
  }

  function renderSuccessModal() {
    const { orderHash, isSuccessModalShow, controlSuccessModalShow } = modalStore

    const header: JSX.Element = (
      <div className={styles.header}>
        <Icon type="exclamation-circle" />&nbsp;&nbsp;提示
      </div>
    )

    const footer: JSX.Element[] = [
      <Button.Link
        className={styles.footerBtn}
        key="check-pay"
        href={`${portalHost}/financial/verify-order/${orderHash}`}
        type="primary"
        target="_blank">
        去支付
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
          <p className={`${styles.content} ${styles.larger}`}>
            商品下单成功，请到&nbsp;
            <a
              className={styles.link}
              href={`${portalHost}/financial/verify-order/${orderHash}`}
              type="primary"
              target="_blank">财务中心
            </a>
            &nbsp;确认支付
          </p>
      </Modal>
    )
  }

  return (
    <div>
      {renderBuyPackageModal()}
      {renderSuccessModal()}
    </div>
  )
})
