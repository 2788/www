/**
 * @file          component  ProductSelect
 * @description   所属产品选择框，默认选择非禁用的第一个产品
 * @author        renpanpan
 */

import * as React from 'react'
import { action, computed, observable } from 'mobx'
import { observer } from 'mobx-react'
import autobind from 'autobind-decorator'
import Select, { SelectProps } from 'react-icecream/lib/select'
import { FieldState } from 'formstate-x'
import { injectable } from 'qn-fe-core/di'
import Store from 'qn-fe-core/store'
import { useLocalStore } from 'qn-fe-core/local-store'

import ToasterStore from 'admin-base/common/stores/toaster'
import { bindSelect } from 'admin-base/common/utils/form'
import Loadings from 'admin-base/common/stores/loadings'
import PageApis, { IPage } from 'apis/product/page'

export type State = FieldState<string>

export function createState(value: string): State {
  return new FieldState(value).validators(val => !val && '请选择一个产品页')
}

export function getValue(state: State): string {
  return state.value
}

interface IProps extends SelectProps {
  state: State
  disabledProducts?: string[]
}

@injectable()
class LocalStore extends Store {

  constructor(
    private pageApis: PageApis,
    toasterStore: ToasterStore
  ) {
    super()
    ToasterStore.bind(this, toasterStore)
  }

  @observable.ref pageList: IPage[] = []
  loadings = Loadings.collectFrom(this)

  @computed
  get isLoading() {
    return !this.loadings.isAllFinished()
  }

  @action.bound
  updatePageList(list: IPage[]) {
    this.pageList = list
  }

  @autobind
  @Loadings.handle('fetchPageList')
  fetchPageList() {
    return this.pageApis.list()
      .then((res: IPage[]) => this.updatePageList(res))
  }

  @ToasterStore.handle()
  init() {
    return this.fetchPageList()
  }
}

export default observer(function ProductSelect({ state, disabledProducts = [], ...rest }: IProps) {
  const store = useLocalStore(LocalStore)
  const pageList = store.pageList
  React.useEffect(() => {
    // 默认取 pageList 未被禁用的第一个页面的 id 值
    if (pageList.length > 0 && pageList.every(page => page.id !== state.value)) {
      // 为保障默认值有效，所以先过滤掉被禁用的页面
      const filteredList = pageList.filter(page => !disabledProducts.includes(page.id))
      if (filteredList.length > 0) {
        state.set(filteredList[0].id)
      }
    }
  }, [disabledProducts, pageList, state])

  return (
    <Select
      placeholder="请选择关联产品页"
      loading={store.isLoading}
      getPopupContainer={ele => ele.parentElement || document.body}
      {...bindSelect(state)}
      {...rest}
    >
      {pageList.map((item, index) => (
        <Select.Option key={index} value={item.id} disabled={disabledProducts.includes(item.id)}>
          {item.name}
        </Select.Option>
      ))}
    </Select>
  )
})
