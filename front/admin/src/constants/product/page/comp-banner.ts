/**
 * @file 顶部 banner
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { Value as BannerValue } from 'components/common/www/Banner'
import { BannerButton } from 'components/common/www/Banner/BannerButtons'

import { ProductComponentProps } from './comp-common'

export type ProductComponentBannerProps = ProductComponentProps<BannerValue & {
  buttons: BannerButton[]
}>
