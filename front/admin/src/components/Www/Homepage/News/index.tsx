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

import { EditorStatus } from 'constants/editor'
import NewsStore from './store'
import NewsList from './List'
import EditorModal, { ExtraProps } from './Editor'

// 顺序个数，也即是列表最大条数
export const maxNum = 4

@injectable()
class NewsManageStore extends Store {

  constructor(
    public newsStore: NewsStore,
    toasterStore: ToasterStore
  ) {
    super()
    ToasterStore.bind(this, toasterStore)
  }
  editorModal = new ModalStore<ExtraProps>()

  @autobind
  @ToasterStore.handle()
  refresh() {
    return this.newsStore.refresh()
  }

  @autobind
  add() {
    this.editorModal.open({ status: EditorStatus.Creating })
      .then(this.refresh)
  }

  @autobind
  edit(id: string) {
    // eslint-disable-next-line no-underscore-dangle
    const news = this.newsStore.list.find(item => item._id === id)
    this.editorModal.open({ news, id, status: EditorStatus.Editing })
      .then(this.refresh)
  }

  init() {
    this.addDisposer(
      () => this.editorModal.dispose()
    )
    this.refresh()
  }
}

const NewsManage = observer(function NewsManage() {
  const store = useLocalStore(NewsManageStore)
  const newsStore = store.newsStore
  const list = newsStore.list

  return (
    <>
      <Container>
        <Spacer />
        {/* 大于 maxNum 条时不展示创建 */}
        <Button icon="plus" onClick={store.add} hidden={list && list.length >= maxNum}>创建资讯</Button>
      </Container>
      <NewsList
        list={list}
        isLoading={newsStore.isLoading}
        onEdit={store.edit}
      />
      {store.editorModal.visible && <EditorModal {...store.editorModal.bind()} />}
    </>
  )
})

export default function News() {
  return (
    <Provider provides={[{ identifier: NewsStore, constr: NewsStore }]} >
      <NewsManage />
    </Provider>
  )
}
