/**
 * @file Dora 产品功能 Pc 端
 * @description 包含纵向 Tabs 和多个Card
 * @author hezhichao <hezhichao@qiniu.com>
 */

import React, { useState } from 'react'
import Tabs, { TabPane } from 'components/UI/Tabs'
import Button from 'components/UI/Button'
import Link from 'components/Link'
import Tag from 'components/UI/Tag'
import { useOnChange } from 'hooks'

import { ContentValue, productFunctions } from '../constants'

import style from './style.less'

function PcItem({ contentList }: { contentList: ContentValue[] }) {
  return (
    <>
      {contentList.map(content => (
        <div key={content.name} className={style.linkWrapper}>
          {content.link ? (
            <Link href={content.link}>
              {content.name}
              {content.label && <Tag className={style.tag} text={content.label} />}
            </Link>
          ) : (
            <div>{content.name}{content.label && <Tag className={style.tag} text={content.label} />}</div>
          )}
          {content.extra
            && <Link href={content.extra.link} className={style.itemExtra}>{content.extra.title} &gt;</Link>}
        </div>
      ))}
    </>
  )
}

export default function DoraPcFunction({ defaultActive }: { defaultActive?: string }) {
  const [active, setActive] = useState<string>(defaultActive || productFunctions[0].key)
  useOnChange(() => {
    if (defaultActive) {
      setActive(defaultActive)
    }
  }, [defaultActive])

  function handlePanelsChange(activeKey: string) {
    setActive(activeKey)
  }

  return (
    <Tabs
      value={active}
      onChange={handlePanelsChange}
      vertical
      className={style.tabs}
      contentClassName={style.content}
    >
      {productFunctions.map(({ title, key, list, extra }) => (
        <TabPane tab={title} value={key} key={key}>
          {list.map(item => (
            <div key={item.title} className={style.card}>
              {item.link
                ? <Link href={item.link} className={style.title}>{item.title}</Link>
                : <div className={style.title}>{item.title}</div>}
              <div className={style.cardContent}>
                {item.content && <PcItem contentList={item.content} />}
                {item.group
                  && item.group.map(({ type, content }) => (
                    <div key={type} className={[style.linkWrapper, style.group].join(' ')}>
                      <div className={style.groupName}>{type}</div>
                      {content.map(({ name, link }) => (
                        <Link key={name} href={link} className={style.groupLink}>{name}</Link>))}
                    </div>
                  ))}
              </div>
            </div>
          ))}
          {extra && <div className={style.extra}><Button type="primary" href={extra.link}>{extra.title}</Button></div>}
        </TabPane>
      ))}
    </Tabs>
  )
}
