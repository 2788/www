import * as React from 'react'
import autobind from 'autobind-decorator'
import { computed, reaction, observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { Form, Input, DatePicker } from 'react-icecream'
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
import moment, { Moment } from 'moment'
import { textHttp, textColor } from 'utils/validator'
import { EditorProps, titleMap, EditorStatus } from 'constants/editor'
import { IBanner } from 'apis/homepage/banner'
import UploadImg, * as uploadImg from 'components/common/UploadImg'
import Modal from 'components/common/Modal'
import FormItem from 'components/common/FormItem'
import { checkOverlap } from 'utils/check'
import BannerStore from '../store'
import OrderField from '../../OrderField'
import { maxNum } from '..'
import * as style from './style.m.less'

type State = FormState<{
  name: FieldState<string>
  pcImg: uploadImg.State
  mobileImg: uploadImg.State
  effectTime: FieldState<Moment>
  invalidTime: FieldState<Moment>
  backgroundColor: FieldState<string>
  link: FieldState<string>
  order: FieldState<number>
}>

type FormDataType = {
  banner: IBanner
}

export type ExtraProps = EditorProps & Partial<FormDataType>

export type Props = IModalProps & EditorProps & FormDataType

export const defaultFormData: FormDataType = {
  banner: {
    name: '',
    pcImg: '',
    mobileImg: '',
    effectTime: moment().unix(),
    invalidTime: moment().add(1, 'month').unix(),
    createTime: 0,
    editTime: 0,
    backgroundColor: '',
    link: '',
    order: 1
  }
}

@injectable()
class EditorModalStore extends Store {

  constructor(
    @injectProps() private props: Props,
    private bannerStore: BannerStore,
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

  async doAdd(param: IBanner) {
    await this.bannerStore.add(param)
    this.toasterStore.success('创建 banner 成功！')
  }

  async doEdit(param: IBanner) {
    await this.bannerStore.update(param)
    this.toasterStore.success('更新 banner 成功！')
  }

  @Loadings.handle('submit')
  doSubmit() {
    const param: IBanner = {
      name: this.formValue.name,
      pcImg: uploadImg.getValue(this.form.$.pcImg),
      mobileImg: uploadImg.getValue(this.form.$.mobileImg),
      effectTime: this.formValue.effectTime.startOf('day').unix(),
      invalidTime: this.formValue.invalidTime.endOf('day').unix(),
      editTime: this.props.banner.editTime,
      createTime: this.props.banner.createTime,
      backgroundColor: this.formValue.backgroundColor,
      link: this.formValue.link,
      order: this.formValue.order
    }
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
  doValidateName(name: string) {
    if (name === this.props.banner.name) {
      return null
    }
    const hasRecord = this.bannerStore.list
      .some(item => item.name === name)
    if (hasRecord) {
      return 'banner 名称重复'
    }
    return null
  }

  // 校验同一 order 下，生效时间段是否有重叠的
  @autobind
  doValidateOrder(order: number, start: Moment, end: Moment) {
    const effectTime = start.startOf('day').unix()
    const invalidTime = end.endOf('day').unix()
    // 同一 order 的数据 list，且去除 id 相同的（即当前所编辑数据）
    // eslint-disable-next-line no-underscore-dangle
    const filteredList = this.bannerStore.list
      .filter(item => item.order === order && item.name !== this.props.banner.name)
    return checkOverlap({ effectTime, invalidTime }, filteredList) ? '生效时间段内该顺序已存在 banner' : null
  }

  @action
  initFormState(banner) {
    const effectTime = new FieldState(moment.unix(banner.effectTime))
    const invalidTime = new FieldState(moment.unix(banner.invalidTime))
    this.form = new FormState({
      name: new FieldState(banner.name).validators(textNotBlank, this.doValidateName),
      pcImg: uploadImg.createState(banner.pcImg).validators(textNotBlank),
      mobileImg: uploadImg.createState(banner.mobileImg).validators(textNotBlank),
      effectTime,
      invalidTime,
      backgroundColor: new FieldState(banner.backgroundColor).validators(textNotBlank, textColor),
      link: new FieldState(banner.link).validators(textNotBlank, textHttp),
      order: new FieldState(banner.order)
        .validators((order: number) => this.doValidateOrder(order, effectTime.value, invalidTime.value))
    })
    this.addDisposer(this.form.dispose)
  }

  init() {
    this.addDisposer(
      reaction(
        () => this.props.banner,
        banner => {
          if (banner) {
            this.initFormState(banner)
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

  const pcExtra = <p className={style.desc}>推荐尺寸：2880 * 800 px</p>
  const mobileExtra = <p className={style.desc}>推荐尺寸：1125 * 480 px</p>
  const colorExtra = <p className={style.desc}>格式：#******，例如：#333333</p>

  return (
    <Modal
      visible={visible}
      title={titleMap[props.status] + ' banner'}
      onCancel={onCancel}
      onOk={store.handleSubmit}
      confirmLoading={store.confirmLoading}
    >
      <Form>
        <FormItem
          label="banner 名称"
          {...bindFormItem(store.form.$.name)}
        >
          <Input disabled={props.status === EditorStatus.Editing} placeholder="请输入 banner 名称" maxLength={20} {...bindTextInput(store.form.$.name)} />
        </FormItem>
        <FormItem
          label="PC 端图片"
          {...bindFormItem(store.form.$.pcImg)}
          extra={pcExtra}
        >
          <UploadImg state={store.form.$.pcImg} maxSize={500} />
        </FormItem>
        <FormItem
          label="移动端图片"
          {...bindFormItem(store.form.$.mobileImg)}
          extra={mobileExtra}
        >
          <UploadImg state={store.form.$.mobileImg} maxSize={500} />
        </FormItem>
        <FormItem
          label="背景色"
          {...bindFormItem(store.form.$.backgroundColor)}
          extra={colorExtra}
        >
          <Input placeholder="请输入背景色" {...bindTextInput(store.form.$.backgroundColor)} />
        </FormItem>
        <FormItem
          label="跳转链接"
          {...bindFormItem(store.form.$.link)}
        >
          <Input placeholder="请输入链接" {...bindTextInput(store.form.$.link)} />
        </FormItem>
        <FormItem
          label="展示顺序"
          {...bindFormItem(store.form.$.order)}
        >
          <OrderField state={store.form.$.order} maxNum={maxNum} />
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
