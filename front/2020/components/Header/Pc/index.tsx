/**
 * @file 顶部导航栏
 * @description 包含产品、解决方案、登录入口，及用户信息等内容
 */

import React, { useContext, createContext, useState } from 'react'
import cls from 'classnames'
import Link from 'components/Link'

import SearchInput from './Search'
import Userinfo from './Userinfo'
import Nav from './Nav'

import Logo from '../logo.svg'
import style from './style.less'

type HeaderThemeType = 'default' | 'light' | 'dark'

export const headerThemeContext = createContext<HeaderThemeType>('default')

export type HeaderDropdownContextValue = {
  setDisplayedDropdownTotal: (cb: (val: number) => number) => void
}

export const headerDropdownContext = createContext<HeaderDropdownContextValue | null>(null)

export default function HeaderForPc() {
  const [displayedDropdownTotal, setDisplayedDropdownTotal] = useState(0)
  const themeType = useContext(headerThemeContext)
  const transparent = themeType !== 'default'
  const headerClassNames = cls(
    style.header,
    themeType === 'default' && style.default,
    transparent && style.transparent,
    themeType === 'dark' && style.dark,
    displayedDropdownTotal > 0 && style.hover
  )

  return (
    <headerDropdownContext.Provider value={{ setDisplayedDropdownTotal }}>
      <section className={cls(style.wrapper, transparent && style.hiddenHeight)}>
        <header className={headerClassNames}>
          <div className={style.content}>
            <Link className={style.logo} href="/"><Logo /></Link>
            <Nav />
            <div className={style.space}></div>
            <SearchInput className={style.searchInput} />
            <Link href="https://portal.qiniu.com" className={style.console}>控制台</Link>
            <Userinfo />
          </div>
        </header>
      </section>
    </headerDropdownContext.Provider>
  )
}
