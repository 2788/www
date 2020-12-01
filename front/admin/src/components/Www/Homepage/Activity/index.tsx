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
import ActivityStore from './store'
import ActivityList from './List'
import EditorModal, { ExtraProps } from './Editor'

@injectable()
class ActivityManageStore extends Store {

  constructor(
    public activityStore: ActivityStore,
    toasterStore: ToasterStore
  ) {
    super()
    ToasterStore.bind(this, toasterStore)
  }
  editorModal = new ModalStore<ExtraProps>()

  @autobind
  @ToasterStore.handle()
  refresh() {
    return this.activityStore.refresh()
  }

  @autobind
  add() {
    this.editorModal.open({ status: EditorStatus.Creating })
      .then(this.refresh)
  }

  @autobind
  edit(id: string) {
    // eslint-disable-next-line no-underscore-dangle
    const activity = this.activityStore.filteredList.find(item => item._id === id)
    this.editorModal
      .open({ activity, id, status: EditorStatus.Editing })
      .then(this.refresh)
  }

  init() {
    this.addDisposer(
      () => this.editorModal.dispose()
    )
    this.refresh()
  }
}

const ActivityManage = observer(function ActivityManage() {
  const store = useLocalStore(ActivityManageStore)
  const activityStore = store.activityStore
  return (
    <>
      <Container width="100%" margin="0 0 22px" shrinkWrap>
        <StateCheckboxGroup onChange={activityStore.updateStates} />
        <Spacer />
        <Button icon="plus" onClick={store.add}>创建活动</Button>
      </Container>
      <ActivityList
        list={activityStore.filteredList}
        isLoading={activityStore.isLoading}
        onDelete={store.refresh}
        onEdit={store.edit}
      />
      {store.editorModal.visible && <EditorModal {...store.editorModal.bind()} />}
    </>
  )
})

export default function Activity() {
  return (
    <Provider provides={[{ identifier: ActivityStore, constr: ActivityStore }]} >
      <ActivityManage />
    </Provider>
  )
}
