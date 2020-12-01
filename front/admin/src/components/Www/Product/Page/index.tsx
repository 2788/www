import React from 'react'
import autobind from 'autobind-decorator'
import { observer } from 'mobx-react'
import { injectable } from 'qn-fe-core/di'
import Button from 'react-icecream/lib/button'
import { useLocalStore } from 'qn-fe-core/local-store'
import Store from 'qn-fe-core/store'
import ModalStore from 'admin-base/common/stores/modal'
import ToasterStore from 'admin-base/common/stores/toaster'
import Provider from 'qn-fe-core/di/Provider'
import { Container, Spacer } from 'libs/layout-element'
import { EditorStatus } from 'constants/editor'

import PageStore from './store'
import PageList from './List'
import EditorModal, { ExtraProps } from './Editor'

@injectable()
class PageManageStore extends Store {

  constructor(
    public pageStore: PageStore,
    toasterStore: ToasterStore
  ) {
    super()
    ToasterStore.bind(this, toasterStore)
  }

  editorModal = new ModalStore<ExtraProps>()

  @autobind
  @ToasterStore.handle()
  refresh() {
    return this.pageStore.refresh()
  }

  @autobind
  add() {
    this.editorModal.open({ status: EditorStatus.Creating }).then(this.refresh)
  }

  @autobind
  edit(id: string) {
    const page = this.pageStore.list.find(item => item.id === id)
    this.editorModal.open({ page, status: EditorStatus.Editing }).then(this.refresh)
  }

  init() {
    this.addDisposer(
      () => this.editorModal.dispose()
    )
    this.refresh()
  }
}

const PageManage = observer(function PageManage() {
  const store = useLocalStore(PageManageStore)
  const pageStore = store.pageStore
  return (
    <>
      <Container width="100%" margin="0 0 22px" shrinkWrap>
        <Spacer />
        <Button icon="plus" onClick={store.add}>新增产品页</Button>
      </Container>
      <PageList
        list={pageStore.list}
        isLoading={pageStore.isLoading}
        onDelete={store.refresh}
        onEdit={store.edit}
      />
      {store.editorModal.visible && <EditorModal {...store.editorModal.bind()} />}
    </>
  )
})

export default function Page() {
  return (
    <Provider provides={[{ identifier: PageStore, constr: PageStore }]} >
      <PageManage />
    </Provider>
  )
}
