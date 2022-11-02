/**
 * @file 顶部 banner
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { unionStringsFrom } from 'utils/ts'

import { ProductComponentProps } from './comp-common'

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

export const buttonPcTypes = unionStringsFrom(['webLink', 'consult'])
export const buttonMobileTypes = unionStringsFrom(['webLink', 'consult'])
export const buttonMpTypes = unionStringsFrom(['webLink', 'mpLink'])

interface ButtonClick<T extends ButtonClickTypes> {
  click: T
}

type ButtonPlatform<BC extends ButtonClickTypes> = ButtonClick<BC>

export type ButtonPc = ButtonPlatform<ButtonClickType<(typeof buttonPcTypes)[number]>>
export type ButtonMobile = ButtonPlatform<ButtonClickType<(typeof buttonPcTypes)[number]>>
export type ButtonMp = ButtonPlatform<ButtonClickType<(typeof buttonMpTypes)[number]>>

export interface BannerButton {
  text: string
  pc?: ButtonPc
  mobile?: ButtonMobile
  mp?: ButtonMp
}

export type ProductComponentBannerProps = ProductComponentProps<{
  bgImgUrl?: string
  buttons: BannerButton[]
}>

export const platformMap = {
  pc: 'PC',
  mobile: '移动端',
  mp: '小程序'
} as const

export const buttonClickTypeMap = {
  consult: '咨询',
  webLink: 'Web 地址',
  mpLink: '小程序页面'
} as const
