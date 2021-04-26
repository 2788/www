/**
 * @file 在线咨询关键词配置
 */

import autobind from 'autobind-decorator'
import React, { useCallback } from 'react'
import { observable, runInAction } from 'mobx'
import { observer, Observer } from 'mobx-react'
import { Table, Icon, Button, Modal } from 'react-icecream'
import { injectable } from 'qn-fe-core/di'
import Store from 'qn-fe-core/store'
import { useLocalStore } from 'qn-fe-core/local-store'
import { makeCancelled } from 'qn-fe-core/exception'

import Toaster from 'admin-base/common/stores/toaster'

import { Spacer } from 'libs/layout-element'
import Container from 'components/common/Container'
import PropertyApis, { PropertyData, Property } from 'apis/consult/property'
import EntityApis, { EntityWithProperties } from 'apis/consult/entity'
import NameInput from './Input/EntityName'
import KeywordsInput from './Input/Keywords'
import PropertiesInput from './Input/Properties'

@injectable()
class LocalStore extends Store {
  constructor(
    private entityApis: EntityApis,
    private propertyApis: PropertyApis,
    toaster: Toaster
  ) {
    super()
    Toaster.bind(this, toaster)
  }

  async init() {
    await this.fetchEntities()
  }

  @observable entities: EntityWithProperties[] = []

  @Toaster.handle()
  async fetchEntities() {
    const entities = await this.entityApis.listWithProperties()
    runInAction(() => {
      this.entities = entities
    })
  }

  @autobind
  @Toaster.handle('添加成功')
  async handleCreate() {
    // eslint-disable-next-line no-alert
    const name = (prompt('请输入实体名') || '').trim()
    if (!name) {
      throw makeCancelled()
    }

    const entity = await this.entityApis.add({
      name,
      keywords: []
    })
    runInAction(() => {
      this.entities.unshift({
        ...entity,
        properties: []
      })
    })
  }

  @autobind
  @Toaster.handle('删除成功')
  async handleRemove(entityId: string) {
    const entity = this.entities.find(item => item._id === entityId)
    if (!entity) return
    await confirm(`确认要删除实体“${entity.name}”吗？`)
    await this.entityApis.deleteWithProperties(entityId)
    runInAction(() => {
      const index = this.entities.findIndex(item => item._id === entityId)
      this.entities.splice(index, 1)
    })
  }

  @autobind
  @Toaster.handle('更新成功')
  async handleNameChange(entityId: string, name: string) {
    const entity = this.entities.find(item => item._id === entityId)
    if (!entity) return
    await this.entityApis.update(entityId, { name })
    runInAction(() => {
      entity.name = name
    })
  }

  @autobind
  @Toaster.handle('更新成功')
  async handleKeywordsChange(entityId: string, keywords: string[]) {
    const entity = this.entities.find(item => item._id === entityId)
    if (!entity) return
    await this.entityApis.update(entityId, { keywords })
    runInAction(() => {
      entity.keywords = keywords
    })
  }

  @autobind
  @Toaster.handle('添加成功')
  async handlePropertyCreate(propertyData: PropertyData) {
    const entity = this.entities.find(item => item._id === propertyData.entityId)
    if (!entity) return
    const property = await this.propertyApis.add(propertyData)
    runInAction(() => {
      entity.properties.push(property)
    })
  }

  @autobind
  @Toaster.handle('更新成功')
  async handlePropertyUpdate(property: Property) {
    const { _id: id, ...updates } = property
    const entity = this.entities.find(item => item._id === property.entityId)
    if (!entity) return
    await this.propertyApis.update(id, updates)
    runInAction(() => {
      entity.properties = entity.properties.map(item => (
        item._id === property._id ? property : item
      ))
    })
  }

  @autobind
  @Toaster.handle('删除成功')
  async handlePropertyRemove(entityId: string, propertyId: string) {
    const entity = this.entities.find(item => item._id === entityId)
    if (!entity) return
    const property = entity.properties.find(item => item._id === propertyId)
    if (!property) return
    await confirm(`确定要删除${entity.name}的属性“${property.name}”吗？`)
    await this.propertyApis.delete(propertyId)
    runInAction(() => {
      entity.properties = entity.properties.filter(item => item._id !== propertyId)
    })
  }
}

export default observer(function Keywords() {
  const store = useLocalStore(LocalStore)

  const renderName = useCallback((_: unknown, entity: EntityWithProperties) => (
    <Observer render={() => (
      <NameInput
        value={entity.name}
        onChange={name => store.handleNameChange(entity._id, name)}
      />
    )} />
  ), [store])

  const renderKeywords = useCallback((_: unknown, entity: EntityWithProperties) => (
    <Observer render={() => (
      <KeywordsInput
        value={entity.keywords}
        onChange={keywords => store.handleKeywordsChange(entity._id, keywords)}
      />
    )} />
  ), [store])

  const renderProperties = useCallback((_: unknown, entity: EntityWithProperties) => (
    <Observer render={() => (
      <PropertiesInput
        entityId={entity._id}
        value={entity.properties}
        onCreate={property => store.handlePropertyCreate(property)}
        onUpdate={store.handlePropertyUpdate}
        onRemove={propertyId => store.handlePropertyRemove(entity._id, propertyId)}
      />
    )} />
  ), [store])

  const renderOperations = useCallback((_: unknown, entity: EntityWithProperties) => (
    <Icon type="delete" title="删除" onClick={() => store.handleRemove(entity._id)} />
  ), [store])

  return (
    <>
      <Container>
        <Spacer />
        <Button icon="plus" onClick={store.handleCreate}>添加实体</Button>
      </Container>
      <Table dataSource={store.entities.slice()} rowKey="name" pagination={false}>
        <Table.Column title="实体名" width={180} dataIndex="name" render={renderName} />
        <Table.Column title="关键词" width="40%" dataIndex="keywords" render={renderKeywords} />
        <Table.Column title="属性" dataIndex="properties" render={renderProperties} />
        <Table.Column title="操作" width={60} align="center" render={renderOperations} />
      </Table>
    </>
  )
})

function confirm(title: string) {
  return new Promise<void>((resolve, reject) => {
    Modal.confirm({
      title,
      onOk: () => resolve(),
      onCancel: () => reject(makeCancelled())
    })
  })
}
