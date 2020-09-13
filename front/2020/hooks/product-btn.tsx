/**
 * @file 产品页按钮生成辅助 hook
 * @desc 同时生成给 banner & navigator 用的 button
 */

import React, { ReactNode } from 'react'
import Button, { Props } from 'components/UI/Button'
import { Button as NavButton } from 'components/Product/Navigator'
import { useMobile, useMp } from './ua'

export type BtnOptions = {
  type?: Props['type'],
  children: ReactNode,
  href: string,
  showIn?: Array<'pc' | 'mobile' | 'mp'>
  pcOnly?: boolean // 是否仅 PC，默认 false
  mobileOnly?: boolean // 是否仅移动端，默认 false
} | {
  type?: Props['type'],
  children: ReactNode,
  onClick: () => void,
  showIn?: Array<'pc' | 'mobile' | 'mp'>
  pcOnly?: boolean // 是否仅 PC，默认 false
  mobileOnly?: boolean // 是否仅移动端，默认 false
}

export function useBtns(firstBtn: BtnOptions, ...otherBtns: BtnOptions[]) {
  const isMobile = useMobile()
  const isPc = !isMobile
  const isMp = useMp()

  const [firstBtnProps, ...otherBtnsProps] = [firstBtn, ...otherBtns]
    .filter(
      ({ showIn }) => {
        if (!showIn) {
          return true
        }

        if (isMp) {
          return showIn.indexOf('mp') > -1
        }

        if (isMobile) {
          return showIn.indexOf('mobile') > -1
        }

        return true
      }
    )
    .filter(
      ({ pcOnly }) => !(pcOnly && isMobile) // 移动端不展示 pcOnly 的项
    ).filter(
      ({ mobileOnly }) => !(mobileOnly && isPc) // PC 端不展示 mobileOnly 的项
    ).map(
      ({ pcOnly, mobileOnly, showIn, ...options }) => options // pcOnly / mobileOnly 信息用完了扔掉
    )

  const bannerBtnViews = [
    firstBtnProps && <Button key={0} {...firstBtnProps} />,
    ...otherBtnsProps.map((otherBtn, i) => {
      if (i < otherBtnsProps.length - 1) {
        return (
          <Button key={i + 1} {...otherBtn} />
        )
      }

      // 最后一个 btn type: primary-hollow
      return (
        <Button key={i + 1} type="primary-hollow" withBorder {...otherBtn} />
      )
    })
  ].filter(Boolean)

  const navBtnsView = [
    firstBtnProps && <NavButton key={0} type="primary" {...firstBtnProps} />,
    ...otherBtnsProps.map((otherBtn, i) => {
      if (i < otherBtnsProps.length - 1) {
        return (
          <NavButton key={i + 1} type="primary" {...otherBtn} />
        )
      }

      // 最后一个 btn type: hollow & withBorder
      return (
        <NavButton key={i + 1} type="hollow" withBorder {...otherBtn} />
      )
    })
  ].filter(Boolean)

  return {
    banner: bannerBtnViews,
    nav: navBtnsView
  }
}
