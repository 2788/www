import * as React from 'react'
import autobind from 'autobind-decorator'
import { computed, reaction, observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { Form, Input, Radio, DatePicker } from 'react-icecream'
import { FieldState, FormState, ValueOf } from 'formstate-x'
import { injectable } from 'qn-fe-core/di'
import { useLocalStore, injectProps } from 'qn-fe-core/local-store'
import Store from 'qn-fe-core/store'
import ToasterStore from 'admin-base/common/stores/toaster'
import Loadings from 'admin-base/common/stores/loadings'
import { IModalProps } from 'admin-base/common/stores/modal'
import { bindFormItem, bindTextInput, bindInputWithCurrentTarget, bindRadioGroup } from 'admin-base/common/utils/form'
import { bindRangePicker } from 'utils/bind'
import moment, { Moment } from 'moment'
import { textNotBlank, textHttp } from 'utils/validator'
import { EditorProps, EditorStatus, titleMap } from 'constants/editor'

import { INotice } from 'apis/product/notice'
import Modal from 'components/common/Modal'
import FormItem from 'components/common/FormItem'
import NoticeStore from '../store'
import ProductField from '../ProductField'
import { typeMap } from '..'

type State = FormState<{
  product: FieldState<string>
  summary: FieldState<string>
  link: FieldState<string>
  type: FieldState<string>
  effectTime: FieldState<Moment>
  invalidTime: FieldState<Moment>
}>

type FormDataType = {
  notice: INotice
  id: string
}

export type ExtraProps = EditorProps & Partial<FormDataType>

export type Props = IModalProps & EditorProps & FormDataType

export const defaultFormData: FormDataType = {
  notice: {
    product: '',
    summary: '',
    link: '',
    type: 'news',
    effectTime: moment().unix(),
    invalidTime: moment().add(1, 'month').unix(),
    createTime: 0,
    editTime: 0
  },
  id: ''
}

@injectable()
class EditorModalStore extends Store {

  constructor(
    @injectProps() private props: Props,
    private noticeStore: NoticeStore,
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

  @Loadings.handle('submit')
  async doAdd(param: INotice) {
    await this.noticeStore.add(param)
    this.toasterStore.success('创建产品公告成功！')
  }

  @Loadings.handle('submit')
  async doEdit(param: INotice, id: string) {
    await this.noticeStore.update(param, id)
    this.toasterStore.success('更新产品公告成功！')
  }

  doSubmit() {
    const param: INotice = {
      product: this.formValue.product,
      summary: this.formValue.summary,
      link: this.formValue.link,
      type: this.formValue.type,
      effectTime: this.formValue.effectTime.startOf('day').unix(),
      invalidTime: this.formValue.invalidTime.endOf('day').unix(),
      createTime: this.props.notice.createTime,
      editTime: moment().unix()
    }
    if (this.props.status === EditorStatus.Creating) {
      param.createTime = moment().unix()
      return this.doAdd(param)
    }
    return this.doEdit(param, this.props.id)
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

  @action
  initFormState() {
    const notice = this.props.notice
    this.form = new FormState({
      product: new FieldState(notice.product).validators(value => !value && '请选择一个产品页'),
      summary: new FieldState(notice.summary).validators(textNotBlank),
      link: new FieldState(notice.link).validators(textNotBlank, textHttp),
      type: new FieldState(notice.type).validators(value => !value && '请选择一个类型'),
      effectTime: new FieldState(moment.unix(notice.effectTime)),
      invalidTime: new FieldState(moment.unix(notice.invalidTime))
    })
    this.addDisposer(this.form.dispose)
  }

  init() {
    this.addDisposer(
      reaction(
        () => this.props.notice,
        notice => {
          if (notice) {
            this.initFormState()
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

  return (
    <Modal
      visible={visible}
      title={titleMap[props.status] + '产品公告'}
      onCancel={onCancel}
      onOk={store.handleSubmit}
      confirmLoading={store.confirmLoading}
    >
      <Form>
        <FormItem
          label="所在产品页"
          {...bindFormItem(store.form.$.product)}
        >
          <ProductField state={store.form.$.product} />
        </FormItem>
        <FormItem
          label="摘要"
          {...bindFormItem(store.form.$.summary)}
        >
          <Input.TextArea placeholder="请输入摘要" maxLength={80} {...bindInputWithCurrentTarget(store.form.$.summary)} />
        </FormItem>
        <FormItem
          label="跳转链接"
          {...bindFormItem(store.form.$.link)}
        >
          <Input placeholder="请输入链接" {...bindTextInput(store.form.$.link)} />
        </FormItem>
        <FormItem
          label="类型"
          {...bindFormItem(store.form.$.type)}
        >
          <Radio.Group {...bindRadioGroup(store.form.$.type)}>
            {Object.keys(typeMap).map(key => <Radio key={key} value={key}>{typeMap[key]}</Radio>)}
          </Radio.Group>
        </FormItem>
        <FormItem label="生效起止时间">
          <DatePicker.RangePicker
            {...bindRangePicker(store.form.$.effectTime, store.form.$.invalidTime)}
            style={{ width: '100%' }}
            disabledDate={current => !!current && current < moment().startOf('day')}
            allowClear={false}
          />
        </FormItem>
      </Form>
    </Modal>
  )
})
