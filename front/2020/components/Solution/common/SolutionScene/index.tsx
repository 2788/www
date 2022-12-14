/**
 * @file 解决方案页 应用场景
 * @author tang <tangzhengwei01@qiniu.com>
 */

import React from 'react'

import HorizontalDetailScene, {
  Props as HorizontalDetailSceneProps
} from 'components/Product/common/ProductScene/HorizontalDetail'

export interface Props extends HorizontalDetailSceneProps {
  type?: 'default' | 'horizontal-detail'
}

export default function SolutionScene(props: Props) {
  if (props.type == null || props.type === 'default' || props.type === 'horizontal-detail') {
    const { type, ...horizontalDetailSceneProps } = props
    return (<HorizontalDetailScene {...horizontalDetailSceneProps} />)
  }

  return null
}
