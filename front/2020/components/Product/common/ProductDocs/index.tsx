/**
 * @file 产品页 相关文档
 * @author tang <tangzhengwei01@qiniu.com>
 */

import React from 'react'
import classnames from 'classnames'

import { Row } from 'components/UI/Card'
import Link from 'components/Link'
import Menu, { MenuItem, SubMenu } from 'components/UI/Menu'
import { useIsGrey } from 'components/Product/Section/v2'
import { useMobile } from 'hooks/ua'

import Description from '../Description'

import style from './style.less'

interface Item {
  /** 文档分类 */
  type: string
  links: Array<{
    title: string
    url: string
  }>
}

interface Props {
  items: Item[]
}

export default function ProductDocs({ items }: Props) {
  const isMobile = useMobile()
  const isGrey = useIsGrey()

  if (!items.length) {
    return null
  }

  if (isMobile) {
    return (
      <div className={classnames(style.mobileWrapper, isGrey && style.grey)}>
        <Menu mode="inline">
          {items.map(({ type, links }) => (
            <SubMenu title={type} key={type}>
              {links.map(({ title, url }) => (
                <MenuItem key={title}>
                  <Link href={url}>{title}</Link>
                </MenuItem>
              ))}
            </SubMenu>
          ))}
        </Menu>
      </div>
    )
  }

  return (
    <Row className={style.pcWrapper}>
      {items.map(item => <PcItem key={item.type} {...item} />)}
    </Row>
  )
}

function PcItem({ type, links }: Item) {
  return (
    <div className={style.item}>
      <h3 className={style.type}>{type}</h3>

      <div className={style.links}>
        {links.map(({ title, url }) => (
          <Description key={title} className={style.linkItem}>
            <Link title={title} href={url}>
              {title}
            </Link>
          </Description>
        ))}
      </div>
    </div>
  )
}
