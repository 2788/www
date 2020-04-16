/**
 * @file component Header
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

// TODO: i18n & mobile & media query
// TODO: pc 端窄屏右侧 “更多” 收起功能

import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import classNames from 'classnames'

import { useInjection } from 'qn-fe-core/di'
import { useLocalStore } from 'qn-fe-core/local-store'
import { useTest } from 'qn-fe-core/router'
import Menu from 'react-icecream/lib/menu'
import Button from 'react-icecream/lib/button'

import { basename } from 'constants/route'
import { ssoHost, portalHost } from 'constants/host'
import { Logo as LogoUrl } from 'constants/resource'
import { screenSm } from 'utils/styles/variables'
import { getViewportSize, reactionViewportSize } from 'utils/dom'
import UserStore from 'stores/user'
import { notFoundPagePath } from 'components/common/NotFound'
import { activityEndPagePath } from 'components/common/ActivityEnd'

import Nav from './Nav'
import HeaderStore from './store'
import * as styles from './style.m.less'

export interface IProps {
  //
}

export interface ISubMenuBaseProps {
  setActiveState(isActive: boolean): void
}

function Logo() {
  return (
    <a href="https://www.qiniu.com" className={styles.logo}>
      <img alt="Qiniu logo" src={LogoUrl.White} />
    </a>
  )
}

function Console() {
  return (
    <Menu className={styles.console}>
      <Menu.Item className={styles.menuItem}>
        <a href={portalHost} target="_blank">管理控制台</a>
      </Menu.Item>
    </Menu>
  )
}

const User = observer(function _User({ setActiveState }: ISubMenuBaseProps) {
  const userStore = useInjection(UserStore)
  const [activeKeys, setActiveKeys] = useState<string[]>([])

  function handleOpenChange(keys: string[]) {
    setActiveKeys(keys)
    setActiveState(!!(keys && keys.length))
  }

  if (userStore.isSignIn) {
    return (
      <Menu
        mode="horizontal"
        openKeys={activeKeys}
        onOpenChange={handleOpenChange}
        className={styles.user}
      >
        <Menu.SubMenu key="list" title={userStore.customerEmail} className={styles.subMenu}>
          <Menu.Item key="sign-out" className={styles.subMenuItem}>
            <a href={`${ssoHost}/signout`}>退出当前帐号</a>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    )
  }

  return (
    <span>
      <Button type="ghost" className={styles.signInBtn}>
        {/* TODO: 参数。。？ */}
        <a href={`${ssoHost}/?redirect_url=${encodeURIComponent(window.location.href)}`}>登录</a>
      </Button>
      <Button type="primary" className={styles.signUpBtn}>
        <a href={`${portalHost}/signup}`}>注册有礼</a>
      </Button>
    </span>
  )
})

export default observer(function Header(props: IProps) {
  const headerStore = useLocalStore(HeaderStore, props)
  const { isHeaderActive, setSubMenuActiveState } = headerStore

  const notFoundPageMatchResult = !!useTest(`${basename}${notFoundPagePath}`)
  const activityEndPageMatchResult = !!useTest(`${basename}${activityEndPagePath}`)

  const [width, setWidth] = useState(getViewportSize().width)
  useEffect(() => reactionViewportSize(dimension => setWidth(dimension.width)), [])

  const shouldHeaderActive = (
    isHeaderActive
    || notFoundPageMatchResult
    || activityEndPageMatchResult
    || width < screenSm
  )

  const subMenuBaseProps = {
    setActiveState: setSubMenuActiveState
  }

  return (
    <header className={classNames(styles.headerWrapper, shouldHeaderActive && styles.active)}>
      <Logo />
      <Nav {...subMenuBaseProps} />
      <Console />
      <User {...subMenuBaseProps} />
    </header>
  )
})

// TODO: HACK 应该用 react 的方式去实现…
export function getHeaderHeight() {
  const headerElement = document.getElementsByClassName(styles.headerWrapper)[0] as HTMLElement
  return headerElement.offsetHeight || headerElement.getBoundingClientRect().height
}
