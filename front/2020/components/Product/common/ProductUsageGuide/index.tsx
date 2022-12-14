/**
 * @file 底部引导
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'

import { ProductPageInfo } from 'apis/admin/product'
import { useWechatConsultModal } from 'components/WechatConsultModal'

import BaseUsageGuide, { Button as BaseButton, ButtonProps as BaseButtonProps } from '../../UsageGuide'

export type Props = NonNullable<ProductPageInfo['usageGuide']>

function useButtonClickProps(click: Props['button']['click']): BaseButtonProps {
  const { showModal: showWechatConsultModal } = useWechatConsultModal()

  if (click.type === 'webLink') {
    return {
      href: click.url
    }
  }

  if (click.type === 'consult') {
    return {
      onClick() {
        showWechatConsultModal()
      }
    }
  }

  throw new Error(`不支持该点击类型 ${click.type}`)
}

export default function ProductUsageGuide(props: Props) {
  const buttonClickProps = useButtonClickProps(props.button.click)
  return (
    <BaseUsageGuide title={props.title} description={props.desc}>
      <BaseButton {...buttonClickProps}>{props.button.text}</BaseButton>
    </BaseUsageGuide>
  )
}
