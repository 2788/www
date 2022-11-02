/**
 * 产品基本配置
 */

import React from 'react'
import { observer } from 'mobx-react'
import { Button } from 'react-icecream-2'
import { Route, Switch } from 'qn-fe-core/router'
import { useInjection } from 'qn-fe-core/di'
import { ToasterStore } from 'admin-base/common/toaster'

import { productPageInfoRoute, productPageInfoTitle } from 'constants/route'
import { ProductId } from 'constants/product'

import useProductList from './list'
import useMetaInfo from './meta'
import Page from './Page'

import styles from './style.m.less'

const List = observer(function _List() {
  const toasterStore = useInjection(ToasterStore)

  const { metaView, setProductInfo } = useMetaInfo()
  const { listView, refresh } = useProductList(onMetaInfoEdit)

  function onMetaInfoEdit(productId: ProductId) {
    toasterStore.promise(setProductInfo(productId).then(() => { refresh() }))
  }

  return (
    <div>
      <div className={styles.panel}>
        <Button onClick={() => { toasterStore.promise(setProductInfo().then(() => { refresh() })) }}>新增</Button>
      </div>
      {listView}
      {metaView}
    </div>
  )
})

export default observer(function ProductInfo() {
  return (
    <Switch>
      <Route path="/" relative exact>
        <List />
      </Route>
      <Route
        path={`${productPageInfoRoute}/:product`}
        title={productPageInfoTitle}
        relative
        component={({ match: { params: { product } } }) => (
          <Page productId={product} />
        )}
      />
    </Switch>
  )
})
