/**
 * @file 相关文档
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState, useEffect, Fragment } from 'react'
import { observer } from 'mobx-react'
import { FormState, DebouncedFieldState, ArrayFormState } from 'formstate-x'
import { Button } from 'react-icecream'
import { AddIcon, DeleteIcon } from 'react-icecream/icons'
import { DrawerForm, FormItem, useFormstateX, TextInput } from 'react-icecream-form'

import { useModalLike } from 'utils/async'
import { ProductModule, productModuleTitleMap, ProductSection } from 'constants/product/page'
import { ProductComponentName } from 'constants/product/page/comp-common'
import { ProductComponentDocumentConfig, DocumentItem, DocumentLink } from 'constants/product/page/comp-document'
import WwwUrlPath, { createState as createWwwUrlPathState } from 'components/common/WwwUrlPath'

import styles from './style.m.less'

function createState(props?: ProductComponentDocumentConfig['props']) {
  return new FormState({
    items: new ArrayFormState(props?.items ?? [], item => (
      new FormState({
        type: new DebouncedFieldState(item.type).withValidator(type => {
          if (type.trim() === '') {
            return '不能为空'
          }
          if (type.length > 12) {
            return '不能超过 12 个字'
          }
        }),
        links: new ArrayFormState(item.links ?? [], link => (
          new FormState({
            title: new DebouncedFieldState(link.title).withValidator(title => {
              if (title.trim() === '') {
                return '不能为空'
              }
              if (title.length > 30) {
                return '不能超过 30 个字'
              }
            }),
            url: createWwwUrlPathState(link.url).withValidator(url => {
              if (url.trim() === '') {
                return '不能为空'
              }
            })
          })
        )).withValidator(links => {
          if (links.length === 0) {
            return '最少 1 组'
          }
          if (links.length > 6) {
            return '最多 6 组'
          }
        })
      })
    )).withValidator(items => {
      if (items.length < 2) {
        return '最少 2 组'
      }
      if (items.length > 4) {
        return '最多 4 组'
      }
    })
  })
}

interface Props {
  props?: ProductComponentDocumentConfig['props']
  visible: boolean
  onSubmit(config: ProductComponentDocumentConfig['props']): void
  onCancel(): void
}

const CompDrawerForm = observer(function _CompDrawerForm(props: Props) {
  const state = useFormstateX(createState, [props.props])

  useEffect(() => {
    if (!props.visible) {
      state.reset()
    }
  }, [props.visible, state])

  function submit() {
    props.onSubmit(state.value)
  }

  function addItem() {
    const item: DocumentItem = {
      type: '',
      links: []
    }
    state.$.items.append(item)
  }

  function removeItem(index: number) {
    state.$.items.remove(index)
  }

  function addLink(itemIndex: number) {
    const itemState = state.$.items.$[itemIndex]
    const linkState = itemState.$.links
    const link: DocumentLink = {
      title: '',
      url: ''
    }
    linkState.append(link)
  }

  function removeLink(itemIndex: number, linkIndex: number) {
    const itemState = state.$.items.$[itemIndex]
    const linkState = itemState.$.links
    linkState.remove(linkIndex)
  }

  return (
    <DrawerForm
      title={productModuleTitleMap[ProductModule.Document]}
      width={740}
      layout="horizontal"
      labelWidth="4em"
      visible={props.visible}
      state={state}
      onSubmit={submit}
      onCancel={() => { props.onCancel() }}
    >
      <FormItem label="文档组" labelWidth="3em" required state={state.$.items}>
        {state.$.items.$.map((itemState, itemIndex) => (
          <Fragment key={itemIndex}>
            <FormItem
              label={
                <span className={styles.section}>
                  <span>{itemIndex + 1}</span>
                  <Button
                    type="link"
                    icon={<DeleteIcon />}
                    className={styles.btn}
                    onClick={() => { removeItem(itemIndex) }}
                  />
                </span>
              }
              labelWidth="3em"
              state={itemState}
            >
              <FormItem label="文档分类" required>
                <TextInput state={itemState.$.type} />
              </FormItem>
              <FormItem label="文档列表" required state={itemState.$.links}>
                {itemState.$.links.$.map((linkState, linkIndex) => (
                  <Fragment key={linkIndex}>
                    <FormItem
                      label={
                        <span className={styles.section}>
                          <span>{linkIndex + 1}</span>
                          <Button
                            type="link"
                            icon={<DeleteIcon />}
                            className={styles.btn}
                            onClick={() => { removeLink(itemIndex, linkIndex) }}
                          />
                        </span>
                      }
                      labelWidth="3em"
                      state={linkState}
                    >
                      <FormItem label="文档名" required>
                        <TextInput state={linkState.$.title} />
                      </FormItem>
                      <FormItem label="跳转地址" required>
                        <WwwUrlPath state={linkState.$.url} />
                      </FormItem>
                    </FormItem>
                  </Fragment>
                ))}
                <Button icon={<AddIcon />} onClick={() => { addLink(itemIndex) }} />
              </FormItem>
            </FormItem>
          </Fragment>
        ))}
        <Button icon={<AddIcon />} onClick={() => { addItem() }} />
      </FormItem>
    </DrawerForm>
  )
})

export default function useCompAdvantage() {
  const [config, setConfig] = useState<ProductSection<ProductComponentDocumentConfig> | undefined>(undefined)
  const { visible, resolve, reject, open } = useModalLike<ProductSection<ProductComponentDocumentConfig>>()

  async function start(initConfig?: ProductSection<ProductComponentDocumentConfig>) {
    setConfig(initConfig)
    return open()
  }

  function submit(props: ProductComponentDocumentConfig['props']) {
    const newConfig: ProductSection<ProductComponentDocumentConfig> = {
      name: ProductModule.Document,
      title: productModuleTitleMap[ProductModule.Document],
      component: {
        name: ProductComponentName.Document,
        props
      }
    }
    resolve(newConfig)
    setConfig(undefined)
  }

  function cancel() {
    reject()
    setConfig(undefined)
  }

  const view = (
    <CompDrawerForm
      props={config?.component.props}
      visible={visible}
      onSubmit={submit}
      onCancel={cancel}
    />
  )

  return [start, view] as const
}
