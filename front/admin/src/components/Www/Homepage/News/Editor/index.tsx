import * as React from 'react'
import autobind from 'autobind-decorator'
import { computed, reaction, observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { Form, Input } from 'react-icecream'
import { FieldState, FormState, ValueOf } from 'formstate-x'
import { injectable } from 'qn-fe-core/di'
import { useLocalStore, injectProps } from 'qn-fe-core/local-store'
import Store from 'qn-fe-core/store'
import ToasterStore from 'admin-base/common/stores/toaster'
import Loadings from 'admin-base/common/stores/loadings'
import { IModalProps } from 'admin-base/common/stores/modal'
import { bindFormItem, bindTextInput } from 'admin-base/common/utils/form'
import { textNotBlank, textPositiveInterger } from 'admin-base/common/utils/validator'
import { EditorProps, EditorStatus, titleMap } from 'constants/editor'
import moment from 'moment'
import { INews, IArchive } from 'apis/homepage/news'
import Modal from 'components/common/Modal'
import FormItem from 'components/common/FormItem'
import NewsStore from '../store'
import OrderField from '../../OrderField'
import { maxNum } from '..'

type State = FormState<{
  articleId: FieldState<string>
  order: FieldState<number>
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
class EditorModalStore extends Store {

  constructor(
    @injectProps() private props: Props,
    private newsStore: NewsStore,
    public toasterStore: ToasterStore
  ) {
    super()
    ToasterStore.bind(this, toasterStore)
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
  async doAdd(param: INews) {
    await this.newsStore.add(param).catch(() => Promise.reject(''))
    this.toasterStore.success('创建资讯成功！')
  }

  @Loadings.handle('submit')
  async doEdit(param: INews, id: string) {
    await this.newsStore.update(param, id)
    this.toasterStore.success('更新资讯成功！')
  }

  doSubmit() {
    const articleId = this.formValue.articleId

    const param: INews = {
      articleId,
      order: this.formValue.order,
      title: this.archive.title,
      summary: this.archive.summary,
      banner: this.archive.cover,
      link: '',
      editTime: moment().unix(),
      createTime: moment(this.archive.created_at).format('YYYY-MM-DD')
    }
    if (this.props.status === EditorStatus.Creating) {
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
    // eslint-disable-next-line no-underscore-dangle
    const hasRecord = this.newsStore.list.some(item => item.order === order && item._id !== this.props.id)
    return hasRecord ? '该顺序已存在资讯' : null
  }

  @action
  initFormState() {
    const news = this.props.news
    this.form = new FormState({
      articleId: new FieldState(news.articleId)
        .validators(textNotBlank, textPositiveInterger, this.doValidateId),
      order: new FieldState(news.order)
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
            this.initFormState()
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
  const store = useLocalStore(EditorModalStore, props)
  const { visible, onCancel } = props

  if (!store.form) {
    return null
  }

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
          {...bindFormItem(store.form.$.articleId)}
        >
          <Input placeholder="请输入文章 ID" maxLength={5} {...bindTextInput(store.form.$.articleId)} />
        </FormItem>
        {
          store.form.$.articleId.value !== ''
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
          {...bindFormItem(store.form.$.order)}
        >
          <OrderField state={store.form.$.order} maxNum={maxNum} />
        </FormItem>
      </Form>
    </Modal >
  )
})
