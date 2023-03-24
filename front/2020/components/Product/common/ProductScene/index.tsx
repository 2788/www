/**
 * @file 产品页 应用场景
 * @author tang <tangzhengwei01@qiniu.com>
 */

import React from 'react'

import HorizontalDetailScene, { Props as HorizontalDetailSceneProps } from './HorizontalDetail'
import VerticalScene, { Props as VerticalSceneProps } from './Vertical'

export type Props = (
  | ({
    type?: 'default' | 'vertical'
  } & VerticalSceneProps)
  | ({
    type: 'horizontal-detail'
  } & HorizontalDetailSceneProps)
)

export default function ProductScene(props: Props) {
  if (props.type == null || props.type === 'default' || props.type === 'vertical') {
    const { type, ...verticalSceneProps } = props
    return (<VerticalScene {...verticalSceneProps} />)
  }

  if (props.type === 'horizontal-detail') {
    const { type, ...horizontalDetailSceneProps } = props
    return (<HorizontalDetailScene {...horizontalDetailSceneProps} />)
  }

  return null
}
