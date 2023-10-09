/**
 * @file 热销套餐
 */

import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { FormState, DebouncedFieldState, ArrayFormState } from 'formstate-x'
import { Button } from 'react-icecream'
import { AddThinIcon, DeleteIcon } from 'react-icecream/icons'
import { DrawerForm, FormItem, useFormstateX, TextInput, TextArea, NumberInput } from 'react-icecream-form'

import { useModalLike } from 'utils/async'
import { ProductModule, productModuleTitleMap, ProductSection } from 'constants/product/page'
import { ProductComponentName } from 'constants/product/page/comp-common'
import {
  ProductComponentHotPackageProps, ProductComponentHotPackageConfig, HotPackageItem, IntroductionProps
} from 'constants/product/page/comp-hot-package'

import WwwUrlPath, { createState as createWwwUrlPathState } from 'components/common/www/UrlPath'

import styles from './style.m.less'

function createState(props?: ProductComponentHotPackageProps) {
  return new FormState({
    items: new ArrayFormState(props?.items ?? [], item => (
      new FormState({
        title: new DebouncedFieldState(item.title).withValidator(title => {
          if (title.trim() === '') {
            return '不能为空'
          }
          if (title.length > 12) {
            return '不能超过 12 个字'
          }
        }),
        desc: new DebouncedFieldState(item.desc).withValidator(desc => {
          if (desc.trim() === '') {
            return '不能为空'
          }
          if (desc.length > 100) {
            return '不能超过 100 个字'
          }
        }),
        button: new FormState({
          title: new DebouncedFieldState(item.button.title).withValidator(title => {
            if (title.trim() === '') {
              return '不能为空'
            }
          }),
          url: createWwwUrlPathState(item.button.url).withValidator(url => {
            if (url === '') {
              return '不能为空'
            }
          })
        }),
        introductions: new ArrayFormState(item.introductions ?? [], introduction => (
          new FormState({
            detail: new DebouncedFieldState(introduction.detail).withValidator(detail => {
              if (detail.trim() === '') {
                return '不能为空'
              }
            })
          })
        )).withValidator(introductions => {
          if (introductions.length > 5) {
            return '数量最多 5 个'
          }
        }),
        price: new DebouncedFieldState(item.price).withValidator(price => {
          if (!price || price === 0) {
            return '不能为空'
          }
        }),
        tag: new DebouncedFieldState(item.tag ?? '').withValidator(tag => {
          if (tag.length > 4) {
            return '数量最多 4 个'
          }
        })
      })
    )).withValidator(items => {
      if (items.length === 0) {
        return '不能为空'
      }
      if (items.length > 4) {
        return '数量最多 4 个'
      }
    })
  })
}

interface Props {
  props?: ProductComponentHotPackageProps
  visible: boolean
  onSubmit(config: ProductComponentHotPackageProps): void
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
    props.onSubmit({ type: 'default', ...state.value })
  }

  function addItem() {
    const item: HotPackageItem = {
      title: '',
      desc: '',
      button: {
        title: '',
        url: ''
      },
      introductions: [],
      price: 0
    }
    state.$.items.append(item)
  }

  function removeItem(index: number) {
    state.$.items.remove(index)
  }

  function addIntro(itemIndex: number) {
    const itemState = state.$.items.$[itemIndex]
    const introState = itemState.$.introductions
    const introduction: IntroductionProps = {
      detail: ''
    }
    introState.append(introduction)
  }

  function removeIntro(itemIndex: number, introIndex: number) {
    const itemState = state.$.items.$[itemIndex]
    const introState = itemState.$.introductions
    introState.remove(introIndex)
  }

  return (
    <DrawerForm
      title={productModuleTitleMap[ProductModule.HotPackage]}
      width={735}
      layout="horizontal"
      labelWidth="4em"
      visible={props.visible}
      state={state}
      onSubmit={submit}
      onCancel={() => { props.onCancel() }}
    >
      <FormItem label="套餐" labelWidth="2em" required state={state.$.items}>
        {state.$.items.$.map((itemState, index) => (
          <FormItem
            key={index}
            label={
              <span className={styles.sectionLabel}>
                <span>{index + 1}</span>
                <Button
                  type="link"
                  icon={<DeleteIcon />}
                  className={styles.btn}
                  onClick={() => { removeItem(index) }}
                />
              </span>
            }
            labelWidth="3em"
            className={styles.sectionItem}
            state={itemState}
          >
            <FormItem label="标题" required>
              <TextInput state={itemState.$.title} />
            </FormItem>
            <FormItem label="描述" required>
              <TextArea state={itemState.$.desc} maxCount={70} textareaProps={{ rows: 4 }} />
            </FormItem>
            <FormItem label="信息">
              {itemState.$.introductions.$.map((introState, introIndex) => (
                <FormItem
                  key={introIndex}
                  label={
                    <span className={styles.sectionLabel}>
                      <span>{introIndex + 1}</span>
                      <Button
                        type="link"
                        icon={<DeleteIcon />}
                        className={styles.btn}
                        onClick={() => { removeIntro(index, introIndex) }}
                      />
                    </span>
                  }
                >
                  <FormItem label="详情" required>
                    <TextInput state={introState.$.detail} />
                  </FormItem>
                </FormItem>
              ))}
              <Button type="dashed" icon={<AddThinIcon />} onClick={() => { addIntro(index) }} />
            </FormItem>
            <FormItem label="价格" required>
              <NumberInput state={itemState.$.price} digits={3} />
            </FormItem>
            <FormItem label="按钮" required>
              <FormItem label="文字" required>
                <TextInput state={itemState.$.button.$.title} />
              </FormItem>
              <FormItem label="跳转链接" required>
                <WwwUrlPath state={itemState.$.button.$.url} />
              </FormItem>
            </FormItem>
            <FormItem label="tag">
              <TextInput state={itemState.$.tag} />
            </FormItem>
          </FormItem>
        ))}
        <Button type="dashed" icon={<AddThinIcon />} onClick={() => { addItem() }} />
      </FormItem>
    </DrawerForm>
  )
})

export default function useCompAdvantage() {
  const [config, setConfig] = useState<ProductSection<ProductComponentHotPackageConfig> | undefined>(undefined)
  const { visible, resolve, reject, open } = useModalLike<ProductSection<ProductComponentHotPackageConfig>>()

  async function start(initConfig?: ProductSection<ProductComponentHotPackageConfig>) {
    setConfig(initConfig)
    return open()
  }

  function submit(props: ProductComponentHotPackageProps) {
    const newConfig: ProductSection<ProductComponentHotPackageConfig> = {
      name: ProductModule.HotPackage,
      title: productModuleTitleMap[ProductModule.HotPackage],
      component: {
        name: ProductComponentName.HotPackage,
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
