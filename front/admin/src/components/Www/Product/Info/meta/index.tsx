/**
 * @file 产品基本信息
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState, useMemo } from 'react'
import partition from 'lodash/partition'
import { FormState, DebouncedFieldState, ArrayFormState } from 'formstate-x'
import { Loading } from 'react-icecream'
import { DrawerForm, FormItem, useFormstateX, TextInput, TextArea } from 'react-icecream-form'
import { useInjection } from 'qn-fe-core/di'
import { ToasterStore } from 'admin-base/common/toaster'

import { useModalLike } from 'utils/async'
import { ProductId, wwwProductPathPrefix, ProductInfo as BaseProductInfo } from 'constants/product'
import ProductInfoApis, { ProductInfo } from 'apis/product/info'
import SelectTags from 'components/common/SelectTags'
import SelectIcon, { createState as createSelectIcon } from 'components/common/SelectIcon'

function createState(productInfoList: BaseProductInfo[], currentProductInfo?: BaseProductInfo) {
  return new FormState({
    path: new DebouncedFieldState(currentProductInfo?.path ?? '').withValidator(path => {
      if (path.trim() === '') {
        return '不能为空'
      }
      if (!/^[a-z-]+$/.test(path)) {
        return '存在非法字符'
      }
      if (productInfoList.some(productInfo => productInfo.path === path)) {
        return '该产品已存在'
      }
    }),
    name: new DebouncedFieldState(currentProductInfo?.name ?? '').withValidator(name => {
      if (name.trim() === '') {
        return '不能为空'
      }
      if (productInfoList.some(productInfo => productInfo.name === name)) {
        return '该产品名已存在'
      }
      if (name.length > 12) {
        return '不能超过 12 个字'
      }
    }),
    title: new DebouncedFieldState(currentProductInfo?.title ?? '').withValidator(title => {
      if (title.trim() === '') {
        return '不能为空'
      }
    }),
    keywords: new ArrayFormState(
      currentProductInfo?.keywords ?? [],
      keyword => new DebouncedFieldState(keyword).withValidator(value => {
        if (value.trim() === '') {
          return '不能为空'
        }
      })
    ).withValidator(keywords => {
      if (keywords.length === 0) {
        return '不能为空'
      }
    }),
    desc: new FormState({
      brief: new DebouncedFieldState(currentProductInfo?.desc.brief ?? '').withValidator(brief => {
        if (brief.trim() === '') {
          return '不能为空'
        }
        if (brief.length > 40) {
          return '不能超过 40 个字'
        }
      }),
      detail: new DebouncedFieldState(currentProductInfo?.desc.detail ?? '').withValidator(detail => {
        if (detail.trim() === '') {
          return '不能为空'
        }
        if (detail.length > 124) {
          return '不能超过 124 个字'
        }
      })
    }),
    icon: new FormState({
      line: createSelectIcon(currentProductInfo?.icon.line).withValidator(line => {
        if (!line) {
          return '不能为空'
        }
      }),
      lineSmall: createSelectIcon(currentProductInfo?.icon.lineSmall).withValidator(lineSmall => {
        if (!lineSmall) {
          return '不能为空'
        }
      }),
      glass: createSelectIcon(currentProductInfo?.icon.glass).withValidator(glass => {
        if (!glass) {
          return '不能为空'
        }
      })
    })
  })
}

function useDrawerFormState(
  productId: ProductId | undefined,
  productInfoList: ProductInfo[] | undefined
) {
  const productInfoApis = useInjection(ProductInfoApis)

  const isNew = productId == null

  const [[productInfo], otherProductInfoList] = useMemo(
    () => partition(productInfoList ?? [], (({ path }) => path === productId)),
    [productId, productInfoList]
  )

  const state = useFormstateX(createState, [otherProductInfoList, productInfo])

  async function submitForm() {
    const { icon, ...value } = state.value
    const newValue = {
      ...value,
      icon: {
        line: icon.line!,
        lineSmall: icon.lineSmall!,
        glass: icon.glass!
      }
    }

    if (isNew) {
      const newProductInfo: BaseProductInfo = {
        banner: null,
        sections: [],
        ...newValue
      }
      await productInfoApis.create(newProductInfo)
    } else {
      const newProductInfo: ProductInfo = {
        ...productInfo,
        ...newValue
      }
      await productInfoApis.update(newProductInfo)
    }
  }

  return { isNew, state, submitForm }
}

function useModalState() {
  const toasterStore = useInjection(ToasterStore)
  const productInfoApis = useInjection(ProductInfoApis)

  const { visible, resolve, reject, open } = useModalLike()

  const [productId, setProductId] = useState<ProductId | undefined>(undefined)
  const [productInfoList, setProductInfoList] = useState<ProductInfo[] | undefined>(undefined)

  const { isNew, state, submitForm } = useDrawerFormState(productId, productInfoList)

  function clean() {
    setProductId(undefined)
    setProductInfoList(undefined)
  }

  function cancel() {
    reject()
    clean()
  }

  async function submit() {
    await toasterStore.promise(submitForm())
    resolve()
    clean()
  }

  async function setProductInfo(id?: ProductId) {
    setProductId(id)
    toasterStore.promise(
      productInfoApis.listAll().then(
        list => { setProductInfoList(list) },
        err => {
          cancel()
          throw err
        }
      )
    )
    await open()
  }

  return {
    isNew,
    isLoading: productInfoList == null,
    visible,
    submit,
    cancel,
    state,
    setProductInfo
  }
}

export default function useMetaInfo() {
  const {
    isNew, isLoading, visible, submit, cancel, state,
    setProductInfo
  } = useModalState()

  const metaView = (
    <DrawerForm
      title={isNew ? '新增' : '修改'}
      layout="horizontal"
      labelWidth="5em"
      state={state}
      visible={visible}
      onSubmit={submit}
      onCancel={cancel}
    >
      <Loading loading={isLoading}>
        <FormItem label="路径" required>
          <TextInput
            state={state.$.path}
            inputProps={{ readOnly: !isNew }}
            prefix={wwwProductPathPrefix}
          />
        </FormItem>
        <FormItem label="名称" required>
          <TextInput state={state.$.name} />
        </FormItem>
        <FormItem label="页面标题" required>
          <TextInput state={state.$.title} />
        </FormItem>
        <FormItem label="标签关键字" required tip="用于产品页 TDK、产品相关搜索等">
          <SelectTags state={state.$.keywords} />
        </FormItem>
        <FormItem label="短描述" required tip="用于产品页相关产品模块等">
          <TextArea state={state.$.desc.$.brief} maxCount={40} textareaProps={{ rows: 2 }} />
        </FormItem>
        <FormItem label="长描述" required tip="用于产品页 banner、产品页 TDK 等">
          <TextArea state={state.$.desc.$.detail} maxCount={124} textareaProps={{ rows: 5 }} />
        </FormItem>
        <FormItem label="线框图标" required>
          <SelectIcon state={state.$.icon.$.line} />
        </FormItem>
        <FormItem label="线框小图标" required>
          <SelectIcon state={state.$.icon.$.lineSmall} />
        </FormItem>
        <FormItem label="毛玻璃图标" required>
          <SelectIcon state={state.$.icon.$.glass} />
        </FormItem>
      </Loading>
    </DrawerForm>
  )

  return {
    metaView,
    setProductInfo
  }
}
