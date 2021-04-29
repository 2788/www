import * as React from 'react'
import { computed, reaction, observable, action } from 'mobx'
import { observer } from 'mobx-react'
import moment, { Moment } from 'moment'
import { Form, Input, DatePicker } from 'react-icecream'
import autobind from 'autobind-decorator'

import { FieldState, FormState, ValueOf } from 'formstate-x'
import { injectable } from 'qn-fe-core/di'
import { useLocalStore, injectProps } from 'qn-fe-core/local-store'
import Store from 'qn-fe-core/store'

import ToasterStore from 'admin-base/common/stores/toaster'
import Loadings from 'admin-base/common/stores/loadings'
import { IModalProps } from 'admin-base/common/stores/modal'
import { bindFormItem, bindTextInput } from 'admin-base/common/utils/form'
import { textNotBlank } from 'admin-base/common/utils/validator'

import { bindRangePicker } from 'utils/bind'
import { textHttp } from 'utils/validator'
import * as style from 'utils/style.m.less'
import { EditorProps, titleMap, EditorStatus } from 'constants/editor'
import { IActivity } from 'apis/homepage/activity'
import UploadImg, * as uploadImg from 'components/common/UploadImg'
import Modal from 'components/common/Modal'
import FormItem from 'components/common/FormItem'

import { checkOverlap } from 'utils/check'
import ActivityStore from '../store'
import OrderSelect, * as orderSelect from '../../OrderSelect'
import LabelInput, * as labelInput from '../LabelInput'

type State = FormState<{
  title: FieldState<string>
  subTitle: FieldState<string>
  effectTime: FieldState<Moment>
  invalidTime: FieldState<Moment>
  icon: uploadImg.State
  link: FieldState<string>
  label: labelInput.State
  order: orderSelect.State
}>

type FormDataType = {
  activity: IActivity
  id: string
}

export type ExtraProps = EditorProps & Partial<FormDataType>

export type Props = IModalProps & EditorProps & FormDataType

export const defaultFormData: FormDataType = {
  activity: {
    title: '',
    subTitle: '',
    icon: '',
    effectTime: moment().unix(),
    invalidTime: moment().add(1, 'month').unix(),
    createTime: 0,
    editTime: 0,
    label: 'hot',
    link: '',
    order: 1
  },
  id: ''
}

@injectable()
class LocalStore extends Store {

  constructor(
    @injectProps() private props: Props,
    private activityStore: ActivityStore,
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
    const param: IActivity = {
      title: this.formValue.title,
      subTitle: this.formValue.subTitle,
      icon: uploadImg.getValue(this.form.$.icon),
      effectTime: this.formValue.effectTime.startOf('day').unix(),
      invalidTime: this.formValue.invalidTime.endOf('day').unix(),
      createTime: this.props.activity.createTime,
      editTime: this.props.activity.editTime,
      label: labelInput.getValue(this.form.$.label),
      link: this.formValue.link,
      order: orderSelect.getValue(this.form.$.order)
    }
    if (this.props.status === EditorStatus.Creating) {
      this.toasterStore.promise(this.activityStore.add(param), '添加活动成功！')
    } else {
      this.toasterStore.promise(this.activityStore.update(param, this.props.id), '更新活动成功！')
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
    await this.props.onSubmit()
  }

  // 校验同一 order 下，生效时间段是否有重叠的
  @autobind
  doValidateOrder(order: number, effectTime: Moment, invalidTime: Moment) {
    const start = effectTime.startOf('day').unix()
    const end = invalidTime.endOf('day').unix()
    // 同一 order 的数据 list，且去除 id 相同的（即当前所编辑数据）
    // eslint-disable-next-line no-underscore-dangle
    const filteredList = this.activityStore.list.filter(item => item.order === order && item._id !== this.props.id)
    return checkOverlap({ effectTime: start, invalidTime: end }, filteredList) ? '生效时间段内该顺序已存在活动' : null
  }

  @action
  initFormState(activity: IActivity) {
    const effectTime = new FieldState(moment.unix(activity.effectTime))
    const invalidTime = new FieldState(moment.unix(activity.invalidTime))

    this.form = new FormState({
      title: new FieldState(activity.title).validators(textNotBlank),
      subTitle: new FieldState(activity.subTitle).validators(textNotBlank),
      effectTime,
      invalidTime,
      label: labelInput.createState(activity.label),
      icon: uploadImg.createState(activity.icon).validators(textNotBlank),
      link: new FieldState(activity.link).validators(textNotBlank, textHttp),
      order: orderSelect.createState(activity.order)
        .validators((order: number) => this.doValidateOrder(order, effectTime.value, invalidTime.value))
    })
    this.addDisposer(this.form.dispose)
  }

  init() {
    this.addDisposer(
      reaction(
        () => this.props.activity,
        activity => {
          if (activity) {
            this.initFormState(activity)
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
  const iconExtra = <p className={style.desc}>推荐尺寸：48 * 48 px</p>

  return (
    <Modal
      visible={visible}
      title={titleMap[props.status] + '活动'}
      onCancel={onCancel}
      onOk={store.handleSubmit}
      confirmLoading={store.confirmLoading}
    >
      <Form>
        <FormItem
          label="标题"
          {...bindFormItem(fields.title)}
        >
          <Input placeholder="请输入标题" maxLength={10} {...bindTextInput(fields.title)} />
        </FormItem>
        <FormItem
          label="副标题"
          {...bindFormItem(fields.subTitle)}
        >
          <Input placeholder="请输入副标题" maxLength={12} {...bindTextInput(fields.subTitle)} />
        </FormItem>
        <FormItem
          label="icon"
          extra={iconExtra}
          {...bindFormItem(fields.icon)}
        >
          <UploadImg state={fields.icon} maxSize={500} />
        </FormItem>
        <FormItem
          label="跳转链接"
          {...bindFormItem(fields.link)}
        >
          <Input placeholder="请输入链接" {...bindTextInput(fields.link)} />
        </FormItem>
        <FormItem
          label="标签"
          {...bindFormItem(fields.label)}
        >
          <LabelInput state={fields.label} />
        </FormItem>
        <FormItem
          label="展示顺序"
          {...bindFormItem(fields.order)}
        >
          <OrderSelect state={fields.order} />
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
