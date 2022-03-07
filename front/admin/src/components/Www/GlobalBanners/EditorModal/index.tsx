import * as React from 'react'
import { computed, reaction, observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { Form, Input, Checkbox } from 'react-icecream'
import moment from 'moment'
import autobind from 'autobind-decorator'

import { toV2 } from 'formstate-x/adapter'
import { FieldState, FormState, ValueOf } from 'formstate-x-v2'
import { useLocalStore, injectProps } from 'qn-fe-core/local-store'
import Store, { observeInjectable as injectable } from 'qn-fe-core/store'

import { ToasterStore } from 'admin-base/common/toaster'
import { Loadings } from 'admin-base/common/loading'
import { ModalProps as IModalProps } from 'admin-base/common/utils/modal'
import { textNotBlank } from 'admin-base/common/form'

import { bindFormItem, bindTextInput, bindCheckboxGroup } from 'utils/bind'
import { textHttp } from 'utils/validator'
import { checkOverlap } from 'utils/check'
import style from 'utils/style.m.less'
import { EditorProps, titleMap, EditorStatus } from 'constants/editor'
import BannerApis, { IBannerWithId, IAddBannerOptions, IListResponse } from 'apis/global-banner'
import ImgColor, * as imgColor from 'components/common/ImgColor'
import UploadImg, * as uploadImg from 'components/common/Upload/Img'
import Modal from 'components/common/Modal'
import FormItem from 'components/common/FormItem'

import { displayPagesArr, displayPagesTextMap } from '../constants'
import RangeTime, * as rangeTime from '../RangeTime'

type FormDataType = {
  banner: IBannerWithId
}

export type ExtraProps = EditorProps & Partial<FormDataType>

export type Props = IModalProps & EditorProps & FormDataType

export const defaultFormData: FormDataType = {
  banner: {
    _id: '',
    name: '',
    pcImg: '',
    mobileImg: '',
    effectTime: moment().unix(),
    invalidTime: moment().add(1, 'month').unix(),
    createTime: 0,
    editTime: 0,
    backgroundColor: '',
    link: '',
    displayPages: []
  }
}

function createState(banner: IBannerWithId, allBanners: IBannerWithId[]) {
  const doValidateName = (name: string) => {
    if (name === banner.name) {
      return null
    }
    const hasRecord = allBanners.some(item => (
      item.name === name
    ))
    if (hasRecord) {
      return '全局公告名称重复'
    }
    return null
  }
  // 校验生效时间段是否有重叠的
  const doValidateRangeTime = (value: rangeTime.Value) => {
    const effectTime = value.effectTime.startOf('day').unix()
    const invalidTime = value.invalidTime.endOf('day').unix()
    // 去除 id 相同的（即当前所编辑数据）
    const filteredBanners = allBanners.filter(item => (
      item._id !== banner._id
    ))
    return checkOverlap({ effectTime, invalidTime }, filteredBanners) ? '生效时间段内已存在全局公告' : null
  }
  return new FormState({
    name: new FieldState(banner.name).validators(textNotBlank, doValidateName),
    imgColor: toV2(imgColor.createState({ img: banner.pcImg, color: banner.backgroundColor })),
    mobileImg: toV2(uploadImg.createState(banner.mobileImg).withValidator(textNotBlank)),
    rangeTime: rangeTime.createState({
      effectTime: moment.unix(banner.effectTime),
      invalidTime: moment.unix(banner.invalidTime)
    }).validators(doValidateRangeTime),
    link: new FieldState(banner.link).validators(textNotBlank, textHttp),
    displayPages: new FieldState(banner.displayPages).validators(pages => (
      pages.length === 0 ? '请至少选择一个展示区域' : null
    ))
  })
}

type State = ReturnType<typeof createState>

@injectable()
class LocalStore extends Store {

  constructor(
    @injectProps()
    private props: Props,
    private bannerApis: BannerApis,
    private toasterStore: ToasterStore
  ) {
    super()
    ToasterStore.bindTo(this, toasterStore)
  }

  loadings = Loadings.collectFrom(this)
  @observable.ref allBanners: IBannerWithId[] = [] // 全部的全局公告数据
  @observable.ref state: State = createState(this.props.banner, this.allBanners)
  @computed
  get confirmLoading() {
    return this.loadings.isLoading('submit')
  }

  @computed
  get stateValue(): ValueOf<State> {
    return this.state.value
  }

  @action.bound
  updateAllBanners(banners: IBannerWithId[]) {
    this.allBanners = banners
  }

  @autobind
  @Loadings.handle('fetchAllBanners')
  fetchAllBanners() {
    return this.bannerApis.list()
      .then((res: IListResponse) => this.updateAllBanners(res.data))
  }

  @Loadings.handle('submit')
  async doSubmit() {
    const imgColorVal = this.state.$.imgColor.value
    const opts: IAddBannerOptions = {
      name: this.stateValue.name,
      pcImg: imgColorVal.img,
      backgroundColor: imgColorVal.color,
      mobileImg: this.state.$.mobileImg.value,
      effectTime: this.stateValue.rangeTime.effectTime.startOf('day').unix(),
      invalidTime: this.stateValue.rangeTime.invalidTime.endOf('day').unix(),
      link: this.stateValue.link,
      displayPages: this.stateValue.displayPages
    }
    if (this.props.status === EditorStatus.Creating) {
      await this.bannerApis.add(opts)
      this.toasterStore.success('添加全局公告成功！')
    } else {
      const { _id, ...originalData } = this.props.banner
      await this.bannerApis.update(_id, { ...originalData, ...opts })
      this.toasterStore.success('更新全局公告成功！')
    }
  }

  @autobind
  @ToasterStore.handle()
  async handleSubmit() {
    const validation = await this.state.validate()
    if (validation.hasError) {
      return Promise.reject('请检查输入')
    }
    await this.doSubmit()
    this.props.onSubmit()
  }

  init() {
    this.addDisposer(
      reaction(
        () => [this.props.banner, this.allBanners] as const,
        ([banner, allBanners]) => {
          this.state.dispose()
          this.state = createState(banner, allBanners)
          this.addDisposer(this.state.dispose)
        },
        { fireImmediately: true }
      )
    )
    this.addDisposer(
      reaction(
        () => this.props.visible,
        visible => {
          if (visible) {
            this.fetchAllBanners()
          }
        },
        { fireImmediately: true }
      )
    )
  }
}

const BannerForm = observer(function _BannerForm({ state, status }: { state: State } & ExtraProps) {
  const fields = state.$
  const pcImgExtra = <p className={style.desc}>推荐尺寸：2880 * 160 px</p>
  const mobileImgExtra = <p className={style.desc}>推荐尺寸：1125 * 156 px</p>

  return (
    <Form>
      <FormItem
        label="公告名称"
        {...bindFormItem(fields.name)}
      >
        <Input disabled={status === EditorStatus.Editing} placeholder="请输入公告名称" maxLength={20} {...bindTextInput(fields.name)} />
      </FormItem>
      <ImgColor state={fields.imgColor.$} labels={['PC 端图片', '背景色']} extra={[pcImgExtra]} />
      <FormItem
        label="移动端图片"
        {...bindFormItem(fields.mobileImg)}
        extra={mobileImgExtra}
      >
        <UploadImg state={fields.mobileImg.$} maxSize={500} />
      </FormItem>
      <FormItem
        label="跳转链接"
        {...bindFormItem(fields.link)}
      >
        <Input placeholder="请输入链接" {...bindTextInput(fields.link)} />
      </FormItem>
      <FormItem label="生效起止时间" {...bindFormItem(fields.rangeTime)}>
        <RangeTime state={fields.rangeTime} />
      </FormItem>
      <FormItem
        label="展示区域"
        {...bindFormItem(fields.displayPages)}
      >
        <Checkbox.Group
          {...bindCheckboxGroup(fields.displayPages)}
        >
          {displayPagesArr.map((item, index) => (
            <Checkbox key={index} value={item}>
              {displayPagesTextMap[item]}
            </Checkbox>
          ))}
        </Checkbox.Group>
      </FormItem>
    </Form>
  )
})

export default observer(function EditorModal(props: IModalProps & ExtraProps) {
  const { visible, onCancel, onSubmit, ...originalExtraProps } = props
  const extraProps = {
    ...defaultFormData,
    status: EditorStatus.Creating,
    ...originalExtraProps as any // FIXME
  }
  const store = useLocalStore(LocalStore, { ...props, ...extraProps })

  return (
    <Modal
      visible={visible}
      title={titleMap[extraProps.status] + '全局公告'}
      onCancel={onCancel}
      onOk={store.handleSubmit}
      confirmLoading={store.confirmLoading}
    >
      <BannerForm state={store.state} {...extraProps} />
    </Modal>
  )
})
