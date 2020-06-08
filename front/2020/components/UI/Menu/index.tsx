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
}

export default function Menu({ inlineIndent = 16, openKeys, ...rest }: MenuProps) {
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

  function handleOpenChange(currentOpenKeys: any) {
    const newLocalOpenKeys: string[] = []
    if (currentOpenKeys.length > 0) {
      newLocalOpenKeys.push(currentOpenKeys.pop())
      setLocalOpenKeys(newLocalOpenKeys)
    }
  }

  return (
    <RcMenu
      {...{ inlineIndent }}
      expandIcon={expandIcon}
      onOpenChange={handleOpenChange}
      openKeys={localOpenKeys}
      {...rest}
    />
  )

}
