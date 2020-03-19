/**
 * @file Production Mode of PackageCard
 * 一行多个的商品卡片
 * 由于布局和样式不同，和 PackageSingleCard 区分开
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'
import Button from 'react-icecream/lib/button'
import { useLocalStore } from 'qn-fe-core/local-store'

import { IPackageInfo } from 'apis/package'

import Label, { IProps as ILabelProps } from 'components/common/Label'
import Subscript, { IProps as ISubscriptProps } from 'components/common/Subscript'

import PackageCardStore from './store'
import * as styles from './style.m.less'

export interface IProps extends IPackageInfo {}

export default observer(function PackageCard(props: IProps) {
  // 使用局部 store
  const packageCardStore = useLocalStore(PackageCardStore, props)

  return (
    null
  )
})
