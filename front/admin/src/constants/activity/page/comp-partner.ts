/**
 * @author yinxulai <yinxulai@qiniu.com>
 */

import { ActivityComponentConfig, ActivityComponentName, ActivityComponentProps } from './comp-common'

export type PartnerComponentProps = ActivityComponentProps<{
}>

export type PartnerComponentConfig = ActivityComponentConfig<
  ActivityComponentName.Partner,
  PartnerComponentProps
>
