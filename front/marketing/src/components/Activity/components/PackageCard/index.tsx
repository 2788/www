/**
 * @file Production Mode of PackageCard
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'
import Row from 'react-icecream/lib/row'
import Col from 'react-icecream/lib/col'
import Button from 'react-icecream/lib/button'
import Select from 'react-icecream/lib/select'

import { useLocalStore } from 'qn-fe-core/local-store'

import { IPackageInfo, IPackageProperty } from 'apis/package'

import { asYuan } from 'utils/money'
import { packageProductType } from 'constants/package'

import Label, { IProps as ILabelProps } from 'components/common/Label'
import Subscript, { IProps as ISubscriptProps } from 'components/common/Subscript'

import { IDimensionDropdownItem } from '.'
import PackageModal from './Modal'

import PackageCardStore from './store'
import * as styles from './style.m.less'

export interface IProps extends IPackageInfo {
  is_single: boolean
}

export interface IDimensionDropdownItem {
  label: string
  value: string
  list: string[]
}

export default observer(function PackageCard(props: IProps) {
  const {
    is_single,
    id, title, subtitle, product_type,
    appear_fee, properties,
    label, label_color,
    subscript_name, subscript_text, subscript_color
  } = props

  // 使用局部 store
  const packageCardStore = useLocalStore(PackageCardStore, props)

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

  function renderTitleWrapper() {
    return (
      <div>
        {renderLabel()}
        <h2 className={styles.title}>{title}</h2>
        <p className={`${styles.smaller} ${styles.lighter}`}>{subtitle}</p>
      </div>
    )
  }

  function renderPropertyWrapper() {
    if (!properties || !properties.length) {
      return null
    }

    return (
      <div className={styles.propertyWrapper}>
        <Row type="flex" justify="space-around" align="middle">{
          properties.map((item: IPackageProperty, index: number) => {
            return (
              <Col
                key={`package-${id}-property-col-${index}`}
                span={12}
                sm={6}>
                <table>
                  <thead>
                    <tr><th>{item.key}</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>{item.value}</td></tr>
                  </tbody>
                </table>
              </Col>
            )
          })
        }</Row>
      </div>
    )
  }

  function renderInfoWrapper() {
    return (
      <div className={styles.infoWrapper}>
        <Row gutter={8} type="flex" justify="space-around" align="middle">
          <Col span={24} sm={{ span: is_single ? 12 : 24 }}>
            {renderTitleWrapper()}
          </Col>
          <Col span={24} sm={{ span: (!properties || !properties.length || !is_single) ? 24 : 12 }}>
            {renderPropertyWrapper()}
          </Col>
        </Row>
      </div>
    )
  }

  function renderMoneyWrapper() {
    const { selectedPackage } = packageCardStore
    if (!selectedPackage) {
      return null
    }

    const { fee = '-', c_fee = '-' } = selectedPackage
    const originDom: JSX.Element | null = appear_fee ? (
        <p className={`${styles.money} ${styles.smaller}`}>
          省&nbsp;{asYuan(parseInt(fee) - parseInt(c_fee)).toFixed(2)}&nbsp;元&nbsp;
          <span className={styles.originMoney}>原价&nbsp;{asYuan(parseInt(fee)).toFixed(2)}&nbsp;元</span>
        </p>
      ) : null

    return (
      <div className={styles.moneyWrapper}>
        <p className={`${styles.money} ${styles.smaller}`}>
          ￥<span className={styles.huge}>{asYuan(parseInt(c_fee)).toFixed(2)}</span>
        </p>
        {originDom}
      </div>
    )
  }

  function renderBuyBtnWrapper() {
    const { selectedPackage, controlBuyPackageModalShow } = packageCardStore

    if (!selectedPackage) {
      return null
    }

    if (product_type === packageProductType.LINK) {
      const { url = '' } = selectedPackage

      return (
        <div className={styles.buyBtnWrapper}>
          <Button
            className={styles.buyBtn}
            size="large"
            href={url}
            target="_blank">
            立即抢购
          </Button>
        </div>
      )
    }

    return (
      <div className={styles.buyBtnWrapper}>
        <Button
          className={styles.buyBtn}
          size="large"
          onClick={() => {
            controlBuyPackageModalShow(true)
          }}>
          立即抢购
        </Button>
      </div>
    )
  }

  function renderMoneyAndBtnWrapper() {
    return (
      <div className={styles.moneyAndBtnWrapper}>
        <Row gutter={24} type="flex" justify="space-around" align="middle">
          <Col span={24} sm={{ span: is_single ? 18 : 24 }}>
            {renderMoneyWrapper()}
          </Col>
          <Col span={24} sm={{ span: is_single ? 6 : 24 }}>
            {renderBuyBtnWrapper()}
          </Col>
        </Row>
      </div>
    )
  }

  function renderDimensionDropdownWrapper() {
    const { dimensionDropdownList, setDimensionDropdownValue } = packageCardStore
    if (!dimensionDropdownList || !dimensionDropdownList.length) {
      return null
    }

    let countPerRow: number = dimensionDropdownList.length === 1 ? 24 : 12
    if (is_single) {
      countPerRow = 8
    }

    return (
      <div className={styles.dimensionWrapper}>
        <Row gutter={8} type="flex" align="middle">{
          dimensionDropdownList.map((item: IDimensionDropdownItem, colIndex: number) => {
            const { label, value, list } = item

            return (
              <Col
                key={`package-${id}-dimension-col-${colIndex}`}
                className={styles.dimensionDropdownCol}
                span={24}
                sm={{ span: countPerRow }}>
                <p className={styles.larger}>{label}</p>
                <Select
                  className={styles.dimensionDropdown}
                  defaultValue={value}
                  value={value}
                  disabled={list.length === 1}
                  onChange={(value: any) => {
                    setDimensionDropdownValue(value, colIndex)
                  }}>{
                    list.map((item: string, optionIndex: number) => {
                      return (
                        <Select.Option
                         key={`package-${id}-dimension-${colIndex}-option-${optionIndex}`}
                         value={item}>
                         {item}
                        </Select.Option>
                      )
                    })
                  }
                </Select>
              </Col>
            )
          })
        }</Row>
      </div>
    )
  }

  function renderModal() {
    const {
      selectedPackage, dimensionDropdownList,
      isBuyPackageModalShow, controlBuyPackageModalShow,
    } = packageCardStore

    if (!selectedPackage) {
      return null
    }

    return (
      <PackageModal
        {...selectedPackage}
        package_name={title}
        dimension_list={dimensionDropdownList}
        is_show={isBuyPackageModalShow}
        control_show_func={controlBuyPackageModalShow} />
    )
  }

  return (
    <div className={`${styles.mainWrapper} ${ is_single ? styles.single : ''}`}>
      {renderSubscript()}
      {renderInfoWrapper()}
      {renderDimensionDropdownWrapper()}
      {renderMoneyAndBtnWrapper()}
      {renderModal()}
    </div>
  )
})
