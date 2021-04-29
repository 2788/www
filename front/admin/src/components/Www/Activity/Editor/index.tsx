import * as React from 'react'
import { Modal, Form, Input, DatePicker, Button } from 'react-icecream'
import { computed, reaction, observable, action } from 'mobx'
import { observer } from 'mobx-react'
import moment, { Moment } from 'moment'
import autobind from 'autobind-decorator'

import { FieldState, FormState, ValueOf, bindInput } from 'formstate-x'
import { injectable } from 'qn-fe-core/di'
import { useLocalStore, injectProps } from 'qn-fe-core/local-store'
import Store from 'qn-fe-core/store'

import ToasterStore from 'admin-base/common/stores/toaster'
import Loadings from 'admin-base/common/stores/loadings'
import { IModalProps } from 'admin-base/common/stores/modal'
import { bindFormItem, bindTextInput } from 'admin-base/common/utils/form'
import { textNotBlank } from 'admin-base/common/utils/validator'

import { bindRangePicker } from 'utils/bind'
import * as style from 'utils/style.m.less'
import { EditorProps, titleMap, EditorStatus } from 'constants/editor'
import { StateType, stateMap, dateFormat, timeFormat } from 'constants/activity'
import { IActivity } from 'apis/activity'
import UploadImg, * as uploadImg from 'components/common/UploadImg'
import RichTextEditor, * as richTextEditor from 'components/common/RichTextEditor'
import ImgPreview from 'components/common/ImgPreview'

import LocationInput, * as locationInput from '../LocationInput'
import ReminderInput, * as reminderInput from '../ReminderInput'
import UserCount from '../UserCount'
import ActivityStore from '../store'

const defaultFormItemLayout = {
  labelCol: { xs: { span: 4 }, sm: { span: 4 } },
  wrapperCol: { xs: { span: 18 }, sm: { span: 18 } }
}

