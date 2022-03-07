import React from 'react'
import { Icon } from 'react-icecream'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { FieldState } from 'formstate-x-v2'
import { observeInjectable as injectable } from 'qn-fe-core/store'
import { injectProps, useLocalStore } from 'qn-fe-core/local-store'

import SimpleInput from './SimpleInput'
import Tag from './Tag'

export interface Props {
  value: string[]
  onChange: (value: string[]) => Promise<void> | void
}

@injectable()
class KeywordsLocalStore {
  constructor(@injectProps() private props: Props) {}

  @observable inputing = false

  inputState = new FieldState('', 0)

  @action.bound async handleRemove(index: number) {
    const curr = this.props.value
    await this.props.onChange([...curr.slice(0, index), ...curr.slice(index + 1)])
  }

  @action.bound handleAdd() {
    this.inputing = true
  }

  @action.bound stopInput() {
    this.inputState.reset()
    this.inputing = false
  }

  @action.bound async handleSubmit() {
    const input = this.inputState.value.trim()
    if (input) {
      await this.props.onChange([...this.props.value, input])
    }
    this.stopInput()
  }
}

export default observer(function Keywords(props: Props) {
  const store = useLocalStore(KeywordsLocalStore, props)

  const tagsView = props.value.map((keyword, i) => (
    <Tag key={i}>
      {keyword}
      <Icon type="close" title="删除" onClick={() => store.handleRemove(i)} />
    </Tag>
  ))

  const addView = !store.inputing && (
    <Tag onClick={store.handleAdd} style={{ background: '#fff', cursor: 'pointer' }}>
      <Icon type="plus" /> 添加
    </Tag>
  )

  const inputView = store.inputing && (
    <SimpleInput
      style={{ width: '80px' }}
      onSubmit={store.handleSubmit}
      onCancel={store.stopInput}
      state={store.inputState}
    />
  )

  return (
    <div>
      {tagsView}
      {addView}
      {inputView}
    </div>
  )
})
