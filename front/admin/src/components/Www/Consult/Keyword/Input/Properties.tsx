import React from 'react'
import { action } from 'mobx'
import { observer } from 'mobx-react'
import { injectable } from 'qn-fe-core/di'
import { injectProps, useLocalStore } from 'qn-fe-core/local-store'
import Icon from 'react-icecream/lib/icon'
import ModalStore from 'admin-base/common/stores/modal'

import { Property, PropertyData } from 'apis/consult/property'
import PropertyEditor, { Props as PropertyEditorProps } from './Property'
import Tag from './Tag'

export interface Props {
  entityId: string
  value: Property[]
  onCreate: (property: PropertyData) => Promise<void>
  onUpdate: (property: Property) => Promise<void>
  onRemove: (propertyId: string) => Promise<void>
}

type ModalOptions = Pick<PropertyEditorProps, 'property' | 'otherProperties'>

@injectable()
class PropertiesLocalStore {
  constructor(@injectProps() private props: Props) {
  }

  editorStore = new ModalStore<ModalOptions>()

  @action.bound async handleRemove(index: number) {
    await this.props.onRemove(this.props.value[index]._id)
  }

  @action.bound handleEdit(index: number) {
    const property = this.props.value[index]
    const otherProperties = this.props.value.filter((_, i) => i !== index)
    this.editorStore.open({ property, otherProperties })
  }

  @action.bound handleAdd() {
    this.editorStore.open()
  }
}

export default observer(function Properties(props: Props) {
  const store = useLocalStore(PropertiesLocalStore, props)

  const tagsView = props.value.map((property, i) => (
    <Tag key={i}>
      <span title="点击编辑" onClick={() => store.handleEdit(i)} style={{ cursor: 'pointer' }}>{property.name}</span>
      <Icon type="close" onClick={() => store.handleRemove(i)} />
    </Tag>
  ))

  return (
    <>
      <div>
        {tagsView}
        <Tag onClick={store.handleAdd} style={{ background: '#fff', cursor: 'pointer' }}>
          <Icon type="plus" /> 添加
        </Tag>
      </div>
      <PropertyEditor
        property={undefined} // keep props shap stable for useAsObservableSource
        otherProperties={props.value}
        entityId={props.entityId}
        onCreate={props.onCreate}
        onUpdate={props.onUpdate}
        {...store.editorStore.bind()}
      />
    </>
  )
})
