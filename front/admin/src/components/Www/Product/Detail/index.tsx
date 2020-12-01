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
import { Container, Spacer } from 'libs/layout-element'
import { StateCheckboxGroup } from 'components/common/State'
import { EditorStatus } from 'constants/editor'

import DetailStore from './store'
import DetailList from './List'
import EditorModal, { ExtraProps } from './Editor'

export const typeMap = {
  news: '新闻动态',
  welfares: '福利活动'
}

@injectable()
class DetailManageStore extends Store {

  constructor(
    public detailStore: DetailStore,
    toasterStore: ToasterStore
  ) {
    super()
    ToasterStore.bind(this, toasterStore)
  }
  editorModal = new ModalStore<ExtraProps>()

  @autobind
  @ToasterStore.handle()
  refresh() {
    return this.detailStore.refresh()
  }

  @autobind
  @ToasterStore.handle()
  initList() {
    return this.detailStore.init()
  }

  @autobind
  add() {
    this.editorModal.open({ status: EditorStatus.Creating }).then(this.refresh)
  }

  @autobind
  edit(id: string) {
    // eslint-disable-next-line no-underscore-dangle
    const detail = this.detailStore.filteredList.find(item => item._id === id)
    this.editorModal.open({ detail, id, status: EditorStatus.Editing }).then(this.refresh)
  }

  init() {
    this.addDisposer(
      () => this.editorModal.dispose()
    )
    this.initList()
  }
}

const DetailManage = observer(function DetailManage() {
  const store = useLocalStore(DetailManageStore)
  const detailStore = store.detailStore
  return (
    <>
      <Container width="100%" margin="0 0 22px" shrinkWrap>
        <StateCheckboxGroup onChange={detailStore.updateStates} />
        <Spacer />
        <Button icon="plus" onClick={store.add}>创建产品详情</Button>
      </Container>
      <DetailList
        list={detailStore.filteredList}
        pageList={detailStore.pageList}
        isLoading={detailStore.isLoading}
        onDelete={store.refresh}
        onEdit={store.edit}
      />
      {store.editorModal.visible && <EditorModal {...store.editorModal.bind()} />}
    </>
  )
})

export default function Detail() {
  return (
    <Provider provides={[{ identifier: DetailStore, constr: DetailStore }]} >
      <DetailManage />
    </Provider>
  )
}
