/**
 * @file banner click
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { unionStringsFrom } from 'utils/ts'
import { ButtonClickType, ButtonClickTypes } from 'components/common/www/ButtonClick'

export const buttonPcTypes = unionStringsFrom(['webLink', 'consult'])
export const buttonMobileTypes = unionStringsFrom(['webLink', 'consult'])
export const buttonMpTypes = unionStringsFrom(['webLink', 'mpLink'])

interface ButtonClick<T extends ButtonClickTypes> {
  click: T
}

type ButtonPlatform<BC extends ButtonClickTypes> = ButtonClick<BC>

export type ButtonPc = ButtonPlatform<ButtonClickType<(typeof buttonPcTypes)[number]>>
export type ButtonMobile = ButtonPlatform<ButtonClickType<(typeof buttonMobileTypes)[number]>>
export type ButtonMp = ButtonPlatform<ButtonClickType<(typeof buttonMpTypes)[number]>>

export interface BannerButton {
  text: string
  pc?: ButtonPc
  mobile?: ButtonMobile
  mp?: ButtonMp
}

export const platformMap = {
  pc: 'PC',
  mobile: '移动端',
  mp: '小程序'
} as const

export const labelOuterWidth = '3em'
export const labelInnerWidth = '2em'
