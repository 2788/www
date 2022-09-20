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
  mpOnly?: boolean // 是否仅小程序，默认 false
  pcOnly?: boolean // 是否仅 PC，默认 false
  mobileOnly?: boolean // 是否仅移动端，默认 false
  target?: string // 同 <a> 标签 target 属性，同站点页面默认在当前标签页打开，非同站点页面默认新标签页打开
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
} | {
  type?: Props['type'],
  children: ReactNode,
  onClick: () => void,
  mpOnly?: boolean // 是否仅小程序，默认 false
  pcOnly?: boolean // 是否仅 PC，默认 false
  mobileOnly?: boolean // 是否仅移动端，默认 false
}

export function useBtns(firstBtn: BtnOptions, ...otherBtns: BtnOptions[]) {
  const isMobile = useMobile()
  const isPc = !isMobile
  const isMp = useMp()

  const [firstBtnProps, ...otherBtnsProps] = [firstBtn, ...otherBtns]
    .filter(
      ({ pcOnly, mobileOnly, mpOnly }) => {
        if (mpOnly) {
          return isMp
        }

        if (mobileOnly) {
          return isMobile
        }

        if (pcOnly) {
          return isPc
        }

        return true
      }
    )
    .map(
      ({ pcOnly, mobileOnly, mpOnly, ...options }) => options // pcOnly / mobileOnly 信息用完了扔掉
    )

  // 确保只有一个主要按钮（面形），其余的都为次要按钮（线形）
  const bannerBtnViews = [
    firstBtnProps && <Button key={0} {...firstBtnProps} />,
    ...otherBtnsProps.map((otherBtn, i) => (
      <Button key={i + 1} type="primary-hollow" withBorder {...otherBtn} />
    ))
  ].filter(Boolean)

  // 确保只有一个主要按钮（面形），其余的都为次要按钮（线形）
  const navBtnsView = [
    firstBtnProps && <NavButton key={0} type="primary" {...firstBtnProps} />,
    ...otherBtnsProps.map((otherBtn, i) => (
      <NavButton key={i + 1} withBorder {...otherBtn} type="hollow" />
    ))
  ].filter(Boolean)

  return {
    banner: bannerBtnViews,
    nav: navBtnsView
  }
}
