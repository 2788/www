/**
 * @file Production Mode of PackageSingleCard
 * 一行一个的商品卡片
 * 由于布局和样式不同，和 PackageCard 区分开
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'
import Row from 'react-icecream/lib/row'
import Col from 'react-icecream/lib/col'
import Button from 'react-icecream/lib/button'
import { useLocalStore } from 'qn-fe-core/local-store'

import { IPackageInfo, IPackageProperty } from 'apis/package'

import Label, { IProps as ILabelProps } from 'components/common/Label'
import Subscript, { IProps as ISubscriptProps } from 'components/common/Subscript'

import PackageCardStore from './store'
import * as styles from './style.m.less'

export default observer(function PackageSingleCard(props: IPackageInfo) {
  const {
    id, title, subtitle,
    properties,
    label, label_color,
    subscript_name, subscript_text, subscript_color
  } = props

  // 使用局部 store
  const packageCardStore = useLocalStore(PackageCardStore, props)

  const SPAN_TOTAL_COUNT = 24

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
      <div className={styles.titleWrapper}>
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
                span={SPAN_TOTAL_COUNT / 2}
                sm={{ span: SPAN_TOTAL_COUNT / 4 }}>
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

  function renderMoneyWrapper() {
    return (
      <div className={styles.moneyWrapper}>
        <p className={`${styles.money} ${styles.smaller}`}>
          ￥<span className={styles.huge}>20000</span>
        </p>
        <p className={`${styles.money} ${styles.smaller}`}>
          省&nbsp;10000&nbsp;元&nbsp;<span className={styles.originMoney}>原价&nbsp;30000&nbsp;元</span>
        </p>
      </div>
    )
  }

  function renderBuyBtnWrapper() {
    return (
      <div className={styles.buyBtnWrapper}>
        <Button
          className={styles.buyBtn}
          size="large">
          立即抢购
        </Button>
      </div>
    )
  }

  return (
    <div className={`${styles.mainWrapper} ${styles.single}`}>
      {renderSubscript()}
      <div className={styles.infoWrapper}>
        <Row gutter={8} type="flex" justify="space-around" align="middle">
          <Col span={4}>
            {renderTitleWrapper()}
          </Col>
          <Col span={10}>
            {renderPropertyWrapper()}
          </Col>
          <Col span={6} lg={{ span: 5 }}>
            {renderMoneyWrapper()}
          </Col>
          <Col span={4} lg={{ span: 5 }}>
            {renderBuyBtnWrapper()}
          </Col>
        </Row>
      </div>
    </div>
  )
})
