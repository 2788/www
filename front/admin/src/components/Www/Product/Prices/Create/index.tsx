/**
 * @file          component  Create
 * @description   添加产品动态显示的 modal 页面
 * @author        renpanpan
 */

import * as React from 'react'
import { computed, reaction, observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { Form } from 'react-icecream'
import autobind from 'autobind-decorator'
import { saveAs } from 'file-saver'

import { FormState, ValueOf } from 'formstate-x'
import { injectable, useInjection } from 'qn-fe-core/di'
import { useLocalStore, injectProps } from 'qn-fe-core/local-store'
import Store from 'qn-fe-core/store'

import ToasterStore from 'admin-base/common/stores/toaster'
import Loadings from 'admin-base/common/stores/loadings'
import { IModalProps } from 'admin-base/common/stores/modal'
import { bindFormItem } from 'admin-base/common/utils/form'

import { titleMap, EditorStatus } from 'constants/editor'
import PriceApis from 'apis/product/price'
import Modal from 'components/common/Modal'

import ProductSelect, * as productSelect from '../../ProductSelect'
import UploadMdFile, * as uploadMdFile from '../UploadMdFile'
import PricesStore from '../store'
import documentationMd from './documentation.md'
import * as style from './style.m.less'

type State = FormState<{
  product: productSelect.State
  file: uploadMdFile.State
}>

type Value = ValueOf<State>

export type ExtraProps = {}

function getValue(state: State): Value {
  return {
    product: productSelect.getValue(state.$.product),
    file: uploadMdFile.getValue(state.$.file)
  }
}

@injectable()
class LocalStore extends Store {

  constructor(
    @injectProps()
    private props: IModalProps,
    private priceApis: PriceApis,
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

  @autobind
  @ToasterStore.handle('添加产品价格页成功！')
  async handleSubmit() {
    const validation = await this.form.validate()
    if (validation.hasError) {
      return Promise.reject('请检查输入')
    }
    const value: Value = getValue(this.form)
    const opts = {
      product: value.product,
      fileName: value.file.name,
      fileUrl: value.file.url
    }
    await Promise.all([this.priceApis.add(opts), this.priceApis.addVersion(opts)])
    this.props.onSubmit()
  }

  @action
  initFormState() {
    this.form = new FormState({
      product: productSelect.createState(''),
      file: uploadMdFile.createState()
    })
    this.addDisposer(this.form.dispose)
  }

  init() {
    this.addDisposer(
      reaction(
        () => this.props.visible,
        visible => {
          if (visible) {
            this.initFormState()
          }
        },
        { fireImmediately: true }
      )
    )
  }
}

const defaultFormItemLayout = {
  labelCol: { xs: { span: 6 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 16 }, sm: { span: 16 } }
}

export default observer(function CreateModal(props: IModalProps) {
  const store = useLocalStore(LocalStore, props)
  const { visible, onCancel } = props
  const pricesStore = useInjection(PricesStore)
  const disabledProducts = pricesStore.list.map(item => item.product) // 已经有价格页的产品

  if (!store.form) {
    return null
  }
  const fields = store.form.$

  const fileExtra = <a onClick={() => saveAs(documentationMd, '说明文档.md')} className={style.tips}>说明文档.md</a>

  return (
    <Modal
      visible={visible}
      title={titleMap[EditorStatus.Creating] + '产品价格页'}
      onCancel={onCancel}
      onOk={store.handleSubmit}
      confirmLoading={store.confirmLoading}
    >
      <Form {...defaultFormItemLayout}>
        <Form.Item label="所属产品" required {...bindFormItem(fields.product)}>
          <ProductSelect state={fields.product} disabledProducts={disabledProducts} />
        </Form.Item>
        <Form.Item label="文件" required extra={fileExtra} {...bindFormItem(fields.file)}>
          <UploadMdFile state={fields.file} />
        </Form.Item>
      </Form>
    </Modal>
  )
})
