/**
 * @file 选择产品
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import classNames from 'classnames'
import { DebouncedFieldState } from 'formstate-x'
import { Loading } from 'react-icecream'
import { MultiSelect, SelectOption } from 'react-icecream-form'
import { useInjection } from 'qn-fe-core/di'
import { ToasterStore } from 'admin-base/common/toaster'

import { ProductId } from 'constants/product'
import ProductInfoApis, { ProductInfo } from 'apis/product/info'

import styles from './style.m.less'

export function createState(products: ProductId[] = []) {
  return new DebouncedFieldState(products)
}

export interface Props {
  state: ReturnType<typeof createState>
  isVertical?: boolean
  className?: string
}

export default observer(function SelectProducts({ state, isVertical = false, className }: Props) {
  const toasterStore = useInjection(ToasterStore)
  const productInfoApis = useInjection(ProductInfoApis)

  const [productInfoList, setProductInfoList] = useState<ProductInfo[] | undefined>(undefined)

  useEffect(() => {
    toasterStore.promise(
      productInfoApis.listAll().then(list => { setProductInfoList(list) })
    )
  }, [productInfoApis, toasterStore])

  return (
    // TODO: 如何把 loading 状态向上传递 / 暴露出去
    <div className={classNames(className, styles.main)}>
      <Loading loading={productInfoList == null}>
        <MultiSelect
          state={state}
          searchable
          collapsed={false}
          className={classNames(styles.select, isVertical && styles.tagsVertical)}
        >
          {productInfoList != null && productInfoList.map(({ path, name, keywords }) => (
            // TODO: 优化，用更科学的方式支持自定义搜索
            <SelectOption value={path} key={path} rootHtmlProps={{ title: path }}>
              {name}
              <div className={styles.keywords}>  ({path})  {keywords.join(',')}</div>
            </SelectOption>
          ))}
        </MultiSelect>
      </Loading>
    </div>
  )
})
