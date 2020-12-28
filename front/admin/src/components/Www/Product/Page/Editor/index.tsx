import * as React from 'react'
import autobind from 'autobind-decorator'
import { computed, reaction, observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { Form, Input } from 'react-icecream'
import { FieldState, FormState, ValueOf } from 'formstate-x'
import { injectable } from 'qn-fe-core/di'
import { useLocalStore, injectProps } from 'qn-fe-core/local-store'
import Store from 'qn-fe-core/store'
import ToasterStore from 'admin-base/common/stores/toaster'
import Loadings from 'admin-base/common/stores/loadings'
import { IModalProps } from 'admin-base/common/stores/modal'
import { bindFormItem, bindTextInput } from 'admin-base/common/utils/form'
import { textNotBlank } from 'admin-base/common/utils/validator'
import { textProductLink } from 'utils/validator'
import { EditorProps, EditorStatus } from 'constants/editor'

import Modal from 'components/common/Modal'
import FormItem from 'components/common/FormItem'
import { IPage } from 'apis/product/page'
import PageStore from '../store'

import * as style from './style.m.less'

type State = FormState<{
  id: FieldState<string>
  name: FieldState<string>
  link: FieldState<string>
}>

type FormDataType = {
  page: IPage
}

export type ExtraProps = EditorProps & Partial<FormDataType>

export type Props = IModalProps & EditorProps & FormDataType

export const defaultFormData: FormDataType = {
  page: {
    id: '',
    name: '',
    link: ''
  }
}

@injectable()
class EditorModalStore extends Store {

  constructor(
    @injectProps() private props: Props,
    private pageStore: PageStore,
    public toasterStore: ToasterStore
  ) {
    super()
    ToasterStore.bind(this, toasterStore)
  }

  loadings = Loadings.collectFrom(this)
  @observable.ref form: State

  @computed
  get confirmLoading() {
    return this.loadings.isLoading('submit')
  }

  @computed
  get formValue(): ValueOf<State> {
    return this.form.value
  }

  async doAdd(param: IPage) {
    await this.pageStore.add(param)
    this.toasterStore.success('新增产品页成功！')
  }

  async doEdit(param: IPage) {
    await this.pageStore.update(param)
    this.toasterStore.success('更新产品页成功！')
  }

  @Loadings.handle('submit')
  doSubmit() {
    const param: IPage = this.formValue
    if (this.props.status === EditorStatus.Creating) {
      return this.doAdd(param)
    }
    return this.doEdit(param)
  }

  @autobind
  @ToasterStore.handle()
  async handleSubmit() {
    const validation = await this.form.validate()
    if (validation.hasError) {
      return Promise.reject('请检查输入')
    }
    await this.doSubmit()
    await this.props.onSubmit()
  }

  @autobind
  doValidateId(id: string) {
    if (id === this.props.page.id) {
      return null
    }
    const hasRecord = this.pageStore.list
      .some(item => item.id === id)
    if (hasRecord) {
      return '产品页 ID 重复'
    }
    return null
  }

  @action
  initFormState(page) {
    this.form = new FormState({
      id: new FieldState(page.id).validators(textNotBlank, this.doValidateId),
      name: new FieldState(page.name).validators(textNotBlank),
      link: new FieldState(page.link).validators(textNotBlank, textProductLink)
    })
    this.addDisposer(this.form.dispose)
  }

  init() {
    this.addDisposer(
      reaction(
        () => this.props.page,
        page => {
          if (page) {
            this.initFormState(page)
          }
        },
        { fireImmediately: true }
      )
    )
  }
}

export default observer(function EditorModal(props: IModalProps & ExtraProps) {
  props = { ...defaultFormData, ...props }
  const store = useLocalStore(EditorModalStore, props)
  const { visible, onCancel } = props

  if (!store.form) {
    return null
  }

  const title = props.status === EditorStatus.Creating ? '新增产品页' : '编辑产品页'
  const linkExtra = <p className={style.desc}>格式：/products/***</p>

  return (
    <Modal
      visible={visible}
      title={title}
      onCancel={onCancel}
      onOk={store.handleSubmit}
      confirmLoading={store.confirmLoading}
    >
      <Form>
        <FormItem
          label="页面 ID"
          {...bindFormItem(store.form.$.id)}
        >
          <Input disabled={props.status === EditorStatus.Editing} placeholder="请输入 ID" {...bindTextInput(store.form.$.id)} />
        </FormItem>
        <FormItem
          label="页面名称"
          {...bindFormItem(store.form.$.name)}
        >
          <Input placeholder="请输入名称" {...bindTextInput(store.form.$.name)} />
        </FormItem>
        <FormItem
          label="链接地址"
          {...bindFormItem(store.form.$.link)}
          extra={linkExtra}
        >
          <Input placeholder="请输入链接" {...bindTextInput(store.form.$.link)} />
        </FormItem>
      </Form>
    </Modal>
  )
})
