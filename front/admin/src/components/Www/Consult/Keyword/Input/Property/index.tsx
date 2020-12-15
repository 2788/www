import autobind from 'autobind-decorator'
import React, { FormEvent, useRef } from 'react'
import { computed, reaction, comparer, observable } from 'mobx'
import { observer } from 'mobx-react'
import { FormState, FieldState, bindInput } from 'formstate-x'
import Store from 'qn-fe-core/store'
import { injectable } from 'qn-fe-core/di'
import { injectProps, useLocalStore } from 'qn-fe-core/local-store'
import { IModalProps } from 'admin-base/common/stores/modal'
import Loadings from 'admin-base/common/stores/loadings'
import Toaster from 'admin-base/common/stores/toaster'
import Form from 'react-icecream/lib/form'

import Modal from 'components/common/Modal'
import { Property, PropertyData } from 'apis/consult/property'

import KeywordsInput from '../Keywords'
import NameInput, * as nameInput from './Name'
import AnswerInput, * as answerInput from './Answer'
import IsDescInput, * as isDescInput from './IsDesc'

export type Props = IModalProps & {
  /** 当前实体 ID */
  entityId: string
  /** 当前实体的其他属性 */
  otherProperties: Property[]
  /** 当前编辑属性（如有） */
  property?: Property
  /** 创建新属性的回调函数（接口调用） */
  onCreate: (property: PropertyData) => Promise<void>
  /** 更新属性的回调函数（接口调用） */
  onUpdate: (property: Property) => Promise<void>
}

type State = FormState<{
  name: nameInput.State
  keywords: FieldState<string[]>
  answer: answerInput.State
  isDesc: isDescInput.State
}>

type Value = {
  name: nameInput.Value
  keywords: string[]
  answer: answerInput.Value
  isDesc: isDescInput.Value
}

function createState(value: Value | undefined, otherProperties: Property[]): State {
  return new FormState({
    name: nameInput.createState(value && value.name).validators(name => {
      if (otherProperties.some(item => item.name === name)) {
        return `当前实体已经存在其他名为${name}的属性`
      }
    }),
    keywords: new FieldState(value ? value.keywords : []),
    answer: answerInput.createState(value && value.answer),
    isDesc: isDescInput.createState(value && value.isDesc).validators(isDesc => {
      if (!isDesc) return
      const anotherDesc = otherProperties.find(item => item.isDesc)
      return anotherDesc && isDesc && `当前实体已经存在其他标记为“默认描述”的属性（${anotherDesc.name}）`
    })
  })
}

function getValue(state: State): Value {
  return {
    name: nameInput.getValue(state.$.name),
    keywords: state.$.keywords.value,
    answer: answerInput.getValue(state.$.answer),
    isDesc: isDescInput.getValue(state.$.isDesc)
  }
}

@injectable()
class LocalStore extends Store {
  constructor(
    @injectProps() private props: Props,
    private toaster: Toaster
  ) {
    super()
  }

  loadings = Loadings.collectFrom(this)

  @observable.ref state = createState(this.props.property, this.props.otherProperties)

  @computed get editing() {
    return !!this.props.property
  }

  @computed get title() {
    return this.editing ? `属性“${this.props.property!.name}”` : '添加属性'
  }

  @computed get submiting() {
    return this.loadings.isLoading('submit')
  }

  @autobind
  @Loadings.handle('submit')
  async handleSubmit(e?: FormEvent) {
    if (e) e.preventDefault()
    const { hasError } = await this.state.validate()
    if (hasError) {
      this.toaster.error('请检查输入')
      return
    }
    const value = getValue(this.state)
    await (
      this.editing
      ? this.props.onUpdate({ ...this.props.property!, ...value })
      : this.props.onCreate({ ...value, entityId: this.props.entityId })
    )
    this.props.onSubmit()
  }

  init() {

    this.addDisposer(reaction(
      () => ({
        property: this.props.property,
        otherProperties: this.props.otherProperties
      }),
      ({ property, otherProperties }) => {
        this.state.dispose()
        this.state = createState(property, otherProperties)
        this.addDisposer(this.state.dispose)
      },
      { equals: comparer.shallow }
    ))

    this.addDisposer(reaction(
      () => this.props.visible,
      visible => {
        if (!visible) {
          this.state.reset()
        }
      }
    ))

    this.addDisposer(reaction(
      () => this.state.$.name.value,
      name => {
        // 新建属性时，若名为“介绍”，自动标记为当前实体的默认描述
        if (!this.editing && name === '介绍') {
          this.state.$.isDesc.set(true)
        }
      }
    ))
  }
}

const formLayout = {
  labelCol: { xs: { span: 12 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 12 }, sm: { span: 12 } }
}

export default observer(function PropertyEditor(props: Props) {
  const store = useLocalStore(LocalStore, props)
  const ref = useRef(store)
  ref.current = store
  const fields = store.state.$
  return (
    <Modal
      visible={props.visible}
      title={store.title}
      onCancel={props.onCancel}
      onOk={store.handleSubmit}
      confirmLoading={store.submiting}
    >
      <Form onSubmit={store.handleSubmit} {...formLayout}>
        <NameInput state={fields.name} />
        <IsDescInput state={fields.isDesc} />
        <Form.Item label="关键词">
          <KeywordsInput {...bindInput(fields.keywords)} />
        </Form.Item>
        <AnswerInput state={fields.answer} />
      </Form>
    </Modal>
  )
})
