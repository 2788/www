/**
 * @file 方案优势
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { AdvantageType, VerticalIconAdvantageConfig, VerticalImgAdvantageConfig } from 'components/common/www/Advantage'

import { SolutionComponentName, SolutionComponentConfig, SolutionComponentProps } from './comp-common'

export type SolutionComponentAdvantageProps = (
  | SolutionComponentProps<VerticalIconAdvantageConfig>
  | SolutionComponentProps<AdvantageType.VerticalIcon, VerticalIconAdvantageConfig>
  | SolutionComponentProps<AdvantageType.VerticalImg, VerticalImgAdvantageConfig>
)

export type SolutionComponentAdvantageConfig = SolutionComponentConfig<
  SolutionComponentName.Advantage,
  SolutionComponentAdvantageProps
>
