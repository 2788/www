/**
 * @file 底部引导
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { unionStringsFrom } from 'utils/ts'
import { ButtonClickType } from 'components/common/www/ButtonClick'

import { SolutionComponentProps } from './comp-common'

export const buttonClickTypes = unionStringsFrom(['webLink', 'consult'])

export interface Button {
  text: string
  click: ButtonClickType<(typeof buttonClickTypes)[number]>
}

export type SolutionComponentUsageGuideProps = SolutionComponentProps<{
  title: string
  desc?: string
  button: Button
}>