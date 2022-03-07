import * as React from 'react'
import { computed, reaction, observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { Form, Input } from 'react-icecream'
import autobind from 'autobind-decorator'

import { FieldState, FormState, ValueOf } from 'formstate-x-v2'
import { useLocalStore, injectProps } from 'qn-fe-core/local-store'
import Store, { observeInjectable as injectable } from 'qn-fe-core/store'
import { ToasterStore } from 'admin-base/common/toaster'
import { Loadings } from 'admin-base/common/loading'
import { ModalProps as IModalProps } from 'admin-base/common/utils/modal'
import { textNotBlank } from 'admin-base/common/form'

import { bindFormItem, bindTextInput } from 'utils/bind'
import { textProductLink } from 'utils/validator'
import style from 'utils/style.m.less'
import { EditorProps, EditorStatus, titleMap } from 'constants/editor'
import Modal from 'components/common/Modal'
import FormItem from 'components/common/FormItem'
import { IPage } from 'apis/product/page'

import PageStore from '../store'

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
class LocalStore extends Store {

  constructor(
    @injectProps() private props: Props,
    private pageStore: PageStore,
    public toasterStore: ToasterStore
  ) {
    super()
    ToasterStore.bindTo(this, toasterStore)
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

  @Loadings.handle('submit')
  async doSubmit() {
    const param: IPage = this.formValue
    if (this.props.status === EditorStatus.Creating) {
      await this.pageStore.add(param)
      this.toasterStore.success('添加产品页成功！')
    } else {
      await this.pageStore.update(param)
      this.toasterStore.success('更新产品页成功！')
    }
  }

  @autobind
  @ToasterStore.handle()
  async handleSubmit() {
    const validation = await this.form.validate()
    if (validation.hasError) {
      return Promise.reject('请检查输入')
    }
    await this.doSubmit()
    this.props.onSubmit()
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
  initFormState(page: IPage) {
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
  const store = useLocalStore(LocalStore, props)
  const { visible, onCancel } = props

  if (!store.form) {
    return null
  }

  const fields = store.form.$
  const linkExtra = <p className={style.desc}>格式：/products/***</p>

  return (
    <Modal
      visible={visible}
      title={titleMap[props.status] + '产品页'}
      onCancel={onCancel}
      onOk={store.handleSubmit}
      confirmLoading={store.confirmLoading}
    >
      <Form>
        <FormItem
          label="页面 ID"
          {...bindFormItem(fields.id)}
        >
          <Input disabled={props.status === EditorStatus.Editing} placeholder="请输入 ID" {...bindTextInput(fields.id)} />
        </FormItem>
        <FormItem
          label="页面名称"
          {...bindFormItem(fields.name)}
        >
          <Input placeholder="请输入名称" {...bindTextInput(fields.name)} />
        </FormItem>
        <FormItem
          label="链接地址"
          {...bindFormItem(fields.link)}
          extra={linkExtra}
        >
          <Input placeholder="请输入链接" {...bindTextInput(fields.link)} />
        </FormItem>
      </Form>
    </Modal>
  )
})
