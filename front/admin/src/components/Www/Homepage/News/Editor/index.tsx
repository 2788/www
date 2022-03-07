import * as React from 'react'
import { computed, reaction, observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { Form, Input } from 'react-icecream'
import moment from 'moment'
import autobind from 'autobind-decorator'

import { FieldState, FormState, ValueOf } from 'formstate-x'
import { useLocalStore, injectProps } from 'qn-fe-core/local-store'
import Store, { observeInjectable as injectable } from 'qn-fe-core/store'

import { ToasterStore } from 'admin-base/common/toaster'
import { Loadings } from 'admin-base/common/loading'
import { ModalProps as IModalProps } from 'admin-base/common/utils/modal'
import { bindFormItem, bindTextInput, textNotBlank, textPositiveInterger } from 'admin-base/common/form'

import { EditorProps, EditorStatus, titleMap } from 'constants/editor'
import { INews, IArchive } from 'apis/homepage/news'
import Modal from 'components/common/Modal'
import FormItem from 'components/common/FormItem'

import NewsStore from '../store'
import OrderSelect, * as orderSelect from '../../OrderSelect'
import { maxNum } from '..'

type State = FormState<{
  articleId: FieldState<string>
  order: orderSelect.State
}>

type FormDataType = {
  news: INews
  id: string
}

export type ExtraProps = EditorProps & Partial<FormDataType>

export type Props = IModalProps & EditorProps & FormDataType

export const defaultFormData: FormDataType = {
  news: {
    articleId: '',
    title: '',
    summary: '',
    banner: '',
    link: '',
    editTime: 0,
    createTime: '',
    order: 1
  },
  id: ''
}

@injectable()
class LocalStore extends Store {

  constructor(
    @injectProps() private props: Props,
    private newsStore: NewsStore,
    public toasterStore: ToasterStore
  ) {
    super()
    ToasterStore.bindTo(this, toasterStore)
  }

  loadings = Loadings.collectFrom(this)
  @observable.ref form: State
  @observable.ref archive: IArchive

  @computed
  get confirmLoading() {
    return this.loadings.isLoading('submit')
  }

  @computed
  get formValue(): ValueOf<State> {
    return this.form.value
  }

  @action.bound
  updateArchive(res: IArchive) {
    this.archive = res
  }

  @autobind
  getArchive(id: string) {
    return this.newsStore.getArchive(id).then((res: IArchive) => {
      this.updateArchive(res)
    })
  }

  @Loadings.handle('submit')
  async doSubmit() {
    const articleId = this.formValue.articleId
    const param: INews = {
      articleId,
      order: orderSelect.getValue(this.form.$.order),
      title: this.archive.title,
      summary: this.archive.summary,
      banner: this.archive.cover,
      link: '',
      editTime: this.props.news.editTime,
      createTime: moment(this.archive.created_at).format('YYYY-MM-DD')
    }
    if (this.props.status === EditorStatus.Creating) {
      await this.newsStore.add(param)
      this.toasterStore.success('添加资讯成功！')
    } else {
      await this.newsStore.update(param, this.props.id)
      this.toasterStore.success('更新资讯成功！')
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

  // 校验文章 ID 是否是合法的
  @autobind
  async doValidateId(articleId: string) {
    if (articleId === this.props.news.articleId) {
      return null
    }
    const hasRecord = this.newsStore.list
      .some(item => item.articleId === articleId)
    if (hasRecord) {
      return '文章 ID 重复'
    }
    try {
      await this.getArchive(articleId)
    } catch (e) {
      return '请输入正确的文章 ID'
    }
    return null
  }

  // 校验是否有重复的顺序
  @autobind
  doValidateOrder(order: number) {
    // 同一 order 的数据 list，且去除 id 相同的（即当前所编辑数据）
    const hasRecord = this.newsStore.list.some(item => item.order === order && item._id !== this.props.id)
    return hasRecord ? '该顺序已存在资讯' : null
  }

  @action
  initFormState(news: INews) {
    this.form = new FormState({
      articleId: new FieldState(news.articleId)
        .validators(textNotBlank, textPositiveInterger, this.doValidateId),
      order: orderSelect.createState(news.order)
        .validators(this.doValidateOrder)
    })
    this.addDisposer(this.form.dispose)
  }

  @action
  initArchivesNews() {
    const news = this.props.news
    this.archive = {
      id: Number(news.articleId),
      title: news.title,
      summary: news.summary,
      cover: news.banner,
      created_at: news.createTime
    }
  }
  init() {
    this.addDisposer(
      reaction(
        () => this.props.news,
        news => {
          if (news) {
            this.initFormState(news)
            if (this.props.status === EditorStatus.Editing) {
              this.initArchivesNews()
            }
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
      title={titleMap[props.status] + '资讯'}
      onCancel={onCancel}
      onOk={store.handleSubmit}
      confirmLoading={store.confirmLoading}
    >
      <Form>
        <FormItem
          label="文章 ID"
          {...bindFormItem(fields.articleId)}
        >
          <Input placeholder="请输入文章 ID" maxLength={5} {...bindTextInput(fields.articleId)} />
        </FormItem>
        {
          fields.articleId.value !== ''
            ? (
              <FormItem
                label="文章标题"
              >
                <Input disabled value={store.archive ? store.archive.title : props.news!.title} />
              </FormItem>
            )
            : null
        }
        <FormItem
          label="展示顺序"
          {...bindFormItem(fields.order)}
        >
          <OrderSelect state={fields.order} maxNum={maxNum} />
        </FormItem>
      </Form>
    </Modal >
  )
})
