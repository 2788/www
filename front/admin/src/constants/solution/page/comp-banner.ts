/**
 * @file 顶部 banner
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { Value as BannerValue } from 'components/common/Banner'
import { BannerButton } from 'components/common/Banner/BannerButtons'

import { SolutionComponentProps } from './comp-common'

export type SolutionComponentBannerProps = SolutionComponentProps<BannerValue & {
  buttons: BannerButton[]
}>
