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

import NeedSigninModal, { IProps as INeedSigninModalProps } from 'components/common/NeedSigninModal'

import { effectType } from 'constants/package'

import { IPackageItem } from 'apis/package'
import { IDimensionDropdownItem } from '.'

import ModalStore from './modalStore'
import * as styles from './style.m.less'

export interface IProps extends IPackageItem {
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

  // TODO: 根据登录状态返回不同的模态框
  if (false) {
    const needSigninModalProps: INeedSigninModalProps = {
      is_show,
      control_show_func
    }
    return (
      <NeedSigninModal {...needSigninModalProps} />
    )
  }

  function renderBuyPackageModal() {
    const { quantity, updateQuantityValue, buyPackageBtnClick } = modalStore

    return (
      <Modal
        title="购买商品"
        visible={is_show}
        onCancel={() => {
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
                      {`${item.label} - ${item.value}`}
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
                defaultValue={quantity}
                value={quantity}
                onChange={(value: any) => {
                  updateQuantityValue(value)
                }} />
            </Col>
            <Col className={`${styles.content} ${styles.textCenter}`} span={8} sm={4}>{quantity}&nbsp;个</Col>
            <Col className={styles.title} span={24} sm={8}>生效时间</Col>
            <Col className={`${styles.content} ${styles.btnWrapper}`} span={24} sm={16}>
              <Button
                key="effect_current_month"
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
                key="effect_next_month"
                style={{marginLeft: '0.30rem'}}
                type="primary"
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
    const { isSuccessModalShow, controlSuccessModalShow } = modalStore
    // TODO: 样式
    return (
      <Modal
        title="提示"
        visible={isSuccessModalShow}
        onCancel={() => {
          controlSuccessModalShow(false)
        }}
        footer={null}
        maskClosable={true}
        className={styles.modal}>
          <p className={`${styles.content} ${styles.textCenter}`}>
            商品下单成功，请到&nbsp;
            <Button.Link
              href="https://portal.qiniu.com/financial/orders"
              type="primary"
              target="_blank">财务中心
            </Button.Link>
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
