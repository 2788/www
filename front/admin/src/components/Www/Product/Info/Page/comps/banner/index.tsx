/**
 * @file 顶部 banner
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { FormState, TransformedState } from 'formstate-x'
import { DrawerForm, FormItem, useFormstateX } from 'react-icecream-form'

import { useModalLike } from 'utils/async'
import { ProductComponentBannerProps } from 'constants/product/page/comp-banner'
import { ProductModule, productModuleTitleMap } from 'constants/product/page'
import { ProductInfo } from 'apis/product/info'
import Banner, { createState as createBannerBaseState } from 'components/common/www/Banner'
import BannerButtons, { createState as createButtonsState } from 'components/common/www/Banner/BannerButtons'

import styles from './style.m.less'

function createState(initBanner: ProductComponentBannerProps | null | undefined) {
  const state = new FormState({
    banner: createBannerBaseState(initBanner ?? undefined),
    buttons: createButtonsState(initBanner?.buttons ?? [])
  })

  return new TransformedState(
    state,
    ({ banner, buttons }) => ({ ...banner, buttons }),
    ({ buttons, ...banner }) => ({ banner, buttons })
  )
}

export default function useCompBanner(productInfo: ProductInfo | undefined) {
  const { visible, resolve, reject, open } = useModalLike<ProductComponentBannerProps>()

  const state = useFormstateX(createState, [visible ? productInfo?.banner : undefined])

  const view = productInfo != null && (
    <DrawerForm
      title={productModuleTitleMap[ProductModule.Banner]}
      width={780}
      layout="horizontal"
      labelWidth="4em"
      visible={visible}
      state={state}
      onSubmit={() => { resolve({ type: 'default', ...state.value }) }}
      onCancel={() => { reject() }}
    >
      <FormItem label="产品名" tip="在产品基本信息里配置" labelVerticalAlign="text">
        <p className={styles.desc}>{productInfo.name}</p>
      </FormItem>
      <FormItem label="产品描述" tip="在产品基本信息的长描述里配置" labelVerticalAlign="text">
        <p className={styles.desc}>{productInfo.desc.detail}</p>
      </FormItem>
      <FormItem>
        <Banner state={state.$.$.banner} />
      </FormItem>
      <FormItem label="按钮" required>
        <BannerButtons state={state.$.$.buttons} />
      </FormItem>
    </DrawerForm>
  )

  return [open, view] as const
}
