/**
 * @file 选择产品
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useCallback } from 'react'
import { observable, computed, action, when } from 'mobx'
import { observer } from 'mobx-react'
import classNames from 'classnames'
import { DebouncedFieldState } from 'formstate-x'
import { Loading } from 'react-icecream'
import { MultiSelect, SelectOptionItems } from 'react-icecream-form'
import Store, { observeInjectable } from 'qn-fe-core/store'
import { useLocalStore } from 'qn-fe-core/local-store'
import { ToasterStore } from 'admin-base/common/toaster'
import { Loadings } from 'admin-base/common/loading'

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

const LoadingProductsAction = 'LoadingProductsAction'

function matchKeyword(keyword: string, text: string): boolean {
  keyword = keyword.trim().toLowerCase()
  text = text.trim().toLowerCase()
  return text.includes(keyword)
}

@observeInjectable()
class LocalStore extends Store {

  constructor(
    toasterStore: ToasterStore,
    private productInfoApis: ProductInfoApis
  ) {
    super()
    ToasterStore.bindTo(this, toasterStore)
    this.loadings.start(LoadingProductsAction)
  }

  loadings = Loadings.collectFrom(this)

  @observable.ref products: ProductInfo[] | undefined

  @computed get isLoadingProducts() {
    return this.loadings.isLoading(LoadingProductsAction)
  }

  @action
  updateProducts(products: ProductInfo[]) {
    this.products = products
  }

  async matchProducts(keyword: string): Promise<ProductInfo[]> {
    // start searching while necessary (retry)
    if (!this.isLoadingProducts && this.products == null) {
      this.fetchProducts()
    }

    // waiting result of searching
    await when(() => !this.isLoadingProducts)
    const { products } = this

    // search failed
    if (products == null) {
      return []
    }

    // return matched product-infos
    const matchedProducts = keyword === ''
      ? products
      : products.filter(({ path, name, keywords }) => (
        matchKeyword(keyword, name)
        || matchKeyword(keyword, path)
        || keywords.some(key => matchKeyword(keyword, key))
      ))
    return matchedProducts
  }

  @Loadings.handle(LoadingProductsAction)
  @ToasterStore.handle()
  async fetchProducts() {
    const products = await this.productInfoApis.listAll()
    this.updateProducts(products)
  }

  async init() {
    await this.fetchProducts()
  }
}

export default observer(function SelectProducts(props: Props) {
  const { state, isVertical = false, className } = props
  const localStore = useLocalStore(LocalStore, props)

  // 升级 icecream 后可去掉 useCallback
  const matchOptions = useCallback(
    async (keyword: string): Promise<SelectOptionItems<string>> => {
      const products = await localStore.matchProducts(keyword)
      return products.map(({ path, name }) => ({
        value: path,
        content: name,
        rootHtmlProps: { title: path }
      }))
    },
    [localStore]
  )

  return (
    // TODO: 如何把组件整体的 loading 状态向上传递 / 暴露出去
    <div className={classNames(className, styles.main)}>
      <Loading loading={localStore.isLoadingProducts}>
        <MultiSelect
          state={state}
          searchable
          collapsed={false}
          className={classNames(styles.select, isVertical && styles.tagsVertical)}
          fetch={matchOptions}
        />
      </Loading>
    </div>
  )
})
