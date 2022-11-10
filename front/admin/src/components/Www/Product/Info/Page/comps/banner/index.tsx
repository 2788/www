/**
 * @file 顶部 banner
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { Fragment } from 'react'
import { FormState, DebouncedFieldState, ArrayFormState, TransformedState } from 'formstate-x'
import { Button } from 'react-icecream'
import { AddIcon, DeleteIcon } from 'react-icecream/icons'
import { DrawerForm, FormItem, useFormstateX, TextInput } from 'react-icecream-form'

import { useModalLike } from 'utils/async'
import { ProductComponentBannerProps, BannerButton, platformMap } from 'constants/product/page/comp-banner'
import { ProductModule, productModuleTitleMap } from 'constants/product/page'
import { ProductInfo } from 'apis/product/info'
import Banner, { createState as createBannerBaseState } from 'components/common/Banner'

import { createPcState, renderPc } from './pc'
import { createMobileState, renderMobile } from './mobile'
import { createMpState, renderMp } from './mp'

import styles from './style.m.less'

function createButtonState(button: BannerButton) {
  return new FormState({
    text: new DebouncedFieldState(button.text).withValidator(text => {
      if (text.trim() === '') {
        return '不能为空'
      }
      if (text.length > 4) {
        return '不能超过 4 个字'
      }
    }),
    pc: createPcState(button.pc),
    mobile: createMobileState(button.mobile),
    mp: createMpState(button.mp)
  }).withValidator(({ pc, mobile, mp }) => {
    if (pc == null && mobile == null && mp == null) {
      return '最少选 1 个平台'
    }
  })
}

function createButtonsState(buttons: BannerButton[]) {
  const state = new ArrayFormState(buttons, createButtonState).withValidator(list => {
    const countMap: Record<keyof typeof platformMap, number> = {
      pc: 0,
      mobile: 0,
      mp: 0
    }

    for (const item of list) {
      if (item.pc) {
        countMap.pc++
      }
      if (item.mobile) {
        countMap.mobile++
      }
      if (item.mp) {
        countMap.mp++
      }
    }

    for (const [key, count] of Object.entries(countMap)) {
      if (key !== 'mp' && count === 0) {
        return `${platformMap[key]} 最少 1 个按钮`
      }

      if (count > 3) {
        return `${platformMap[key]} 最多 3 个按钮`
      }
    }
  })

  return new TransformedState(
    state,
    list => list.map(({ pc, mobile, mp, ...button }) => ({
      ...button,
      ...(pc && ({ pc })),
      ...(mobile && ({ mobile })),
      ...(mp && ({ mp }))
    })),
    list => list
  )
}

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

  function addButton() {
    const button: BannerButton = {
      text: ''
    }
    state.$.$.buttons.$.append(button)
  }

  function removeButton(index: number) {
    state.$.$.buttons.$.remove(index)
  }

  function renderButton(buttonState: ReturnType<typeof createButtonState>, index: number) {
    return (
      <Fragment key={index}>
        <FormItem
          label={
            <span className={styles.section}>
              <span>{index + 1}</span>
              <Button
                type="link"
                icon={<DeleteIcon />}
                className={styles.btn}
                onClick={() => { removeButton(index) }}
              />
            </span>
          }
          labelWidth="3em"
          state={buttonState}
        >
          <FormItem label="文案" required>
            <TextInput state={buttonState.$.text} />
          </FormItem>
          {renderPc(buttonState.$.pc)}
          {renderMobile(buttonState.$.mobile)}
          {renderMp(buttonState.$.mp)}
        </FormItem>
      </Fragment>
    )
  }

  const view = productInfo != null && (
    <DrawerForm
      title={productModuleTitleMap[ProductModule.Banner]}
      width={820}
      layout="horizontal"
      labelWidth="4em"
      visible={visible}
      state={state}
      onSubmit={() => { resolve(state.value) }}
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
      <FormItem label="按钮" required state={state.$.$.buttons}>
        {state.$.$.buttons.$.$.map(renderButton)}
        <Button icon={<AddIcon />} onClick={() => { addButton() }} />
      </FormItem>
    </DrawerForm>
  )

  return [open, view] as const
}
