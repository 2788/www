/**
 * @file 解决方案页 应用场景
 * @author tang <tangzhengwei01@qiniu.com>
 */

import React from 'react'

import HorizontalDetailScene, {
  Props as HorizontalDetailSceneProps
} from 'components/Product/common/ProductScene/HorizontalDetail'
import VerticalScene, {
  Props as VerticalSceneProps
} from 'components/Product/common/ProductScene/Vertical'

export type Props = (
  | ({
    type?: 'default' | 'horizontal-detail'
  } & HorizontalDetailSceneProps)
  | ({
    type: 'vertical'
  } & VerticalSceneProps)
)

export default function SolutionScene(props: Props) {
  if (props.type == null || props.type === 'default' || props.type === 'horizontal-detail') {
    const { type, ...horizontalDetailSceneProps } = props
    return (<HorizontalDetailScene {...horizontalDetailSceneProps} />)
  }

  if (props.type === 'vertical') {
    const { type, ...verticalSceneProps } = props
    return (<VerticalScene {...verticalSceneProps} />)
  }

  return null
}
