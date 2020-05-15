import React from 'react'
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

export default function Menu({ inlineIndent = 16, ...rest }: MenuProps) {
  function expandIcon(props: any) {
    if (props.isOpen) {
      return <ArrowDownIcon className={classnames(style.icon, style.open)} />
    }
    return <ArrowDownIcon className={style.icon} />
  }
  return <RcMenu {...{ inlineIndent }} expandIcon={expandIcon} {...rest} />
}
