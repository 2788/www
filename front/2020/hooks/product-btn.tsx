/**
 * @file 产品页按钮生成辅助 hook
 * @desc 同时生成给 banner & navigator 用的 button
 */

import React, { ReactNode } from 'react'
import Button from 'components/UI/Button'
import { Button as NavButton } from 'components/Product/Navigator'

export type BtnOptions = {
  children: ReactNode,
  href: string
} | {
  children: ReactNode,
  onClick: () => void
}

export function useBtns(firstBtn: BtnOptions, ...otherBtns: BtnOptions[]) {
  const bannerBtnViews = [
    <Button key={0} {...firstBtn} />,
    ...otherBtns.map(
      (otherBtn, i) => (
        <Button key={i + 1} type="hollow" {...otherBtn} />
      )
    )
  ]

  const navBtnsView = [
    <NavButton key={0} type="primary" {...firstBtn} />,
    ...otherBtns.map(
      (otherBtn, i) => (
        <NavButton key={i + 1} withBorder {...otherBtn} />
      )
    )
  ]

  return {
    banner: bannerBtnViews,
    nav: navBtnsView
  }
}
