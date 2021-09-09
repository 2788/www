import React, { useCallback, useState } from 'react'
import Menu, { MenuItem, SubMenu, ItemGroup } from 'components/UI/Menu'
import ArrowDownIcon from 'components/UI/Menu/arrow-down.svg'
import Button from 'components/UI/Button'
import Link from 'components/Link'
import Tag from 'components/UI/Tag'
import { useRouter } from 'next/router'

import { checkInSite } from 'utils/route'
import { useOnChange } from 'hooks'
import { ContentValue, productFunctions } from '../constants'

import style from './style.less'

function MobileItem({ contentList }: { contentList: ContentValue[] }) {
  const router = useRouter()

  const handleClick = useCallback((content: ContentValue) => {
    if (content.link) {
      const checked = checkInSite(content.link)
      if (checked.inSite) {
        router.push(content.link)
      } else {
        window.open(content.link)
      }
    }
  }, [router])

  return (
    <>
      {contentList.map(content => (
        <MenuItem key={content.name} className={style.menuItem}>
          <div className={style.itemWrapper}>
            <div
              className={style.itemContent}
              onClick={() => handleClick(content)}
            >
              <div className={style.itemName}>
                {content.name}
                {content.label && <Tag className={style.tag} text={content.label} />}
              </div>
              <ArrowDownIcon className={style.arrow} />
            </div>
            {content.immediate && (
              <>
                <div className={style.divider}></div>
                <Link href={content.immediate} className={style.immediate}>立即使用</Link>
              </>
            )}
          </div>
        </MenuItem>
      ))}
    </>
  )
}

export default function ForMobile({ defaultActive }: { defaultActive?: string }) {
  const [active, setActive] = useState<string[] | undefined>([defaultActive || 'media'])

  useOnChange(() => {
    if (defaultActive) {
      setActive([defaultActive])
    }
  }, [defaultActive])

  function handlePanelsChange(activeKey: string) {
    if (active?.[0] === activeKey) {
      setActive(undefined)
    } else {
      setActive([activeKey])
    }
  }

  return (
    <Menu mode="inline" className={style.menu} openKeys={active}>
      {productFunctions.map(({ title, key, list, extra }) => (
        <SubMenu
          key={key}
          title={title}
          className={style.subMenu}
          onTitleClick={({ key: activeKey }: any) => {
            handlePanelsChange(activeKey)
          }}
        >
          {list.map(item => (
            <ItemGroup key={item.title}
              title={item.link
              ? <Link href={item.link} className={style.title}>{item.title}</Link>
              : <div className={style.title}>{item.title}</div>}
              className={style.itemGroup}
            >
              {item.content && <MobileItem contentList={item.content} />}
              {item.group && item.group.map(({ type, content }) => (
                <>
                  <div className={style.groupName}>{type}</div>
                  <MobileItem contentList={content} />
                </>
              ))}
            </ItemGroup>
          ))}
          {extra && <Button type="primary" href={extra.link} className={style.extra}>{extra.title}</Button>}
        </SubMenu>
      ))}
    </Menu>
  )
}
