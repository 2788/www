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

import NoticeStore from './store'
import NoticeList from './List'
import EditorModal, { ExtraProps } from './Editor'

export const typeMap = {
  news: '新闻动态',
  welfares: '福利活动'
}

@injectable()
class NoticeManageStore extends Store {

  constructor(
    public noticeStore: NoticeStore,
    toasterStore: ToasterStore
  ) {
    super()
    ToasterStore.bind(this, toasterStore)
  }
  editorModal = new ModalStore<ExtraProps>()

  @autobind
  @ToasterStore.handle()
  refresh() {
    return this.noticeStore.refresh()
  }

  @autobind
  @ToasterStore.handle()
  initList() {
    return this.noticeStore.init()
  }

  @autobind
  add() {
    this.editorModal.open({ status: EditorStatus.Creating }).then(this.refresh)
  }

  @autobind
  edit(id: string) {
    // eslint-disable-next-line no-underscore-dangle
    const notice = this.noticeStore.filteredList.find(item => item._id === id)
    this.editorModal.open({ notice, id, status: EditorStatus.Editing }).then(this.refresh)
  }

  init() {
    this.addDisposer(
      () => this.editorModal.dispose()
    )
    this.initList()
  }
}

const NoticeManage = observer(function NoticeManage() {
  const store = useLocalStore(NoticeManageStore)
  const noticeStore = store.noticeStore
  return (
    <>
      <Container width="100%" margin="0 0 22px" shrinkWrap>
        <StateCheckboxGroup onChange={noticeStore.updateStates} />
        <Spacer />
        <Button icon="plus" onClick={store.add}>创建产品公告</Button>
      </Container>
      <NoticeList
        list={noticeStore.filteredList}
        pageList={noticeStore.pageList}
        isLoading={noticeStore.isLoading}
        onDelete={store.refresh}
        onEdit={store.edit}
      />
      {store.editorModal.visible && <EditorModal {...store.editorModal.bind()} />}
    </>
  )
})

export default function Notice() {
  return (
    <Provider provides={[{ identifier: NoticeStore, constr: NoticeStore }]} >
      <NoticeManage />
    </Provider>
  )
}
