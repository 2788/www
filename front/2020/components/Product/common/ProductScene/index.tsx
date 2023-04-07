/**
 * @file 产品页 应用场景
 * @author tang <tangzhengwei01@qiniu.com>
 */

import React from 'react'

import HorizontalDetailScene, { Props as HorizontalDetailSceneProps } from './HorizontalDetail'
import HorizontalSimpleScene, { Props as HorizontalSimpleSceneProps } from './HorizontalSimple'
import VerticalScene, { Props as VerticalSceneProps } from './Vertical'

export type Props = (
  | ({
    type?: 'default' | 'vertical'
  } & VerticalSceneProps)
  | ({
    type: 'horizontal-detail'
  } & HorizontalDetailSceneProps)
  | ({
    type: 'horizontal-simple'
  } & HorizontalSimpleSceneProps)
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

  if (props.type === 'horizontal-simple') {
    const { type, ...horizontalSimpleSceneProps } = props
    return (<HorizontalSimpleScene {...horizontalSimpleSceneProps} />)
  }

  return null
}
