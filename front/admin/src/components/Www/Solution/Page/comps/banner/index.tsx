/**
 * @file 顶部 banner
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { FormState, TransformedState } from 'formstate-x'
import { DrawerForm, FormItem, useFormstateX } from 'react-icecream-form'

import { useModalLike } from 'utils/async'
import { SolutionComponentBannerProps } from 'constants/solution/page/comp-banner'
import { SolutionModule, solutionModuleTitleMap } from 'constants/solution/page'
import { SolutionInfo } from 'apis/solution'
import Banner, { createState as createBannerBaseState } from 'components/common/Banner'
import BannerButtons, { createState as createButtonsState } from 'components/common/Banner/BannerButtons'

import styles from './style.m.less'

function createState(initBanner: SolutionComponentBannerProps | null | undefined) {
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

export default function useCompBanner(solutionInfo: SolutionInfo | undefined) {
  const { visible, resolve, reject, open } = useModalLike<SolutionComponentBannerProps>()

  const state = useFormstateX(createState, [visible ? solutionInfo?.banner : undefined])

  const view = solutionInfo != null && (
    <DrawerForm
      title={solutionModuleTitleMap[SolutionModule.Banner]}
      width={780}
      layout="horizontal"
      labelWidth="4em"
      visible={visible}
      state={state}
      onSubmit={() => { resolve(state.value) }}
      onCancel={() => { reject() }}
    >
      <FormItem label="方案名" tip="在解决方案基本信息里配置" labelVerticalAlign="text">
        <p className={styles.desc}>{solutionInfo.name}</p>
      </FormItem>
      <FormItem label="方案描述" tip="在解决方案基本信息的长描述里配置" labelVerticalAlign="text">
        <p className={styles.desc}>{solutionInfo.desc.detail}</p>
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
