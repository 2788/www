/**
 * @file          component  Editor
 * @description   新增或者编辑产品动态显示的modal页面
 * @author        renpanpan
 */

import * as React from 'react'
import moment, { Moment } from 'moment'
import { computed, reaction, observable } from 'mobx'
import { observer } from 'mobx-react'
import { Form, Input, Radio, DatePicker } from 'react-icecream'
import autobind from 'autobind-decorator'

import { FieldState, FormState, bindInput } from 'formstate-x'
import { injectable } from 'qn-fe-core/di'
import { useLocalStore, injectProps } from 'qn-fe-core/local-store'
import Store from 'qn-fe-core/store'

import ToasterStore from 'admin-base/common/stores/toaster'
import Loadings from 'admin-base/common/stores/loadings'
import { IModalProps } from 'admin-base/common/stores/modal'
import { bindFormItem, bindTextInput, bindInputWithCurrentTarget, bindRadioGroup } from 'admin-base/common/utils/form'
import { textNotBlank } from 'admin-base/common/utils/validator'

import { textHttp } from 'utils/validator'
import { EditorProps, EditorStatus, titleMap } from 'constants/editor'
import NewsApis, { INews, NewsType } from 'apis/product/news'
import Modal from 'components/common/Modal'

import ProductSelect, * as productSelect from '../../ProductSelect'
import { newsTypeTextMap, newsTypeArr } from '..'

type State = FormState<{
  product: productSelect.State
  type: FieldState<NewsType>
  releaseTime: FieldState<Moment>
  title: FieldState<string>
  desc: FieldState<string>
  link: FieldState<string>
}>

type FormDataType = {
  news: INews
  id: string
} & EditorProps

export type ExtraProps = EditorProps & Partial<FormDataType>

export type Props = IModalProps & EditorProps & FormDataType

export const defaultFormData: FormDataType = {
  news: {
    product: '',
    type: NewsType.NewProduct,
    releaseTime: moment().unix(),
    title: '',
    desc: '',
    link: '',
    createTime: 0,
    editTime: 0
  },
  id: '',
  status: EditorStatus.Creating
}

function createState(news: INews): State {
  return new FormState({
    product: productSelect.createState(news.product),
    type: new FieldState(news.type),
    releaseTime: new FieldState(moment.unix(news.releaseTime)),
    title: new FieldState(news.title).validators(textNotBlank),
    desc: new FieldState(news.desc).validators(textNotBlank),
    link: new FieldState(news.link).validators(value => (value.length > 0 ? textHttp(value) : null))
  })
}

function getValue(state: State, news: INews): INews {
  return {
    product: productSelect.getValue(state.$.product),
    type: state.value.type,
    releaseTime: state.value.releaseTime.startOf('day').unix(),
    title: state.value.title,
    desc: state.value.desc,
    link: state.value.link,
    createTime: news.createTime,
    editTime: news.editTime
  }
}
@injectable()
class LocalStore extends Store {

  constructor(
    @injectProps()
    private props: Props,
    private newsApis: NewsApis,
    public toasterStore: ToasterStore
  ) {
    super()
    ToasterStore.bind(this, toasterStore)
  }

  loadings = Loadings.collectFrom(this)
  @observable.ref state: State = createState(this.props.news)

  @computed
  get confirmLoading() {
    return this.loadings.isLoading('submit')
  }

  @Loadings.handle('submit')
  async doSubmit() {
    const value: INews = getValue(this.state, this.props.news)
    if (this.props.status === EditorStatus.Creating) {
      await this.newsApis.add(value)
      this.toasterStore.success('添加产品动态成功！')
    } else {
      await this.newsApis.update(value, this.props.id)
      this.toasterStore.success('更新产品动态成功！')
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
        () => this.props.news,
        news => {
          if (news) {
            this.state.dispose()
            this.state = createState(news)
            this.addDisposer(this.state.dispose)
          }
        },
        { fireImmediately: true }
      )
    )
    this.addDisposer(reaction(
      () => this.props.visible,
      visible => {
        if (!visible) {
          this.state.reset()
        }
      }
    ))
  }
}

const defaultFormItemLayout = {
  labelCol: { xs: { span: 6 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 16 }, sm: { span: 16 } }
}

export default observer(function EditorModal(props: IModalProps & ExtraProps) {
  props = { ...defaultFormData, ...props }
  const store = useLocalStore(LocalStore, props)
  const { visible, onCancel } = props

  const fields = store.state.$

  return (
    <Modal
      visible={visible}
      title={titleMap[props.status] + '产品动态'}
      onCancel={onCancel}
      onOk={store.handleSubmit}
      confirmLoading={store.confirmLoading}
    >
      <Form {...defaultFormItemLayout}>
        <Form.Item
          label="所属产品"
          required
          {...bindFormItem(fields.product)}
        >
          <ProductSelect state={fields.product} />
        </Form.Item>
        <Form.Item
          label="动态类型"
          required
          {...bindFormItem(fields.type)}
        >
          <Radio.Group {...bindRadioGroup(fields.type)}>
            {
              newsTypeArr.map(type => (
                <Radio key={type} value={type}>{newsTypeTextMap[type]}</Radio>
              ))
            }
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="发布时间"
          required
          {...bindFormItem(fields.releaseTime)}
        >
          <DatePicker
            {...bindInput(fields.releaseTime)}
            format="YYYY-MM-DD"
            allowClear={false}
          />
        </Form.Item>
        <Form.Item
          label="动态标题"
          required
          {...bindFormItem(fields.title)}
        >
          <Input placeholder="请输入标题" maxLength={50} {...bindTextInput(fields.title)} />
        </Form.Item>
        <Form.Item
          label="动态描述"
          required
          {...bindFormItem(fields.desc)}
        >
          <Input.TextArea placeholder="请输入描述" maxLength={100} {...bindInputWithCurrentTarget(fields.desc)} />
        </Form.Item>
        <Form.Item
          label="相关文档链接"
          {...bindFormItem(fields.link)}
        >
          <Input placeholder="请输入链接" {...bindTextInput(fields.link)} />
        </Form.Item>
      </Form>
    </Modal>
  )
})
