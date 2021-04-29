import * as React from 'react'
import { computed, reaction, observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { Form, Input, Radio, DatePicker } from 'react-icecream'
import moment, { Moment } from 'moment'
import autobind from 'autobind-decorator'

import { FieldState, FormState, ValueOf } from 'formstate-x'
import { injectable } from 'qn-fe-core/di'
import { useLocalStore, injectProps } from 'qn-fe-core/local-store'
import Store from 'qn-fe-core/store'

import ToasterStore from 'admin-base/common/stores/toaster'
import Loadings from 'admin-base/common/stores/loadings'
import { IModalProps } from 'admin-base/common/stores/modal'
import { bindFormItem, bindTextInput, bindInputWithCurrentTarget, bindRadioGroup } from 'admin-base/common/utils/form'
import { textNotBlank } from 'admin-base/common/utils/validator'

import { bindRangePicker } from 'utils/bind'
import { textNoticeLink } from 'utils/validator'
import { EditorProps, EditorStatus, titleMap } from 'constants/editor'
import { INotice } from 'apis/product/notice'
import Modal from 'components/common/Modal'
import FormItem from 'components/common/FormItem'

import NoticeStore from '../store'
import ProductSelect, * as productSelect from '../ProductSelect'
import { typeMap } from '..'

type State = FormState<{
  product: productSelect.State
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
class LocalStore extends Store {

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
  async doSubmit() {
    const param: INotice = {
      product: productSelect.getValue(this.form.$.product),
      summary: this.formValue.summary,
      link: this.formValue.link,
      type: this.formValue.type,
      effectTime: this.formValue.effectTime.startOf('day').unix(),
      invalidTime: this.formValue.invalidTime.endOf('day').unix(),
      createTime: this.props.notice.createTime,
      editTime: this.props.notice.editTime
    }
    if (this.props.status === EditorStatus.Creating) {
      this.toasterStore.promise(this.noticeStore.add(param), '添加产品公告成功！')
    } else {
      this.toasterStore.promise(this.noticeStore.update(param, this.props.id), '更新产品公告成功！')
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

  @action
  initFormState(notice: INotice) {
    this.form = new FormState({
      product: productSelect.createState(notice.product),
      summary: new FieldState(notice.summary).validators(textNotBlank),
      link: new FieldState(notice.link).validators(textNotBlank, textNoticeLink),
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
            this.initFormState(notice)
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
          {...bindFormItem(fields.product)}
        >
          <ProductSelect state={fields.product} />
        </FormItem>
        <FormItem
          label="摘要"
          {...bindFormItem(fields.summary)}
        >
          <Input.TextArea placeholder="请输入摘要" maxLength={80} {...bindInputWithCurrentTarget(fields.summary)} />
        </FormItem>
        <FormItem
          label="跳转链接"
          {...bindFormItem(fields.link)}
        >
          <Input placeholder="请输入链接" {...bindTextInput(fields.link)} />
        </FormItem>
        <FormItem
          label="类型"
          {...bindFormItem(fields.type)}
        >
          <Radio.Group {...bindRadioGroup(fields.type)}>
            {Object.keys(typeMap).map(key => <Radio key={key} value={key}>{typeMap[key]}</Radio>)}
          </Radio.Group>
        </FormItem>
        <FormItem label="生效起止时间">
          <DatePicker.RangePicker
            {...bindRangePicker(fields.effectTime, fields.invalidTime)}
            style={{ width: '100%' }}
            disabledDate={current => !!current && current < moment().startOf('day')}
            allowClear={false}
          />
        </FormItem>
      </Form>
    </Modal>
  )
})
