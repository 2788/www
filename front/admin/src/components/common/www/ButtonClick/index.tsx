/**
 * @file Button Click
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'
import { FormState, FieldState, DebouncedFieldState, TransformedState } from 'formstate-x'
import { InputWrapper, FormItem, TextInput, Select, SelectOption } from 'react-icecream-form'

import WwwUrlPath, { createState as createWwwUrlPathState } from 'components/common/www/UrlPath'

import styles from './style.m.less'

export interface ButtonClickConsult {
  type: 'consult'
}

export interface ButtonClickWebLink {
  type: 'webLink'
  url: string
}

export interface ButtonClickMpLink {
  type: 'mpLink'
  url: string
}

export type ButtonClickTypes = ButtonClickConsult | ButtonClickWebLink | ButtonClickMpLink

export type ButtonClickType<T extends ButtonClickTypes['type']> = (
  T extends 'webLink' ? ButtonClickWebLink
  : T extends 'mpLink' ? ButtonClickMpLink
  : T extends 'consult' ? ButtonClickConsult
  : never
)

const buttonClickTypeMap = {
  consult: '咨询',
  webLink: 'Web 地址',
  mpLink: '小程序页面'
} as const

function validateUrl(url: string, required = false) {
  if (required && url.trim() === '') {
    return '不能为空'
  }

  if (/\s/.test(url)) {
    return '不能有空白符'
  }
}

function isButtonClickWebLink(buttonClick: ButtonClickTypes): buttonClick is ButtonClickWebLink {
  return buttonClick.type === 'webLink'
}

function isButtonClickMpLink(buttonClick: ButtonClickTypes): buttonClick is ButtonClickMpLink {
  return buttonClick.type === 'mpLink'
}

function getBaseValue<T extends ButtonClickTypes['type']>(
  click: ButtonClickType<T>,
  allowTypes: T[]
) {
  const allowList: Array<ButtonClickTypes['type']> = allowTypes
  const allows: Record<ButtonClickTypes['type'], boolean> = {
    webLink: allowList.includes('webLink'),
    mpLink: allowList.includes('mpLink'),
    consult: allowList.includes('consult')
  }

  return {
    allows,
    type: click.type as T,
    webLinkUrl: isButtonClickWebLink(click) ? click.url : '',
    mpLinkUrl: isButtonClickMpLink(click) ? click.url : ''
  }
}

function createBaseState<T extends ButtonClickTypes['type']>(
  init: ButtonClickType<T>,
  allowTypes: T[]
) {
  const click = getBaseValue<T>(init, allowTypes)

  const typeState = new FieldState(click.type)
  return new FormState({
    type: typeState,
    allows: new FieldState(click.allows), // TODO: 优化实现方式？
    webLinkUrl: createWwwUrlPathState(click.webLinkUrl)
      .withValidator(webLinkUrl => validateUrl(webLinkUrl))
      .disableWhen(() => !(typeState.value === 'webLink' && click.allows.webLink)),
    mpLinkUrl: new DebouncedFieldState(click.mpLinkUrl)
      .withValidator(mpLinkUrl => validateUrl(mpLinkUrl))
      .disableWhen(() => !(typeState.value === 'mpLink' && click.allows.mpLink))
  })
}

export function createState<T extends ButtonClickTypes['type']>(
  init: ButtonClickType<T>,
  allowTypes: T[]
) {
  const state = createBaseState<T>(init, allowTypes)

  function fromBaseValue(
    { type, webLinkUrl, mpLinkUrl }: (typeof state)['value']
  ): ButtonClickType<T>
  function fromBaseValue(
    { type, webLinkUrl, mpLinkUrl }: ReturnType<typeof createBaseState>['value']
  ): ButtonClickTypes {
    if (type === 'webLink') {
      return {
        type,
        url: webLinkUrl
      }
    }

    if (type === 'mpLink') {
      return {
        type,
        url: mpLinkUrl
      }
    }

    if (type === 'consult') {
      return { type }
    }

    throw new Error(`Unexpected type ${type}.`)
  }

  return new TransformedState(
    state,
    fromBaseValue,
    (click: ButtonClickType<T>) => getBaseValue<T>(click, allowTypes)
  )
}

export interface Props {
  state: ReturnType<typeof createState>
}

export default observer(function ButtonClick({ state }: Props) {
  const fields = state.$.$
  const type = fields.type.value
  const allows = fields.allows.value
  return (
    <InputWrapper state={state}>
      <div className={styles.inputGroup}>
        <FormItem className={styles.inputGroupSelectForm}>
          <Select state={fields.type} className={styles.inputGroupSelect}>
            {allows.webLink && (
              <SelectOption<ButtonClickTypes['type']> value="webLink">{buttonClickTypeMap.webLink}</SelectOption>
            )}
            {allows.mpLink && (
              <SelectOption<ButtonClickTypes['type']> value="mpLink">{buttonClickTypeMap.mpLink}</SelectOption>
            )}
            {allows.consult && (
              <SelectOption<ButtonClickTypes['type']> value="consult">{buttonClickTypeMap.consult}</SelectOption>
            )}
          </Select>
        </FormItem>
        {type === 'webLink' && (
          <FormItem>
            <WwwUrlPath state={fields.webLinkUrl} />
          </FormItem>
        )}
        {type === 'mpLink' && (
          <FormItem>
            <TextInput state={fields.mpLinkUrl} />
          </FormItem>
        )}
      </div>
    </InputWrapper>
  )
})