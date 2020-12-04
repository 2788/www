import React from 'react'
import autobind from 'autobind-decorator'
import { observer } from 'mobx-react'
import { injectable } from 'qn-fe-core/di'
import Provider from 'qn-fe-core/di/Provider'
import Button from 'react-icecream/lib/button'
import { useLocalStore } from 'qn-fe-core/local-store'
import Store from 'qn-fe-core/store'
import ModalStore from 'admin-base/common/stores/modal'
import ToasterStore from 'admin-base/common/stores/toaster'
import { Spacer } from 'libs/layout-element'
import Container from 'components/common/Container'
import { StateCheckboxGroup } from 'components/common/State'

import { EditorStatus } from 'constants/editor'
import BannerStore from './store'
import BannerList from './List'
import EditorModal, { ExtraProps } from './Editor'

// 顺序个数
export const maxNum = 4
@injectable()
class BannerManageStore extends Store {

  constructor(
    public bannerStore: BannerStore,
    toasterStore: ToasterStore
  ) {
    super()
    ToasterStore.bind(this, toasterStore)
  }
  editorModal = new ModalStore<ExtraProps>()

  @autobind
  @ToasterStore.handle()
  refresh() {
    return this.bannerStore.refresh()
  }
  @autobind
  add() {
    this.editorModal.open({ status: EditorStatus.Creating })
      .then(this.refresh)
  }

  @autobind
  edit(name: string) {
    const banner = this.bannerStore.filteredList.find(item => item.name === name)
    this.editorModal.open({ banner, status: EditorStatus.Editing })
      .then(this.refresh)
  }

  init() {
    this.addDisposer(
      () => this.editorModal.dispose()
    )
    this.refresh()
  }
}

const BannerManage = observer(function BannerManage() {
  const store = useLocalStore(BannerManageStore)
  const bannerStore = store.bannerStore
  return (
    <>
      <Container>
        <StateCheckboxGroup onChange={bannerStore.updateStates} />
        <Spacer />
        <Button icon="plus" onClick={store.add}>创建 banner</Button>
      </Container>
      <BannerList
        list={bannerStore.filteredList}
        isLoading={bannerStore.isLoading}
        onDelete={store.refresh}
        onEdit={store.edit}
      />
      {store.editorModal.visible && <EditorModal {...store.editorModal.bind()} />}
    </>
  )
})

export default function Banner() {
  return (
    <Provider provides={[{ identifier: BannerStore, constr: BannerStore }]} >
      <BannerManage />
    </Provider>
  )
}
