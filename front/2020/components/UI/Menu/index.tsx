import React, { useState } from 'react'
import classnames from 'classnames'
import RcMenu from 'rc-menu'
import { MenuProps as RcMenuProps } from 'rc-menu/es/Menu'
import ArrowDownIcon from './arrow-down.svg'

import 'rc-menu/assets/index.css'
import style from './index.less'

export * from 'rc-menu'

interface MenuProps extends RcMenuProps {
  // 此属性 SubMenu 传进去不生效，只能从根结点传
  inlineIndent?: number
  rootMenus?: string[]
}

export default function Menu({ inlineIndent = 16, openKeys, rootMenus, ...rest }: MenuProps) {
  const [localOpenKeys, setLocalOpenKeys] = useState<string[]>([])

  function expandIcon(props: any) {
    if (props.isOpen) {
      return <ArrowDownIcon className={classnames(style.icon, style.open)} />
    }
    return <ArrowDownIcon className={style.icon} />
  }

  // 外部控制 openKeys
  if (openKeys != null) {
    return (
      <RcMenu
        {...{ inlineIndent }}
        expandIcon={expandIcon}
        openKeys={openKeys}
        {...rest}
      />
    )
  }

  // 只允许同时打开一个根 submenu
  function handleOpenChange(currentOpenKeys: string[]) {
    const latestOpenKey = currentOpenKeys.find(key => localOpenKeys.indexOf(key) === -1)

    if (rootMenus) {
      // 如果当前打开的正是根结点，则打开它
      if (latestOpenKey && rootMenus.indexOf(latestOpenKey) > -1) {
        setLocalOpenKeys([latestOpenKey])
      } else {
        setLocalOpenKeys(currentOpenKeys)
      }
    } else {
      setLocalOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  return (
    <RcMenu
      {...{ inlineIndent }}
      expandIcon={expandIcon}
      onOpenChange={handleOpenChange as any}
      openKeys={localOpenKeys}
      {...rest}
    />
  )

}
