/**
 * @file 顶部 banner
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { FormState, TransformedState } from 'formstate-x'
import { DrawerForm, FormItem, useFormstateX } from 'react-icecream-form'

import { IActivity } from 'apis/activity/market'

import { useModalLike } from 'utils/async'
import { ProductModule, productModuleTitleMap } from 'constants/product/page'
import { ProductComponentBannerProps } from 'constants/product/page/comp-banner'
import { ActivityComponentBannerProps } from 'constants/activity/page/comp-banner'

import Banner, { createState as createBannerBaseState } from 'components/common/www/Banner'

function createState(initBanner: ProductComponentBannerProps | null | undefined) {
  const state = new FormState({
    banner: createBannerBaseState(initBanner ?? undefined)
  })

  return new TransformedState(
    state,
    ({ banner }) => ({ ...banner }),
    ({ ...banner }) => ({ banner })
  )
}

export default function useCompBanner(activity: IActivity | undefined) {
  const { visible, resolve, reject, open } = useModalLike<ActivityComponentBannerProps>()

  const state = useFormstateX(createState, [visible ? activity?.page?.banner : undefined])

  const view = activity != null && (
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
      <FormItem>
        <Banner state={state.$.$.banner} />
      </FormItem>
    </DrawerForm>
  )

  return [open, view] as const
}
