import * as React from 'react'
import { computed, reaction, observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { Form, Input, DatePicker } from 'react-icecream-1'
import moment, { Moment } from 'moment'
import autobind from 'autobind-decorator'

import { toV2 } from 'formstate-x/adapter'
import { FieldState, FormState, ValueOf, Validator, ValidatorResponse } from 'formstate-x-v2'
import { useLocalStore, injectProps } from 'qn-fe-core/local-store'
import Store, { observeInjectable as injectable } from 'qn-fe-core/store'

import { ToasterStore } from 'admin-base/common/toaster'
import { Loadings } from 'admin-base/common/loading'
import { ModalProps as IModalProps } from 'admin-base/common/utils/modal'
import { textNotBlank } from 'admin-base/common/form'

import { bindFormItem, bindTextInput, bindRangePicker } from 'utils/bind'
import { textHttp } from 'utils/validator'
import style from 'utils/style.m.less'
import { EditorProps, titleMap, EditorStatus } from 'constants/editor'
import { IBanner } from 'apis/homepage/banner'
import ImgColor, * as imgColor from 'components/common/ImgColor'
import UploadImg, * as uploadImg from 'components/common/Upload/Img'
import Modal from 'components/common/Modal'
import FormItem from 'components/common/FormItem'

import { checkOverlap } from 'utils/check'
import BannerStore from '../store'
import OrderSelect, * as orderSelect from '../../OrderSelect'
import { maxNum } from '..'

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

function createState(
  banner: IBanner,
  validateName: Validator<string>,
  validateOrder: (order: number, start: Moment, end: Moment) => ValidatorResponse
) {
  const effectTime = new FieldState(moment.unix(banner.effectTime))
  const invalidTime = new FieldState(moment.unix(banner.invalidTime))
  return new FormState({
    name: new FieldState(banner.name).validators(textNotBlank, validateName),
    imgColor: toV2(imgColor.createState({ img: banner.pcImg, color: banner.backgroundColor })),
    mobileImg: toV2(uploadImg.createState(banner.mobileImg).withValidator(textNotBlank)),
    effectTime,
    invalidTime,
    link: new FieldState(banner.link).validators(textNotBlank, textHttp),
    order: orderSelect.createState(banner.order)
      .validators((order: number) => validateOrder(order, effectTime.value, invalidTime.value))
  })
}

type State = ReturnType<typeof createState>

@injectable()
class LocalStore extends Store {

  constructor(
    @injectProps() private props: Props,
    private bannerStore: BannerStore,
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
    const imgColorVal = this.form.$.imgColor.value
    const param: IBanner = {
      name: this.formValue.name,
      pcImg: imgColorVal.img,
      backgroundColor: imgColorVal.color,
      mobileImg: this.form.$.mobileImg.value,
      effectTime: this.formValue.effectTime.startOf('day').unix(),
      invalidTime: this.formValue.invalidTime.endOf('day').unix(),
      editTime: this.props.banner.editTime,
      createTime: this.props.banner.createTime,
      link: this.formValue.link,
      order: orderSelect.getValue(this.form.$.order)
    }
    if (this.props.status === EditorStatus.Creating) {
      await this.bannerStore.add(param)
      this.toasterStore.success('添加 banner 成功！')
    } else {
      await this.bannerStore.update(param)
      this.toasterStore.success('更新 banner 成功！')
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
    const filteredList = this.bannerStore.list
      .filter(item => item.order === order && item.name !== this.props.banner.name)
    return checkOverlap({ effectTime, invalidTime }, filteredList) ? '生效时间段内该顺序已存在 banner' : null
  }

  @action
  initFormState(banner: IBanner) {
    this.form = createState(banner, this.doValidateName, this.doValidateOrder)
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
  const store = useLocalStore(LocalStore, props)
  const { visible, onCancel } = props

  if (!store.form) {
    return null
  }

  const fields = store.form.$
  const pcExtra = <p className={style.desc}>推荐尺寸：2880 * 800 px</p>
  const mobileExtra = <p className={style.desc}>推荐尺寸：1125 * 480 px</p>

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
          {...bindFormItem(fields.name)}
        >
          <Input disabled={props.status === EditorStatus.Editing} placeholder="请输入 banner 名称" maxLength={20} {...bindTextInput(fields.name)} />
        </FormItem>
        <ImgColor state={fields.imgColor.$} labels={['PC 端图片', '背景色']} extra={[pcExtra]} />
        <FormItem
          label="移动端图片"
          {...bindFormItem(fields.mobileImg)}
          extra={mobileExtra}
        >
          <UploadImg state={fields.mobileImg.$} maxSize={500} />
        </FormItem>
        <FormItem
          label="跳转链接"
          {...bindFormItem(fields.link)}
        >
          <Input placeholder="请输入链接" {...bindTextInput(fields.link)} />
        </FormItem>
        <FormItem
          label="展示顺序"
          {...bindFormItem(fields.order)}
        >
          <OrderSelect state={fields.order} maxNum={maxNum} />
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
      <p className={style.tips}>说明：上传 banner 前，请企业微信联系 @杨寒星 确认 banner 设计中是否涉及字体侵权（请重视该流程，不可跳过）</p>
    </Modal>
  )
})
