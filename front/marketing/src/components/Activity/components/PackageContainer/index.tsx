/**
 * @file Production Mode of PackageContainer
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
import { IPackageInfo } from 'apis/package'
import { IBaseProps } from '../..'

import PackageCard from '../PackageCard'

import PackageContainerStore from './store'
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
  info: IComponentInfo<ComponentName.PackageContainer>
}

export default observer(forwardRef(function PackageContainer(props: IProps, ref: Ref<any>) {
  const { info: { key, data: {
    count_per_row, background_from, background_to,
    show_more_text, show_more_link, show_more_bg_color
  } } } = props

  // 使用局部 store
  const packageContainerStore = useLocalStore(PackageContainerStore, props)

  const bgColorStyle = {
    background: `linear-gradient(${background_from}, ${background_to})`
  }

  const SPAN_TOTAL_COUNT = 24
  const spanCount = SPAN_TOTAL_COUNT / count_per_row

  function isSinglePerRow() {
    return !!(count_per_row && spanCount === SPAN_TOTAL_COUNT)
  }

  function renderPackageCard() {
    const { packageList } = packageContainerStore

    return (
      <Row
        className={styles.mainWrapper}
        gutter={48}>{
          packageList.map((item: IPackageInfo, index: number) => {
            return (
              <Col
                key={`${key}-package-col-${index}`}
                span={SPAN_TOTAL_COUNT}
                sm={{ span: isSinglePerRow() ? SPAN_TOTAL_COUNT : SPAN_TOTAL_COUNT / 2 }}
                lg={{ span: spanCount }}>
                <PackageCard {...item} is_single={isSinglePerRow()}></PackageCard>
              </Col>
            )
          })
        }
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
      spinning={packageContainerStore.loadings.isLoading(packageContainerStore.Loading.FetchList)}>
      <div className="features" style={bgColorStyle} ref={ref}>
        <div className="container">
          {renderPackageCard()}
          {renderShowMoreBtn()}
        </div>
      </div>
    </Spin>
  )
}))
