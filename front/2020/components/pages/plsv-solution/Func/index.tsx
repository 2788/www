/**
 * @file 短视频功能大全 index.tsx
 * @description 包含短视频功能大全
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'

import Section from 'components/Product/Section'
import UIButton from 'components/UI/Button'

import { useMobile } from 'hooks/ua'

import Pc from './Pc'
import Mobile from './Mobile'

import ArrowIcon from './arrow.svg'

import styles from './style.less'

export default function PlsvFunc() {
  const isMobile = useMobile()

  function renderMain() {
    if (isMobile) {
      return <Mobile />
    }

    return <Pc />
  }

  return (
    <Section name="func" title="功能大全" subtitle="美颜、特效、表情、贴纸，让用户更加愉快地“玩耍”">
      {renderMain()}
      <UIButton
        className={styles.link}
        href="https://developer.qiniu.com/pili/sdk/3731/short-video"
      >
        查看更多<ArrowIcon className={styles.arrow} />
      </UIButton>
    </Section>
  )
}
