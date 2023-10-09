/**
 * @file 解决方案 方案优势
 * @author tang <tangzhengwei01@qiniu.com>
 */

import React from 'react'

import VerticalIconAdvantage, {
  Props as VerticalIconAdvantageProps
} from './VerticalIconAdvantage'
import VerticalImgAdvantage, {
  Props as VerticalImgAdvantageProps
} from './VerticalImgAdvantage'

export type Props = (
  | ({
    type?: 'default' | 'vertical-icon'
  } & VerticalIconAdvantageProps)
  | ({
    type: 'vertical-img'
  } & VerticalImgAdvantageProps)
)

export default function SolutionAdvantage(props: Props) {
  if (props.type == null || props.type === 'default' || props.type === 'vertical-icon') {
    const { type, ...verticalIconAdvantageProps } = props
    return (<VerticalIconAdvantage {...verticalIconAdvantageProps} />)
  }

  if (props.type === 'vertical-img') {
    const { type, ...verticalImgAdvantageProps } = props
    return (<VerticalImgAdvantage {...verticalImgAdvantageProps} />)
  }

  return null
}