type State = FormState<{
  title: FieldState<string>
  imgUrl: uploadImg.State
  desc: FieldState<string>
  location: locationInput.State
  startTime: FieldState<Moment>
  endTime: FieldState<Moment>
  applyEndTime: FieldState<Moment>
  detail: richTextEditor.State
  reminder: reminderInput.State
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
    imgUrl: '',
    desc: '',
    location: 'online',
    state: StateType.Draft,
    startTime: moment().add(1, 'day').hour(14).startOf('hour')
      .unix(),
    endTime: moment().add(1, 'day').hour(16).startOf('hour')
      .unix(),
    applyEndTime: moment().unix(),
    editTime: 0,
    detail: '',
    enableReminder: false,
    reminderTime: 30
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
  async doSubmit(state: StateType) {
    const reminder = reminderInput.getValue(this.form.$.reminder)
    const param: IActivity = {
      title: this.formValue.title,
      imgUrl: uploadImg.getValue(this.form.$.imgUrl),
      desc: this.formValue.desc,
      location: locationInput.getValue(this.form.$.location),
      state,
      startTime: this.formValue.startTime.startOf('minute').unix(),
      endTime: this.formValue.endTime.endOf('minute').unix(),
      applyEndTime: this.formValue.applyEndTime.endOf('minute').unix(),
      editTime: this.props.activity.editTime,
      detail: richTextEditor.getValue(this.form.$.detail),
      enableReminder: reminder.enableReminder,
      reminderTime: reminder.reminderTime
    }
    if (this.props.status === EditorStatus.Creating) {
      this.toasterStore.promise(this.activityStore.add(param), '添加活动成功！')
    } else {
      this.toasterStore.promise(this.activityStore.update(param, this.props.id), '更新活动成功！')
    }
  }

  @autobind
  @ToasterStore.handle()
  async handleSubmit(state: StateType) {
    let validation
    if (state === StateType.Draft) { // 草稿只需要校验活动主题
      validation = await this.form.$.title.validate()
    } else {
      validation = await this.form.validate()
    }
    if (validation.hasError) {
      return Promise.reject('请检查输入')
    }
    await this.doSubmit(state)
    this.props.onSubmit()
  }

  @action
  initFormState(activity: IActivity) {
    const { enableReminder, reminderTime } = activity
    const startTime = new FieldState(moment.unix(activity.startTime))
    const endTime = new FieldState(moment.unix(activity.endTime))

    this.form = new FormState({
      title: new FieldState(activity.title).validators(textNotBlank),
      imgUrl: uploadImg.createState(activity.imgUrl).validators(textNotBlank),
      desc: new FieldState(activity.desc).validators(textNotBlank),
      location: locationInput.createState(activity.location),
      startTime,
      endTime,
      applyEndTime: new FieldState(moment.unix(activity.applyEndTime))
        .validators(val => (val >= startTime.value.startOf('minute') ? '报名截止时间不能大于等于活动开始时间' : null)),
      detail: richTextEditor.createState(activity.detail),
      reminder: reminderInput.createState({ enableReminder, reminderTime })
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
  const { visible, onCancel, status, activity } = props

  if (!store.form) {
    return null
  }

  const fields = store.form.$
  const isReading = status === EditorStatus.Reading
  const imgExtra = <p className={style.desc}>推荐尺寸：1600 * 900 px</p>

  const footerView = isReading
    ? null
    : ([
      ...Object.keys(stateMap).map((key => (
        <Button key={key} type="primary" onClick={() => store.handleSubmit(Number(key) as StateType)}>
          {stateMap[key]}
        </Button>
      ))),
      <Button key="back" onClick={onCancel}>
        取消
      </Button>
    ])
  return (
    <Modal
      width={900}
      visible={visible}
      title={titleMap[props.status] + '活动'}
      confirmLoading={store.confirmLoading}
      onCancel={onCancel}
      footer={footerView}
      maskClosable={false}
      destroyOnClose
    >
      <Form {...defaultFormItemLayout}>
        <Form.Item
          label="活动主题"
          {...bindFormItem(fields.title)}
        >
          <Input placeholder="请输入主题" maxLength={50} {...bindTextInput(fields.title)} disabled={isReading} />
        </Form.Item>
        <Form.Item
          label="活动配图"
          extra={imgExtra}
          {...bindFormItem(fields.imgUrl)}
        >
          {isReading ? <ImgPreview url={activity!.imgUrl} /> : <UploadImg state={fields.imgUrl} maxSize={500} />}
        </Form.Item>
        <Form.Item
          label="活动简介"
          {...bindFormItem(fields.desc)}
        >
          <Input placeholder="请输入简介" maxLength={200} {...bindTextInput(fields.desc)} disabled={isReading} />
        </Form.Item>
        <Form.Item
          label="活动地点"
          {...bindFormItem(fields.location)}
        >
          <LocationInput state={fields.location} disabled={isReading} />
        </Form.Item>
        <Form.Item
          label="活动时间"
        >
          <DatePicker.RangePicker
            {...bindRangePicker(fields.startTime, fields.endTime)}
            style={{ width: '100%' }}
            format={dateFormat}
            showTime={{ format: timeFormat }}
            allowClear={false}
            disabled={isReading}
          />
        </Form.Item>
        <Form.Item
          label="报名截止时间"
          {...bindFormItem(fields.applyEndTime)}
        >
          <DatePicker
            {...bindInput(fields.applyEndTime)}
            format={dateFormat}
            showTime={{ format: timeFormat }}
            allowClear={false}
            disabled={isReading}
          />
        </Form.Item>
        {isReading && <Form.Item label="已报名人数"><UserCount id={props.id!} /></Form.Item>}
        <Form.Item
          label="详情"
          {...bindFormItem(fields.detail)}
        >
          <RichTextEditor state={fields.detail} readOnly={isReading} />
        </Form.Item>
        <Form.Item
          label="活动提醒"
          {...bindFormItem(fields.reminder)}
        >
          <ReminderInput state={fields.reminder} disabled={isReading} />
        </Form.Item>
      </Form>
    </Modal>
  )
})
