import React, { ReactNode, PropsWithChildren } from 'react'
import { flatten } from 'lodash'
import classnames from 'classnames'
import { useMobile } from 'hooks/ua'
import Item from './Item'

import style from './style.less'

interface IBreadcrumbProps {
  className?: string
  separator?: ReactNode
}

export default function Breadcrumb(props: PropsWithChildren<IBreadcrumbProps>) {
  const { className, separator = '>', children } = props
  const childs = flatten(
    React.Children.toArray(children).map((child, index) => {
      if (!React.isValidElement(child) || child.type !== Item) {
        // 子元素不是 Item ，直接返回 []
        return []
      }

      return [
        child,
        <span key={`separator-${index}`} className={style.separator}>
          {separator}
        </span>
      ]
    })
  )

  const isMobile = useMobile()
  const rootCls = classnames(className, style.breadcrumb, {
    [style.mobile]: isMobile
  })
  return <div className={rootCls}>{childs}</div>
}

Breadcrumb.Item = Item
